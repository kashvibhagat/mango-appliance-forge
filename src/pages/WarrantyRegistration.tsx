import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { QrCode, Upload, Check, AlertCircle } from 'lucide-react';

const WarrantyRegistration = () => {
  const [formData, setFormData] = useState({
    serialNumber: '',
    productModel: '',
    dateOfPurchase: '',
    customerName: '',
    customerMobile: '',
    billFile: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, billFile: file }));
    }
  };

  const handleSendOTP = async () => {
    if (!formData.customerMobile) {
      toast({
        title: 'Error',
        description: 'Please enter mobile number',
        variant: 'destructive'
      });
      return;
    }
    
    // Mock OTP sending - in real implementation, use SMS service
    setOtpSent(true);
    toast({
      title: 'OTP Sent',
      description: `OTP sent to ${formData.customerMobile}`,
    });
  };

  const handleVerifyOTP = () => {
    if (otp === 'test123' || otp.length === 6) {
      setStep(3);
      toast({
        title: 'OTP Verified',
        description: 'Mobile number verified successfully',
      });
    } else {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter valid OTP',
        variant: 'destructive'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in to register warranty',
        variant: 'destructive'
      });
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      let billUploadUrl = '';
      
      // Upload bill file if provided
      if (formData.billFile) {
        const fileExt = formData.billFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('warranty-bills')
          .upload(fileName, formData.billFile);
        
        if (error) throw error;
        billUploadUrl = data.path;
      }

      // Insert warranty registration
      const { error } = await supabase
        .from('warranty_registrations')
        .insert({
          user_id: user.id,
          serial_number: formData.serialNumber,
          product_model: formData.productModel,
          date_of_purchase: formData.dateOfPurchase,
          bill_upload_url: billUploadUrl,
          customer_name: formData.customerName,
          customer_mobile: formData.customerMobile,
          otp_verified: true,
          status: 'pending'
        });

      if (error) throw error;

      // Create notification for admin
      await supabase
        .from('notifications')
        .insert({
          type: 'warranty_registration',
          title: 'New Warranty Registration',
          message: `New warranty registration for ${formData.productModel} by ${formData.customerName}`,
          data: {
            serialNumber: formData.serialNumber,
            productModel: formData.productModel,
            customerName: formData.customerName
          },
          priority: 'normal'
        });

      toast({
        title: 'Success',
        description: 'Warranty registration submitted successfully',
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to register warranty',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="serialNumber">Serial Number / Barcode</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="serialNumber"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    placeholder="Enter or scan serial number"
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="productModel">Product Model</Label>
                <Input
                  id="productModel"
                  name="productModel"
                  value={formData.productModel}
                  onChange={handleInputChange}
                  placeholder="e.g., Cool Master i, Arctic TC 25"
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfPurchase">Date of Purchase</Label>
                <Input
                  id="dateOfPurchase"
                  name="dateOfPurchase"
                  type="date"
                  value={formData.dateOfPurchase}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="billFile">Bill Upload</Label>
                <div className="mt-1">
                  <Input
                    id="billFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload purchase bill (JPG, PNG, PDF)
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setStep(2)} 
              className="w-full"
              disabled={!formData.serialNumber || !formData.productModel || !formData.dateOfPurchase}
            >
              Next: Customer Details
            </Button>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Full name as per bill"
                />
              </div>
              
              <div>
                <Label htmlFor="customerMobile">Mobile Number</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="customerMobile"
                    name="customerMobile"
                    value={formData.customerMobile}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleSendOTP}
                    disabled={!formData.customerMobile || otpSent}
                  >
                    {otpSent ? 'OTP Sent' : 'Send OTP'}
                  </Button>
                </div>
              </div>
              
              {otpSent && (
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit OTP"
                      className="flex-1"
                    />
                    <Button onClick={handleVerifyOTP}>
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    For demo, use: test123
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep(2)} 
                className="flex-1"
                disabled={!formData.customerName || !formData.customerMobile || !otpSent}
              >
                Next: Review
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Review Your Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Serial Number:</span>
                  <p className="font-medium">{formData.serialNumber}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Product Model:</span>
                  <p className="font-medium">{formData.productModel}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Purchase Date:</span>
                  <p className="font-medium">{formData.dateOfPurchase}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Customer Name:</span>
                  <p className="font-medium">{formData.customerName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Mobile:</span>
                  <p className="font-medium">{formData.customerMobile} ✓</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Bill:</span>
                  <p className="font-medium">{formData.billFile ? formData.billFile.name : 'Not uploaded'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">What happens next?</p>
                  <ul className="mt-2 space-y-1 text-blue-700">
                    <li>• Your warranty registration will be reviewed by our team</li>
                    <li>• You'll receive confirmation within 24-48 hours</li>
                    <li>• Warranty coverage starts from the purchase date</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </div>
          </form>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Warranty Registration</CardTitle>
          <CardDescription>
            Register your Mango appliance for warranty coverage and support
          </CardDescription>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > stepNum ? <Check className="h-4 w-4" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-8 h-px ${
                      step > stepNum ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default WarrantyRegistration;