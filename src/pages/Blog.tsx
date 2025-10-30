import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import heroAirCooler from '@/assets/hero-air-cooler.jpg';
import heroLandscapeCoolers from '@/assets/hero-landscape-coolers.jpg';
import heroSpares from '@/assets/hero-spares.jpg';

const Blog = () => {
  const blogPosts = [
    {
      id: 'choose-right-air-cooler',
      title: 'How to Choose the Right Air Cooler for Your Home',
      excerpt: 'A comprehensive guide to selecting the perfect air cooler based on room size, climate, and budget considerations.',
      content: `Choosing the right air cooler for your home is essential for comfort during hot summer months. Here's what you need to consider:

**1. Room Size Matters**
- Personal Coolers (20-40L): Best for rooms up to 150 sq ft
- Desert Coolers (50-85L): Ideal for 200-1000 sq ft spaces
- Industrial Coolers: Perfect for large halls and commercial spaces

**2. Climate Considerations**
Air coolers work best in dry climates. The humidity levels in your area will affect cooling efficiency. In areas with high humidity, consider models with better air circulation.

**3. Water Tank Capacity**
Larger tanks mean less frequent refills. For continuous operation, choose coolers with 40L+ capacity.

**4. Power Consumption**
Modern coolers are energy-efficient, consuming 150-250W compared to 1500W+ for ACs. Check the power rating before purchase.

**5. Additional Features**
- Remote control operation
- Multiple speed settings
- Water level indicators
- Castor wheels for mobility
- Ice chamber for extra cooling`,
      date: '2024-01-15',
      category: 'Buying Guide',
      image: heroAirCooler,
      author: 'Mango Appliances Team'
    },
    {
      id: 'maintenance-tips',
      title: 'Maintenance Tips for Long-lasting Air Cooler Performance',
      excerpt: 'Essential maintenance practices to keep your air cooler running efficiently throughout the summer season.',
      content: `Proper maintenance ensures your air cooler performs optimally for years. Follow these essential tips:

**Regular Cleaning Schedule**
- Clean the water tank every week to prevent algae buildup
- Wash cooling pads monthly during usage season
- Clean the exterior body with a damp cloth regularly

**Cooling Pad Care**
The cooling pads are the heart of your air cooler. Replace them annually or when you notice reduced cooling efficiency.

**Water Quality**
Use clean water to prevent mineral deposits. In hard water areas, consider using filtered water to extend pad life.

**Off-Season Storage**
- Drain all water completely
- Clean and dry all components
- Store in a dry, covered place
- Cover the cooler to protect from dust

**Motor Maintenance**
- Check for unusual sounds
- Ensure proper lubrication (if applicable)
- Keep motor area free from water

**Pre-Season Preparation**
Before summer starts:
- Inspect all parts for damage
- Replace cooling pads if necessary
- Check water pump functionality
- Clean the entire unit thoroughly`,
      date: '2024-01-10',
      category: 'Maintenance',
      image: heroLandscapeCoolers,
      author: 'Mango Appliances Team'
    },
    {
      id: 'new-product-launch',
      title: 'New Product Launch: Latest Arctic Series with Smart Features',
      excerpt: 'Discover our latest intelligent air coolers with advanced features, remote operation, and energy-efficient technology.',
      content: `We're excited to announce the launch of our new Arctic Series personal coolers with cutting-edge features!

**Arctic PC 40 - The Perfect Balance**
Our new Arctic PC 40 combines power and portability:
- 40L water tank capacity
- 30 feet air throw distance
- Covers up to 150 sq ft
- 3-speed settings for customized comfort
- Only 160W power consumption

**Arctic PC 55 - Enhanced Cooling Power**
For larger spaces, the Arctic PC 55 delivers:
- 55L large capacity tank
- 35 feet powerful air throw
- Effective cooling for 180 sq ft
- Advanced 3-speed motor
- Energy-efficient 180W operation

**Smart Features**
Both models include:
- Water level indicator for convenience
- Durable castor wheels for easy mobility
- High-quality cooling pads
- Sleek modern design
- 2-year comprehensive warranty

**Why Choose Arctic Series?**
- **Energy Efficient**: Save up to 80% on electricity bills compared to AC
- **Eco-Friendly**: No harmful gases or refrigerants
- **Easy Maintenance**: Simple to clean and maintain
- **Made in India**: Quality manufacturing with local expertise

**Special Launch Offer**
Get free shipping on all Arctic series coolers and extended warranty benefits.

Visit our shop to explore the complete Arctic series range!`,
      date: '2024-01-05',
      category: 'Product News',
      image: heroSpares,
      author: 'Mango Appliances Team'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Latest News & Updates
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Stay updated with our latest products, tips, and industry news
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
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
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
