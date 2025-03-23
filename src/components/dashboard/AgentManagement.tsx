
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, UserPlus, User, Settings, MessageSquare, Briefcase, Shield, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Agent = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'supervisor';
  status: 'online' | 'offline' | 'busy';
  activeChats: number;
  performance: number;
};

const AgentManagement = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'admin',
      status: 'online',
      activeChats: 3,
      performance: 95
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      role: 'agent',
      status: 'online',
      activeChats: 5,
      performance: 88
    },
    {
      id: '3',
      name: 'Jessica Smith',
      email: 'jessica.s@example.com',
      role: 'supervisor',
      status: 'offline',
      activeChats: 0,
      performance: 92
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.w@example.com',
      role: 'agent',
      status: 'busy',
      activeChats: 7,
      performance: 85
    }
  ]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'offline': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'busy': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return '';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'supervisor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'agent': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400';
      default: return '';
    }
  };

  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Agent Management
              </CardTitle>
              <CardDescription>
                Manage your support and sales agents
              </CardDescription>
            </div>
            <Button onClick={() => toast.info('Add agent form opening')}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input className="max-w-sm" placeholder="Search agents..." />
              <Button variant="outline" onClick={() => toast.info('Filters applied')}>Filters</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active Chats</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-blue-500">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-sm text-muted-foreground">{agent.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(agent.role)}`}>
                        {agent.role.charAt(0).toUpperCase() + agent.role.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(agent.status)}`}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{agent.activeChats}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              agent.performance > 90 ? 'bg-green-500' : 
                              agent.performance > 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${agent.performance}%` }}
                          />
                        </div>
                        <span className="text-sm">{agent.performance}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => toast.info(`Chat with ${agent.name}`)}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toast.info(`Edit ${agent.name}`)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Agent Workload
            </CardTitle>
            <CardDescription>
              Monitor and balance agent workloads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${
                      agent.status === 'online' ? 'bg-green-500' : 
                      agent.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{agent.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{agent.activeChats} chats</span>
                    <Button variant="ghost" size="sm" onClick={() => toast.info(`Assign chats to ${agent.name}`)}>
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Role Permissions
            </CardTitle>
            <CardDescription>
              Manage what each role can access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="font-medium mb-2">Admin</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Full Access</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Create Agents</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Billing Access</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Create Campaigns</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="font-medium mb-2">Supervisor</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>View All Chats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Assign Chats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <X className="h-3 w-3 text-red-500" />
                    <span>Billing Access</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Reports Access</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="font-medium mb-2">Agent</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Own Chats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <X className="h-3 w-3 text-red-500" />
                    <span>Assign Chats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <X className="h-3 w-3 text-red-500" />
                    <span>Billing Access</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <X className="h-3 w-3 text-red-500" />
                    <span>Create Campaigns</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Agent Training
            </CardTitle>
            <CardDescription>
              Onboarding and training resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 text-center border border-dashed rounded-md">
              <User className="h-12 w-12 mx-auto mb-4 text-blue-500/50" />
              <h3 className="text-lg font-medium mb-2">Agent Resources</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Access training materials, scripts, and resources for your agents
              </p>
              <Button onClick={() => toast.info('Training resources center opening soon')}>
                View Resources
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentManagement;
