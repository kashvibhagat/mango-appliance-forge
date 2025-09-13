import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderNotificationRequest {
  orderId: string;
  orderNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, orderNumber }: OrderNotificationRequest = await req.json();

    console.log(`Processing admin notification for order: ${orderNumber}`);

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch complete order details
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      throw new Error(`Failed to fetch order details: ${orderError.message}`);
    }

    // Fetch customer profile separately
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('first_name, last_name, phone')
      .eq('user_id', orderData.user_id)
      .single();

    console.log('Profile data:', profileData, 'Profile error:', profileError);

    // Format order items for email
    const formatOrderItems = (items: any[]) => {
      if (!Array.isArray(items)) return 'Items not available';
      
      return items.map(item => 
        `• ${item.name} - Quantity: ${item.quantity} - ₹${item.price}`
      ).join('\n');
    };

    // Format shipping address
    const formatAddress = (address: any) => {
      if (!address) return 'Address not provided';
      
      return `${address.name || 'Name not provided'}
${address.address || 'Address not provided'}
${address.city || ''}, ${address.state || ''} ${address.pincode || ''}
Email: ${address.email || 'Not provided'}
Phone: ${address.phone || 'Not provided'}`;
    };

    const customerName = profileData 
      ? `${profileData.first_name} ${profileData.last_name}`
      : (orderData.shipping_address?.name || 'Customer');

    const emailResponse = await resend.emails.send({
      from: "Mango Appliances <orders@mangoappliances.com>",
      to: ["DoNotReply@mangoappliances.com"],
      subject: `🔔 New Order Alert - ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e9ecef;">
              <h1 style="color: #e74c3c; margin: 0; font-size: 28px;">🚨 NEW ORDER RECEIVED</h1>
              <p style="color: #6c757d; margin: 10px 0 0 0; font-size: 16px;">Order #${orderNumber}</p>
            </div>

            <!-- Order Summary -->
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
              <h2 style="color: #856404; margin: 0 0 15px 0; font-size: 20px;">📋 Order Summary</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <strong style="color: #495057;">Order ID:</strong><br>
                  <span style="color: #6c757d;">${orderData.id}</span>
                </div>
                <div>
                  <strong style="color: #495057;">Order Date:</strong><br>
                  <span style="color: #6c757d;">${new Date(orderData.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <strong style="color: #495057;">Status:</strong><br>
                  <span style="background-color: #ffc107; color: #856404; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${orderData.status.toUpperCase()}</span>
                </div>
                <div>
                  <strong style="color: #495057;">Total Amount:</strong><br>
                  <span style="color: #28a745; font-weight: bold; font-size: 18px;">₹${orderData.total_amount}</span>
                </div>
              </div>
            </div>

            <!-- Customer Information -->
            <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #28a745;">
              <h2 style="color: #155724; margin: 0 0 15px 0; font-size: 20px;">👤 Customer Information</h2>
              <div style="color: #495057;">
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Phone:</strong> ${profileData?.phone || orderData.shipping_address?.phone || 'Not provided'}</p>
                <p><strong>User ID:</strong> ${orderData.user_id}</p>
              </div>
            </div>

            <!-- Shipping Information -->
            <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #17a2b8;">
              <h2 style="color: #0c5460; margin: 0 0 15px 0; font-size: 20px;">📍 Shipping Information</h2>
              <div style="color: #495057;">
                <strong>Delivery Address:</strong><br>
                <pre style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; white-space: pre-wrap; font-family: inherit;">${formatAddress(orderData.shipping_address)}</pre>
                <p><strong>Shipping Cost:</strong> ₹${orderData.shipping_cost || 0} ${orderData.is_free_shipping ? '(FREE SHIPPING)' : ''}</p>
              </div>
            </div>

            <!-- Order Items -->
            <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #dc3545;">
              <h2 style="color: #721c24; margin: 0 0 15px 0; font-size: 20px;">📦 Order Items</h2>
              <div style="background-color: #fff; padding: 15px; border-radius: 4px;">
                <pre style="color: #495057; white-space: pre-wrap; font-family: inherit; margin: 0;">${formatOrderItems(orderData.items)}</pre>
              </div>
            </div>

            <!-- Action Required -->
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; text-align: center; border: 2px solid #ffc107;">
              <h2 style="color: #856404; margin: 0 0 15px 0; font-size: 20px;">⚡ Action Required</h2>
              <p style="color: #495057; margin: 0 0 15px 0;">Please review this order and update its status in the admin dashboard.</p>
              <div style="margin-top: 20px;">
                <a href="https://ccgvldazqlyvptschjkl.supabase.co/dashboard" 
                   style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  View in Admin Dashboard
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                This is an automated notification from Mango Appliances Order Management System
              </p>
            </div>

          </div>
        </div>
      `,
    });

    console.log("Admin notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Admin notification sent successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-admin-order-notification function:", error);
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