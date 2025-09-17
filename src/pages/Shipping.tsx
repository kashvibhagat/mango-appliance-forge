import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, Package, Shield, CheckCircle } from 'lucide-react';

const Shipping = () => {
  const shippingZones = [
    {
      zone: "Metro Cities",
      cities: "Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune",
      duration: "3-5 business days",
      charges: "Free above ₹4999"
    },
    {
      zone: "Tier 1 Cities", 
      cities: "Ahmedabad, Surat, Jaipur, Lucknow, Kanpur, Nagpur, Indore",
      duration: "4-6 business days",
      charges: "Free above ₹4999"
    },
    {
      zone: "Tier 2/3 Cities",
      cities: "All other cities and towns",
      duration: "5-7 business days", 
      charges: "Free above ₹4999"
    },
    {
      zone: "Remote Areas",
      cities: "Rural and remote locations",
      duration: "7-10 business days",
      charges: "Additional charges may apply"
    }
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹4999 across India"
    },
    {
      icon: Package,
      title: "Secure Packaging",
      description: "Weather-resistant packaging for safe delivery"
    },
    {
      icon: MapPin,
      title: "Pan India Coverage",
      description: "We deliver to 25,000+ pin codes"
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Orders processed within 24 hours"
    }
  ];

  const shippingProcess = [
    {
      step: 1,
      title: "Order Confirmation",
      description: "Order confirmed and payment verified"
    },
    {
      step: 2,
      title: "Processing",
      description: "Order packed and prepared for shipment"
    },
    {
      step: 3,
      title: "Shipped",
      description: "Order dispatched with tracking details"
    },
    {
      step: 4,
      title: "Out for Delivery",
      description: "Package out for final delivery"
    },
    {
      step: 5,
      title: "Delivered",
      description: "Order delivered to your address"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Shipping Information</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn about our shipping policies, delivery timelines, and coverage areas across India.
          </p>
        </div>

        {/* Shipping Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <feature.icon className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shipping Zones */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Zones & Timeline</CardTitle>
            <CardDescription>
              Check delivery estimates for your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shippingZones.map((zone, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{zone.zone}</h3>
                      <p className="text-sm text-muted-foreground">{zone.cities}</p>
                    </div>
                    <Badge variant="outline">{zone.duration}</Badge>
                  </div>
                  <p className="text-sm text-primary font-medium">{zone.charges}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Process */}
        <Card>
          <CardHeader>
            <CardTitle>How Shipping Works</CardTitle>
            <CardDescription>
              Track your order through these simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shippingProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Important Shipping Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Free Installation</p>
                  <p className="text-sm text-muted-foreground">
                    Free installation service provided for desert coolers and industrial units
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Damage Protection</p>
                  <p className="text-sm text-muted-foreground">
                    All products are insured against shipping damage
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Order Tracking</p>
                  <p className="text-sm text-muted-foreground">
                    SMS and email notifications with tracking information
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Contact for Queries</p>
                  <p className="text-sm text-muted-foreground">
                    Call +91 880 404 8811 for any shipping related questions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* COD and Payment */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash on Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                COD available for orders up to ₹25,000 in select locations.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Additional COD charges may apply</li>
                <li>• Available in major cities only</li>
                <li>• Subject to verification</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Special shipping arrangements for bulk orders.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Direct factory dispatch</li>
                <li>• Custom delivery scheduling</li>
                <li>• Volume-based discounts on shipping</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Shipping;