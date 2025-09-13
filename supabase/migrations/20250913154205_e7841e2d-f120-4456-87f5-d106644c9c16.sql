-- Create complaints table
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  complaint_number TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved', 'closed')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  product_model TEXT NOT NULL,
  order_number TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  attachment_url TEXT,
  admin_response TEXT,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can create their own complaints" 
ON public.complaints 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own complaints" 
ON public.complaints 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own complaints" 
ON public.complaints 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all complaints" 
ON public.complaints 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to generate complaint number
CREATE OR REPLACE FUNCTION public.generate_complaint_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.complaint_number := 'MNG-COMP-' || LPAD((SELECT COALESCE(MAX(SUBSTRING(complaint_number FROM 10)::INTEGER), 0) + 1 FROM public.complaints WHERE complaint_number LIKE 'MNG-COMP-%')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for complaint number generation
CREATE TRIGGER generate_complaint_number_trigger
  BEFORE INSERT ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_complaint_number();

-- Create trigger for updated_at
CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for complaint attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('complaint-attachments', 'complaint-attachments', false);

-- Create storage policies for complaint attachments
CREATE POLICY "Users can upload complaint attachments" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'complaint-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own complaint attachments" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'complaint-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admin can view all complaint attachments" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'complaint-attachments' AND has_role(auth.uid(), 'admin'::app_role));