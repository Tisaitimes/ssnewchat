import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, PlayCircle, PauseCircle, PlusCircle, Settings, Timer, Calendar, Users, Clock, Trash2, MessageSquare, Filter, HelpCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateWorkflowDialog from './marketing/CreateWorkflowDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type AutomationWorkflow = {
  id: string;
  name: string;
  type: 'welcome' | 'follow-up' | 'promotional' | 'birthday' | 'abandoned-cart';
  status: 'active' | 'paused' | 'draft';
  triggers: number;
  conversions: number;
  lastModified: string;
  description?: string;
  audience?: string;
  triggerType?: string;
  messageContent?: string;
  scheduleDate?: string;
};

const MarketingAutomation = () => {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([
    {
      id: '1',
      name: 'Welcome Series',
      type: 'welcome',
      status: 'active',
      triggers: 243,
      conversions: 56,
      lastModified: '2023-06-15',
      description: 'Welcome series for new subscribers',
      audience: 'new',
      triggerType: 'immediate'
    },
    {
      id: '2',
      name: '24-Hour Follow-up',
      type: 'follow-up',
      status: 'active',
      triggers: 182,
      conversions: 43,
      lastModified: '2023-07-20',
      description: 'Follow up with leads after 24 hours',
      audience: 'all',
      triggerType: 'scheduled'
    },
    {
      id: '3',
      name: 'Summer Sale',
      type: 'promotional',
      status: 'paused',
      triggers: 520,
      conversions: 128,
      lastModified: '2023-08-05',
      description: 'Promotional campaign for summer sale',
      audience: 'all',
      triggerType: 'scheduled'
    },
    {
      id: '4',
      name: 'Customer Birthday',
      type: 'birthday',
      status: 'active',
      triggers: 75,
      conversions: 18,
      lastModified: '2023-09-12',
      description: 'Birthday wishes and special offers',
      audience: 'all',
      triggerType: 'event'
    },
    {
      id: '5',
      name: 'Abandoned Cart Recovery',
      type: 'abandoned-cart',
      status: 'draft',
      triggers: 0,
      conversions: 0,
      lastModified: '2023-10-03',
      description: 'Recover abandoned carts',
      audience: 'segment',
      triggerType: 'event'
    }
  ]);

  const [scheduledAutomations, setScheduledAutomations] = useState([
    {
      id: '1',
      name: 'Summer Sale Reminder',
      scheduled: 'tomorrow at 10:00 AM',
      type: 'promotional',
      status: 'pending',
      description: 'Sends a reminder about our summer sale to all customers',
      audience: 'All customers',
      messageContent: 'Don\'t miss our Summer Sale! Up to 50% off on selected items.',
    },
    {
      id: '2',
      name: 'Birthday Message: John Smith',
      scheduled: '06/28/2023 at 9:00 AM',
      type: 'birthday',
      status: 'pending',
      description: 'Birthday wishes and special offer for John Smith',
      audience: 'Individual customer',
      messageContent: 'Happy Birthday, John! Enjoy 20% off your next purchase with code BDAY20.',
    },
    {
      id: '3',
      name: '24-Hour Follow-up: New Signups',
      scheduled: 'Recurring daily at 3:00 PM',
      type: 'follow-up',
      status: 'recurring',
      description: 'Follows up with customers who signed up in the last 24 hours',
      audience: 'New signups',
      messageContent: 'Thank you for signing up! How can we help you get started?',
    }
  ]);

  const [isCreateWorkflowOpen, setIsCreateWorkflowOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<AutomationWorkflow | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [viewingAutomation, setViewingAutomation] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const toggleWorkflowStatus = (workflowId: string) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === workflowId) {
        const newStatus = workflow.status === 'active' ? 'paused' : 'active';
        toast.success(`Workflow "${workflow.name}" ${newStatus === 'active' ? 'activated' : 'paused'}`);
        return { ...workflow, status: newStatus as 'active' | 'paused' | 'draft' };
      }
      return workflow;
    }));
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return '';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'welcome': return <Users className="h-4 w-4 text-blue-500" />;
      case 'follow-up': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'promotional': return <Zap className="h-4 w-4 text-orange-500" />;
      case 'birthday': return <Calendar className="h-4 w-4 text-pink-500" />;
      case 'abandoned-cart': return <Timer className="h-4 w-4 text-red-500" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const deleteWorkflow = (workflowId: string) => {
    setWorkflows(workflows.filter(workflow => workflow.id !== workflowId));
    toast.success('Workflow deleted successfully');
  };

  const editWorkflow = (workflow: AutomationWorkflow) => {
    setSelectedWorkflow(workflow);
    setIsCreateWorkflowOpen(true);
  };

  const handleSaveWorkflow = (workflow: AutomationWorkflow) => {
    if (selectedWorkflow) {
      setWorkflows(workflows.map(w => w.id === workflow.id ? workflow : w));
      toast.success(`Workflow "${workflow.name}" updated`);
    } else {
      setWorkflows([workflow, ...workflows]);
      toast.success(`Workflow "${workflow.name}" created`);
    }
    setSelectedWorkflow(null);
  };

  const createQuickWorkflow = (type: string) => {
    const templateWorkflows = {
      welcome: {
        name: 'Welcome Series',
        type: 'welcome',
        status: 'draft',
        description: 'Welcome series for new subscribers',
        audience: 'new',
        triggerType: 'immediate',
        messageContent: 'Welcome to our community! We\'re excited to have you join us.'
      },
      abandoned: {
        name: 'Abandoned Cart Recovery',
        type: 'abandoned-cart',
        status: 'draft',
        description: 'Recover abandoned shopping carts',
        audience: 'segment',
        triggerType: 'event',
        eventType: 'abandoned',
        messageContent: 'Did you forget something? Your cart is still waiting for you.'
      },
      reengagement: {
        name: 'Re-engagement Campaign',
        type: 'follow-up',
        status: 'draft',
        description: 'Re-engage inactive users',
        audience: 'inactive',
        triggerType: 'scheduled',
        messageContent: 'We miss you! Come back and check what\'s new.'
      },
      birthday: {
        name: 'Birthday Rewards',
        type: 'birthday',
        status: 'draft',
        description: 'Send birthday wishes and special offers',
        audience: 'all',
        triggerType: 'event',
        eventType: 'birthday',
        messageContent: 'Happy Birthday! Here\'s a special gift just for you.'
      }
    };
    
    const templateKey = type === 'welcome' ? 'welcome' : 
                        type === 'abandoned-cart' ? 'abandoned' :
                        type === 're-engagement' ? 'reengagement' : 'birthday';
    
    const newWorkflow = {
      id: Date.now().toString(),
      ...templateWorkflows[templateKey as keyof typeof templateWorkflows],
      triggers: 0,
      conversions: 0,
      lastModified: new Date().toISOString().split('T')[0]
    } as AutomationWorkflow;
    
    setWorkflows([newWorkflow, ...workflows]);
    toast.success(`${newWorkflow.name} workflow created from template`);
  };

  const filteredWorkflows = statusFilter === 'all' 
    ? workflows 
    : workflows.filter(workflow => workflow.status === statusFilter);

  const cancelScheduledAutomation = (id: string) => {
    setScheduledAutomations(scheduledAutomations.filter(automation => automation.id !== id));
    toast.success('Scheduled automation cancelled');
  };

  const viewScheduledAutomation = (automation: any) => {
    setViewingAutomation(automation);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Marketing Automation
              </CardTitle>
              <CardDescription>
                Create and manage automated marketing workflows
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsHelpDialogOpen(true)}>
                <HelpCircle className="h-4 w-4 mr-2" />
                How it works
              </Button>
              <Button onClick={() => {
                setSelectedWorkflow(null);
                setIsCreateWorkflowOpen(true);
              }}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="paused">Paused</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    All Workflows
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                    Active Workflows
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('paused')}>
                    Paused Workflows
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
                    Draft Workflows
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Triggers</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkflows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No workflows found with the selected status
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWorkflows.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(workflow.type)}
                          <div>
                            <div className="font-medium">{workflow.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {workflow.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(workflow.status)}`}>
                          {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{workflow.triggers}</TableCell>
                      <TableCell>{workflow.conversions}</TableCell>
                      <TableCell>{workflow.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => toggleWorkflowStatus(workflow.id)}
                            disabled={workflow.status === 'draft'}
                          >
                            {workflow.status === 'active' ? (
                              <PauseCircle className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <PlayCircle className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => editWorkflow(workflow)}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => deleteWorkflow(workflow.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Automation Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflows
                      .filter(w => w.status === 'active' && w.triggers > 0)
                      .slice(0, 3)
                      .map(workflow => {
                        const conversionRate = workflow.triggers > 0 
                          ? Math.round((workflow.conversions / workflow.triggers) * 100) 
                          : 0;
                          
                        return (
                          <div key={workflow.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{workflow.name}</span>
                              <span className="text-sm">{conversionRate}% conversion rate</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 rounded-full" 
                                style={{ width: `${conversionRate}%` }} 
                              />
                            </div>
                          </div>
                        );
                      })}
                      
                    {workflows.filter(w => w.status === 'active' && w.triggers > 0).length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        No active workflows with performance data
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => createQuickWorkflow('welcome')}>
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      Welcome Series
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => createQuickWorkflow('abandoned-cart')}>
                      <Timer className="h-4 w-4 mr-2 text-red-500" />
                      Abandoned Cart Recovery
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => createQuickWorkflow('re-engagement')}>
                      <Zap className="h-4 w-4 mr-2 text-purple-500" />
                      Re-engagement Campaign
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => createQuickWorkflow('birthday')}>
                      <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                      Birthday Rewards
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Scheduled Automations
          </CardTitle>
          <CardDescription>
            Upcoming automated messages scheduled to be sent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledAutomations.map((automation) => (
              <div key={automation.id} className="p-4 rounded-md border flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    {automation.type === 'birthday' ? (
                      <Calendar className="h-5 w-5 text-pink-600" />
                    ) : automation.type === 'follow-up' ? (
                      <Clock className="h-5 w-5 text-purple-600" />
                    ) : (
                      <Calendar className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{automation.name}</h4>
                    <p className="text-xs text-muted-foreground">Scheduled for {automation.scheduled}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => viewScheduledAutomation(automation)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {automation.status !== 'recurring' && (
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => cancelScheduledAutomation(automation.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {scheduledAutomations.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No scheduled automations
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              How Marketing Automation Works
            </DialogTitle>
            <DialogDescription>
              Learn how to create and manage automated marketing campaigns
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Workflows</h3>
              <p className="text-muted-foreground">
                Workflows are automated sequences of messages that are triggered by specific events or scheduled at specific times.
                You can create different types of workflows for various marketing purposes.
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                <li><strong>Welcome Series</strong>: Sent to new subscribers</li>
                <li><strong>Follow-up</strong>: Sent after a specific action or time period</li>
                <li><strong>Promotional</strong>: Marketing campaigns for products or services</li>
                <li><strong>Birthday</strong>: Special offers or greetings on customer birthdays</li>
                <li><strong>Abandoned Cart</strong>: Reminders for customers who left items in their cart</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Creating Workflows</h3>
              <p className="text-muted-foreground">
                To create a workflow, click the "Create Workflow" button and fill in the details:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                <li>Name your workflow</li>
                <li>Select the workflow type</li>
                <li>Define the audience (who will receive the messages)</li>
                <li>Set the trigger type (immediate, scheduled, or event-based)</li>
                <li>Create your message content</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Scheduled Automations</h3>
              <p className="text-muted-foreground">
                Scheduled automations are messages that will be sent at specific times. You can:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                <li><strong>View</strong>: See details about the scheduled message</li>
                <li><strong>Cancel</strong>: Stop the automation from being sent (one-time automations only)</li>
                <li>Recurring automations run on a regular schedule and cannot be cancelled individually</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Performance Tracking</h3>
              <p className="text-muted-foreground">
                Monitor the performance of your workflows to see how effective they are:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                <li><strong>Triggers</strong>: How many times the workflow has been triggered</li>
                <li><strong>Conversions</strong>: How many recipients took the desired action</li>
                <li><strong>Conversion Rate</strong>: Percentage of triggers that resulted in conversions</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scheduled Automation Details</DialogTitle>
          </DialogHeader>
          {viewingAutomation && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground">Name</h4>
                  <p>{viewingAutomation.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground">Type</h4>
                  <p className="capitalize">{viewingAutomation.type}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Schedule</h4>
                <p>{viewingAutomation.scheduled}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Description</h4>
                <p>{viewingAutomation.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Audience</h4>
                <p>{viewingAutomation.audience}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Message</h4>
                <p className="p-3 bg-muted rounded-md">{viewingAutomation.messageContent}</p>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                {viewingAutomation.status !== 'recurring' && (
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      cancelScheduledAutomation(viewingAutomation.id);
                      setIsViewDialogOpen(false);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Cancel Automation
                  </Button>
                )}
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CreateWorkflowDialog 
        isOpen={isCreateWorkflowOpen}
        onClose={() => {
          setIsCreateWorkflowOpen(false);
          setSelectedWorkflow(null);
        }}
        onSave={handleSaveWorkflow}
        editingWorkflow={selectedWorkflow}
      />
    </div>
  );
};

export default MarketingAutomation;
