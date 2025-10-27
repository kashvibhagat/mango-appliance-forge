import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Star, Zap, ThermometerSun, ChevronLeft, ChevronRight, Award, Globe, Factory, Users, CheckCircle, MapPin, Quote, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ui/ProductCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { mangoFeaturedProducts, mangoCategories, companyInfo } from '@/data/mangoProducts';
import heroAirCooler from '@/assets/hero-air-cooler.jpg';
import heroLandscapeCoolers from '@/assets/hero-landscape-coolers.jpg';
import heroSpares from '@/assets/hero-spares.jpg';
import personalCoolersCategory from '@/assets/personal-coolers-category.jpg';
import towerCoolersCategory from '@/assets/tower-coolers-category.png';
import desertCoolersCategory from '@/assets/desert-coolers-category.jpg';
import industrialCoolersCategory from '@/assets/industrial-coolers-category.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(mangoFeaturedProducts.length / 4);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above ₹4999 across India'
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

  const whyChooseUs = [
    {
      icon: MapPin,
      title: 'Made in India',
      description: 'Proudly manufactured in India with local expertise'
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: 'Low power consumption with maximum cooling'
    },
    {
      icon: Award,
      title: 'ISO Certified',
      description: 'Quality assured with international certifications'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Trusted in Asia, Middle East & Indian sub-continent'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      review: 'Excellent cooling performance! The PUNCH 60i has been working perfectly for over a year. Great value for money.',
      product: 'PUNCH 60i'
    },
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      review: 'Very impressed with the build quality. The desert cooler covers our entire hall effectively. Highly recommended!',
      product: 'NEW GLACIAL DELUXE 85'
    },
    {
      name: 'Amit Patel',
      location: 'Ahmedabad',
      rating: 4,
      review: 'Good product with reliable performance. Customer service is also responsive. Happy with my purchase.',
      product: 'NEXON 60'
    },
    {
      name: 'Sunita Gupta',
      location: 'Jaipur',
      rating: 5,
      review: 'The personal cooler is perfect for my room. Silent operation and effective cooling. Worth every rupee!',
      product: 'THUNDER PLUS 35i'
    }
  ];

  const blogPosts = [
    {
      title: 'How to Choose the Right Air Cooler for Your Home',
      excerpt: 'A comprehensive guide to selecting the perfect air cooler based on room size, climate, and budget considerations.',
      date: '2024-01-15',
      category: 'Buying Guide',
      image: heroAirCooler
    },
    {
      title: 'Maintenance Tips for Long-lasting Air Cooler Performance',
      excerpt: 'Essential maintenance practices to keep your air cooler running efficiently throughout the summer season.',
      date: '2024-01-10',
      category: 'Maintenance',
      image: heroLandscapeCoolers
    },
    {
      title: 'New Product Launch: PUNCH 60i with Smart Features',
      excerpt: 'Introducing our latest intelligent air cooler with sensor touch control, remote operation, and 12-hour timer.',
      date: '2024-01-05',
      category: 'Product News',
      image: heroSpares
    }
  ];

  return (
    <div className="relative">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero overflow-hidden py-20 md:py-28 lg:py-40">
          {/* Enhanced background pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2LTJoLTJ2Mmgyem0wLTR2LTJoLTJ2Mmgyem0yLTJ2LTJoLTJ2Mmgyem0wLTR2LTJoLTJ2Mmgyem0tMiAydi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-10 md:space-y-12 animate-fade-in">
                
                {/* Premium Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 rounded-full px-6 py-3 shadow-lg backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-sm md:text-base font-bold text-primary tracking-wide uppercase">
                    {companyInfo.philosophy}
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-6">
                  <div className="relative inline-block">
                    {/* Decorative background */}
                    <div className="absolute inset-0 -inset-x-12 -inset-y-8 bg-gradient-to-r from-primary/5 via-primary/8 to-primary/5 rounded-3xl blur-2xl"></div>
                    <div className="absolute inset-0 -inset-x-8 -inset-y-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-primary/10"></div>
                    
                    <h1 className="relative text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[1.05] tracking-tight px-4 md:px-8 py-6">
                      Beat the Heat with
                      <span className="block mt-2 bg-gradient-brand bg-clip-text text-transparent animate-shimmer">
                        {companyInfo.brand}
                      </span>
                    </h1>
                  </div>
                  
                  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                    Manufacturing excellence since <strong className="font-semibold text-foreground">{companyInfo.experience.replace('+', '')} years</strong>, delivering premium cooling solutions across <strong className="font-semibold text-foreground">Asia, Middle East & Indian sub-continent</strong>
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4">
                  <Link to="/shop">
                    <Button variant="hero" size="xl" className="group shadow-2xl hover:shadow-brand min-w-[220px] font-semibold text-base md:text-lg">
                      Explore Products
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Link to="/shop?category=spare-parts">
                    <Button variant="outline-glow" size="xl" className="min-w-[220px] font-semibold text-base md:text-lg">
                      Spare Parts & Service
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators - More Prominent */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-8">
                  <div className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-md rounded-2xl border border-success/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Award className="h-6 w-6 text-success" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground font-medium">Quality</div>
                      <div className="text-sm font-bold text-foreground">ISO 9001:2015</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-md rounded-2xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Shield className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground font-medium">Warranty</div>
                      <div className="text-sm font-bold text-foreground">2 Years</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-md rounded-2xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Truck className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground font-medium">Shipping</div>
                      <div className="text-sm font-bold text-foreground">Free Pan-India</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-md rounded-2xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Factory className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground font-medium">Manufacturing</div>
                      <div className="text-sm font-bold text-foreground">{companyInfo.factories}</div>
                    </div>
                  </div>
                </div>

                {/* Company Stats with Animated Counters */}
                <div className="grid grid-cols-3 gap-6 md:gap-10 pt-16 max-w-4xl mx-auto">
                  <div className="group text-center p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-3xl border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                    <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-brand bg-clip-text text-transparent mb-3">
                      <AnimatedCounter end={40} suffix="+" duration={2500} />
                    </div>
                    <div className="text-xs md:text-sm lg:text-base text-muted-foreground font-semibold tracking-wide uppercase">Product Models</div>
                  </div>
                  <div className="group text-center p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-3xl border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                    <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-brand bg-clip-text text-transparent mb-3">
                      <AnimatedCounter end={15} suffix="+" duration={2500} />
                    </div>
                    <div className="text-xs md:text-sm lg:text-base text-muted-foreground font-semibold tracking-wide uppercase">Years Experience</div>
                  </div>
                  <div className="group text-center p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-3xl border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                    <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-brand bg-clip-text text-transparent mb-3">
                      <AnimatedCounter end={50} suffix="K+" duration={2500} />
                    </div>
                    <div className="text-xs md:text-sm lg:text-base text-muted-foreground font-semibold tracking-wide uppercase">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Product Categories Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <Badge variant="secondary" className="mb-4 font-semibold px-4 py-1.5">
              Product Categories
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Find Your Perfect Cooling Solution
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From compact personal coolers to powerful industrial units, we offer a complete range of energy-efficient cooling solutions designed for every space and need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto stagger-animation">
            {/* Desert Coolers */}
            <Link to="/shop?category=desert-coolers" className="group">
              <Card className="card-hover overflow-hidden border-border/50 h-full transition-all duration-500 hover:border-primary/50">
                <div className="relative h-72 md:h-80">
                  <img
                    src={desertCoolersCategory}
                    alt="Desert Air Coolers - High capacity cooling for large rooms and halls"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width="400"
                    height="320"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Desert Coolers</h3>
                    <p className="text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity duration-300">Powerful cooling for large spaces up to 1000 sq ft</p>
                    <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-sm font-semibold">Explore Range</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Industrial Coolers */}
            <Link to="/shop?category=industrial-coolers" className="group">
              <Card className="card-hover overflow-hidden border-border/50 h-full transition-all duration-500 hover:border-primary/50">
                <div className="relative h-72 md:h-80">
                  <img
                    src={industrialCoolersCategory}
                    alt="Industrial Air Coolers - Heavy-duty cooling for commercial and industrial spaces"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width="400"
                    height="320"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Industrial Coolers</h3>
                    <p className="text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity duration-300">Commercial-grade cooling for factories & warehouses</p>
                    <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-sm font-semibold">Explore Range</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Personal Coolers */}
            <Link to="/shop?category=personal-coolers" className="group">
              <Card className="card-hover overflow-hidden border-border/50 h-full transition-all duration-500 hover:border-primary/50">
                <div className="relative h-72 md:h-80">
                  <img
                    src={personalCoolersCategory}
                    alt="Personal Air Coolers - Compact and portable cooling for bedrooms and small rooms"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width="400"
                    height="320"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Personal Coolers</h3>
                    <p className="text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity duration-300">Portable solutions perfect for bedrooms & offices</p>
                    <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-sm font-semibold">Explore Range</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Tower Coolers */}
            <Link to="/shop?category=tower-coolers" className="group">
              <Card className="card-hover overflow-hidden border-border/50 h-full transition-all duration-500 hover:border-primary/50">
                <div className="relative h-72 md:h-80">
                  <img
                    src={towerCoolersCategory}
                    alt="Tower Air Coolers - Sleek space-saving design with powerful cooling"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width="400"
                    height="320"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Tower Coolers</h3>
                    <p className="text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity duration-300">Stylish vertical design ideal for modern homes</p>
                    <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-sm font-semibold">Explore Range</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-12 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
                Featured Products
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Discover our top-rated and bestselling air coolers
              </p>
            </div>
            <Link to="/shop">
              <Button variant="outline-glow" size="lg" className="w-full md:w-auto">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Carousel - Optimized for mobile */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-300 md:duration-500 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(mangoFeaturedProducts.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                      {mangoFeaturedProducts.slice(slideIndex * 4, (slideIndex * 4) + 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {Math.ceil(mangoFeaturedProducts.length / 4) > 1 && (
              <>
                <Button
                  variant="ghost"  
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background border"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background border"
                  onClick={nextSlide}
                  disabled={currentSlide === Math.ceil(mangoFeaturedProducts.length / 4) - 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Carousel Dots */}
            {Math.ceil(mangoFeaturedProducts.length / 4) > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(mangoFeaturedProducts.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-accent scale-110' : 'bg-muted hover:bg-muted-foreground/30'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Mango Appliances?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what makes us the preferred choice for cooling solutions across India and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="card-glass text-center p-6 card-interactive hover-lift">
                <CardContent className="space-y-4 p-0">
                  <div className="h-16 w-16 bg-gradient-brand rounded-xl flex items-center justify-center mx-auto">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                All products comply with international norms including {companyInfo.certifications.join(', ')}
              </p>
            </div>
            <div className="text-center">
              <ThermometerSun className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Superior Cooling</h3>
              <p className="text-sm text-muted-foreground">
                Advanced H2C honeycomb pads with intelligent remote and sensor touch controls
              </p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Wide Reach</h3>
              <p className="text-sm text-muted-foreground">
                Expanding service network with international presence in multiple countries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real reviews from satisfied customers across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-glass p-6 relative">
                <CardContent className="space-y-4 p-0">
                  <Quote className="h-8 w-8 text-accent/30" />
                  <div className="flex items-center space-x-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{testimonial.review}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-accent mt-1">Product: {testimonial.product}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News/Blog Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Latest News & Updates
            </h2>
            <p className="text-muted-foreground">
              Stay updated with our latest products, tips, and industry news
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            {blogPosts.map((post, index) => (
              <Link key={index} to="/shop" className="group">
                <Card className="card-hover overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent/90 text-white">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            {features.map((feature, index) => (
              <Card key={index} className="card-glass text-center p-6 card-interactive hover-lift">
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
              <Link to="/contact">
                <Button variant="hero" size="lg" className="animate-bounce-gentle">
                  Get Expert Advice
                </Button>
              </Link>
              <Button variant="outline-glow" size="lg" asChild>
                <a href="tel:+918804048811">
                  Call +91 880 404 8811
                </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Home;