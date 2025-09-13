import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ComplaintConfirmationData {
  complaintNumber: string;
  customerEmail: string;
  customerName: string;
  subject: string;
  category: string;
  productModel: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { complaintNumber, customerEmail, customerName, subject, category, productModel }: ComplaintConfirmationData = await req.json();

    console.log('Sending complaint confirmation email for:', complaintNumber);

    const emailResponse = await resend.emails.send({
      from: "Mango Appliances Support <support@mangoappliances.com>",
      to: [customerEmail],
      subject: `Complaint Received - ${complaintNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Complaint Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FFB000, #F59E0B); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .complaint-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .status-box { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .next-steps { background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📝 Complaint Received</h1>
              <h2>Reference: ${complaintNumber}</h2>
            </div>
            
            <div class="content">
              <p>Dear ${customerName},</p>
              <p>Thank you for reaching out to us. We have received your complaint and our support team is reviewing it.</p>
              
              <div class="complaint-details">
                <h3>🔍 Complaint Details</h3>
                <p><strong>Complaint ID:</strong> ${complaintNumber}</p>
                <p><strong>Category:</strong> ${category.replace('-', ' ').toUpperCase()}</p>
                <p><strong>Product Model:</strong> ${productModel}</p>
                <p><strong>Subject:</strong> ${subject}</p>
              </div>

              <div class="status-box">
                <h3>📊 Current Status: PENDING REVIEW</h3>
                <p>Your complaint has been logged in our system and assigned to our technical support team.</p>
              </div>

              <div class="next-steps">
                <h3>⏰ What Happens Next?</h3>
                <ul>
                  <li>Our technical team will review your complaint within 24 hours</li>
                  <li>We may contact you for additional information if needed</li>
                  <li>You'll receive updates via email as we progress</li>
                  <li>Most complaints are resolved within 48-72 hours</li>
                </ul>
              </div>

              <div style="background: #f0f8ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h3>📋 Track Your Complaint</h3>
                <p>You can track the status of your complaint anytime by visiting our website and using your complaint ID: <strong>${complaintNumber}</strong></p>
              </div>

              <p style="margin-top: 30px;">
                <strong>Need immediate assistance?</strong> Contact our support team:<br>
                📧 support@mangoappliances.com<br>
                📞 +91 98765 43210<br>
                🕒 Mon-Sat, 9 AM - 6 PM
              </p>

              <p>We appreciate your patience and apologize for any inconvenience caused.</p>
            </div>
            
            <div class="footer">
              <p>Best regards,<br><strong>Mango Appliances Support Team</strong></p>
              <p style="font-size: 12px; color: #999;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Complaint confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-complaint-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);