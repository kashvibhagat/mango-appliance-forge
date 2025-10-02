import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Shield, FileText, CheckCircle, Clock, XCircle, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface WarrantyRegistration {
  id: string;
  serial_number: string;
  product_model: string;
  date_of_purchase: string;
  customer_name: string;
  customer_mobile: string;
  bill_upload_url: string | null;
  status: string;
  admin_notes: string | null;
  admin_approved: boolean;
  created_at: string;
}

export const WarrantyManagementTab = () => {
  const [warranties, setWarranties] = useState<WarrantyRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyRegistration | null>(null);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchWarranties();
  }, []);

  const fetchWarranties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('warranty_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWarranties(data || []);
    } catch (error) {
      console.error('Error fetching warranties:', error);
      toast({
        title: 'Error',
        description: 'Failed to load warranty registrations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateWarrantyStatus = async (id: string, status: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('warranty_registrations')
        .update({ status, admin_approved: approved })
        .eq('id', id);

      if (error) throw error;

      setWarranties(warranties.map(w => 
        w.id === id ? { ...w, status, admin_approved: approved } : w
      ));

      toast({
        title: 'Success',
        description: 'Warranty status updated successfully',
      });
    } catch (error) {
      console.error('Error updating warranty:', error);
      toast({
        title: 'Error',
        description: 'Failed to update warranty status',
        variant: 'destructive',
      });
    }
  };

  const handleAddNotes = (warranty: WarrantyRegistration) => {
    setSelectedWarranty(warranty);
    setAdminNotes(warranty.admin_notes || '');
    setNotesDialogOpen(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedWarranty) return;

    try {
      const { error } = await supabase
        .from('warranty_registrations')
        .update({ admin_notes: adminNotes })
        .eq('id', selectedWarranty.id);

      if (error) throw error;

      setWarranties(warranties.map(w => 
        w.id === selectedWarranty.id ? { ...w, admin_notes: adminNotes } : w
      ));

      toast({
        title: 'Success',
        description: 'Notes saved successfully',
      });

      setNotesDialogOpen(false);
      setSelectedWarranty(null);
      setAdminNotes('');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: 'Error',
        description: 'Failed to save notes',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <Card className="bg-white border border-border/60 shadow-sm animate-pulse">
        <CardContent className="h-96 p-6">
          <div className="h-full bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-white border border-border/60 shadow-sm">
        <CardHeader className="border-b border-border/40 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">
                Warranty Management
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                View and manage product warranty registrations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-b">
                  <TableHead className="font-semibold text-foreground py-4">Serial Number</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Product Model</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Customer</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Contact</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Purchase Date</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Bill</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Submitted</TableHead>
                  <TableHead className="font-semibold text-foreground py-4 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warranties.map((warranty) => (
                  <TableRow key={warranty.id} className="hover:bg-muted/20 border-b border-border/30 transition-colors">
                    <TableCell className="py-4">
                      <code className="bg-muted/50 px-2 py-1 rounded text-sm font-mono">
                        {warranty.serial_number}
                      </code>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-medium text-foreground">
                        {warranty.product_model}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm">{warranty.customer_name}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm text-muted-foreground">
                        {warranty.customer_mobile || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm">
                        {new Date(warranty.date_of_purchase).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {warranty.bill_upload_url ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const { data } = supabase.storage
                              .from('warranty-bills')
                              .getPublicUrl(warranty.bill_upload_url!);
                            window.open(data.publicUrl, '_blank');
                          }}
                          className="gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">No bill</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={`${getStatusColor(warranty.status)} gap-1 capitalize font-medium`}>
                        {getStatusIcon(warranty.status)}
                        {warranty.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm text-muted-foreground">
                        {new Date(warranty.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {warranty.status === 'pending' ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateWarrantyStatus(warranty.id, 'approved', true)}
                            className="bg-success hover:bg-success/90 text-white gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateWarrantyStatus(warranty.id, 'rejected', false)}
                            className="gap-1"
                          >
                            <XCircle className="w-4 h-4" />
                            Deny
                          </Button>
                        </div>
                      ) : (
                        <Badge className={`${getStatusColor(warranty.status)} capitalize`}>
                          {warranty.status}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {warranties.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No warranty registrations yet
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Warranty registrations submitted by customers will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes Dialog */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Admin Notes
            </DialogTitle>
            <DialogDescription>
              Add internal notes about this warranty registration.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about this warranty registration..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
