
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, PlusCircle, Copy, Edit, Trash, ArrowRight, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Chatbot = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  createdAt: string;
  triggers: number;
};

const ChatbotBuilder = () => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([
    {
      id: '1',
      name: 'Welcome Bot',
      description: 'Greets new users and collects basic information',
      status: 'active',
      createdAt: '2023-08-15',
      triggers: 3
    },
    {
      id: '2',
      name: 'Customer Support',
      description: 'Handles common customer service inquiries',
      status: 'active',
      createdAt: '2023-09-20',
      triggers: 5
    },
    {
      id: '3',
      name: 'Product Recommender',
      description: 'Suggests products based on user preferences',
      status: 'draft',
      createdAt: '2023-10-05',
      triggers: 2
    }
  ]);

  const handleDuplicateBot = (botId: string) => {
    const botToDuplicate = chatbots.find(bot => bot.id === botId);
    if (botToDuplicate) {
      const newBot = {
        ...botToDuplicate,
        id: Math.random().toString(36).substr(2, 9),
        name: `${botToDuplicate.name} (Copy)`,
        status: 'draft' as const,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setChatbots([...chatbots, newBot]);
      toast.success(`Duplicated bot: ${newBot.name}`);
    }
  };

  const handleDeleteBot = (botId: string) => {
    setChatbots(chatbots.filter(bot => bot.id !== botId));
    toast.success('Bot deleted successfully');
  };

  const handleStatusChange = (botId: string, newStatus: 'active' | 'draft' | 'paused') => {
    setChatbots(chatbots.map(bot => 
      bot.id === botId ? { ...bot, status: newStatus } : bot
    ));
    toast.success(`Bot status updated to ${newStatus}`);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'paused': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
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
                <Bot className="h-5 w-5 text-purple-500" />
                Chatbot Builder
              </CardTitle>
              <CardDescription>
                Create and manage AI-powered chatbots for WhatsApp
              </CardDescription>
            </div>
            <Button onClick={() => toast.info('Chatbot builder opening...')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Bot
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Triggers</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chatbots.map((bot) => (
                <TableRow key={bot.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{bot.name}</div>
                      <div className="text-sm text-muted-foreground">{bot.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(bot.status)}`}>
                      {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{bot.triggers}</TableCell>
                  <TableCell>{bot.createdAt}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => handleDuplicateBot(bot.id)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.info('Edit bot interface coming soon')}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteBot(bot.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Drag & Drop Bot Builder</CardTitle>
          <CardDescription>
            Create complex conversation flows with our visual builder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-dashed rounded-md p-8 text-center">
            <Bot className="h-12 w-12 mx-auto mb-4 text-purple-500" />
            <h3 className="text-lg font-medium mb-2">Create Powerful Conversation Flows</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Our visual bot builder lets you create complex conversation paths with triggers, conditions, and actions
            </p>
            <Button onClick={() => toast.info('Visual bot builder opening soon')}>
              <ArrowRight className="h-4 w-4 mr-2" /> 
              Open Visual Builder
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            AI Assistant Configuration
          </CardTitle>
          <CardDescription>
            Configure your personal AI assistant for automated responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-100 dark:border-purple-900/50 mb-4">
            <p className="text-sm">
              Train your AI assistant by uploading documents, FAQs, and knowledge base articles to provide
              more accurate and personalized responses to your customers.
            </p>
          </div>
          <Button onClick={() => toast.info('AI assistant configuration coming soon')}>
            Configure AI Assistant
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotBuilder;
