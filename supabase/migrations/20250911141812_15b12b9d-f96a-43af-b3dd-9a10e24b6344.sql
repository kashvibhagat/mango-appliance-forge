-- Create notifications table for admin dashboard
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'new_order', 'warranty_registration', 'shipment_update', 'complaint', 'service_request'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB, -- Additional data specific to notification type
  is_read BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ -- Optional expiration date
);

-- Create shipment_details table for order tracking
CREATE TABLE public.shipment_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  vendor_name TEXT NOT NULL, -- e.g., 'Blue Dart', 'DTDC', etc.
  pod_number TEXT, -- Proof of Delivery number
  tracking_number TEXT,
  tracking_link TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'shipped', 'in_transit', 'delivered', 'failed'
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create warranty_registrations table
CREATE TABLE public.warranty_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  serial_number TEXT NOT NULL,
  product_model TEXT NOT NULL,
  date_of_purchase DATE NOT NULL,
  bill_upload_url TEXT,
  customer_name TEXT NOT NULL,
  customer_mobile TEXT NOT NULL,
  otp_verified BOOLEAN DEFAULT false,
  admin_approved BOOLEAN DEFAULT false,
  admin_notes TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'approved', 'rejected'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create shipping_rules table for free shipping logic
CREATE TABLE public.shipping_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  min_order_amount DECIMAL(10,2), -- minimum order amount for free shipping
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default free shipping rule
INSERT INTO public.shipping_rules (name, min_order_amount, shipping_cost, is_active)
VALUES ('Free Shipping Above ₹4999', 4999.00, 0.00, true);

-- Update orders table to include shipping information
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_cost DECIMAL(10,2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS is_free_shipping BOOLEAN DEFAULT false;

-- Enable RLS on new tables
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipment_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warranty_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_rules ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications (admin only for now, will expand later)
CREATE POLICY "Admin can manage notifications" ON public.notifications
  FOR ALL USING (true); -- Will restrict to admin users later

-- Create policies for shipment_details
CREATE POLICY "Users can view their own shipment details" ON public.shipment_details
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = shipment_details.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can manage shipment details" ON public.shipment_details
  FOR ALL USING (true); -- Will restrict to admin users later

-- Create policies for warranty_registrations
CREATE POLICY "Users can view their own warranty registrations" ON public.warranty_registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own warranty registrations" ON public.warranty_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own warranty registrations" ON public.warranty_registrations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage warranty registrations" ON public.warranty_registrations
  FOR ALL USING (true); -- Will restrict to admin users later

-- Create policies for shipping_rules (read-only for users)
CREATE POLICY "Everyone can view active shipping rules" ON public.shipping_rules
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage shipping rules" ON public.shipping_rules
  FOR ALL USING (true); -- Will restrict to admin users later

-- Create function to update updated_at timestamp
CREATE TRIGGER update_shipment_details_updated_at
  BEFORE UPDATE ON public.shipment_details
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_warranty_registrations_updated_at
  BEFORE UPDATE ON public.warranty_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();