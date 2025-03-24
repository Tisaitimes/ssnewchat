import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Download,
  Upload,
  Star,
  Phone,
  Mail,
  Tag,
  MoreHorizontal,
  MessageSquare,
  Calendar,
  PlusCircle,
  Edit,
  Trash,
  X
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'prospect' | 'customer';
  source: 'whatsapp' | 'facebook' | 'website' | 'referral' | 'other';
  lastContact: string;
  notes?: string;
  tags: string[];
  owner?: string;
  score: number;
};

const LeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+15551234567',
      email: 'john.doe@example.com',
      status: 'new',
      source: 'whatsapp',
      lastContact: '2023-11-15',
      notes: 'Interested in product A',
      tags: ['hot', 'marketing'],
      owner: 'Jane Smith',
      score: 75,
    },
    {
      id: '2',
      name: 'Alice Johnson',
      phone: '+15559876543',
      email: 'alice.johnson@example.com',
      status: 'contacted',
      source: 'facebook',
      lastContact: '2023-11-10',
      notes: 'Asked for a demo',
      tags: ['demo', 'sales'],
      owner: 'Bob Williams',
      score: 50,
    },
    {
      id: '3',
      name: 'Bob Williams',
      phone: '+15551112233',
      email: 'bob.williams@example.com',
      status: 'qualified',
      source: 'website',
      lastContact: '2023-11-05',
      notes: 'Downloaded the ebook',
      tags: ['ebook', 'marketing'],
      owner: 'Jane Smith',
      score: 90,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  
  const filteredLeads = leads.filter(lead => {
    const searchRegex = new RegExp(searchQuery, 'i');
    const statusMatch = statusFilter === 'all' || lead.status === statusFilter;
    const sourceMatch = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return searchRegex.test(lead.name) && statusMatch && sourceMatch;
  });
  
  const handleClearFilters = () => {
    setStatusFilter('all');
    setSourceFilter('all');
    setSearchQuery('');
  };

  const handleExportLeads = () => {
    toast.info('Exporting leads feature coming soon');
  };

  const handleImportLeads = () => {
    toast.info('Importing leads feature coming soon');
  };

  const handleAddTag = (leadId: string, tag: string) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, tags: [...lead.tags, tag] } : lead
    ));
    toast.success(`Tag "${tag}" added to lead`);
  };

  const handleRemoveTag = (leadId: string, tag: string) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, tags: lead.tags.filter(t => t !== tag) } : lead
    ));
    toast.success(`Tag "${tag}" removed from lead`);
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    toast.success(`Lead status updated to ${newStatus}`);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'contacted': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'qualified': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'prospect': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'customer': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return '';
    }
  };
  
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'facebook': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'website': return <Globe className="h-4 w-4 text-purple-500" />;
      case 'referral': return <UserPlus className="h-4 w-4 text-orange-500" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-green-500" />
                Lead Management
              </CardTitle>
              <CardDescription>
                Manage, track, and convert your leads into customers
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleImportLeads}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" onClick={handleExportLeads}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => toast.info('Create lead feature coming soon')}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Leads</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="qualified">Qualified</TabsTrigger>
              <TabsTrigger value="prospects">Prospects</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-2 md:space-y-0">
            <div className="flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search leads..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="prospect">Prospects</SelectItem>
                  <SelectItem value="customer">Customers</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Source Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" onClick={handleClearFilters} size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${lead.name}`} />
                        <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="mr-1">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(lead.status)}`}>
                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusChange(lead.id, 'new')}>New</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(lead.id, 'contacted')}>Contacted</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(lead.id, 'qualified')}>Qualified</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(lead.id, 'prospect')}>Prospect</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(lead.id, 'customer')}>Customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getSourceIcon(lead.source)}
                      <span>{lead.source.charAt(0).toUpperCase() + lead.source.slice(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.lastContact}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.info('Edit lead feature coming soon')}>
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info('View lead details coming soon')}>
                          <Search className="h-4 w-4 mr-2" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAddTag(lead.id, 'newtag')}>
                          <Tag className="h-4 w-4 mr-2" />
                          <span>Add Tag</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteBot(lead.id)}>
                          <Trash className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CRM Integration</CardTitle>
            <CardDescription>
              Connect your CRM to sync leads and customer data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 22L3 17V7L12 2L21 7V17L12 22ZM12 4.441L5 8.41V15.59L12 19.559L19 15.59V8.41L12 4.441Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Salesforce</h3>
                    <p className="text-sm text-muted-foreground">
                      Sync contacts, leads, and deals with Salesforce
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => toast.info('Salesforce integration coming soon')}>Connect</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.044 7.937C19.044 7.37 18.978 6.818 18.853 6.292C20.342 7.141 21.363 8.689 21.363 10.466C21.363 11.819 20.752 13.025 19.8 13.858C20.324 13.052 20.636 12.088 20.636 11.051C20.636 9.535 20.023 8.144 19.044 7.169V7.937ZM11.813 2.599C13.858 2.599 15.659 3.596 16.683 5.106C16.261 5.02 15.824 4.973 15.376 4.973C12.558 4.973 10.164 6.853 9.543 9.396C9.101 9.268 8.642 9.192 8.161 9.192C5.136 9.192 2.684 11.551 2.684 14.448C2.684 17.344 5.136 19.704 8.161 19.704C8.336 19.704 8.511 19.704 8.676 19.685C9.551 20.807 11.05 21.535 12.702 21.535C15.09 21.535 17.118 20.02 17.72 17.955H17.839C20.561 17.955 22.789 15.814 22.789 13.182C22.789 10.798 20.954 8.818 18.527 8.504C17.863 5.177 15.113 2.599 11.813 2.599Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">HubSpot</h3>
                    <p className="text-sm text-muted-foreground">
                      Two-way sync with HubSpot CRM
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => toast.info('HubSpot integration coming soon')}>Connect</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.95 6.766a5.304 5.304 0 00-2.716-2.716C16.1 3.6 14.76 3.335 12 3.335s-4.1.266-5.234.715a5.304 5.304 0 00-2.716 2.716C3.6 7.9 3.335 9.24 3.335 12s.266 4.1.715 5.234a5.304 5.304 0 002.716 2.716c1.134.45 2.474.715 5.234.715s4.1-.266 5.234-.715a5.304 5.304 0 002.716-2.716c.45-1.134.715-2.474.715-5.234s-.266-4.1-.715-5.234z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Pipedrive</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your sales pipeline with Pipedrive
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => toast.info('Pipedrive integration coming soon')}>Connect</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Lead Capture</CardTitle>
            <CardDescription>
              Configure lead capture settings and forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-medium">WhatsApp Lead Capture</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically create leads from incoming WhatsApp messages
                  </p>
                </div>
                <Switch defaultChecked id="whatsapp-lead-capture" />
              </div>
              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-medium">Website Lead Forms</h3>
                  <p className="text-sm text-muted-foreground">
                    Create customizable lead capture forms for your website
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info('Web forms feature coming soon')}>
                  Configure
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Lead Scoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Set criteria for automatic lead scoring
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info('Lead scoring config coming soon')}>
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Add the missing Globe icon
const Globe = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const handleDeleteBot = (botId: string) => {
    toast.success('Bot deleted successfully');
  };

export default LeadManagement;
