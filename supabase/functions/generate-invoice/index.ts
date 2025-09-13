import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InvoiceRequest {
  orderId: string
  isGST: boolean
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { orderId, isGST }: InvoiceRequest = await req.json()

    // Fetch order details
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error('Order not found')
    }

    const invoiceDate = new Date().toLocaleDateString('en-IN')
    const gstDetails = order.shipping_address?.gst_details

    // Generate invoice content
    const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${isGST ? 'GST Invoice' : 'Invoice'} - ${order.order_number}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0066cc; padding-bottom: 20px; }
        .company-info { text-align: center; margin-bottom: 20px; }
        .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .invoice-table th { background-color: #f5f5f5; font-weight: bold; }
        .total-row { background-color: #f9f9f9; font-weight: bold; }
        .gst-section { background-color: #e8f4fd; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>MANGO APPLIANCES</h1>
        <p>Premium Cooling Solutions</p>
        <h2>${isGST ? 'TAX INVOICE (GST)' : 'INVOICE'}</h2>
    </div>

    <div class="company-info">
        <strong>MANGO APPLIANCES</strong><br>
        Manufacturing Unit: Industrial Area, Sector 25<br>
        Delhi - 110020, India<br>
        Phone: +91 80000 00000 | Email: sales@mangoappliances.com<br>
        ${isGST ? 'GSTIN: 07AAAAA0000A1Z5' : ''}
    </div>

    <div class="invoice-details">
        <div>
            <h3>Bill To:</h3>
            <p>
                ${order.shipping_address.name}<br>
                ${order.shipping_address.address}<br>
                ${order.shipping_address.city}, ${order.shipping_address.state} - ${order.shipping_address.pincode}<br>
                Phone: ${order.shipping_address.phone}
            </p>
            ${isGST && gstDetails ? `
            <div class="gst-section">
                <strong>GST Details:</strong><br>
                GST No: ${gstDetails.gstNumber}<br>
                Company: ${gstDetails.companyName}<br>
                Address: ${gstDetails.companyAddress}
            </div>
            ` : ''}
        </div>
        <div style="text-align: right;">
            <h3>Invoice Details:</h3>
            <p>
                <strong>Invoice No:</strong> ${order.order_number}<br>
                <strong>Date:</strong> ${invoiceDate}<br>
                <strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString('en-IN')}
            </p>
        </div>
    </div>

    <table class="invoice-table">
        <thead>
            <tr>
                <th>S.No.</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Rate (₹)</th>
                <th>Amount (₹)</th>
            </tr>
        </thead>
        <tbody>
            ${order.items.map((item: any, index: number) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toLocaleString()}</td>
                <td>₹${item.total.toLocaleString()}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>

    <div style="text-align: right; margin-bottom: 20px;">
        <table style="margin-left: auto; border-collapse: collapse;">
            <tr>
                <td style="padding: 5px 10px; border-top: 1px solid #ddd;"><strong>Subtotal:</strong></td>
                <td style="padding: 5px 10px; border-top: 1px solid #ddd;">₹${(order.total_amount - order.shipping_cost - (order.total_amount - order.shipping_cost) * 0.18).toLocaleString()}</td>
            </tr>
            ${order.shipping_cost > 0 ? `
            <tr>
                <td style="padding: 5px 10px;"><strong>Shipping:</strong></td>
                <td style="padding: 5px 10px;">₹${order.shipping_cost.toLocaleString()}</td>
            </tr>
            ` : ''}
            ${isGST ? `
            <tr>
                <td style="padding: 5px 10px;"><strong>CGST (9%):</strong></td>
                <td style="padding: 5px 10px;">₹${Math.round((order.total_amount - order.shipping_cost) * 0.09).toLocaleString()}</td>
            </tr>
            <tr>
                <td style="padding: 5px 10px;"><strong>SGST (9%):</strong></td>
                <td style="padding: 5px 10px;">₹${Math.round((order.total_amount - order.shipping_cost) * 0.09).toLocaleString()}</td>
            </tr>
            ` : `
            <tr>
                <td style="padding: 5px 10px;"><strong>GST (18%):</strong></td>
                <td style="padding: 5px 10px;">₹${Math.round((order.total_amount - order.shipping_cost) * 0.18).toLocaleString()}</td>
            </tr>
            `}
            <tr class="total-row">
                <td style="padding: 10px; border-top: 2px solid #333; font-size: 16px;"><strong>Total Amount:</strong></td>
                <td style="padding: 10px; border-top: 2px solid #333; font-size: 16px;"><strong>₹${order.total_amount.toLocaleString()}</strong></td>
            </tr>
        </table>
    </div>

    <div class="footer">
        <p><strong>Terms & Conditions:</strong></p>
        <p>• Payment due within 30 days of invoice date<br>
        • Warranty terms apply as per product documentation<br>
        • For support, contact us at support@mangoappliances.com</p>
        
        <p style="margin-top: 20px;">
            <strong>Thank you for choosing Mango Appliances!</strong><br>
            This is a computer-generated invoice.
        </p>
    </div>
</body>
</html>
    `

    return new Response(invoiceHTML, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=UTF-8',
        'Content-Disposition': `attachment; filename="${isGST ? 'GST-Invoice' : 'Invoice'}-${order.order_number}.html"`
      },
    })

  } catch (error) {
    console.error('Error generating invoice:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})