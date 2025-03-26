
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import AddLeadModal from '@/components/dashboard/modals/AddLeadModal';
import LeadTable from '@/components/dashboard/leads/LeadTable';
import LeadDetails from '@/components/dashboard/leads/LeadDetails';
import LeadDeleteDialog from '@/components/dashboard/leads/LeadDeleteDialog';
import LeadToolbar from '@/components/dashboard/leads/LeadToolbar';
import { getStatusColor, generateCsv } from '@/components/dashboard/leads/utils/leadUtils';
import { Lead } from '@/types/lead';

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

  const handleAddLead = (newLead: Lead) => {
    setLeads([newLead, ...leads]);
    toast.success("Lead added successfully");
  };

  const handleEditLead = (updatedLead: Lead) => {
    setLeads(leads.map(lead => 
      lead.email === selectedLead?.email ? updatedLead : lead
    ));
    setIsEditLeadModalOpen(false);
    setSelectedLead(null);
    toast.success("Lead updated successfully");
  };

  const handleDeleteLead = () => {
    if (selectedLead) {
      setLeads(leads.filter(lead => lead.email !== selectedLead.email));
      setIsDeleteDialogOpen(false);
      setSelectedLead(null);
      toast.success("Lead deleted successfully");
    }
  };

  const openLeadDetails = (lead: Lead, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedLead({...lead});
    setIsLeadDetailsOpen(true);
  };

  const openEditModal = (lead: Lead, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Make a deep copy of the lead to prevent reference issues
    setSelectedLead(JSON.parse(JSON.stringify(lead)));
    setIsEditLeadModalOpen(true);
  };

  const openDeleteDialog = (lead: Lead, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedLead({...lead});
    setIsDeleteDialogOpen(true);
  };

  const handleSendEmail = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`mailto:${email}`);
    toast.success(`Email client opened for ${email}`);
  };

  const handleCall = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${phone}`);
    toast.success(`Calling ${phone}`);
  };

  const handleSendMessage = (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Sending message to ${lead.name}`);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success("Leads imported successfully");
    }
  };

  const handleExport = () => {
    const csv = generateCsv(leads);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    
    toast.success("Leads exported successfully");
  };

  const closeEditModal = () => {
    setIsEditLeadModalOpen(false);
    // Ensure we completely clear the selectedLead state when closing the modal
    setSelectedLead(null);
  };

  return (
    <div className="p-6">
      <LeadToolbar 
        onAddNew={() => setIsAddLeadModalOpen(true)}
        onExport={handleExport}
        onImport={handleImport}
      />

      <Card>
        <CardContent className="p-0">
          <LeadTable 
            leads={leads}
            openLeadDetails={openLeadDetails}
            openEditModal={openEditModal}
            openDeleteDialog={openDeleteDialog}
            handleSendEmail={handleSendEmail}
            handleCall={handleCall}
            handleSendMessage={handleSendMessage}
            getStatusColor={getStatusColor}
          />
        </CardContent>
      </Card>

      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onAddLead={handleAddLead}
      />

      {selectedLead && (
        <>
          <LeadDeleteDialog 
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            lead={selectedLead}
            onDelete={handleDeleteLead}
          />

          <LeadDetails 
            isOpen={isLeadDetailsOpen}
            onOpenChange={setIsLeadDetailsOpen}
            lead={selectedLead}
            getStatusColor={getStatusColor}
            onEdit={() => {
              setIsLeadDetailsOpen(false);
              openEditModal(selectedLead);
            }}
          />
        </>
      )}

      {/* Using a separate conditional for the edit modal */}
      {isEditLeadModalOpen && selectedLead && (
        <AddLeadModal
          isOpen={isEditLeadModalOpen}
          onClose={closeEditModal}
          onAddLead={handleEditLead}
          initialData={selectedLead}
          isEditing={true}
        />
      )}
    </div>
  );
};

export default LeadManagement;
