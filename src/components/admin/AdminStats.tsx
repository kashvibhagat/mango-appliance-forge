import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  DollarSign,
  TrendingUp,
  Package,
  Shield,
  Truck
} from "lucide-react";

interface AdminStatsProps {
  orders: any[];
  customers: any[];
  complaints: any[];
  warranties: any[];
  shipments: any[];
}

export const AdminStats = ({ orders, customers, complaints, warranties, shipments }: AdminStatsProps) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const thisMonth = new Date();
  thisMonth.setDate(1);
  
  const newOrdersToday = orders.filter(o => new Date(o.created_at) > yesterday).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const monthlyRevenue = orders.filter(o => new Date(o.created_at) > thisMonth)
    .reduce((sum, order) => sum + order.total_amount, 0);
  const activeCustomers = customers.filter(c => !c.is_blocked).length;
  const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
  const pendingWarranties = warranties.filter(w => w.status === 'pending').length;
  const activeShipments = shipments.filter(s => s.status === 'in_transit').length;

  const stats = [
    {
      title: "New Orders (24h)",
      value: newOrdersToday,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%"
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8.5%"
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+3.2%"
    },
    {
      title: "Monthly Revenue",
      value: `₹${monthlyRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      change: "+15.3%"
    },
    {
      title: "Pending Complaints",
      value: pendingComplaints,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: pendingComplaints > 5 ? "High" : "Normal"
    },
    {
      title: "Pending Warranties",
      value: pendingWarranties,
      icon: Shield,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      change: pendingWarranties > 10 ? "High" : "Normal"
    },
    {
      title: "Active Shipments",
      value: activeShipments,
      icon: Truck,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      change: `${activeShipments} in transit`
    },
    {
      title: "Total Products",
      value: "45", // This would come from products data
      icon: Package,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      change: "Active inventory"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};