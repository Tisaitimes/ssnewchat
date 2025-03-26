
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LeadTable from '@/components/dashboard/leads/LeadTable';
import { Lead } from '@/types/lead';

interface LeadTableContainerProps {
  leads: Lead[];
  openLeadDetails: (lead: Lead, e?: React.MouseEvent) => void;
  openEditModal: (lead: Lead, e?: React.MouseEvent) => void;
  openDeleteDialog: (lead: Lead, e?: React.MouseEvent) => void;
  handleSendEmail: (email: string, e: React.MouseEvent) => void;
  handleCall: (phone: string, e: React.MouseEvent) => void;
  handleSendMessage: (lead: Lead, e: React.MouseEvent) => void;
  getStatusColor: (status: string) => string;
}

const LeadTableContainer: React.FC<LeadTableContainerProps> = ({
  leads,
  openLeadDetails,
  openEditModal,
  openDeleteDialog,
  handleSendEmail,
  handleCall,
  handleSendMessage,
  getStatusColor
}) => {
  return (
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
  );
};

export default LeadTableContainer;
