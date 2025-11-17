import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin } from "lucide-react"

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

      <Card className="p-6 space-y-6">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mango Appliances Private Limited ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
            visit our website or purchase our products. This policy complies with the Digital Personal Data Protection 
            Act (DPDP Act), 2023 and other applicable Indian laws.
          </p>
        </section>

        <Separator />

        {/* Data Collection */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Data Collection Practices</h2>
          
          <h3 className="text-xl font-medium mb-3 mt-4">2.1 Information We Collect</h3>
          <div className="space-y-3 text-muted-foreground">
            <p><strong>Personal Information:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely through Razorpay)</li>
              <li>Order history and purchase details</li>
            </ul>

            <p className="mt-4"><strong>Product Information:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Product serial numbers for warranty registration</li>
              <li>Date of purchase and warranty details</li>
              <li>Service and support request information</li>
            </ul>

            <p className="mt-4"><strong>Technical Information:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address, browser type, and device information</li>
              <li>Website usage data and navigation patterns</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <h3 className="text-xl font-medium mb-3 mt-6">2.2 How We Collect Data</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Directly from you when you make purchases, register products, or contact us</li>
            <li>Automatically through cookies and analytics tools when you use our website</li>
            <li>From third-party payment processors (Razorpay) for transaction processing</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">2.3 Purpose of Data Collection</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Processing and fulfilling your orders</li>
            <li>Managing warranty registrations and service requests</li>
            <li>Sending order confirmations, shipping updates, and service notifications</li>
            <li>Improving our products, services, and customer experience</li>
            <li>Complying with legal and regulatory requirements</li>
            <li>Preventing fraud and maintaining security</li>
          </ul>
        </section>

        <Separator />

        {/* Cookie Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Cookie Policy</h2>
          
          <h3 className="text-xl font-medium mb-3">3.1 What Are Cookies</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cookies are small text files stored on your device that help us improve your browsing experience. 
            We use both session cookies (temporary) and persistent cookies (stored long-term).
          </p>

          <h3 className="text-xl font-medium mb-3">3.2 Types of Cookies We Use</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Essential Cookies:</strong> Required for website functionality (shopping cart, authentication)</li>
            <li><strong>Performance Cookies:</strong> Help us understand how you use our site to improve it</li>
            <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
            <li><strong>Analytics Cookies:</strong> Collect anonymous data about site usage and traffic</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4">3.3 Managing Cookies</h3>
          <p className="text-muted-foreground leading-relaxed">
            You can control cookies through your browser settings. However, disabling essential cookies may 
            affect website functionality. Most browsers allow you to refuse cookies or alert you when cookies 
            are being sent.
          </p>
        </section>

        <Separator />

        {/* User Rights Under DPDP Act */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Your Rights Under DPDP Act, 2023</h2>
          
          <p className="text-muted-foreground mb-4">
            Under the Digital Personal Data Protection Act, 2023, you have the following rights:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">4.1 Right to Access</h3>
              <p className="text-muted-foreground">
                You have the right to obtain confirmation about whether we process your personal data 
                and access such data along with related information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">4.2 Right to Correction</h3>
              <p className="text-muted-foreground">
                You have the right to request correction of inaccurate or incomplete personal data 
                we hold about you.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">4.3 Right to Erasure</h3>
              <p className="text-muted-foreground">
                You have the right to request deletion of your personal data, subject to legal retention 
                requirements for business and tax purposes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">4.4 Right to Data Portability</h3>
              <p className="text-muted-foreground">
                You have the right to receive your personal data in a structured, commonly used format 
                and transmit it to another entity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">4.5 Right to Withdraw Consent</h3>
              <p className="text-muted-foreground">
                Where processing is based on consent, you have the right to withdraw consent at any time, 
                without affecting the lawfulness of processing before withdrawal.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">4.6 Right to Grievance Redressal</h3>
              <p className="text-muted-foreground">
                You have the right to nominate another individual to exercise your rights in case of death 
                or incapacity, and the right to file complaints with the Data Protection Board.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Data Security */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We implement appropriate technical and organizational security measures to protect your personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>SSL/TLS encryption for data transmission</li>
            <li>Secure payment processing through PCI-DSS compliant Razorpay</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Data backup and disaster recovery procedures</li>
            <li>Employee training on data protection and confidentiality</li>
          </ul>
        </section>

        <Separator />

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal data only for as long as necessary to fulfill the purposes outlined 
            in this policy or as required by law:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
            <li>Order and transaction data: 7 years (for tax and accounting purposes)</li>
            <li>Warranty information: Duration of warranty period plus 1 year</li>
            <li>Marketing communications: Until you opt-out or request deletion</li>
            <li>Website analytics: 26 months</li>
            <li>Account information: Until account deletion request</li>
          </ul>
        </section>

        <Separator />

        {/* Third-Party Sharing */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Third-Party Data Sharing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We do not sell your personal data. We share data only with trusted service providers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Payment Processors:</strong> Razorpay for secure payment processing</li>
            <li><strong>Shipping Partners:</strong> Courier services for order delivery</li>
            <li><strong>Cloud Services:</strong> Supabase for secure data storage and management</li>
            <li><strong>Analytics Providers:</strong> For website performance and user experience analysis</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            All third-party service providers are contractually bound to protect your data and use it 
            only for specified purposes.
          </p>
        </section>

        <Separator />

        {/* Children's Privacy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect 
            personal data from children. If you believe we have collected data from a child, please contact us 
            immediately so we can delete such information.
          </p>
        </section>

        <Separator />

        {/* Changes to Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with 
            an updated revision date. Significant changes will be communicated via email or prominent notice 
            on our website. Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <Separator />

        {/* Contact for Data Requests */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact for Data Requests</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            To exercise your rights under the DPDP Act or for any privacy-related concerns, please contact 
            our Data Protection Officer:
          </p>

          <Card className="bg-muted/50 p-6">
            <h3 className="font-semibold mb-4">Data Protection Officer</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:privacy@mangoappliances.com" className="text-sm text-primary hover:underline">
                    privacy@mangoappliances.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href="tel:+918320656831" className="text-sm text-primary hover:underline">
                    +91 83206 56831
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    Mango Appliances Private Limited<br />
                    Rajkot, Gujarat, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-background rounded-lg border">
              <h4 className="font-medium mb-2">Data Request Response Time</h4>
              <p className="text-sm text-muted-foreground">
                We will respond to your data requests within <strong>30 days</strong> as required by the DPDP Act. 
                For complex requests, we may extend this period by an additional 30 days with prior notification.
              </p>
            </div>
          </Card>
        </section>

        <Separator />

        {/* Governing Law */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            This Privacy Policy is governed by and construed in accordance with the laws of India. 
            Any disputes arising from this policy shall be subject to the exclusive jurisdiction of 
            the courts in Rajkot, Gujarat, India.
          </p>
        </section>

        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground">
            <strong>Consent:</strong> By using our website and services, you acknowledge that you have read, 
            understood, and agree to be bound by this Privacy Policy and consent to the collection, use, 
            and disclosure of your personal data as described herein.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default PrivacyPolicy
