
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
  MessagesSquare,
  Edit,
  Trash2,
  MapPin
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AddLeadModal from '@/components/dashboard/modals/AddLeadModal';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface Lead {
  id?: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: string;
  source: string;
  created: string;
  lastContact: string;
  notes?: string;
  avatarUrl?: string;
}

const LeadManagement = () => {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLeadDetailsOpen, setIsLeadDetailsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>([
    {
      initials: 'SJ',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, San Francisco, CA',
      status: 'New',
      source: 'Website',
      created: '2025-06-01',
      lastContact: '2025-06-01',
      notes: 'Interested in premium plan'
    },
    {
      initials: 'MR',
      name: 'Michael Roberts',
      email: 'michael.roberts@example.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA',
      status: 'Connected',
      source: 'WhatsApp Campaign',
      created: '2025-05-28',
      lastContact: '2025-06-02',
      notes: 'Follow up about pricing'
    },
    {
      initials: 'JW',
      name: 'Jessica Wilson',
      email: 'jessica.wilson@example.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine Rd, San Diego, CA',
      status: 'Qualified',
      source: 'Referral',
      created: '2025-05-25',
      lastContact: '2025-06-03',
      notes: 'Ready for product demo'
    },
    {
      initials: 'DA',
      name: 'David Anderson',
      email: 'david.anderson@example.com',
      phone: '+1 (555) 456-7890',
      address: '101 Maple Dr, Sacramento, CA',
      status: 'Proposal',
      source: 'WhatsApp Bot',
      created: '2025-05-20',
      lastContact: '2025-06-04',
      notes: 'Sent proposal document'
    },
    {
      initials: 'ET',
      name: 'Emily Thompson',
      email: 'emily.thompson@example.com',
      phone: '+1 (555) 567-8901',
      address: '202 Cedar Ln, Oakland, CA',
      status: 'Converted',
      source: 'Website',
      created: '2025-05-15',
      lastContact: '2025-06-05',
      notes: 'Completed onboarding'
    },
    {
      initials: 'JW',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      phone: '+1 (555) 678-9012',
      address: '303 Elm Blvd, San Jose, CA',
      status: 'Lost',
      source: 'WhatsApp Campaign',
      created: '2025-05-10',
      lastContact: '2025-06-06',
      notes: 'Chose competitor product'
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

  const handleAddLead = (newLead: Lead) => {
    setLeads([newLead, ...leads]);
    toast.success("Lead added successfully");
  };

  const handleEditLead = (updatedLead: Lead) => {
    setLeads(leads.map(lead => 
      lead.name === selectedLead?.name ? updatedLead : lead
    ));
    setIsEditLeadModalOpen(false);
    setSelectedLead(null);
    toast.success("Lead updated successfully");
  };

  const handleDeleteLead = () => {
    if (selectedLead) {
      setLeads(leads.filter(lead => lead.name !== selectedLead.name));
      setIsDeleteDialogOpen(false);
      setSelectedLead(null);
      toast.success("Lead deleted successfully");
    }
  };

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsLeadDetailsOpen(true);
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditLeadModalOpen(true);
  };

  const openDeleteDialog = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteDialogOpen(true);
  };

  const handleSendEmail = (email: string) => {
    window.open(`mailto:${email}`);
    toast.success(`Email client opened for ${email}`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
    toast.success(`Calling ${phone}`);
  };

  const handleSendMessage = (lead: Lead) => {
    toast.success(`Sending message to ${lead.name}`);
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
                <TableHead>ADDRESS</TableHead>
                <TableHead>SOURCE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>CREATED</TableHead>
                <TableHead>LAST CONTACT</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead, index) => (
                <TableRow key={index} className="cursor-pointer hover:bg-gray-50" onClick={() => openLeadDetails(lead)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {lead.avatarUrl ? (
                          <AvatarImage src={lead.avatarUrl} alt={lead.name} />
                        ) : (
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            {lead.initials}
                          </AvatarFallback>
                        )}
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
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {lead.address || 'N/A'}
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
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" onClick={() => handleSendMessage(lead)}>
                        <MessagesSquare className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleSendEmail(lead.email)}>
                        <Mail className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleCall(lead.phone)}>
                        <Phone className="h-4 w-4 text-gray-600" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(lead)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(lead)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

      {selectedLead && (
        <>
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Lead</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {selectedLead.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteLead} className="bg-red-500 text-white hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Sheet open={isLeadDetailsOpen} onOpenChange={setIsLeadDetailsOpen}>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Lead Details</SheetTitle>
                <SheetDescription>
                  View complete information about this lead.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <div className="flex items-center mb-6">
                  <Avatar className="h-16 w-16 mr-4">
                    {selectedLead.avatarUrl ? (
                      <AvatarImage src={selectedLead.avatarUrl} alt={selectedLead.name} />
                    ) : (
                      <AvatarFallback className="text-xl">{selectedLead.initials}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedLead.name}</h3>
                    <Badge className={getStatusColor(selectedLead.status)} variant="outline">
                      {selectedLead.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div className="mt-2 grid gap-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{selectedLead.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                        <span>{selectedLead.address || 'No address provided'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Lead Information</h4>
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-2">
                        <span className="text-gray-500">Source:</span>
                        <span>{selectedLead.source}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-gray-500">Created:</span>
                        <span>{selectedLead.created}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-gray-500">Last Contact:</span>
                        <span>{selectedLead.lastContact}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedLead.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="mt-2 text-gray-700">{selectedLead.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button className="flex-1" onClick={() => openEditModal(selectedLead)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Lead
                  </Button>
                  <Button className="flex-1" variant="outline" onClick={() => setIsLeadDetailsOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
};

export default LeadManagement;
