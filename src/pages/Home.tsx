import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Star, Zap, ThermometerSun, ChevronLeft, ChevronRight, Award, Globe, Factory, Users, CheckCircle, MapPin, Quote, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ui/ProductCard';
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
        <section className="relative bg-gradient-hero py-12 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Zap className="h-3 w-3 mr-1" />
                  {companyInfo.philosophy}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="inline-block">Beat the Heat with</span>{' '}
                  <span className="inline-block bg-gradient-brand bg-clip-text text-transparent">
                    {companyInfo.brand}
                  </span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-lg">
                  {companyInfo.experience} of experience with {companyInfo.factories} in {companyInfo.location}. 
                  Pan India network with exports to {companyInfo.international}.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link to="/shop" className="w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Shop Air Coolers
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/shop?category=spare-parts" className="w-full sm:w-auto">
                  <Button variant="outline-glow" size="lg" className="w-full sm:w-auto">
                    View Spare Parts
                  </Button>
                </Link>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-accent">40+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Air Cooler Models</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-accent">{companyInfo.experience}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10">
                <img
                  src={heroAirCooler}
                  alt="Premium Air Cooler Collection"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

      {/* Product Categories Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Shop by Category
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of evaporative air coolers designed for every cooling need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto">
            {/* Desert Coolers */}
            <Link to="/shop?category=desert-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={desertCoolersCategory}
                    alt="Desert Coolers"
                    className="w-full h-40 md:h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white">
                    <h3 className="text-sm md:text-xl font-bold mb-0 md:mb-1">Desert Coolers</h3>
                    <p className="text-xs md:text-sm opacity-90 hidden sm:block">High capacity for large areas</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Industrial Coolers */}
            <Link to="/shop?category=industrial-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={industrialCoolersCategory}
                    alt="Industrial Coolers"
                    className="w-full h-40 md:h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white">
                    <h3 className="text-sm md:text-xl font-bold mb-0 md:mb-1">Industrial Coolers</h3>
                    <p className="text-xs md:text-sm opacity-90 hidden sm:block">Heavy-duty commercial solutions</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Personal Coolers */}
            <Link to="/shop?category=personal-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={personalCoolersCategory}
                    alt="Personal Coolers"
                    className="w-full h-40 md:h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white">
                    <h3 className="text-sm md:text-xl font-bold mb-0 md:mb-1">Personal Coolers</h3>
                    <p className="text-xs md:text-sm opacity-90 hidden sm:block">Compact cooling for personal spaces</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Tower Coolers */}
            <Link to="/shop?category=tower-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={towerCoolersCategory}
                    alt="Tower Coolers"
                    className="w-full h-40 md:h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white">
                    <h3 className="text-sm md:text-xl font-bold mb-0 md:mb-1">Tower Coolers</h3>
                    <p className="text-xs md:text-sm opacity-90 hidden sm:block">Space-saving tower design</p>
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Latest News & Updates
              </h2>
              <p className="text-muted-foreground">
                Stay updated with our latest products, tips, and industry news
              </p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="btn-secondary">
                View All Articles
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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