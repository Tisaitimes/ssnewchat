
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
  Home,
  Bell,
  Search,
  Menu,
  ChevronDown,
  PanelLeft,
  Zap,
  Headphones,
  Ticket,
  MessagesSquare
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
import Conversation from '@/components/dashboard/Conversation';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarFooter,
  SidebarInset
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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

  const handleTabChange = (value) => {
    setActiveTab(value);
    // We could add analytics tracking here
    console.log(`Tab changed to: ${value}`);
  };

  const menuItems = [
    { title: "Overview", icon: Home, value: "overview" },
    { title: "WhatsApp", icon: MessageSquare, value: "whatsapp" },
    { title: "Conversation", icon: MessagesSquare, value: "conversation" },
    { title: "Chatbot", icon: Bot, value: "chatbot" },
    { title: "Broadcasting", icon: Send, value: "broadcasting" },
    { title: "Agents", icon: Users, value: "agents" },
    { title: "Analytics", icon: BarChart, value: "analytics" },
    { title: "Marketing", icon: Zap, value: "marketing" },
    { title: "Tickets", icon: Ticket, value: "tickets" },
  ];

  const notifications = [
    { id: 1, title: "New message from John Doe", time: "2 minutes ago" },
    { id: 2, title: "Meeting reminder", time: "1 hour ago" },
    { id: 3, title: "Campaign completed", time: "Yesterday" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900/50">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center p-4 border-b">
            <div className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold">W</span>
              </span>
              <span className="font-semibold text-xl">ChatFluence</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.value}>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab(item.value)}
                        tooltip={item.title}
                        isActive={activeTab === item.value}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}`} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          {/* Top bar */}
          <header className="bg-white dark:bg-gray-900 border-b sticky top-0 z-10 h-16">
            <div className="container flex items-center justify-between h-full px-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="relative w-64 hidden md:block">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full h-9 pl-8 rounded-md bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Notifications dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="py-2 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                            <MessageSquare size={14} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-center font-medium text-sm text-primary">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User profile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}`} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden md:inline-block">{user.name}</span>
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="container py-8 px-4">
            <Motion variant="fade-up">
              <h1 className="text-3xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
              
              {activeTab === 'overview' && (
                <>
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
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
                </>
              )}
              
              {activeTab === 'whatsapp' && <WhatsAppIntegration />}
              {activeTab === 'conversation' && <Conversation />}
              {activeTab === 'chatbot' && <ChatbotBuilder />}
              {activeTab === 'broadcasting' && <Broadcasting />}
              {activeTab === 'agents' && <AgentManagement />}
              {activeTab === 'analytics' && <Analytics />}
              {activeTab === 'marketing' && <MarketingAutomation />}
              {activeTab === 'tickets' && <TicketSystem />}
            </Motion>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
