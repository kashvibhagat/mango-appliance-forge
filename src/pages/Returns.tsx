import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RotateCcw, Clock, CheckCircle, XCircle, Package, Phone, AlertTriangle } from 'lucide-react';

const Returns = () => {
  const returnProcess = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Contact our customer service within 7 days",
      icon: Phone
    },
    {
      step: 2,
      title: "Return Approval", 
      description: "We'll verify your request and approve if eligible",
      icon: CheckCircle
    },
    {
      step: 3,
      title: "Product Pickup",
      description: "Our team will schedule pickup from your location",
      icon: Package
    },
    {
      step: 4,
      title: "Quality Check",
      description: "Product inspected for return policy compliance",
      icon: CheckCircle
    },
    {
      step: 5,
      title: "Refund/Exchange",
      description: "Refund processed or replacement dispatched",
      icon: RotateCcw
    }
  ];

  const eligibleConditions = [
    "Product received is damaged or defective",
    "Wrong product delivered",
    "Product doesn't match description",
    "Manufacturing defects discovered"
  ];

  const nonEligibleConditions = [
    "Product used beyond trial period",
    "Damage due to misuse or negligence", 
    "Product modified or repaired by unauthorized service",
    "Missing original packaging and accessories",
    "Return request after 7 days of delivery"
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Returns & Exchanges</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Learn about our return and exchange policy.
          </p>
        </div>

        {/* Policy Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Clock className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>7-Day Return</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Return products within 7 days of delivery for eligible items
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <RotateCcw className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Easy Exchange</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Exchange for different model or size with minimal hassle
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Package className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Free Pickup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We arrange free pickup from your location for returns
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <Card>
          <CardHeader>
            <CardTitle>Return Process</CardTitle>
            <CardDescription>
              Follow these simple steps to return your product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {returnProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <step.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Eligible vs Non-Eligible */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Return Eligible</span>
              </CardTitle>
              <CardDescription>
                Products can be returned in these conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {eligibleConditions.map((condition, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{condition}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <XCircle className="h-5 w-5" />
                <span>Not Eligible</span>
              </CardTitle>
              <CardDescription>
                Products cannot be returned in these conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {nonEligibleConditions.map((condition, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{condition}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Refund Information */}
        <Card>
          <CardHeader>
            <CardTitle>Refund Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Refund Timeline</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Credit/Debit Cards: 5-7 business days</li>
                  <li>• Net Banking: 3-5 business days</li>
                  <li>• Digital Wallets: 2-3 business days</li>
                  <li>• Cash on Delivery: Bank transfer in 7-10 days</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Refund Amount</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Full product price refunded</li>
                  <li>• Shipping charges refunded if product is defective</li>
                  <li>• Gift wrap charges non-refundable</li>
                  <li>• Installation charges refunded if applicable</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exchange Policy */}
        <Card>
          <CardHeader>
            <CardTitle>Exchange Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Exchanges are subject to product availability and price difference may apply for different models.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-sm">Same Model Exchange</h3>
                <p className="text-sm text-muted-foreground">
                  Direct exchange for the same model in case of defects or damage
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Different Model Exchange</h3>
                <p className="text-sm text-muted-foreground">
                  Exchange for different model with price difference adjustment
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Size/Capacity Exchange</h3>
                <p className="text-sm text-muted-foreground">
                  Exchange for different capacity based on your requirement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle>Need Help with Returns?</CardTitle>
            <CardDescription>
              Contact our customer service for return assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Customer Service</h3>
                <p className="text-sm text-muted-foreground">+91 880 404 8811</p>
                <p className="text-xs text-muted-foreground">Mon-Sat: 9 AM - 6 PM</p>
              </div>
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm text-muted-foreground">returns@mangoappliances.com</p>
                <p className="text-xs text-muted-foreground">Response within 24 hours</p>
              </div>
            </div>
            <Button className="w-full md:w-auto">Contact Customer Service</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Returns;