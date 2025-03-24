
import React from 'react';
import { 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart, 
  LogOut, 
  Bot, 
  Send, 
  Home,
  Clock,
  ListChecks,
  UserPlus,
  Zap,
  Ticket,
  MessagesSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  user: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  logout: () => void;
}

const DashboardSidebar = ({ user, activeTab, setActiveTab, logout }: DashboardSidebarProps) => {
  const menuItems = [
    { title: "Overview", icon: Home, value: "overview" },
    { title: "WhatsApp", icon: MessageSquare, value: "whatsapp" },
    { title: "Conversation", icon: MessagesSquare, value: "conversation" },
    { title: "Chatbot", icon: Bot, value: "chatbot" },
    { title: "Broadcasting", icon: Send, value: "broadcasting" },
    { title: "Auto Reply", icon: ListChecks, value: "autoreply" },
    { title: "Auto Follow Up", icon: Clock, value: "followup" },
    { title: "Leads", icon: UserPlus, value: "leads" },
    { title: "Agents", icon: Users, value: "agents" },
    { title: "Analytics", icon: BarChart, value: "analytics" },
    { title: "Marketing", icon: Zap, value: "marketing" },
    { title: "Tickets", icon: Ticket, value: "tickets" },
  ];

  return (
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
  );
};

export default DashboardSidebar;
