import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'MNG123456789';
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    // Calculate estimated delivery date (5-7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 6);
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-ok/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-ok" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="text-left">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order ID */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-mono text-lg font-semibold">#{orderId}</p>
              </div>
              <Badge className="bg-ok/10 text-ok border-ok/20">
                Confirmed
              </Badge>
            </div>

            <Separator />

            {/* Delivery Info */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Delivery Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Estimated Delivery</p>
                  <p className="font-medium">{estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Delivery Method</p>
                  <p className="font-medium">Standard Delivery</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* What's Next */}
            <div className="space-y-4">
              <h3 className="font-semibold">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-accent">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email confirmation within a few minutes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-accent">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-muted-foreground">
                      We'll prepare your items and get them ready for shipping.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-accent">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Shipment & Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Track your package and receive updates via SMS/email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
          <Button asChild className="btn-hero">
            <Link to="/track-order" className="flex items-center gap-2">
              Track Your Order
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Continue Shopping */}
        <div className="pt-8 border-t border-border">
          <p className="text-muted-foreground mb-4">
            Need more cooling solutions?
          </p>
          <Button variant="outline" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            Questions about your order? Contact our support team at{' '}
            <a href="tel:+918000000000" className="text-accent hover:underline">
              +91 80000 00000
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;