import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, DollarSign, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RevenueData {
  date: string;
  revenue: number;
}

interface CategoryData {
  category: string;
  count: number;
  revenue: number;
}

interface StatusData {
  status: string;
  count: number;
}

export const AnalyticsTab = () => {
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Fetch orders for revenue and status analysis
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount, status, created_at, items')
        .order('created_at', { ascending: true });

      if (ordersError) throw ordersError;

      // Fetch products for category analysis
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('category, price, is_active');

      if (productsError) throw productsError;

      // Process revenue over time (last 30 days)
      const revenueByDate: Record<string, number> = {};
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      ordersData?.forEach(order => {
        const orderDate = new Date(order.created_at);
        if (orderDate >= thirtyDaysAgo) {
          const dateKey = orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          revenueByDate[dateKey] = (revenueByDate[dateKey] || 0) + Number(order.total_amount);
        }
      });

      const revenueChartData = Object.entries(revenueByDate)
        .map(([date, revenue]) => ({ date, revenue }))
        .slice(-14); // Last 14 days

      setRevenueData(revenueChartData);

      // Process order status distribution
      const statusCount: Record<string, number> = {};
      ordersData?.forEach(order => {
        statusCount[order.status] = (statusCount[order.status] || 0) + 1;
      });

      const statusChartData = Object.entries(statusCount).map(([status, count]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        count,
      }));

      setStatusData(statusChartData);

      // Process category performance
      const categoryStats: Record<string, { count: number; revenue: number }> = {};
      
      ordersData?.forEach(order => {
        try {
          const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
          if (Array.isArray(items)) {
            items.forEach((item: any) => {
              const category = item.category || 'Unknown';
              if (!categoryStats[category]) {
                categoryStats[category] = { count: 0, revenue: 0 };
              }
              categoryStats[category].count += item.quantity || 1;
              categoryStats[category].revenue += Number(item.price || 0) * (item.quantity || 1);
            });
          }
        } catch (e) {
          console.error('Error parsing order items:', e);
        }
      });

      const categoryChartData = Object.entries(categoryStats)
        .map(([category, stats]) => ({
          category: category.charAt(0).toUpperCase() + category.slice(1),
          count: stats.count,
          revenue: stats.revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 8); // Top 8 categories

      setCategoryData(categoryChartData);

      // Calculate total stats
      const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const totalOrders = ordersData?.length || 0;
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const totalProducts = productsData?.filter(p => p.is_active)?.length || 0;

      setTotalStats({
        totalRevenue,
        totalOrders,
        avgOrderValue,
        totalProducts,
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to load analytics data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalStats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Avg Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalStats.avgOrderValue.toFixed(0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="w-4 h-4" />
              Active Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends (Last 14 Days)</CardTitle>
          <CardDescription>Daily revenue performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--foreground))' }}
                tickFormatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Product Category Performance</CardTitle>
            <CardDescription>Revenue by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Orders by current status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count, percent }) => 
                    `${status}: ${count} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Items Sold Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Items Sold by Category</CardTitle>
          <CardDescription>Number of items sold per category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fill: 'hsl(var(--foreground))' }} />
              <YAxis 
                type="category" 
                dataKey="category" 
                tick={{ fill: 'hsl(var(--foreground))' }}
                width={120}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#10b981" name="Items Sold" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
