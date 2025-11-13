import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, ShieldCheck } from 'lucide-react';

const WarrantyRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleContactClick = () => {
    window.location.href = 'tel:8320656831';
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access warranty registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Warranty Registration</h1>
        <p className="text-muted-foreground">
          Register your Mango appliance for warranty coverage and support
        </p>
      </div>

      {/* Contact Information Card */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Warranty Registration</CardTitle>
          <CardDescription className="text-base">
            For warranty registration, please contact us
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">Contact Number</span>
            </div>
            
            <a 
              href="tel:8320656831"
              className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors block"
            >
              8320656831
            </a>
            
            <p className="text-sm text-muted-foreground">
              Our warranty team is available to assist you
            </p>
          </div>

          <Button 
            onClick={handleContactClick}
            className="w-full"
            size="lg"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now for Warranty Registration
          </Button>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Note:</strong> Please have your product serial number, model number, and purchase date ready when you call.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Temporarily disabled form notice */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Online warranty registration form is temporarily unavailable</p>
      </div>
    </div>
  );
};

export default WarrantyRegistration;
