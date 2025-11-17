import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please read these Terms of Service carefully before using our website or purchasing our products. 
          By accessing or using our services, you agree to be bound by these terms.
        </AlertDescription>
      </Alert>

      <Card className="p-6 space-y-6">
        {/* Agreement to Terms */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms of Service constitute a legally binding agreement between you and Mango Appliances 
            Private Limited ("Company," "we," "us," or "our") concerning your access to and use of our website 
            and services. By accessing our website or making a purchase, you accept and agree to be bound by 
            these Terms of Service and our Privacy Policy.
          </p>
        </section>

        <Separator />

        {/* Company Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Company Information</h2>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
            <p><strong>Company Name:</strong> Mango Appliances Private Limited</p>
            <p><strong>Business Type:</strong> Manufacturer and Seller of Evaporative Air Coolers</p>
            <p><strong>Registered Office:</strong> Rajkot, Gujarat, India</p>
            <p><strong>GST Number:</strong> [Your GST Number]</p>
            <p><strong>Contact:</strong> +91 83206 56831 | DoNotReply@mangoappliances.com</p>
          </div>
        </section>

        <Separator />

        {/* User Obligations */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Obligations</h2>
          
          <h3 className="text-xl font-medium mb-3">3.1 Account Registration</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>You must provide accurate, current, and complete information during registration</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must be at least 18 years of age to make purchases</li>
            <li>You agree to notify us immediately of any unauthorized access to your account</li>
            <li>You are responsible for all activities that occur under your account</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">3.2 Prohibited Activities</h3>
          <p className="text-muted-foreground mb-3">You agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Use the website for any unlawful purpose or in violation of these Terms</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Interfere with or disrupt the website or servers or networks connected to the website</li>
            <li>Attempt to gain unauthorized access to any portion of the website</li>
            <li>Use any robot, spider, or automated device to access the website</li>
            <li>Transmit any viruses, malware, or other harmful code</li>
            <li>Collect or harvest any personally identifiable information from the website</li>
            <li>Post false, inaccurate, misleading, or fraudulent content</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">3.3 Acceptable Use</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Use the website only for lawful purposes and in accordance with these Terms</li>
            <li>Respect intellectual property rights of the Company and third parties</li>
            <li>Provide truthful and accurate information in all communications</li>
            <li>Comply with all applicable local, state, national, and international laws</li>
          </ul>
        </section>

        <Separator />

        {/* Orders and Payments */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Orders and Payments</h2>
          
          <h3 className="text-xl font-medium mb-3">4.1 Order Acceptance</h3>
          <p className="text-muted-foreground mb-4">
            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel 
            any order for any reason, including but not limited to product availability, errors in pricing 
            or product information, or suspected fraudulent activity.
          </p>

          <h3 className="text-xl font-medium mb-3">4.2 Pricing</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>All prices are in Indian Rupees (INR) and include applicable GST</li>
            <li>Prices are subject to change without notice</li>
            <li>We strive to provide accurate pricing, but errors may occur</li>
            <li>If a pricing error is discovered after your order, we will notify you and give you the option to proceed or cancel</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">4.3 Payment Terms</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>We accept payments via UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD)</li>
            <li>All online payments are processed securely through Razorpay</li>
            <li>Payment must be received before product dispatch (except for COD orders)</li>
            <li>For COD orders, payment must be made in cash to the delivery person</li>
            <li>You authorize us to charge the payment method you provide for all fees and applicable taxes</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">4.4 Order Confirmation</h3>
          <p className="text-muted-foreground">
            You will receive an order confirmation email once your order is successfully placed. This confirmation 
            does not constitute acceptance of your order. Acceptance occurs when we dispatch the product.
          </p>
        </section>

        <Separator />

        {/* Shipping and Delivery */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Shipping charges are calculated based on order value and delivery location</li>
            <li>Free shipping is available on orders above the specified threshold</li>
            <li>Delivery timelines are estimates and may vary based on location and product availability</li>
            <li>Risk of loss passes to you upon delivery to the carrier</li>
            <li>We are not responsible for delays caused by courier services or force majeure events</li>
            <li>You must inspect products upon delivery and report damages within 48 hours</li>
          </ul>
        </section>

        <Separator />

        {/* Product Warranties */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Product Warranties</h2>
          
          <h3 className="text-xl font-medium mb-3">6.1 Manufacturer's Warranty</h3>
          <p className="text-muted-foreground mb-4">
            All products are covered by a manufacturer's warranty as specified for each product. Warranty 
            coverage includes manufacturing defects and workmanship issues. Warranty periods vary by product 
            (typically 12-24 months from date of purchase).
          </p>

          <h3 className="text-xl font-medium mb-3">6.2 Warranty Exclusions</h3>
          <p className="text-muted-foreground mb-3">Warranties do NOT cover:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Normal wear and tear or cosmetic damage</li>
            <li>Damage caused by misuse, abuse, or negligence</li>
            <li>Unauthorized repairs or modifications</li>
            <li>Damage during transportation (after delivery acceptance)</li>
            <li>Products used for commercial or industrial purposes (unless specifically stated)</li>
            <li>Consumable parts such as cooling pads and filters</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">6.3 Warranty Claims</h3>
          <p className="text-muted-foreground">
            To claim warranty service, you must provide proof of purchase and product serial number. 
            Register your product within 30 days of purchase for faster warranty processing.
          </p>
        </section>

        <Separator />

        {/* Liability Limitations */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              IMPORTANT: Please read this section carefully as it limits our liability.
            </p>
          </div>

          <h3 className="text-xl font-medium mb-3">7.1 General Limitations</h3>
          <p className="text-muted-foreground mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>We provide products and services "AS IS" and "AS AVAILABLE" without warranties of any kind</li>
            <li>We do not warrant that our website will be uninterrupted, error-free, or secure</li>
            <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Our total liability shall not exceed the amount paid by you for the product in question</li>
            <li>We are not responsible for third-party websites, services, or content</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">7.2 Product Liability</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>Our liability is limited to product replacement or refund as per our warranty terms</li>
            <li>We are not liable for any property damage or personal injury caused by product misuse</li>
            <li>Installation must be performed by qualified technicians; improper installation voids warranty</li>
            <li>You must follow all safety instructions and user manuals provided with products</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">7.3 Force Majeure</h3>
          <p className="text-muted-foreground">
            We shall not be liable for any failure to perform our obligations due to circumstances beyond our 
            reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, 
            acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages 
            of transportation, facilities, fuel, energy, labor, or materials.
          </p>
        </section>

        <Separator />

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property Rights</h2>
          <p className="text-muted-foreground mb-4">
            All content on this website, including but not limited to text, graphics, logos, images, videos, 
            audio clips, digital downloads, and software, is the property of Mango Appliances Private Limited 
            or its licensors and is protected by Indian and international copyright, trademark, and other 
            intellectual property laws.
          </p>
          <p className="text-muted-foreground mb-4">
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly 
            perform, republish, download, store, or transmit any of the material on our website without our 
            prior written consent.
          </p>
          <p className="text-muted-foreground">
            Product names, logos, and brands are trademarks of Mango Appliances Private Limited. Other trademarks 
            appearing on this website are the property of their respective owners.
          </p>
        </section>

        <Separator />

        {/* Dispute Resolution */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Dispute Resolution</h2>
          
          <h3 className="text-xl font-medium mb-3">9.1 Informal Resolution</h3>
          <p className="text-muted-foreground mb-4">
            In the event of any dispute, controversy, or claim arising out of or relating to these Terms or 
            your use of our services, you agree to first contact us to attempt to resolve the dispute informally. 
            Contact our customer service at DoNotReply@mangoappliances.com or +91 83206 56831.
          </p>

          <h3 className="text-xl font-medium mb-3">9.2 Arbitration</h3>
          <p className="text-muted-foreground mb-4">
            If informal resolution fails, any dispute shall be resolved through binding arbitration in accordance 
            with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in Rajkot, Gujarat, 
            India, and shall be conducted in English.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>The arbitration shall be conducted by a sole arbitrator mutually agreed upon by both parties</li>
            <li>If parties cannot agree on an arbitrator within 30 days, one shall be appointed by the Rajkot District Court</li>
            <li>The arbitrator's decision shall be final and binding on both parties</li>
            <li>Each party shall bear its own costs unless the arbitrator decides otherwise</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">9.3 Class Action Waiver</h3>
          <p className="text-muted-foreground">
            You agree that disputes must be brought on an individual basis only, and not as a plaintiff or 
            class member in any purported class or representative proceeding.
          </p>
        </section>

        <Separator />

        {/* Governing Law */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Governing Law and Jurisdiction</h2>
          <p className="text-muted-foreground mb-4">
            These Terms of Service shall be governed by and construed in accordance with the laws of India, 
            without regard to its conflict of law provisions.
          </p>
          <p className="text-muted-foreground mb-4">
            Subject to the arbitration clause above, the courts of Rajkot, Gujarat, India shall have exclusive 
            jurisdiction over any disputes arising from or relating to these Terms or your use of our services.
          </p>
          <p className="text-muted-foreground">
            By using our website and services, you consent to the jurisdiction and venue of such courts.
          </p>
        </section>

        <Separator />

        {/* Modifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Modifications to Terms</h2>
          <p className="text-muted-foreground mb-4">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective 
            immediately upon posting on this page with an updated revision date. Material changes will be 
            notified via email or prominent notice on our website.
          </p>
          <p className="text-muted-foreground">
            Your continued use of our website and services following the posting of changes constitutes 
            acceptance of those changes. We encourage you to review these Terms periodically.
          </p>
        </section>

        <Separator />

        {/* Severability */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Severability</h2>
          <p className="text-muted-foreground">
            If any provision of these Terms is found to be unenforceable or invalid under any applicable law, 
            such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole. 
            Such provisions shall be deleted without affecting the remaining provisions herein.
          </p>
        </section>

        <Separator />

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
          <p className="text-muted-foreground mb-4">
            For questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
            <p><strong>Email:</strong> DoNotReply@mangoappliances.com</p>
            <p><strong>Phone:</strong> +91 83206 56831</p>
            <p><strong>Address:</strong> Mango Appliances Private Limited, Rajkot, Gujarat, India</p>
            <p><strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground">
            <strong>Acknowledgment:</strong> BY USING OUR WEBSITE AND SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE 
            READ THESE TERMS OF SERVICE, UNDERSTOOD THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE 
            TO THESE TERMS, YOU MUST NOT USE OUR WEBSITE OR SERVICES.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default TermsOfService
