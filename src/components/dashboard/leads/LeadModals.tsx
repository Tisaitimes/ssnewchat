
import React from 'react';
import AddLeadModal from '@/components/dashboard/modals/AddLeadModal';
import LeadDetails from '@/components/dashboard/leads/LeadDetails';
import LeadDeleteDialog from '@/components/dashboard/leads/LeadDeleteDialog';
import { Lead } from '@/types/lead';

interface LeadModalsProps {
  isAddLeadModalOpen: boolean;
  isEditLeadModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  isLeadDetailsOpen: boolean;
  selectedLead: Lead | null;
  handleAddLead: (leadData: Lead) => void;
  handleEditLead: (updatedLead: Lead) => void;
  handleDeleteLead: () => void;
  closeEditModal: () => void;
  setIsLeadDetailsOpen: (open: boolean) => void;
  setIsDeleteDialogOpen: (open: boolean) => void;
  setIsAddLeadModalOpen: (open: boolean) => void;
  getStatusColor: (status: string) => string;
  openEditModal: (lead: Lead) => void;
  openDeleteDialog: (lead: Lead) => void;
}

const LeadModals: React.FC<LeadModalsProps> = ({
  isAddLeadModalOpen,
  isEditLeadModalOpen,
  isDeleteDialogOpen,
  isLeadDetailsOpen,
  selectedLead,
  handleAddLead,
  handleEditLead,
  handleDeleteLead,
  closeEditModal,
  setIsLeadDetailsOpen,
  setIsDeleteDialogOpen,
  setIsAddLeadModalOpen,
  getStatusColor,
  openEditModal,
  openDeleteDialog
}) => {
  return (
    <>
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

      {/* Using conditional rendering for the edit modal */}
      {isEditLeadModalOpen && selectedLead && (
        <AddLeadModal
          isOpen={isEditLeadModalOpen}
          onClose={closeEditModal}
          onAddLead={handleEditLead}
          initialData={selectedLead}
          isEditing={true}
        />
      )}
    </>
  );
};

export default LeadModals;
