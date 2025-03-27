
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin,
  WhatsApp
} from 'lucide-react';
import { Lead } from '@/types/lead';

interface LeadTableProps {
  leads: Lead[];
  openLeadDetails: (lead: Lead, e?: React.MouseEvent) => void;
  getStatusColor: (status: string) => string;
  handleSendEmail: (email: string, e: React.MouseEvent) => void;
  handleCall: (phone: string, e: React.MouseEvent) => void;
  handleSendMessage: (lead: Lead, e: React.MouseEvent) => void;
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  openLeadDetails,
  getStatusColor,
  handleSendEmail,
  handleCall,
  handleSendMessage
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NAME</TableHead>
          <TableHead>CONTACT</TableHead>
          <TableHead>ADDRESS</TableHead>
          <TableHead>LAST CONTACT</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead, index) => (
          <TableRow key={index} className="cursor-pointer hover:bg-gray-50" onClick={(e) => openLeadDetails(lead, e)}>
            <TableCell>
              <div className="flex flex-col gap-2">
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
                <Badge className={getStatusColor(lead.status)} variant="outline">
                  {lead.status}
                </Badge>
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
            <TableCell>{lead.lastContact}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => handleSendEmail(lead.email, e)}
                  title="Send Email"
                >
                  <Mail className="h-4 w-4 text-blue-500" />
                </Button>
                <Button
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => handleCall(lead.phone, e)}
                  title="Call"
                >
                  <Phone className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => handleSendMessage(lead, e)}
                  title="WhatsApp"
                >
                  <WhatsApp className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeadTable;
