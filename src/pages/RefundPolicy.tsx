import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Package, Clock, CreditCard, TruckIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Refund & Return Policy</h1>
      <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          We want you to be completely satisfied with your purchase. Please read our refund and return policy 
          carefully to understand your rights and obligations.
        </AlertDescription>
      </Alert>

      <Card className="p-6 space-y-6">
        {/* Return Window */}
        <section>
          <div className="flex items-start gap-3 mb-4">
            <Clock className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-semibold">1. Return Window</h2>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">7-Day Return Policy</h3>
              <p className="text-muted-foreground">
                You can return most products within <strong>7 days</strong> of delivery for a full refund 
                or exchange, provided the product is unused, in original condition, and in original packaging 
                with all accessories and documentation.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-amber-900 dark:text-amber-200">
                Extended 14-Day Period for Defects
              </h3>
              <p className="text-sm text-amber-900 dark:text-amber-200">
                If you receive a defective or damaged product, you have up to <strong>14 days</strong> from 
                delivery to report the issue and initiate a return. We will arrange for pickup and provide 
                a full refund or replacement.
              </p>
            </div>

            <h3 className="text-xl font-medium mt-6 mb-3">1.1 Return Eligibility</h3>
            <p className="text-muted-foreground mb-3">To be eligible for a return, your product must meet the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Product must be unused and in the same condition as received</li>
              <li>Product must be in original packaging with all tags and labels intact</li>
              <li>All accessories, manuals, and warranty cards must be included</li>
              <li>No physical damage or alterations to the product</li>
              <li>Return request must be initiated within the specified return window</li>
              <li>Valid proof of purchase (invoice or order confirmation) must be provided</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">1.2 Non-Returnable Items</h3>
            <p className="text-muted-foreground mb-3">The following items cannot be returned:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Products damaged due to misuse, abuse, or improper installation</li>
              <li>Products with removed or tampered serial numbers</li>
              <li>Consumable parts like cooling pads, filters, and spare parts (unless defective)</li>
              <li>Products purchased during special clearance or liquidation sales (if specified)</li>
              <li>Products that have been installed or used</li>
              <li>Custom-ordered or specially manufactured products</li>
            </ul>
          </div>
        </section>

        <Separator />

        {/* Return Process */}
        <section>
          <div className="flex items-start gap-3 mb-4">
            <Package className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-semibold">2. How to Initiate a Return</h2>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-3">2.1 Return Request Process</h3>
            <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong>Contact Customer Support</strong> within the return window:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Email: DoNotReply@mangoappliances.com</li>
                  <li>Phone: +91 83206 56831 (Mon-Sat, 9 AM - 6 PM IST)</li>
                  <li>WhatsApp: +91 83206 56831</li>
                </ul>
              </li>
              <li>
                <strong>Provide Order Details:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Order number and invoice</li>
                  <li>Product name and serial number</li>
                  <li>Reason for return</li>
                  <li>Photos/videos of the product (if defective or damaged)</li>
                </ul>
              </li>
              <li>
                <strong>Await Return Authorization:</strong> Our team will review your request and provide 
                a Return Merchandise Authorization (RMA) number within 24-48 hours.
              </li>
              <li>
                <strong>Prepare the Package:</strong> Pack the product securely in its original packaging 
                with all accessories, manuals, and documents.
              </li>
              <li>
                <strong>Pickup Arrangement:</strong> We will arrange for product pickup from your address 
                (for defective items) or provide return shipping instructions.
              </li>
            </ol>

            <h3 className="text-xl font-medium mt-6 mb-3">2.2 Return Inspection</h3>
            <p className="text-muted-foreground mb-3">
              Once we receive your returned product, our quality team will inspect it within 3-5 business days to verify:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Product condition matches return eligibility criteria</li>
              <li>All accessories and packaging are included</li>
              <li>Product serial number matches order records</li>
              <li>Reason for return is valid</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              You will be notified via email/SMS once the inspection is complete and your return is approved or rejected.
            </p>
          </div>
        </section>

        <Separator />

        {/* Refund Processing */}
        <section>
          <div className="flex items-start gap-3 mb-4">
            <CreditCard className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-semibold">3. Refund Processing</h2>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-3">3.1 Refund Timeline</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Return Received & Inspected:</span>
                <span className="text-muted-foreground">3-5 business days</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Refund Initiated:</span>
                <span className="text-muted-foreground">1-2 business days after approval</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Credit to Original Payment Method:</span>
                <span className="text-muted-foreground">5-7 business days</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span>Total Processing Time:</span>
                <span className="text-primary">7-14 business days</span>
              </div>
            </div>

            <h3 className="text-xl font-medium mt-6 mb-3">3.2 Refund Methods</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Online Payments (UPI/Cards/Net Banking):</strong> Refund will be credited to the 
                original payment method within 5-7 business days after approval.
              </li>
              <li>
                <strong>Cash on Delivery (COD):</strong> Refund will be processed via bank transfer (NEFT/IMPS) 
                to your provided bank account within 7-10 business days.
              </li>
              <li>
                <strong>Store Credit:</strong> Optional instant store credit for faster processing (can be used 
                for future purchases).
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">3.3 Refund Amount</h3>
            <p className="text-muted-foreground mb-3">Your refund amount will include:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Product price paid</li>
              <li>Applicable taxes (GST)</li>
              <li>Shipping charges (if product is defective or incorrect item was delivered)</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              <strong>Note:</strong> Shipping charges are non-refundable for customer convenience returns 
              (non-defective products returned within 7 days).
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">3.4 Partial Refunds</h3>
            <p className="text-muted-foreground mb-3">
              Partial refunds may be granted in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Product is returned with missing accessories or documents (deduction applies)</li>
              <li>Product shows signs of use beyond inspection (deduction up to 20-30%)</li>
              <li>Original packaging is significantly damaged (deduction applies)</li>
              <li>Product is returned after extended return period with valid reason (discretionary)</li>
            </ul>
          </div>
        </section>

        <Separator />

        {/* Exchange Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Exchange Policy</h2>
          
          <h3 className="text-xl font-medium mb-3">4.1 Product Exchange</h3>
          <p className="text-muted-foreground mb-4">
            You may exchange your product for a different model or variant (subject to availability) within 
            the return window. The exchange process is the same as the return process.
          </p>

          <h3 className="text-xl font-medium mb-3">4.2 Price Difference</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>If the exchange product is more expensive, you must pay the price difference</li>
            <li>If the exchange product is less expensive, the difference will be refunded to you</li>
            <li>Exchange shipping is free for defective products; standard shipping charges apply for convenience exchanges</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">4.3 Defective Product Replacement</h3>
          <p className="text-muted-foreground">
            For defective products within the warranty period, we offer free replacement with the same model. 
            If the model is discontinued or out of stock, we will offer an equivalent or upgraded model at no extra cost.
          </p>
        </section>

        <Separator />

        {/* Shipping Costs */}
        <section>
          <div className="flex items-start gap-3 mb-4">
            <TruckIcon className="h-6 w-6 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-semibold">5. Return Shipping Costs</h2>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-3">5.1 Who Pays for Return Shipping?</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                  We Pay (Free Return Shipping):
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-green-900 dark:text-green-200">
                  <li>Defective or damaged product</li>
                  <li>Wrong product delivered</li>
                  <li>Product doesn't match description</li>
                  <li>Missing parts or accessories</li>
                </ul>
              </Card>

              <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-4">
                <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                  Customer Pays (Convenience Returns):
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-amber-900 dark:text-amber-200">
                  <li>Change of mind</li>
                  <li>Ordered wrong model</li>
                  <li>No longer needed</li>
                  <li>Found better price elsewhere</li>
                </ul>
              </Card>
            </div>

            <h3 className="text-xl font-medium mt-6 mb-3">5.2 Return Shipping Costs</h3>
            <p className="text-muted-foreground mb-3">
              If you are responsible for return shipping costs, charges will vary based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Product size and weight</li>
              <li>Shipping distance from your location to our warehouse</li>
              <li>Chosen courier service</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Estimated return shipping costs: ₹300 - ₹800 for most products. We can arrange pickup through 
              our logistics partner for your convenience.
            </p>
          </div>
        </section>

        <Separator />

        {/* Damaged in Transit */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Damaged or Defective Products</h2>
          
          <h3 className="text-xl font-medium mb-3">6.1 Reporting Damage</h3>
          <p className="text-muted-foreground mb-4">
            If you receive a damaged or defective product:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-4">
            <li><strong>Do NOT accept delivery</strong> if the package is visibly damaged</li>
            <li>If damage is discovered after delivery, <strong>report within 48 hours</strong></li>
            <li>Take clear photos/videos of the damaged product and packaging</li>
            <li>Contact our customer support immediately with order details and evidence</li>
            <li>Do NOT discard the packaging until the issue is resolved</li>
          </ol>

          <h3 className="text-xl font-medium mb-3">6.2 Resolution for Damaged Products</h3>
          <p className="text-muted-foreground mb-3">We will offer one of the following options:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Full Replacement:</strong> Free replacement product shipped immediately</li>
            <li><strong>Repair:</strong> If repairable, we will arrange for technician visit</li>
            <li><strong>Full Refund:</strong> Complete refund including shipping charges</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            All damaged product claims are processed within 24-48 hours of receiving proper documentation.
          </p>
        </section>

        <Separator />

        {/* Cancellation */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Order Cancellation</h2>
          
          <h3 className="text-xl font-medium mb-3">7.1 Before Shipment</h3>
          <p className="text-muted-foreground mb-3">
            You can cancel your order free of charge before it is shipped:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Contact customer support with your order number</li>
            <li>Cancellation requests are processed within 2-4 hours</li>
            <li>Full refund will be initiated immediately after cancellation</li>
            <li>Refund will be credited within 5-7 business days</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">7.2 After Shipment</h3>
          <p className="text-muted-foreground mb-4">
            If your order has already been shipped, you can:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Refuse delivery when the courier arrives (no charges)</li>
            <li>Accept delivery and initiate a return within 7 days (return shipping may apply)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">7.3 Cash on Delivery (COD) Orders</h3>
          <p className="text-muted-foreground">
            COD orders can be cancelled anytime before delivery. If you refuse COD delivery at the doorstep, 
            no charges apply. However, repeated COD order cancellations may result in restrictions on future 
            COD orders.
          </p>
        </section>

        <Separator />

        {/* Special Situations */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Special Situations</h2>
          
          <h3 className="text-xl font-medium mb-3">8.1 Bulk Orders</h3>
          <p className="text-muted-foreground mb-4">
            Returns for bulk orders (10+ units) are subject to special terms agreed upon at the time of purchase. 
            Please contact our bulk sales team for specific return and refund policies.
          </p>

          <h3 className="text-xl font-medium mb-3">8.2 Sale/Clearance Items</h3>
          <p className="text-muted-foreground mb-4">
            Products purchased during special sales or clearance events may have modified return policies 
            (will be clearly stated at time of purchase). Defective items from sales are always eligible for return.
          </p>

          <h3 className="text-xl font-medium mb-3">8.3 Gift Purchases</h3>
          <p className="text-muted-foreground">
            If you received a product as a gift and wish to return it:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li>Contact the original purchaser to initiate the return</li>
            <li>Refund will be issued to the original payment method</li>
            <li>Alternatively, we can issue store credit to you for the product value</li>
          </ul>
        </section>

        <Separator />

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact for Returns & Refunds</h2>
          <p className="text-muted-foreground mb-4">
            For any questions about our refund and return policy, or to initiate a return, please contact us:
          </p>
          <Card className="bg-muted/50 p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-3">Customer Support</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> DoNotReply@mangoappliances.com</p>
                  <p><strong>Phone:</strong> +91 83206 56831</p>
                  <p><strong>WhatsApp:</strong> +91 83206 56831</p>
                  <p><strong>Hours:</strong> Mon-Sat, 9 AM - 6 PM IST</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Returns Address</h4>
                <div className="space-y-2 text-sm">
                  <p>Mango Appliances Private Limited</p>
                  <p>Returns Department</p>
                  <p>Rajkot, Gujarat, India</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    (Complete address will be provided with RMA number)
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Important Note:</strong> This refund and return policy complies with the Consumer Protection 
            Act, 2019 and Consumer Protection (E-Commerce) Rules, 2020. For any disputes, you may approach the 
            National Consumer Helpline (1800-11-4000) or file a complaint on the National Consumer Disputes 
            Redressal Commission portal (https://edaakhil.nic.in).
          </p>
        </div>
      </Card>
    </div>
  )
}

export default RefundPolicy
