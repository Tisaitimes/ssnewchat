
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search,
  Download,
  Upload,
  MessageSquare,
  MoreVertical,
  Mail,
  Phone,
  MessagesSquare
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AddLeadModal from '@/components/dashboard/modals/AddLeadModal';
import { toast } from 'sonner';

const LeadManagement = () => {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [leads, setLeads] = useState([
    {
      initials: 'SJ',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      status: 'New',
      source: 'Website',
      created: '2025-06-01',
      lastContact: '2025-06-01'
    },
    {
      initials: 'MR',
      name: 'Michael Roberts',
      email: 'michael.roberts@example.com',
      phone: '+1 (555) 234-5678',
      status: 'Connected',
      source: 'WhatsApp Campaign',
      created: '2025-05-28',
      lastContact: '2025-06-02'
    },
    {
      initials: 'JW',
      name: 'Jessica Wilson',
      email: 'jessica.wilson@example.com',
      phone: '+1 (555) 345-6789',
      status: 'Qualified',
      source: 'Referral',
      created: '2025-05-25',
      lastContact: '2025-06-03'
    },
    {
      initials: 'DA',
      name: 'David Anderson',
      email: 'david.anderson@example.com',
      phone: '+1 (555) 456-7890',
      status: 'Proposal',
      source: 'WhatsApp Bot',
      created: '2025-05-20',
      lastContact: '2025-06-04'
    },
    {
      initials: 'ET',
      name: 'Emily Thompson',
      email: 'emily.thompson@example.com',
      phone: '+1 (555) 567-8901',
      status: 'Converted',
      source: 'Website',
      created: '2025-05-15',
      lastContact: '2025-06-05'
    },
    {
      initials: 'JW',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      phone: '+1 (555) 678-9012',
      status: 'Lost',
      source: 'WhatsApp Campaign',
      created: '2025-05-10',
      lastContact: '2025-06-06'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'connected': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'proposal': return 'bg-orange-100 text-orange-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddLead = (newLead: any) => {
    setLeads([newLead, ...leads]);
    toast.success("Lead added successfully");
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success("Leads imported successfully");
    }
  };

  const handleExport = () => {
    const csv = [
      'Name,Email,Phone,Status,Source,Created,Last Contact',
      ...leads.map(lead => 
        `${lead.name},${lead.email},${lead.phone},${lead.status},${lead.source},${lead.created},${lead.lastContact}`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    
    toast.success("Leads exported successfully");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddLeadModalOpen(true)} className="bg-green-500 hover:bg-green-600">
            + Add New Lead
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search leads..." className="pl-10" />
        </div>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="connected">Connected</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
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
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead>CONTACT</TableHead>
                <TableHead>SOURCE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>CREATED</TableHead>
                <TableHead>LAST CONTACT</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {lead.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{lead.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3.5 w-3.5 mr-1" />
                        {lead.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        {lead.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(lead.status)} variant="outline">
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.created}</TableCell>
                  <TableCell>{lead.lastContact}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <MessagesSquare className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
