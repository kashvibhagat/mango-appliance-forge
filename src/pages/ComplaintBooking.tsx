import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const complaintSchema = z.object({
  category: z.string().min(1, 'Please select a category'),
  orderNumber: z.string().optional(),
  productModel: z.string().min(1, 'Product model is required'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  customerName: z.string().min(2, 'Name is required'),
  customerPhone: z.string().min(10, 'Valid phone number is required'),
  customerEmail: z.string().email('Valid email is required'),
});

type ComplaintFormData = z.infer<typeof complaintSchema>;

const ComplaintBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const form = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      category: '',
      orderNumber: '',
      productModel: '',
      subject: '',
      description: '',
      customerName: user?.user_metadata?.first_name || '',
      customerPhone: user?.user_metadata?.phone || '',
      customerEmail: user?.email || '',
    },
  });

  const categories = [
    { value: 'product-defect', label: 'Product Defect' },
    { value: 'performance-issue', label: 'Performance Issue' },
    { value: 'installation', label: 'Installation Problem' },
    { value: 'warranty-claim', label: 'Warranty Claim' },
    { value: 'spare-parts', label: 'Spare Parts Issue' },
    { value: 'delivery', label: 'Delivery Issue' },
    { value: 'other', label: 'Other' },
  ];

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setAttachedFile(file);
    }
  };

  const onSubmit = async (data: ComplaintFormData) => {
    setIsSubmitting(true);

    try {
      let attachmentUrl = null;

      // Upload attachment if exists
      if (attachedFile) {
        const fileExt = attachedFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('complaint-attachments')
          .upload(fileName, attachedFile);

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from('complaint-attachments')
            .getPublicUrl(uploadData.path);
          attachmentUrl = urlData.publicUrl;
        }
      }

      // Submit complaint
      const { error } = await supabase
        .from('complaints')
        .insert({
          user_id: user?.id,
          category: data.category,
          order_number: data.orderNumber || null,
          product_model: data.productModel,
          subject: data.subject,
          description: data.description,
          customer_name: data.customerName,
          customer_phone: data.customerPhone,
          customer_email: data.customerEmail,
          attachment_url: attachmentUrl,
          status: 'pending',
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Complaint submitted successfully",
        description: "We'll review your complaint and get back to you within 24-48 hours.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast({
        title: "Error submitting complaint",
        description: "Please try again or contact support directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">File a Complaint</h1>
            <p className="text-muted-foreground mt-1">
              We're here to help resolve any issues with your Mango products
            </p>
          </div>
        </div>

        {/* Complaint Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Complaint Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complaint Category *</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select complaint category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Order Number */}
                  <FormField
                    control={form.control}
                    name="orderNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="MNG-ORD-XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Product Model */}
                  <FormField
                    control={form.control}
                    name="productModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Model *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., PUNCH 60i, ARCTIC PC-20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subject */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of the issue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide detailed information about your issue, including when it started, what you've tried, and any error messages..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Customer Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* File Attachment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Attach Photos (Optional)</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload photos of the issue (max 5MB, JPG/PNG)
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileAttachment}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button type="button" variant="outline" asChild>
                        <span className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </span>
                      </Button>
                    </label>
                    {attachedFile && (
                      <p className="text-sm text-foreground mt-2">
                        Attached: {attachedFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting Complaint...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Submit Complaint
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Support Info */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground">
                Call our support team at <strong>+91 98765 43210</strong> or email{' '}
                <strong>support@mangoappliances.com</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Support hours: Monday to Saturday, 9 AM to 6 PM
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintBooking;