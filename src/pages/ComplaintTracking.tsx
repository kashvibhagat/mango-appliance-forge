import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, FileText, Clock, CheckCircle, XCircle, MessageSquare, Calendar, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface Complaint {
  id: string;
  complaint_number: string;
  category: string;
  subject: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  product_model: string;
  order_number?: string;
  admin_response?: string;
  resolution_notes?: string;
  attachment_url?: string;
}

const ComplaintTracking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<Complaint | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserComplaints();
    }
  }, [user]);

  const fetchUserComplaints = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('complaints' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints((data || []) as unknown as Complaint[]);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast({
        title: "Error loading complaints",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchComplaintById = async () => {
    if (!searchId.trim()) return;
    
    setSearchLoading(true);
    try {
      const { data, error } = await supabase
        .from('complaints' as any)
        .select('*')
        .eq('complaint_number', searchId.trim())
        .maybeSingle();

      if (error) {
        throw error;
      } else if (!data) {
        toast({
          title: "Complaint not found",
          description: "Please check the complaint ID and try again.",
          variant: "destructive",
        });
        setSearchResult(null);
      } else {
        setSearchResult(data as unknown as Complaint);
      }
    } catch (error) {
      console.error('Error searching complaint:', error);
      toast({
        title: "Error searching complaint",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <MessageSquare className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'closed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const ComplaintCard = ({ complaint }: { complaint: Complaint }) => (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {complaint.complaint_number}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {complaint.subject}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(complaint.status)}>
              {getStatusIcon(complaint.status)}
              <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
            </Badge>
            <Badge className={getPriorityColor(complaint.priority)}>
              {complaint.priority.toUpperCase()} Priority
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Product:</span>
              <p className="text-muted-foreground">{complaint.product_model}</p>
            </div>
            <div>
              <span className="font-medium">Category:</span>
              <p className="text-muted-foreground capitalize">
                {complaint.category.replace('-', ' ')}
              </p>
            </div>
            {complaint.order_number && (
              <div>
                <span className="font-medium">Order Number:</span>
                <p className="text-muted-foreground">{complaint.order_number}</p>
              </div>
            )}
            <div>
              <span className="font-medium">Created:</span>
              <p className="text-muted-foreground">{formatDate(complaint.created_at)}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">
              {complaint.description.length > 150
                ? `${complaint.description.substring(0, 150)}...`
                : complaint.description}
            </p>
          </div>

          {complaint.admin_response && (
            <>
              <Separator />
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm text-blue-900 mb-1">Admin Response:</h4>
                <p className="text-sm text-blue-700">{complaint.admin_response}</p>
              </div>
            </>
          )}

          {complaint.resolution_notes && (
            <>
              <Separator />
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm text-green-900 mb-1">Resolution:</h4>
                <p className="text-sm text-green-700">{complaint.resolution_notes}</p>
              </div>
            </>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              Updated: {formatDate(complaint.updated_at)}
            </div>
            {complaint.attachment_url && (
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={complaint.attachment_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Attachment
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Track Your Complaints</h1>
            <p className="text-muted-foreground mt-1">
              Monitor the status of your submitted complaints
            </p>
          </div>
        </div>

        {/* Search by Complaint ID */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-primary" />
              Search Complaint by ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter complaint ID (e.g., MNG-COMP-XXXX)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchComplaintById()}
                className="flex-1"
              />
              <Button onClick={searchComplaintById} disabled={searchLoading}>
                {searchLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Result */}
        {searchResult && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Search Result</h2>
            <ComplaintCard complaint={searchResult} />
          </div>
        )}

        {/* User's Complaints */}
        {user && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Your Complaints ({complaints.length})
              </h2>
              <Link to="/complaint-booking">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  File New Complaint
                </Button>
              </Link>
            </div>

            {loading ? (
              <LoadingSkeleton variant="card" count={3} />
            ) : complaints.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No complaints found
                </h3>
                <p className="text-muted-foreground mb-6">
                  You haven't filed any complaints yet.
                </p>
                <Link to="/complaint-booking">
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    File Your First Complaint
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid gap-6">
                {complaints.map((complaint) => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Not logged in */}
        {!user && (
          <Card className="p-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sign in to view your complaints
            </h3>
            <p className="text-muted-foreground mb-6">
              Log in to access your complaint history and file new complaints.
            </p>
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </Card>
        )}

        {/* Support Info */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-foreground">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>support@mangoappliances.com</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Mon-Sat, 9 AM - 6 PM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintTracking;