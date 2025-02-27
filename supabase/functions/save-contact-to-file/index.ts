
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const timestamp = formData.created_at || new Date().toISOString();
    
    // Log submission details
    console.log("Contact form submission received:", {
      timestamp,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message.substring(0, 50) + (formData.message.length > 50 ? "..." : "")
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Submission logged successfully",
        data: {
          timestamp,
          name: formData.name
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing submission:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "Unknown error occurred"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
