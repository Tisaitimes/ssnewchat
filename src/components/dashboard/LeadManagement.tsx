
import React from 'react';
import LeadToolbar from '@/components/dashboard/leads/LeadToolbar';
import LeadTableContainer from '@/components/dashboard/leads/LeadTableContainer';
import LeadModals from '@/components/dashboard/leads/LeadModals';
import { getStatusColor } from '@/components/dashboard/leads/utils/leadUtils';
import useLeadManagement from '@/hooks/useLeadManagement';

const LeadManagement = () => {
  // Sample data for initial leads
  const initialLeads = [
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
  ];

  // Use the hook to manage lead state and operations
  const {
    leads,
    isAddLeadModalOpen,
    setIsAddLeadModalOpen,
    isEditLeadModalOpen,
    isDeleteDialogOpen,
    isLeadDetailsOpen,
    selectedLead,
    handleAddLead,
    handleEditLead,
    handleDeleteLead,
    openLeadDetails,
    openEditModal,
    openDeleteDialog,
    handleSendEmail,
    handleCall,
    handleSendMessage,
    handleImport,
    handleExport,
    closeEditModal,
    setIsLeadDetailsOpen,
    setIsDeleteDialogOpen
  } = useLeadManagement(initialLeads);

  return (
    <div className="p-6">
      <LeadToolbar 
        onAddNew={() => setIsAddLeadModalOpen(true)}
        onExport={handleExport}
        onImport={handleImport}
      />

      <LeadTableContainer 
        leads={leads}
        openLeadDetails={openLeadDetails}
        openEditModal={openEditModal}
        openDeleteDialog={openDeleteDialog}
        handleSendEmail={handleSendEmail}
        handleCall={handleCall}
        handleSendMessage={handleSendMessage}
        getStatusColor={getStatusColor}
      />

      <LeadModals 
        isAddLeadModalOpen={isAddLeadModalOpen}
        isEditLeadModalOpen={isEditLeadModalOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isLeadDetailsOpen={isLeadDetailsOpen}
        selectedLead={selectedLead}
        handleAddLead={handleAddLead}
        handleEditLead={handleEditLead}
        handleDeleteLead={handleDeleteLead}
        closeEditModal={closeEditModal}
        setIsLeadDetailsOpen={setIsLeadDetailsOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        getStatusColor={getStatusColor}
        openEditModal={openEditModal}
        setIsAddLeadModalOpen={setIsAddLeadModalOpen}
      />
    </div>
  );
};

export default LeadManagement;
