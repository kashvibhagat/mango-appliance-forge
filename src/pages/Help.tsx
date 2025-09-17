import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Phone, Mail, MessageCircle, Clock, Users, Shield, Truck } from 'lucide-react';

const Help = () => {
  const faqCategories = [
    {
      title: "Product Information",
      icon: Shield,
      items: [
        {
          question: "What is the difference between desert coolers and personal coolers?",
          answer: "Desert coolers are larger units designed for cooling bigger areas like halls and large rooms, typically with higher water capacity and air throw. Personal coolers are compact units designed for individual use in smaller spaces like bedrooms or small offices."
        },
        {
          question: "How do I choose the right capacity air cooler for my room?",
          answer: "Room size determines the capacity needed. For rooms up to 150 sq ft, use personal coolers (10-30L). For 150-300 sq ft, use 30-50L capacity. For larger areas above 300 sq ft, consider desert coolers with 50L+ capacity."
        },
        {
          question: "What maintenance is required for air coolers?",
          answer: "Regular maintenance includes cleaning the water tank weekly, replacing cooling pads every season, cleaning the air filter monthly, and ensuring proper ventilation. Always drain water when not in extended use."
        }
      ]
    },
    {
      title: "Orders & Shipping",
      icon: Truck,
      items: [
        {
          question: "What are the shipping charges?",
          answer: "We offer free shipping on orders above ₹4999 across India. For orders below this amount, shipping charges apply based on location and product dimensions."
        },
        {
          question: "How long does delivery take?",
          answer: "Standard delivery takes 5-7 business days for most locations. Metro cities typically receive orders within 3-5 business days. Remote areas may take 7-10 business days."
        },
        {
          question: "Can I track my order?",
          answer: "Yes, once your order is shipped, you'll receive a tracking number via SMS and email. You can also track your order using our order tracking page."
        }
      ]
    },
    {
      title: "Warranty & Support",
      icon: Users,
      items: [
        {
          question: "What is covered under warranty?",
          answer: "Our comprehensive 2-year warranty covers manufacturing defects, motor issues, and electrical components. Normal wear and tear items like cooling pads, water pumps are covered for 6 months."
        },
        {
          question: "How do I claim warranty?",
          answer: "Contact our customer service with your purchase details and issue description. Our technician will visit for inspection and repair/replacement as per warranty terms."
        },
        {
          question: "Do you provide installation service?",          answer: "Yes, we provide free installation service for desert coolers and industrial units. Personal coolers typically don't require professional installation but guidance is provided."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+91 880 404 8811",
      hours: "Mon-Sat: 9 AM - 6 PM"
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Send us your queries",
      contact: "support@mangoappliances.com",
      hours: "24/7 Response within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our experts",
      contact: "Available on website",
      hours: "Mon-Sat: 9 AM - 6 PM"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Help Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, get support, and learn more about our products and services.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for help..."
            className="pl-10"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <method.icon className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-sm">{method.contact}</p>
                <p className="text-xs text-muted-foreground mt-1">{method.hours}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
          
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <category.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Send us a message and we'll get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Your full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="How can we help you?" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Please describe your question or issue in detail..."
                rows={4}
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;