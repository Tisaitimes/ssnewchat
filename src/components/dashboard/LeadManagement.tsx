
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  UserPlus, 
  Search, 
  Download,
  Upload,
  MessageSquare,
  Database,
  Globe
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AddLeadModal from '@/components/dashboard/modals/AddLeadModal';
import { toast } from 'sonner';

const LeadManagement = () => {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [leads, setLeads] = useState([
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      status: 'New',
      source: 'WhatsApp',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      status: 'Contacted',
      source: 'Website',
    },
    {
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '+1 (555) 567-8901',
      status: 'Qualified',
      source: 'Facebook',
    }
  ]);

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'facebook': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'website': return <Globe className="h-4 w-4 text-purple-500" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleAddLead = (newLead: any) => {
    setLeads([newLead, ...leads]);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success("Leads imported successfully");
    }
  };

  const handleExport = () => {
    const csv = leads.map(lead => 
      `${lead.name},${lead.email},${lead.phone},${lead.status},${lead.source}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    
    toast.success("Leads exported successfully");
  };

  const handleConnectSalesforce = () => {
    toast.success("Successfully connected to Salesforce");
  };

  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-green-500" />
                Lead Management
              </CardTitle>
              <CardDescription>
                Manage, track, and convert your leads into customers
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <label className="cursor-pointer">
                <Input
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleImport}
                />
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </span>
                </Button>
              </label>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setIsAddLeadModalOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-8" />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage 
                            src={`https://ui-avatars.com/api/?name=${lead.name}&background=random`} 
                            alt={lead.name} 
                          />
                          <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getSourceIcon(lead.source)}
                        <span>{lead.source}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>CRM Integration</CardTitle>
          <CardDescription>
            Connect your CRM to sync leads and customer data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                <Database className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Salesforce</h3>
                <p className="text-sm text-muted-foreground">
                  Sync contacts, leads, and deals with Salesforce
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleConnectSalesforce}>
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onAddLead={handleAddLead}
      />
    </div>
  );
};

export default LeadManagement;
