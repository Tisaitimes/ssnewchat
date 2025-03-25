
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Edit } from 'lucide-react';
import { Lead } from '@/types/lead';

interface LeadDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  getStatusColor: (status: string) => string;
  onEdit: () => void;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({
  isOpen,
  onOpenChange,
  lead,
  getStatusColor,
  onEdit
}) => {
  if (!lead) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
              {lead.avatarUrl ? (
                <AvatarImage src={lead.avatarUrl} alt={lead.name} />
              ) : (
                <AvatarFallback className="text-xl">{lead.initials}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{lead.name}</h3>
              <Badge className={getStatusColor(lead.status)} variant="outline">
                {lead.status}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
              <div className="mt-2 grid gap-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <span>{lead.address || 'No address provided'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Lead Information</h4>
              <div className="mt-2 space-y-2">
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">Created:</span>
                  <span>{lead.created}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-500">Last Contact:</span>
                  <span>{lead.lastContact}</span>
                </div>
              </div>
            </div>
            
            {lead.notes && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                <p className="mt-2 text-gray-700">{lead.notes}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button className="flex-1" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Lead
            </Button>
            <Button className="flex-1" variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetails;
