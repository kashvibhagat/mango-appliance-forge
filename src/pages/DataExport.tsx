import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2, Shield, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Navigate } from 'react-router-dom';

const DataExport = () => {
  const { user } = useAuth();
  const [exporting, setExporting] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const exportUserData = async () => {
    setExporting(true);
    try {
      // Fetch all user data
      const [profileData, addressesData, ordersData, wishlistData, warrantyData, complaintsData] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).single(),
        supabase.from('user_addresses').select('*').eq('user_id', user.id),
        supabase.from('orders').select('*').eq('user_id', user.id),
        supabase.from('wishlists').select('*').eq('user_id', user.id),
        supabase.from('warranty_registrations').select('*').eq('user_id', user.id),
        supabase.from('complaints').select('*').eq('user_id', user.id),
      ]);

      const userData = {
        export_date: new Date().toISOString(),
        user_id: user.id,
        email: user.email,
        account_created: user.created_at,
        profile: profileData.data,
        addresses: addressesData.data,
        orders: ordersData.data,
        wishlist: wishlistData.data,
        warranty_registrations: warrantyData.data,
        complaints: complaintsData.data,
      };

      // Create downloadable JSON file
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mango-appliances-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Your data has been exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Export Your Data</h1>
        <p className="text-muted-foreground">
          Download a copy of all your personal data in compliance with DPDP Act, 2023
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Export Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Your Data
            </CardTitle>
            <CardDescription>
              Export all your personal information, orders, addresses, and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h3 className="font-medium text-sm">Your export will include:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Profile information (name, phone, email)</li>
                <li>• Saved delivery addresses</li>
                <li>• Order history and transaction details</li>
                <li>• Wishlist items</li>
                <li>• Warranty registrations</li>
                <li>• Customer service complaints and inquiries</li>
              </ul>
            </div>

            <Button 
              onClick={exportUserData} 
              disabled={exporting}
              className="w-full"
              size="lg"
            >
              {exporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing Export...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export My Data (JSON)
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Your Privacy Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                Under the Digital Personal Data Protection Act, 2023 (DPDP Act), you have the right to:
              </p>
              <ul className="ml-4 space-y-2">
                <li>• Access all your personal data we have stored</li>
                <li>• Request correction of inaccurate data</li>
                <li>• Request deletion of your data (right to be forgotten)</li>
                <li>• Withdraw consent for data processing</li>
                <li>• Nominate another person to exercise your rights</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights or for data-related queries, contact us at{' '}
                <a href="mailto:privacy@mangoappliances.com" className="text-accent hover:underline">
                  privacy@mangoappliances.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Options Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Additional Data Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-1">Data Deletion Request</h4>
                <p className="text-muted-foreground text-xs mb-2">
                  Permanently delete your account and all associated data
                </p>
                <Button variant="destructive" size="sm">
                  Request Account Deletion
                </Button>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-1">Data Correction Request</h4>
                <p className="text-muted-foreground text-xs mb-2">
                  Request correction of inaccurate personal information
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:privacy@mangoappliances.com?subject=Data Correction Request">
                    Contact Privacy Team
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataExport;
