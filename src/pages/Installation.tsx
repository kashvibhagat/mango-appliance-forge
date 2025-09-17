import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wrench, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  Phone, 
  Clock,
  Users,
  Shield,
  Settings,
  Zap
} from 'lucide-react';

const Installation = () => {
  const installationTypes = [
    {
      type: "Personal Coolers",
      description: "Simple setup for small rooms",
      duration: "15-30 minutes",
      difficulty: "Easy",
      serviceRequired: false
    },
    {
      type: "Tower Coolers", 
      description: "Medium complexity installation",
      duration: "30-45 minutes",
      difficulty: "Medium",
      serviceRequired: false
    },
    {
      type: "Desert Coolers",
      description: "Professional installation recommended",
      duration: "1-2 hours",
      difficulty: "Professional",
      serviceRequired: true
    },
    {
      type: "Industrial Coolers",
      description: "Expert installation required",
      duration: "2-4 hours", 
      difficulty: "Expert",
      serviceRequired: true
    }
  ];

  const safetyTips = [
    "Always turn off power before starting installation",
    "Ensure proper ventilation - keep doors/windows partially open",
    "Check water connection for leaks before use",
    "Install on level, stable surface only",
    "Maintain clearance of 2 feet on all sides",
    "Use proper electrical safety equipment"
  ];

  const maintenanceTips = [
    "Clean water tank weekly during use season",
    "Replace cooling pads at start of each season",
    "Check and clean air filters monthly",
    "Inspect water pump for proper operation",
    "Drain water completely when not in use",
    "Oil motor bearings as per manual instructions"
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Installation Guide</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete installation guide for Mango air coolers. Follow our step-by-step instructions for safe and proper setup.
          </p>
        </div>

        {/* Installation Service Overview */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5" />
              <span>Free Installation Service</span>
            </CardTitle>
            <CardDescription>
              We provide complimentary installation for desert and industrial coolers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Expert Technicians</p>
                  <p className="text-xs text-muted-foreground">Trained and certified</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Quick Service</p>
                  <p className="text-xs text-muted-foreground">Same day installation</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Warranty Protected</p>
                  <p className="text-xs text-muted-foreground">Installation covered</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Installation Types */}
        <Card>
          <CardHeader>
            <CardTitle>Installation by Product Type</CardTitle>
            <CardDescription>
              Different products require different installation approaches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {installationTypes.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{item.type}</h3>
                    <Badge variant={item.serviceRequired ? "default" : "secondary"}>
                      {item.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Duration: {item.duration}</span>
                    {item.serviceRequired && (
                      <span className="text-primary font-medium">Service Required</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Installation Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="tower">Tower</TabsTrigger> 
            <TabsTrigger value="desert">Desert</TabsTrigger>
            <TabsTrigger value="industrial">Industrial</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Cooler Installation</CardTitle>
                <CardDescription>Simple DIY installation for personal air coolers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium">Unpack and Inspect</h4>
                      <p className="text-sm text-muted-foreground">Check all components and accessories</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Position the Cooler</h4>
                      <p className="text-sm text-muted-foreground">Place on stable, level surface near window</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Install Cooling Pads</h4>
                      <p className="text-sm text-muted-foreground">Fit the cooling pads in designated slots</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-medium">Connect Water Supply</h4>
                      <p className="text-sm text-muted-foreground">Fill water tank or connect to water source</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-medium">Electrical Connection</h4>
                      <p className="text-sm text-muted-foreground">Plug into appropriate power outlet</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">6</div>
                    <div>
                      <h4 className="font-medium">Test Operation</h4>
                      <p className="text-sm text-muted-foreground">Run all functions to ensure proper operation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tower" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tower Cooler Installation</CardTitle>
                <CardDescription>Step-by-step installation for tower air coolers</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Ensure adequate ceiling height and ventilation before installation
                  </AlertDescription>
                </Alert>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium">Assembly</h4>
                      <p className="text-sm text-muted-foreground">Assemble base, tower, and top sections</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Water Tank Setup</h4>
                      <p className="text-sm text-muted-foreground">Install water tank and connect internal plumbing</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Motor and Fan Installation</h4>
                      <p className="text-sm text-muted-foreground">Secure motor assembly and test fan operation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-medium">Control Panel Connection</h4>
                      <p className="text-sm text-muted-foreground">Wire control panel and test all functions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="desert" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Desert Cooler Installation</CardTitle>
                <CardDescription>Professional installation recommended for optimal performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Free professional installation service available. Contact +91 880 404 8811 to schedule.
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-muted-foreground mb-4">
                  Desert coolers require proper positioning, water connection, and electrical setup. Our certified technicians ensure optimal performance and safety.
                </p>
                <Button>
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Installation
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="industrial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Industrial Cooler Installation</CardTitle>
                <CardDescription>Expert installation required for industrial applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    Industrial coolers require site survey and custom installation. Our engineers will assess your requirements.
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-muted-foreground mb-4">
                  Industrial installations involve electrical work, ductwork, and structural considerations. Professional installation ensures compliance with safety standards.
                </p>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Request Site Survey
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Safety & Maintenance */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Safety Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {safetyTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Maintenance Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {maintenanceTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact for Installation */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle>Need Professional Installation?</CardTitle>
            <CardDescription>
              Our certified technicians are ready to help with your installation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Installation Helpline</h3>
                <p className="text-sm text-muted-foreground">+91 880 404 8811</p>
                <p className="text-xs text-muted-foreground">Mon-Sat: 9 AM - 6 PM</p>
              </div>
              <div>
                <h3 className="font-semibold">Service Areas</h3>
                <p className="text-sm text-muted-foreground">Pan India coverage</p>
                <p className="text-xs text-muted-foreground">Same day service in major cities</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Call for Installation
              </Button>
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Find Service Center
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Installation;