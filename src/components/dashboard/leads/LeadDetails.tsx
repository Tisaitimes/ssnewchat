
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Edit, Calendar, Clock, FileText } from 'lucide-react';
import { Lead } from '@/types/lead';
import { useAuth } from '@/contexts/AuthContext';

interface LeadDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  getStatusColor: (status: string) => string;
  onEdit: () => void;
  onDelete?: () => void;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({
  isOpen,
  onOpenChange,
  lead,
  getStatusColor,
  onEdit
}) => {
  const { user } = useAuth();
  
  if (!lead) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Lead Details</SheetTitle>
          <SheetDescription>
            View complete information about this lead.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* Lead Profile Card */}
          <Card className="border-none shadow-md bg-gradient-to-br from-white to-gray-50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-sm">
                  {lead.avatarUrl ? (
                    <AvatarImage src={lead.avatarUrl} alt={lead.name} />
                  ) : (
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {lead.initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h3 className="text-xl font-bold mb-1">{lead.name}</h3>
                <Badge className={`${getStatusColor(lead.status)} px-3 py-1`} variant="outline">
                  {lead.status}
                </Badge>
                <p className="text-sm text-gray-500 mt-2">Source: {lead.source}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Contact Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-gray-800">{lead.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-gray-800">{lead.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 text-primary mt-0.5" />
                  <span className="text-gray-800">{lead.address || 'No address provided'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Lead Timeline */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Timeline
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-3 text-primary" />
                  <div>
                    <span className="text-sm text-gray-500">Created</span>
                    <p className="text-gray-800">{lead.created}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-3 text-primary" />
                  <div>
                    <span className="text-sm text-gray-500">Last Contact</span>
                    <p className="text-gray-800">{lead.lastContact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Notes */}
          {lead.notes && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    Notes
                  </div>
                </h4>
                <p className="text-gray-700 whitespace-pre-line">{lead.notes}</p>
              </CardContent>
            </Card>
          )}
          
          {/* Actions */}
          <div className="flex gap-3">
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
