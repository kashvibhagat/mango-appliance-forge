import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroAirCooler from '@/assets/hero-air-cooler.jpg';
import heroLandscapeCoolers from '@/assets/hero-landscape-coolers.jpg';
import heroSpares from '@/assets/hero-spares.jpg';

const BlogPost = () => {
  const { id } = useParams();

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
- Ice chamber for extra cooling

**Making the Right Choice**
Visit our shop to explore our complete range of air coolers designed for every need and budget. Our expert team is available to help you choose the perfect cooler for your space.`,
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
- Clean the entire unit thoroughly

**Professional Service**
For major repairs or annual servicing, contact our authorized service centers. Regular professional maintenance can extend your cooler's lifespan significantly.

**Spare Parts Availability**
We stock genuine spare parts for all our models. Visit our spare parts section to find cooling pads, motors, water pumps, and other essential components.`,
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

**Technical Specifications**
- Voltage: 230V, 50Hz
- Air Delivery: 2200-2500 m³/hr
- Noise Level: <55 dB
- Dimensions: Optimized for easy placement
- Weight: Lightweight for portability

**Special Launch Offer**
Get free shipping on all Arctic series coolers and extended warranty benefits. Limited time offer!

**Customer Support**
Our dedicated customer support team is available 24/7 to help you with installation, maintenance, and any queries.

Visit our shop to explore the complete Arctic series range and experience the future of cooling technology!`,
      date: '2024-01-05',
      category: 'Product News',
      image: heroSpares,
      author: 'Mango Appliances Team'
    }
  ];

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <article className="bg-card rounded-2xl shadow-2xl p-6 md:p-12">
            {/* Back Button */}
            <Link to="/blog">
              <Button variant="ghost" className="mb-6 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {/* Category Badge */}
            <Badge className="mb-4 bg-accent text-white">
              {post.category}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>By {post.author}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                } else {
                  return (
                    <p key={index} className="text-muted-foreground mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>

            {/* Call to Action */}
            <div className="mt-12 pt-8 border-t">
              <div className="bg-gradient-hero p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Experience Superior Cooling?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Explore our complete range of energy-efficient air coolers
                </p>
                <Link to="/shop">
                  <Button size="lg" variant="hero">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles */}
      <section className="py-16 bg-card/30 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {blogPosts.filter(p => p.id !== id).slice(0, 2).map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <Badge className="mb-3 bg-accent text-white">{relatedPost.category}</Badge>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
