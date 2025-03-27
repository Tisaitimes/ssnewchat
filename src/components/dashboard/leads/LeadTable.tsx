
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MessagesSquare, 
  MoreVertical,
  MapPin,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lead } from '@/types/lead';

interface LeadTableProps {
  leads: Lead[];
  openLeadDetails: (lead: Lead, e?: React.MouseEvent) => void;
  openEditModal: (lead: Lead, e?: React.MouseEvent) => void;
  openDeleteDialog: (lead: Lead, e?: React.MouseEvent) => void;
  handleSendEmail: (email: string, e: React.MouseEvent) => void;
  handleCall: (phone: string, e: React.MouseEvent) => void;
  handleSendMessage: (lead: Lead, e: React.MouseEvent) => void;
  getStatusColor: (status: string) => string;
}

const LeadTable: React.FC<LeadTableProps> = ({
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NAME</TableHead>
          <TableHead>CONTACT</TableHead>
          <TableHead>ADDRESS</TableHead>
          <TableHead>LAST CONTACT</TableHead>
          <TableHead className="text-right">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead, index) => (
          <TableRow key={index} className="cursor-pointer hover:bg-gray-50" onClick={() => openLeadDetails(lead)}>
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
            <TableCell className="text-right">
              <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" onClick={(e) => handleSendMessage(lead, e)}>
                  <MessagesSquare className="h-4 w-4 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => handleSendEmail(lead.email, e)}>
                  <Mail className="h-4 w-4 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => handleCall(lead.phone, e)}>
                  <Phone className="h-4 w-4 text-gray-600" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => openLeadDetails(lead, e)}>
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeadTable;
