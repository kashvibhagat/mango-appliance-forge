-- Set REPLICA IDENTITY FULL on orders table for reliable real-time updates
ALTER TABLE public.orders REPLICA IDENTITY FULL;