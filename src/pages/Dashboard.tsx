
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Motion } from '@/components/ui/motion';
import { 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart, 
  Activity, 
  LogOut, 
  Bot, 
  Send, 
  Lock, 
  Zap, 
  Headphones,
  Ticket
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WhatsAppIntegration from '@/components/dashboard/WhatsAppIntegration';
import ChatbotBuilder from '@/components/dashboard/ChatbotBuilder';
import Broadcasting from '@/components/dashboard/Broadcasting';
import AgentManagement from '@/components/dashboard/AgentManagement';
import Analytics from '@/components/dashboard/Analytics';
import SecureMessaging from '@/components/dashboard/SecureMessaging';
import MarketingAutomation from '@/components/dashboard/MarketingAutomation';
import TicketSystem from '@/components/dashboard/TicketSystem';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Redirect to sign in if no user
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  
  const stats = [
    { label: 'Active Conversations', value: '12', icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Total Contacts', value: '243', icon: Users, color: 'text-green-500' },
    { label: 'Response Rate', value: '93%', icon: Activity, color: 'text-purple-500' },
    { label: 'Automation Active', value: '5', icon: Settings, color: 'text-orange-500' },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // We could add analytics tracking here
    console.log(`Tab changed to: ${value}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <header className="bg-white dark:bg-gray-900 border-b sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold">W</span>
              </span>
              <span className="font-semibold text-xl">ChatFluence</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Welcome, {user.name}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-8">
        <Motion variant="fade-up">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Motion key={i} variant="fade-up" delay={i * 100}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                        <Icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                </Motion>
              );
            })}
          </div>
          
          <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="whatsapp">
                <MessageSquare className="mr-1 h-4 w-4" /> WhatsApp
              </TabsTrigger>
              <TabsTrigger value="chatbot">
                <Bot className="mr-1 h-4 w-4" /> Chatbot
              </TabsTrigger>
              <TabsTrigger value="broadcasting">
                <Send className="mr-1 h-4 w-4" /> Broadcasting
              </TabsTrigger>
              <TabsTrigger value="agents">
                <Users className="mr-1 h-4 w-4" /> Agents
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart className="mr-1 h-4 w-4" /> Analytics
              </TabsTrigger>
              <TabsTrigger value="marketing">
                <Zap className="mr-1 h-4 w-4" /> Marketing
              </TabsTrigger>
              <TabsTrigger value="tickets">
                <Ticket className="mr-1 h-4 w-4" /> Tickets
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest interactions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 mr-4">
                            <MessageSquare size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">New message from John Doe</p>
                            <p className="text-xs text-muted-foreground">2 minutes ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your WhatsApp Status</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Connected</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-md">
                      <div>
                        <p className="font-medium">Your WhatsApp business account is active</p>
                        <p className="text-sm text-muted-foreground">Connected to +1 (555) 123-4567</p>
                      </div>
                      <Button size="sm" className="mt-4 sm:mt-0" onClick={() => toast.success("Settings updated")}>
                        Manage Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="whatsapp">
              <WhatsAppIntegration />
            </TabsContent>
            
            <TabsContent value="chatbot">
              <ChatbotBuilder />
            </TabsContent>
            
            <TabsContent value="broadcasting">
              <Broadcasting />
            </TabsContent>
            
            <TabsContent value="agents">
              <AgentManagement />
            </TabsContent>
            
            <TabsContent value="analytics">
              <Analytics />
            </TabsContent>
            
            <TabsContent value="marketing">
              <MarketingAutomation />
            </TabsContent>
            
            <TabsContent value="tickets">
              <TicketSystem />
            </TabsContent>
          </Tabs>
        </Motion>
      </main>
    </div>
  );
};

export default Dashboard;
