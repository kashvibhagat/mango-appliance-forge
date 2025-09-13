import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  MessageSquare, 
  Shield, 
  User, 
  Eye,
  ArrowRight
} from "lucide-react";

interface RecentActivityProps {
  orders: any[];
  complaints: any[];
  warranties: any[];
  customers: any[];
  onViewOrder: (order: any) => void;
  onViewComplaint: (complaint: any) => void;
}

export const RecentActivity = ({ 
  orders, 
  complaints, 
  warranties, 
  customers,
  onViewOrder,
  onViewComplaint 
}: RecentActivityProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'approved': 
      case 'delivered': 
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': 
      case 'failed': 
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'shipped': 
      case 'in_transit': 
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Recent Orders */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm">#{order.order_number}</p>
                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  ₹{order.total_amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onViewOrder(order)}
                className="h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent orders</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Complaints */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-orange-600" />
            Recent Complaints
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {complaints.slice(0, 5).map((complaint) => (
            <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm">#{complaint.complaint_number}</p>
                  <Badge className={`text-xs ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {complaint.subject}
                </p>
                <p className="text-xs text-muted-foreground">
                  {complaint.customer_name} • {new Date(complaint.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onViewComplaint(complaint)}
                className="h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {complaints.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent complaints</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Warranties */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-green-600" />
            Recent Warranties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {warranties.slice(0, 5).map((warranty) => (
            <div key={warranty.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm">{warranty.product_model}</p>
                  <Badge className={`text-xs ${getStatusColor(warranty.status)}`}>
                    {warranty.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  SN: {warranty.serial_number}
                </p>
                <p className="text-xs text-muted-foreground">
                  {warranty.customer_name} • {new Date(warranty.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {warranties.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent warranties</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};