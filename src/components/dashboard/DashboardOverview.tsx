import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Motion } from '@/components/ui/motion';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Users, Activity, Settings, Bell, Globe, Shield, Database } from 'lucide-react';
import { toast } from 'sonner';

const DashboardOverview = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoResponder, setAutoResponder] = useState(false);
  const [language, setLanguage] = useState('en');

  const stats = [
    { label: 'Active Conversations', value: '12', icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Total Contacts', value: '243', icon: Users, color: 'text-green-500' },
    { label: 'Response Rate', value: '93%', icon: Activity, color: 'text-purple-500' },
    { label: 'Automation Active', value: '5', icon: Settings, color: 'text-orange-500' },
  ];

  return (
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
        
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your dashboard preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive alerts about your account activity</p>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
                onClick={() => toast.success(notifications ? "Notifications disabled" : "Notifications enabled")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">Auto Responder</h4>
                <p className="text-sm text-muted-foreground">Automatically respond to incoming messages</p>
              </div>
              <Switch 
                checked={autoResponder} 
                onCheckedChange={setAutoResponder}
                onClick={() => toast.success(autoResponder ? "Auto responder disabled" : "Auto responder enabled")}
              />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Language</h4>
              <select 
                className="w-full p-2 border rounded-md"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  toast.success(`Language changed to ${e.target.value.toUpperCase()}`);
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <Button 
              className="w-full"
              variant="outline"
              onClick={() => toast.success("Settings saved successfully")}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardOverview;
