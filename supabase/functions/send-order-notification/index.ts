import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  user_id?: string;
  customer_name?: string;
  customer_email?: string;
  items: any[];
  shipping_address?: any;
  profiles?: {
    first_name: string;
    last_name: string;
    phone: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order }: { order: OrderData } = await req.json();
    
    // Prepare email content
    const customerName = order.customer_name || 
      (order.profiles ? `${order.profiles.first_name} ${order.profiles.last_name}` : 'Customer');
    
    const customerEmail = order.customer_email || 'Not provided';
    const customerPhone = order.profiles?.phone || 'Not provided';
    
    const orderDate = new Date(order.created_at).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });

    const itemsList = Array.isArray(order.items) 
      ? order.items.map(item => `• ${item.name || 'Product'} (Qty: ${item.quantity || 1})`).join('<br>')
      : 'Order items information available in dashboard';

    const address = order.shipping_address 
      ? `${order.shipping_address.address_line_1 || ''}, ${order.shipping_address.city || ''}, ${order.shipping_address.state || ''} - ${order.shipping_address.postal_code || ''}`
      : 'Address information available in dashboard';

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .order-info { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
          .footer { text-align: center; padding: 10px; font-size: 12px; color: #666; }
          .urgent { color: #e74c3c; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 New Order Alert - Mango Appliances</h1>
          </div>
          
          <div class="content">
            <p class="urgent">URGENT: New order requires immediate attention!</p>
            
            <div class="order-info">
              <h3>📋 Order Details</h3>
              <p><strong>Order ID:</strong> ${order.order_number}</p>
              <p><strong>Customer Name:</strong> ${customerName}</p>
              <p><strong>Customer Email:</strong> ${customerEmail}</p>
              <p><strong>Phone:</strong> ${customerPhone}</p>
              <p><strong>Order Date/Time:</strong> ${orderDate}</p>
              <p><strong>Total Amount:</strong> ₹${order.total_amount.toLocaleString('en-IN')}</p>
              <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
            </div>

            <div class="order-info">
              <h3>📍 Shipping Address</h3>
              <p>${address || 'Pickup or address will be provided later'}</p>
            </div>

            <div class="order-info">
              <h3>📦 Order Items</h3>
              <p>${itemsList}</p>
            </div>

            <div class="order-info">
              <h3>⚡ Action Required</h3>
              <p>• Process payment verification</p>
              <p>• Prepare items for shipment</p>
              <p>• Update customer on order status</p>
              <p>• Check inventory availability</p>
            </div>
          </div>

          <div class="footer">
            <p>This is an automated notification from Mango Appliances Admin System</p>
            <p>Login to the admin dashboard for full order management</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Use Resend to send email
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mango Appliances Admin <noreply@resend.dev>',
        to: ['DoNotReply@mangoappliances.com'],
        subject: `🚨 URGENT: New Order #${order.order_number} - ₹${order.total_amount.toLocaleString('en-IN')}`,
        html: emailContent,
      }),
    });

    const emailResult = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error('Failed to send email:', emailResult);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: emailResult }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Order notification sent successfully:', emailResult);
    
    return new Response(
      JSON.stringify({ success: true, emailId: emailResult.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in send-order-notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});