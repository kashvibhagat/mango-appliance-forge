import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Star, Zap, ThermometerSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ui/ProductCard';
import { featuredProducts, categories } from '@/data/products';
import heroAirCooler from '@/assets/hero-air-cooler.jpg';
import heroSpares from '@/assets/hero-spares.jpg';

const Home = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above ₹999 across India'
    },
    {
      icon: Shield,
      title: '2 Year Warranty',
      description: 'Comprehensive warranty on all products'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Expert customer service support'
    }
  ];

  const stats = [
    { number: '25+', label: 'Air Cooler Models' },
    { number: 'Pan India', label: 'Distribution Network' },
    { number: '15+', label: 'Years Experience' },
    { number: '3', label: 'Manufacturing Units' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Zap className="h-3 w-3 mr-1" />
                  Premium Cooling Solutions
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Beat the Heat with{' '}
                  <span className="bg-gradient-brand bg-clip-text text-transparent">
                    Mango Appliances
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Growing company into evaporative air coolers with over 25 models in Personal, Tower & Desert coolers for cooling large spaces. Quality products with 15+ years of experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-hero text-base px-8">
                  Shop Air Coolers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="btn-secondary text-base px-8">
                  View Spare Parts
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-accent">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative z-10">
                <img
                  src={heroAirCooler}
                  alt="Premium Air Cooler"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-brand/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-glass text-center p-6 card-hover">
                <CardContent className="space-y-4 p-0">
                  <div className="h-12 w-12 bg-gradient-brand rounded-xl flex items-center justify-center mx-auto">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of evaporative air coolers including Personal, Tower & Desert coolers plus genuine spare parts for all your cooling needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Personal Coolers Category */}
            <Link to="/shop?category=personal-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={heroAirCooler}
                    alt="Personal Coolers"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">Personal Coolers</h3>
                    <p className="text-xs opacity-90">Cool Master, Thunder Plus</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Tower Coolers Category */}
            <Link to="/shop?category=tower-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={heroAirCooler}
                    alt="Tower Coolers"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">Tower Coolers</h3>
                    <p className="text-xs opacity-90">Arctic TC Series</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Desert Coolers Category */}
            <Link to="/shop?category=desert-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={heroAirCooler}
                    alt="Desert Coolers"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">Desert Coolers</h3>
                    <p className="text-xs opacity-90">Wintry Series</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Spare Parts Category */}
            <Link to="/shop?category=spare-parts" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={heroSpares}
                    alt="Spare Parts"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">Spare Parts</h3>
                    <p className="text-xs opacity-90">Genuine Mango Parts</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Discover our top-rated and bestselling products
              </p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="btn-secondary">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Need Help Choosing the Right Cooler?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our cooling experts are here to help you find the perfect air cooler for your space. 
              Get personalized recommendations based on your room size and cooling needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero text-base px-8">
                Get Expert Advice
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary text-base px-8">
                Call +91 880 404 8811
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;