import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationData {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: any[];
  totalAmount: number;
  shippingAddress: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderNumber, customerEmail, customerName, items, totalAmount, shippingAddress }: OrderConfirmationData = await req.json();

    console.log('Sending order confirmation email for order:', orderNumber);

    const itemsHtml = items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px 0;">${item.name}</td>
        <td style="padding: 8px 0; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px 0; text-align: right;">₹${item.price.toLocaleString()}</td>
        <td style="padding: 8px 0; text-align: right;">₹${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('');

    const emailResponse = await resend.emails.send({
      from: "Mango Appliances <orders@mangoappliances.com>",
      to: [customerEmail],
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FFB000, #F59E0B); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .table th { background: #f5f5f5; padding: 12px; text-align: left; border-bottom: 2px solid #ddd; }
            .table td { padding: 8px 0; }
            .total { font-size: 18px; font-weight: bold; color: #FFB000; text-align: right; margin-top: 15px; }
            .address { background: #f0f8ff; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Order Confirmed!</h1>
              <h2>Order #${orderNumber}</h2>
            </div>
            
            <div class="content">
              <p>Hi ${customerName},</p>
              <p>Thank you for your order! We're excited to get your Mango products delivered to you.</p>
              
              <div class="order-details">
                <h3>📦 Order Details</h3>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th style="text-align: center;">Qty</th>
                      <th style="text-align: right;">Price</th>
                      <th style="text-align: right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                <div class="total">Total: ₹${totalAmount.toLocaleString()}</div>
              </div>

              <div class="address">
                <h3>🚚 Delivery Address</h3>
                <p><strong>${shippingAddress.firstName} ${shippingAddress.lastName}</strong></p>
                <p>${shippingAddress.addressLine1}</p>
                ${shippingAddress.addressLine2 ? `<p>${shippingAddress.addressLine2}</p>` : ''}
                <p>${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}</p>
                <p>📞 ${shippingAddress.phone}</p>
              </div>

              <div style="background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h3>⏰ What's Next?</h3>
                <ul>
                  <li>We'll process your order within 24 hours</li>
                  <li>You'll receive tracking details once shipped</li>
                  <li>Expected delivery: 3-7 business days</li>
                </ul>
              </div>

              <p style="margin-top: 30px;">
                <strong>Need help?</strong> Contact our support team:<br>
                📧 support@mangoappliances.com<br>
                📞 +91 98765 43210<br>
                🕒 Mon-Sat, 9 AM - 6 PM
              </p>
            </div>
            
            <div class="footer">
              <p>Thank you for choosing Mango Appliances!</p>
              <p style="font-size: 12px; color: #999;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Order confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
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