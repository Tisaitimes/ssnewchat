
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Redirect to sign in if no user
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // We could add analytics tracking here
    console.log(`Tab changed to: ${value}`);
  };

  const notifications = [
    { id: 1, title: "New message from John Doe", time: "2 minutes ago" },
    { id: 2, title: "Meeting reminder", time: "1 hour ago" },
    { id: 3, title: "Campaign completed", time: "Yesterday" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900/50">
        <DashboardSidebar 
          user={user} 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          logout={logout} 
        />

        <SidebarInset>
          <DashboardHeader 
            user={user} 
            logout={logout} 
            notifications={notifications} 
          />
          <DashboardContent activeTab={activeTab} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
