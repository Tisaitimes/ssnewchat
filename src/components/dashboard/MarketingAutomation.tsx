
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, PlayCircle, PauseCircle, PlusCircle, Settings, Timer, Calendar, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type AutomationWorkflow = {
  id: string;
  name: string;
  type: 'welcome' | 'follow-up' | 'promotional' | 'birthday' | 'abandoned-cart';
  status: 'active' | 'paused' | 'draft';
  triggers: number;
  conversions: number;
  lastModified: string;
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
      lastModified: '2023-06-15'
    },
    {
      id: '2',
      name: '24-Hour Follow-up',
      type: 'follow-up',
      status: 'active',
      triggers: 182,
      conversions: 43,
      lastModified: '2023-07-20'
    },
    {
      id: '3',
      name: 'Summer Sale',
      type: 'promotional',
      status: 'paused',
      triggers: 520,
      conversions: 128,
      lastModified: '2023-08-05'
    },
    {
      id: '4',
      name: 'Customer Birthday',
      type: 'birthday',
      status: 'active',
      triggers: 75,
      conversions: 18,
      lastModified: '2023-09-12'
    },
    {
      id: '5',
      name: 'Abandoned Cart Recovery',
      type: 'abandoned-cart',
      status: 'draft',
      triggers: 0,
      conversions: 0,
      lastModified: '2023-10-03'
    }
  ]);

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
      case 'follow-up': return <Clock className="h-4 w-4 text-purple-500" />;
      case 'promotional': return <Zap className="h-4 w-4 text-orange-500" />;
      case 'birthday': return <Calendar className="h-4 w-4 text-pink-500" />;
      case 'abandoned-cart': return <Timer className="h-4 w-4 text-red-500" />;
      default: return <Settings className="h-4 w-4" />;
    }
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
            <Button onClick={() => toast.info('New workflow creation started')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
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
                {workflows.map((workflow) => (
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
                          onClick={() => toast.info(`Editing workflow "${workflow.name}"`)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Automation Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Welcome Series</span>
                      <span className="text-sm">23% conversion rate</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '23%' }} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">24-Hour Follow-up</span>
                      <span className="text-sm">24% conversion rate</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '24%' }} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Summer Sale</span>
                      <span className="text-sm">25% conversion rate</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Creating welcome series workflow')}>
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      Welcome Series
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Creating abandoned cart workflow')}>
                      <Timer className="h-4 w-4 mr-2 text-red-500" />
                      Abandoned Cart Recovery
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Creating re-engagement workflow')}>
                      <Zap className="h-4 w-4 mr-2 text-purple-500" />
                      Re-engagement Campaign
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Creating birthday rewards workflow')}>
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
            <div className="p-4 rounded-md border flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Summer Sale Reminder</h4>
                  <p className="text-xs text-muted-foreground">Scheduled for tomorrow at 10:00 AM</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => toast.info('Viewing scheduled automation')}>
                View
              </Button>
            </div>
            
            <div className="p-4 rounded-md border flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
                  <Calendar className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Birthday Message: John Smith</h4>
                  <p className="text-xs text-muted-foreground">Scheduled for 06/28/2023 at 9:00 AM</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => toast.info('Viewing scheduled automation')}>
                View
              </Button>
            </div>
            
            <div className="p-4 rounded-md border flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">24-Hour Follow-up: New Signups</h4>
                  <p className="text-xs text-muted-foreground">Recurring daily at 3:00 PM</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => toast.info('Viewing scheduled automation')}>
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingAutomation;
