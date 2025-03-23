
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Ticket, Search, Filter, UserPlus, MessageSquare, Clock, Calendar, CheckCircle, AlertCircle, Clock as ClockIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type TicketItem = {
  id: string;
  subject: string;
  customer: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned: string;
  created: string;
  updated: string;
};

const TicketSystem = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([
    {
      id: 'TKT-1001',
      subject: 'Cannot connect WhatsApp account',
      customer: 'John Smith',
      status: 'open',
      priority: 'high',
      assigned: 'Sarah Johnson',
      created: '2023-10-05 09:23:14',
      updated: '2023-10-05 10:45:22'
    },
    {
      id: 'TKT-1002',
      subject: 'Billing issue with subscription',
      customer: 'Emily Davis',
      status: 'pending',
      priority: 'medium',
      assigned: 'Michael Chen',
      created: '2023-10-04 14:32:40',
      updated: '2023-10-05 08:18:37'
    },
    {
      id: 'TKT-1003',
      subject: 'Chatbot not responding correctly',
      customer: 'Robert Wilson',
      status: 'open',
      priority: 'urgent',
      assigned: 'Unassigned',
      created: '2023-10-05 11:15:08',
      updated: '2023-10-05 11:15:08'
    },
    {
      id: 'TKT-1004',
      subject: 'How to export chat history?',
      customer: 'Maria Rodriguez',
      status: 'resolved',
      priority: 'low',
      assigned: 'David Wilson',
      created: '2023-10-03 15:23:14',
      updated: '2023-10-04 12:45:22'
    },
    {
      id: 'TKT-1005',
      subject: 'Feature request: Add survey option',
      customer: 'James Brown',
      status: 'closed',
      priority: 'medium',
      assigned: 'Sarah Johnson',
      created: '2023-10-02 10:23:14',
      updated: '2023-10-03 09:45:22'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return '';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return '';
    }
  };

  const getTicketStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed': return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: 'open' | 'pending' | 'resolved' | 'closed') => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: newStatus, 
            updated: new Date().toISOString().replace('T', ' ').split('.')[0]
          } 
        : ticket
    ));
    toast.success(`Ticket ${ticketId} updated to ${newStatus}`);
  };

  const handleAssignTicket = (ticketId: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            assigned: 'Sarah Johnson', // In a real app, this would be the current user or selected agent
            updated: new Date().toISOString().replace('T', ' ').split('.')[0]
          } 
        : ticket
    ));
    toast.success(`Ticket ${ticketId} assigned to Sarah Johnson`);
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-purple-500" />
                Ticket System
              </CardTitle>
              <CardDescription>
                Manage and respond to customer support tickets
              </CardDescription>
            </div>
            <Button onClick={() => toast.info('Creating new support ticket')}>
              Create Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9" 
                  placeholder="Search tickets..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => toast.info('Filter dialog opening')}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    Open
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {tickets.filter(ticket => ticket.status === 'open').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-yellow-500" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {tickets.filter(ticket => ticket.status === 'pending').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Resolved
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {tickets.filter(ticket => ticket.status === 'resolved').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-500" />
                    Closed
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {tickets.filter(ticket => ticket.status === 'closed').length}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="cursor-pointer" onClick={() => toast.info(`Opening ticket ${ticket.id}`)}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {getTicketStatusIcon(ticket.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(ticket.status)}`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{ticket.assigned}</TableCell>
                    <TableCell>{ticket.created.split(' ')[0]}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info(`Responding to ticket ${ticket.id}`);
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        {ticket.assigned === 'Unassigned' && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignTicket(ticket.id);
                            }}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        )}
                        {ticket.status === 'open' && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateTicketStatus(ticket.id, 'resolved');
                            }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              Quick Reply
            </CardTitle>
            <CardDescription>
              Respond to a ticket quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ticket ID</label>
                <Input placeholder="Enter ticket ID (e.g., TKT-1001)" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Response</label>
                <Textarea 
                  placeholder="Type your response..." 
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Save as Template</Button>
                <Button onClick={() => toast.success('Response sent successfully')}>
                  Send Response
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest ticket updates and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Ticket TKT-1004 was resolved by David Wilson
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 12:45 PM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    New ticket TKT-1003 created by Robert Wilson
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 11:15 AM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <UserPlus className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Ticket TKT-1002 assigned to Michael Chen
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 08:18 AM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Sarah Johnson responded to ticket TKT-1001
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 10:45 AM
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketSystem;
