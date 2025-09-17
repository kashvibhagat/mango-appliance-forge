import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Users, 
  Truck, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calculator,
  Gift,
  Shield,
  Settings
} from 'lucide-react';

const BulkOrders = () => {
  const benefits = [
    {
      icon: Calculator,
      title: "Volume Discounts",
      description: "Up to 25% discount on bulk purchases based on quantity"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary shipping and handling for all bulk orders"
    },
    {
      icon: Settings,
      title: "Custom Solutions",
      description: "Tailored products and specifications for your requirements"
    },
    {
      icon: Clock,
      title: "Priority Delivery",
      description: "Expedited processing and delivery timelines"
    },
    {
      icon: Shield,
      title: "Extended Warranty",
      description: "Additional warranty coverage for institutional purchases"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account manager for ongoing support"
    }
  ];

  const customerTypes = [
    {
      type: "Corporates",
      description: "Office buildings, IT parks, corporate campuses",
      minQuantity: "50+ units",
      discount: "15-20%"
    },
    {
      type: "Educational Institutions",
      description: "Schools, colleges, universities, training centers",
      minQuantity: "25+ units", 
      discount: "20-25%"
    },
    {
      type: "Healthcare",
      description: "Hospitals, clinics, medical facilities",
      minQuantity: "30+ units",
      discount: "18-22%"
    },
    {
      type: "Government",
      description: "Government offices, public institutions",
      minQuantity: "100+ units",
      discount: "20-25%"
    },
    {
      type: "Industrial",
      description: "Factories, warehouses, manufacturing units",
      minQuantity: "75+ units",
      discount: "15-20%"
    },
    {
      type: "Hospitality",
      description: "Hotels, restaurants, event venues",
      minQuantity: "40+ units",
      discount: "18-23%"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Submit Inquiry",
      description: "Fill out our bulk order form with your requirements"
    },
    {
      step: 2,
      title: "Requirement Analysis", 
      description: "Our team analyzes your needs and site requirements"
    },
    {
      step: 3,
      title: "Custom Quotation",
      description: "Receive detailed quotation with pricing and specifications"
    },
    {
      step: 4,
      title: "Site Survey",
      description: "Technical team visits for installation planning (if required)"
    },
    {
      step: 5,
      title: "Order Confirmation",
      description: "Finalize order with payment terms and delivery schedule"
    },
    {
      step: 6,
      title: "Manufacturing & Delivery",
      description: "Products manufactured and delivered as per schedule"
    },
    {
      step: 7,
      title: "Installation & Support",
      description: "Professional installation and ongoing support"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Bulk Orders</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Special pricing and services for bulk purchases. Perfect for corporates, institutions, and large-scale projects.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <benefit.icon className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer Types */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Categories & Discounts</CardTitle>
            <CardDescription>
              Special pricing tiers based on customer type and quantity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customerTypes.map((customer, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{customer.type}</h3>
                    <Badge variant="secondary">{customer.discount}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{customer.description}</p>
                  <p className="text-xs text-primary font-medium">Min Order: {customer.minQuantity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Process Flow */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Order Process</CardTitle>
            <CardDescription>
              Simple 7-step process from inquiry to installation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {process.map((step, index) => (
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

        {/* Bulk Order Form */}
        <Card>
          <CardHeader>
            <CardTitle>Request Bulk Order Quotation</CardTitle>
            <CardDescription>
              Fill out this form and our team will contact you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Organization Name *</label>
                <Input placeholder="Enter organization name" />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Person *</label>
                <Input placeholder="Enter contact person name" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email Address *</label>
                <Input type="email" placeholder="organization@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number *</label>
                <Input placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Organization Type *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="educational">Educational Institution</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Estimated Quantity *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quantity range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25-50">25-50 units</SelectItem>
                    <SelectItem value="51-100">51-100 units</SelectItem>
                    <SelectItem value="101-250">101-250 units</SelectItem>
                    <SelectItem value="251-500">251-500 units</SelectItem>
                    <SelectItem value="500+">500+ units</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Product Requirements</label>
              <Textarea 
                placeholder="Please specify product types, models, and any special requirements..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Installation Address</label>
              <Textarea 
                placeholder="Enter complete installation address with pin code..."
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Expected Delivery Timeline</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (within 2 weeks)</SelectItem>
                    <SelectItem value="1month">Within 1 month</SelectItem>
                    <SelectItem value="2months">Within 2 months</SelectItem>
                    <SelectItem value="3months">Within 3 months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Budget Range</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upto5">Up to ₹5 Lakhs</SelectItem>
                    <SelectItem value="5-10">₹5 - ₹10 Lakhs</SelectItem>
                    <SelectItem value="10-25">₹10 - ₹25 Lakhs</SelectItem>
                    <SelectItem value="25-50">₹25 - ₹50 Lakhs</SelectItem>
                    <SelectItem value="50+">₹50 Lakhs+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Additional Comments</label>
              <Textarea 
                placeholder="Any additional information or special requests..."
                rows={3}
              />
            </div>

            <Button className="w-full" size="lg">
              Submit Bulk Order Inquiry
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Direct Contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Bulk Sales Manager</h3>
                <p className="text-sm text-muted-foreground">Mr. Rajesh Kumar</p>
                <p className="text-sm text-primary">+91 880 404 8822</p>
              </div>
              <div>
                <h3 className="font-semibold">Corporate Sales</h3>
                <p className="text-sm text-muted-foreground">bulksales@mangoappliances.com</p>
                <p className="text-xs text-muted-foreground">Response within 2 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Our Credentials</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">15+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">1000+ Corporate Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Pan India Service Network</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BulkOrders;