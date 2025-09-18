import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client with environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface OrderData {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  items: any[];
  shipping_address: any;
  profiles?: {
    first_name: string;
    last_name: string;
    phone: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order }: { order: OrderData } = await req.json();
    console.log("Processing order notification for:", order.order_number);

    // Format order date
    const orderDate = new Date(order.created_at).toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });

    // Format customer name
    const customerName = order.customer_name || 
      (order.profiles ? `${order.profiles.first_name} ${order.profiles.last_name}` : "Customer");

    // Format shipping address
    let shippingDetails = "Address not provided";
    if (order.shipping_address) {
      const addr = order.shipping_address;
      shippingDetails = `
        <strong>Name:</strong> ${addr.first_name || ''} ${addr.last_name || ''}<br>
        <strong>Address:</strong> ${addr.address_line_1 || ''}<br>
        ${addr.address_line_2 ? `${addr.address_line_2}<br>` : ''}
        ${addr.city || ''}, ${addr.state || ''} - ${addr.postal_code || ''}<br>
        <strong>Phone:</strong> ${addr.phone || order.profiles?.phone || 'Not provided'}
      `;
    }

    // Format order items
    let itemsList = "Order items information available in dashboard";
    if (Array.isArray(order.items) && order.items.length > 0) {
      itemsList = order.items
        .map((item, index) => `
          <strong>${index + 1}. Item Name:</strong> ${item.name || "Product"}<br>
          &nbsp;&nbsp;&nbsp;<strong>Quantity:</strong> ${item.quantity || 1}<br>
          &nbsp;&nbsp;&nbsp;<strong>Price:</strong> ₹${(item.price || 0).toLocaleString("en-IN")}<br>
        `)
        .join("<br>");
    }

    // Create email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
          .section h3 { margin-top: 0; color: #667eea; font-size: 18px; }
          .highlight { background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 10px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .action-required { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Order Confirmation - Order ID: ${order.order_number}</h1>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>📋 Order Details</h3>
            <p><strong>Order ID:</strong> ${order.order_number}</p>
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Customer Phone:</strong> ${order.profiles?.phone || 'Not provided'}</p>
            <p><strong>Order Date:</strong> ${orderDate}</p>
            <p><strong>Order Amount:</strong> ₹${order.total_amount.toLocaleString("en-IN")}</p>
            <p><strong>Order Status:</strong> ${order.status.toUpperCase()}</p>
          </div>

          <div class="section">
            <h3>📍 Shipping Address</h3>
            <div>${shippingDetails}</div>
          </div>

          <div class="section">
            <h3>📦 Order Items</h3>
            <div>${itemsList}</div>
          </div>

          <div class="action-required">
            <h3>⚡ Action Required</h3>
            <p>• Process payment verification</p>
            <p>• Prepare items for shipment</p>
            <p>• Update customer on order status</p>
            <p>• Check inventory availability</p>
            <p>• Confirm shipping address details</p>
          </div>
        </div>

        <div class="footer">
          <p>This is an automated notification from Mango Appliances Order Management System</p>
          <p>Login to the admin dashboard for complete order management and processing</p>
        </div>
      </body>
      </html>
    `;

    // Send email notification with Resend API
const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not found in environment variables");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
   body: JSON.stringify({
  from: "Acme <onboarding@resend.dev>", // sandbox sender
  to: ["your_email@gmail.com"],         // replace with your test email
  subject: `New Order Confirmation - Order ID: ${order.order_number}`,
  html: emailContent,
}),

  

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Failed to send email:", emailResult);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: emailResult }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Order notification email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResult.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-order-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});