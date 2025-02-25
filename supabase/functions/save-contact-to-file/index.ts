
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { join } from "https://deno.land/std@0.190.0/path/mod.ts";

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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const timestamp = formData.created_at || new Date().toISOString();
    
    // Create CSV line
    const csvLine = `${timestamp},"${formData.name}","${formData.email}","${formData.phone}","${formData.message.replace(/"/g, '""')}"\n`;
    
    // Define file path
    const filePath = "contact_submissions.csv";
    
    // Check if file exists, if not create with headers
    try {
      await Deno.stat(filePath);
    } catch {
      // File doesn't exist, create with headers
      await Deno.writeTextFile(filePath, "Timestamp,Name,Email,Phone,Message\n");
    }
    
    // Append new submission
    await Deno.writeTextFile(filePath, csvLine, { append: true });

    return new Response(
      JSON.stringify({ success: true, message: "Submission saved to file" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving submission:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
