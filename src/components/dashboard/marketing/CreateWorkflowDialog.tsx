
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Users, Calendar, Timer, Zap, MessageSquare } from 'lucide-react';

interface CreateWorkflowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workflow: any) => void;
  editingWorkflow?: any;
}

const CreateWorkflowDialog: React.FC<CreateWorkflowDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingWorkflow
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [workflow, setWorkflow] = useState(editingWorkflow || {
    name: '',
    type: 'welcome',
    status: 'draft',
    triggers: 0,
    conversions: 0,
    lastModified: new Date().toISOString().split('T')[0],
    description: '',
    audience: 'all',
    triggerType: 'immediate',
    messages: []
  });

  const handleChange = (field: string, value: any) => {
    setWorkflow({ ...workflow, [field]: value });
  };

  const handleSave = () => {
    // Generate a unique ID if it's a new workflow
    if (!workflow.id) {
      workflow.id = Date.now().toString();
    }
    onSave(workflow);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingWorkflow ? 'Edit Workflow' : 'Create Workflow'}</DialogTitle>
          <DialogDescription>
            {editingWorkflow 
              ? 'Make changes to your workflow settings.' 
              : 'Configure your new marketing automation workflow.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="trigger">Trigger</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Workflow Name</Label>
                <Input 
                  id="name" 
                  value={workflow.name} 
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g., Welcome Series"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Workflow Type</Label>
                <Select 
                  value={workflow.type} 
                  onValueChange={(value) => handleChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Welcome Series</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="follow-up">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                        <span>Follow-up</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="promotional">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-orange-500" />
                        <span>Promotional</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="birthday">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                        <span>Birthday</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="abandoned-cart">
                      <div className="flex items-center">
                        <Timer className="h-4 w-4 mr-2 text-red-500" />
                        <span>Abandoned Cart</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={workflow.description} 
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe the purpose of this workflow..."
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          {/* Trigger Tab */}
          <TabsContent value="trigger" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select 
                  value={workflow.audience} 
                  onValueChange={(value) => handleChange('audience', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="new">New Contacts</SelectItem>
                    <SelectItem value="inactive">Inactive Contacts</SelectItem>
                    <SelectItem value="segment">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="triggerType">Trigger Type</Label>
                <Select 
                  value={workflow.triggerType} 
                  onValueChange={(value) => handleChange('triggerType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="event">Event Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {workflow.triggerType === 'scheduled' && (
                <div className="grid gap-2">
                  <Label htmlFor="scheduleDate">Schedule Date</Label>
                  <Input 
                    id="scheduleDate" 
                    type="date" 
                    value={workflow.scheduleDate || ''} 
                    onChange={(e) => handleChange('scheduleDate', e.target.value)}
                  />
                </div>
              )}
              
              {workflow.triggerType === 'event' && (
                <div className="grid gap-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select 
                    value={workflow.eventType || 'signup'} 
                    onValueChange={(value) => handleChange('eventType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="signup">Sign Up</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="pageview">Page View</SelectItem>
                      <SelectItem value="abandoned">Cart Abandonment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Message Tab */}
          <TabsContent value="message" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Message Content</Label>
                <Textarea 
                  value={workflow.messageContent || ''} 
                  onChange={(e) => handleChange('messageContent', e.target.value)}
                  placeholder="Enter your message content here..."
                  rows={5}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Select 
                    value={workflow.deliveryTime || 'immediate'} 
                    onValueChange={(value) => handleChange('deliveryTime', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediately</SelectItem>
                      <SelectItem value="1day">After 1 Day</SelectItem>
                      <SelectItem value="3days">After 3 Days</SelectItem>
                      <SelectItem value="1week">After 1 Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select 
                    value={workflow.channel || 'whatsapp'} 
                    onValueChange={(value) => handleChange('channel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4 gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!workflow.name}>
            {editingWorkflow ? 'Update Workflow' : 'Create Workflow'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
