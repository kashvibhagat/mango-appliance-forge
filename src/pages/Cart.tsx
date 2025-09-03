import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { allProducts } from '@/data/products';

const Cart = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center p-12">
          <CardContent className="space-y-6 p-0">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground">
                Looks like you haven't added any items to your cart yet.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-hero">
                <Link to="/shop">
                  Start Shopping
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cartItemsWithProducts = items.map(item => {
    const product = allProducts.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Button variant="outline" onClick={clearCart} className="text-danger border-danger hover:bg-danger/10">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItemsWithProducts.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product!.images[0]}
                      alt={item.product!.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <Link 
                          to={`/product/${item.product!.slug}`}
                          className="font-semibold text-foreground hover:text-accent line-clamp-2"
                        >
                          {item.product!.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.product!.brand}</p>
                        {item.variantId && (
                          <p className="text-sm text-muted-foreground">Variant: {item.variantId}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-danger hover:text-danger hover:bg-danger/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 font-medium min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-semibold text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-ok">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₹{Math.round(totalPrice * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{Math.round(totalPrice * 1.18).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full btn-hero">
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full btn-secondary">
                  <Link to="/shop">
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-ok rounded-full"></div>
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-ok rounded-full"></div>
                  <span>2-year comprehensive warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-ok rounded-full"></div>
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;