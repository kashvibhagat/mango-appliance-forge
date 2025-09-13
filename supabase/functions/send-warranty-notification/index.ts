import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WarrantyNotificationRequest {
  warrantyId: string;
  serialNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { warrantyId, serialNumber }: WarrantyNotificationRequest = await req.json();

    console.log(`Processing warranty notification for: ${serialNumber}`);

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch warranty registration details
    const { data: warrantyData, error: warrantyError } = await supabase
      .from('warranty_registrations')
      .select('*')
      .eq('id', warrantyId)
      .single();

    if (warrantyError) {
      console.error('Error fetching warranty:', warrantyError);
      throw new Error(`Failed to fetch warranty details: ${warrantyError.message}`);
    }

    const emailResponse = await resend.emails.send({
      from: "Mango Appliances <warranty@mangoappliances.com>",
      to: ["DoNotReply@mangoappliances.com"],
      subject: `🛡️ New Warranty Registration - ${warrantyData.product_model}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e9ecef;">
              <h1 style="color: #28a745; margin: 0; font-size: 28px;">🛡️ NEW WARRANTY REGISTRATION</h1>
              <p style="color: #6c757d; margin: 10px 0 0 0; font-size: 16px;">Serial Number: ${warrantyData.serial_number}</p>
            </div>

            <!-- Warranty Summary -->
            <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #28a745;">
              <h2 style="color: #155724; margin: 0 0 15px 0; font-size: 20px;">📋 Warranty Details</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <strong style="color: #495057;">Product Model:</strong><br>
                  <span style="color: #6c757d;">${warrantyData.product_model}</span>
                </div>
                <div>
                  <strong style="color: #495057;">Serial Number:</strong><br>
                  <span style="color: #6c757d;">${warrantyData.serial_number}</span>
                </div>
                <div>
                  <strong style="color: #495057;">Registration Date:</strong><br>
                  <span style="color: #6c757d;">${new Date(warrantyData.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <strong style="color: #495057;">Purchase Date:</strong><br>
                  <span style="color: #6c757d;">${new Date(warrantyData.date_of_purchase).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <!-- Customer Information -->
            <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #17a2b8;">
              <h2 style="color: #0c5460; margin: 0 0 15px 0; font-size: 20px;">👤 Customer Information</h2>
              <div style="color: #495057;">
                <p><strong>Name:</strong> ${warrantyData.customer_name}</p>
                <p><strong>Mobile:</strong> ${warrantyData.customer_mobile}</p>
                <p><strong>Registration ID:</strong> ${warrantyData.id}</p>
              </div>
            </div>

            <!-- Status Information -->
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
              <h2 style="color: #856404; margin: 0 0 15px 0; font-size: 20px;">📊 Current Status</h2>
              <div style="color: #495057;">
                <p><strong>Status:</strong> <span style="background-color: #ffc107; color: #856404; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${warrantyData.status.toUpperCase()}</span></p>
                <p><strong>OTP Verified:</strong> ${warrantyData.otp_verified ? 'Yes' : 'No'}</p>
                <p><strong>Admin Approved:</strong> ${warrantyData.admin_approved ? 'Yes' : 'Pending'}</p>
              </div>
            </div>

            <!-- Action Required -->
            <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; text-align: center; border: 2px solid #dc3545;">
              <h2 style="color: #721c24; margin: 0 0 15px 0; font-size: 20px;">⚡ Action Required</h2>
              <p style="color: #495057; margin: 0 0 15px 0;">Please review this warranty registration and approve or reject it in the admin dashboard.</p>
              <div style="margin-top: 20px;">
                <a href="https://ccgvldazqlyvptschjkl.supabase.co/dashboard" 
                   style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Review in Admin Dashboard
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                This is an automated notification from Mango Appliances Warranty Management System
              </p>
            </div>

          </div>
        </div>
      `,
    });

    console.log("Warranty notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Warranty notification sent successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-warranty-notification function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);