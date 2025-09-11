import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Truck, RotateCcw, FileText, Phone, CheckCircle } from 'lucide-react';

interface ProductPoliciesSectionProps {
  product: {
    name: string;
    price: number;
    warranty: string;
  };
}

const ProductPoliciesSection = ({ product }: ProductPoliciesSectionProps) => {
  const policies = [
    {
      icon: RotateCcw,
      title: 'Return & Replacement Policy',
      items: [
        'If damage occurs due to transit → Replacement provided (no return required)',
        'If product is not working → Options for replacement or repair available',
        'Contact support within 7 days of delivery for assistance',
        'Original packaging and accessories must be included'
      ]
    },
    {
      icon: Shield,
      title: 'Warranty Coverage',
      items: [
        `${product.warranty} comprehensive warranty included`,
        'Manufacturing defects covered under warranty',
        'Motor and pump warranty as per standard terms',
        'Pan India service network available'
      ]
    },
    {
      icon: FileText,
      title: 'GST & Documentation',
      items: [
        'GST invoice provided for all purchases',
        'GST claims can be made with proper documentation',
        'Purchase receipt required for warranty claims',
        'Digital invoice sent via email'
      ]
    },
    {
      icon: Truck,
      title: 'Shipping Information',
      items: [
        'Free shipping on orders above ₹4999',
        'Standard delivery: 3-7 business days',
        'Express delivery available in metro cities',
        'Real-time tracking provided'
      ]
    }
  ];

  const supportOptions = [
    { label: 'Customer Care', value: '+91 880 404 8811', icon: Phone },
    { label: 'Email Support', value: 'support@mangoappliances.com', icon: FileText },
    { label: 'Service Centers', value: 'Pan India Network', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Product Information & Policies
          </CardTitle>
          <CardDescription>
            Important information about returns, warranty, and customer support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">{policy.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {policy.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Details & Issue Handling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="font-medium">Product Price</span>
              <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Free Shipping Eligibility</h4>
                <div className="flex items-center gap-2">
                  {product.price >= 4999 ? (
                    <>
                      <Badge className="bg-green-100 text-green-800">
                        ✓ Free Shipping Eligible
                      </Badge>
                      <span className="text-sm text-muted-foreground">No delivery charges</span>
                    </>
                  ) : (
                    <>
                      <Badge variant="secondary">
                        Shipping charges apply
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ₹{(4999 - product.price).toLocaleString()} more for free shipping
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">GST Information</h4>
                <p className="text-sm text-muted-foreground">
                  GST included in price. Valid invoice provided for claims.
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Malfunctioning Product Handling</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm mb-2">Option 1: Replacement</h5>
                  <p className="text-sm text-muted-foreground">
                    Get a brand new unit delivered to your location
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm mb-2">Option 2: Repair</h5>
                  <p className="text-sm text-muted-foreground">
                    Professional repair service at your doorstep
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Support</CardTitle>
          <CardDescription>
            Get help when you need it with our comprehensive support options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <h4 className="font-medium text-sm mb-1">{option.label}</h4>
                  <p className="text-sm text-muted-foreground">{option.value}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPoliciesSection;