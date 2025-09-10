import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Star, Zap, ThermometerSun, Clock, Phone, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ui/ProductCard';
import { featuredProducts, categories } from '@/data/products';
import heroLandscapeCoolers from '@/assets/hero-landscape-coolers.jpg';
import heroSpares from '@/assets/hero-spares.jpg';
import personalCoolersCategory from '@/assets/personal-coolers-category.jpg';
import towerCoolersCategory from '@/assets/tower-coolers-category.png';
import desertCoolersCategory from '@/assets/desert-coolers-category.jpg';
import industrialCoolersCategory from '@/assets/industrial-coolers-category.jpg';
import heroColnessFreshness from '@/assets/hero-coolness-freshness.jpg';
import maharathi20Cooler from '@/assets/maharathi-20-cooler.jpg';
import tentoFighterCooler from '@/assets/tento-fighter-cooler.jpg';
import thundercoolCooler from '@/assets/thundercool-cooler.jpg';

const Home = () => {
  const features = [
    {
      icon: Clock,
      title: 'On Time Delivery',
      description: 'Timely delivery across India'
    },
    {
      icon: Truck,
      title: 'Free Home Delivery',
      description: 'Free delivery to your doorstep'
    },
    {
      icon: Shield,
      title: '1 Year Warranty',
      description: 'Comprehensive product warranty'
    },
    {
      icon: Headphones,
      title: 'Life Time Support',
      description: '24/7 customer support service'
    }
  ];

  const serviceFeatures = [
    {
      icon: Truck,
      title: 'Free Home Service',
      description: 'Professional installation and maintenance'
    },
    {
      icon: Truck,
      title: 'Free Home Delivery',
      description: 'No delivery charges on all orders'
    },
    {
      icon: Shield,
      title: '1 Year Warranty',
      description: 'Comprehensive product protection'
    },
    {
      icon: Phone,
      title: 'Life Time Raj Support',
      description: 'Dedicated customer support forever'
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
      {/* Main Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="w-full">
          <img
            src={heroColnessFreshness}
            alt="Coolness Freshness - Mango Appliances Air Coolers"
            className="w-full h-[600px] lg:h-[700px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="text-cyan-300">COOLNESS</span><br/>
                  <span className="text-white font-light italic">FRESHNESS</span>
                </h1>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {serviceFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-white">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Maharathi 20 */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl overflow-hidden text-white relative">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2">Maharathi 20</h2>
                <p className="text-blue-100 mb-6">Efficient Cooling, Built To Last</p>
                <Button className="bg-white text-blue-700 hover:bg-blue-50">
                  Buy Now
                </Button>
              </div>
              <div className="absolute right-0 bottom-0">
                <img
                  src={maharathi20Cooler}
                  alt="Maharathi 20 Air Cooler"
                  className="w-48 h-48 object-cover rounded-tl-3xl"
                />
              </div>
            </div>

            {/* Tento Fighter */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden text-white relative">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2">Tento Fighter</h2>
                <p className="text-gray-300 mb-6">Powerful Tower Cooling</p>
                <Button className="bg-white text-gray-800 hover:bg-gray-50">
                  Shop Now
                </Button>
              </div>
              <div className="absolute right-0 bottom-0">
                <img
                  src={tentoFighterCooler}
                  alt="Tento Fighter Air Cooler"
                  className="w-48 h-48 object-cover rounded-tl-3xl"
                />
              </div>
            </div>

            {/* Thundercool */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-800 rounded-2xl overflow-hidden text-white relative">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2">Thundercool</h2>
                <p className="text-blue-100 mb-2">Cool Together, Smile Together</p>
                <Button className="bg-white text-blue-700 hover:bg-blue-50 mt-4">
                  Shop Now
                </Button>
              </div>
              <div className="absolute right-0 bottom-0">
                <img
                  src={thundercoolCooler}
                  alt="Thundercool Air Cooler"
                  className="w-48 h-48 object-cover rounded-tl-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of evaporative air coolers including Personal, Tower & Desert coolers plus genuine spare parts for all your cooling needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {/* Personal Coolers Category */}
            <Link to="/shop?category=personal-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={personalCoolersCategory}
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
                    src={towerCoolersCategory}
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
                    src={desertCoolersCategory}
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

            {/* Industrial Coolers Category */}
            <Link to="/shop?category=industrial-coolers" className="group">
              <Card className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={industrialCoolersCategory}
                    alt="Industrial Coolers"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">Industrial Coolers</h3>
                    <p className="text-xs opacity-90">Heavy-duty Solutions</p>
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

      {/* New Arrival Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                New Arrival Products
              </h2>
              <p className="text-gray-600">
                Discover our latest and most advanced cooling solutions
              </p>
            </div>
            <Link to="/shop">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="product-grid stagger-animation">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Need Help Choosing the Right Cooler?
            </h2>
            <p className="text-lg text-blue-100">
              Our cooling experts are here to help you find the perfect air cooler for your space. 
              Get personalized recommendations based on your room size and cooling needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3">
                Get Expert Advice
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
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