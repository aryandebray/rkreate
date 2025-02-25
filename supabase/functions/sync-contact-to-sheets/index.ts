
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Your spreadsheet ID from the URL
const SPREADSHEET_ID = "1YourSpreadsheetIDHere"; // Replace this with your actual spreadsheet ID
const PRIVATE_KEY = Deno.env.get("GOOGLE_SHEETS_PRIVATE_KEY") || "";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
}

async function appendToSheet(formData: ContactFormData) {
  try {
    const credentials = JSON.parse(PRIVATE_KEY);
    const googleAuth = await createGoogleAuth(credentials);
    
    const row = [
      formData.created_at || new Date().toISOString(),
      formData.name,
      formData.email,
      formData.phone,
      formData.message
    ];

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:E1:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${googleAuth.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [row],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to append to sheet: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error appending to sheet:", error);
    throw error;
  }
}

async function createGoogleAuth(credentials: any) {
  const tokenUrl = "https://oauth2.googleapis.com/token";
  const scope = "https://www.googleapis.com/auth/spreadsheets";
  
  const jwt = await createJWT(
    credentials.client_email,
    credentials.private_key,
    scope
  );

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token");
  }

  return await response.json();
}

async function createJWT(clientEmail: string, privateKey: string, scope: string) {
  const encoder = new TextEncoder();
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: scope,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedClaim = btoa(JSON.stringify(claim));
  const signatureInput = `${encodedHeader}.${encodedClaim}`;
  
  const key = await crypto.subtle.importKey(
    "pkcs8",
    new TextEncoder().encode(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    key,
    encoder.encode(signatureInput)
  );
  
  return `${signatureInput}.${btoa(String.fromCharCode(...new Uint8Array(signature)))}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const result = await appendToSheet(formData);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in sync-contact-to-sheets function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
