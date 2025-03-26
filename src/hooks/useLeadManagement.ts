
import { useState } from 'react';
import { Lead } from '@/types/lead';
import { toast } from 'sonner';

export const useLeadManagement = (initialLeads: Lead[]) => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLeadDetailsOpen, setIsLeadDetailsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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
    // Create a deep copy to prevent reference issues
    const leadCopy = JSON.parse(JSON.stringify(lead));
    setSelectedLead(leadCopy);
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
    // Make sure we completely clear the selectedLead state
    setTimeout(() => {
      setSelectedLead(null);
    }, 0);
  };

  return {
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
  };
};

// Import the CSV generation utility
import { generateCsv } from '@/components/dashboard/leads/utils/leadUtils';

export default useLeadManagement;
