
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Shield, Key, AlertCircle, Check, RefreshCw, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SecureMessaging = () => {
  const [isEncryptionEnabled, setIsEncryptionEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const securityLogs = [
    { id: 1, event: 'End-to-end encryption enabled', user: 'System', date: '2023-05-15 09:23:14', status: 'success' },
    { id: 2, event: 'Password policy updated', user: 'Admin', date: '2023-06-02 13:45:22', status: 'success' },
    { id: 3, event: 'Failed login attempt', user: 'unknown', date: '2023-06-10 22:14:05', status: 'error' },
    { id: 4, event: 'Two-factor authentication enabled', user: 'Sarah Johnson', date: '2023-06-12 11:32:40', status: 'success' },
    { id: 5, event: 'API access token generated', user: 'David Wilson', date: '2023-06-20 15:18:37', status: 'success' }
  ];
  
  const toggleEncryption = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsEncryptionEnabled(!isEncryptionEnabled);
      setIsLoading(false);
      toast.success(`End-to-end encryption ${!isEncryptionEnabled ? 'enabled' : 'disabled'}`);
    }, 1500);
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return '';
    }
  };
  
  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-green-500" />
            Secure Messaging
          </CardTitle>
          <CardDescription>
            Configure security settings for your WhatsApp communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-900/50">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 mt-1">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Your messages are secure</h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  End-to-end encryption ensures that only you and the person you're communicating with can read what's sent.
                </p>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">End-to-End Encryption</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm">Status: <span className={isEncryptionEnabled ? 'text-green-600' : 'text-red-600'}>
                        {isEncryptionEnabled ? 'Enabled' : 'Disabled'}
                      </span></div>
                      <p className="text-xs text-muted-foreground">
                        {isEncryptionEnabled 
                          ? 'Your messages are encrypted and secure' 
                          : 'Enable encryption to secure your messages'}
                      </p>
                    </div>
                    <Button 
                      variant={isEncryptionEnabled ? "destructive" : "default"} 
                      size="sm" 
                      onClick={toggleEncryption}
                      disabled={isLoading}
                    >
                      {isLoading && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                      {isEncryptionEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Access Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="text-sm">Two-Factor Authentication</div>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toast.info('2FA settings opening')}>
                        Configure
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="text-sm">Session Management</div>
                        <p className="text-xs text-muted-foreground">Manage active sessions</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toast.info('Session management opening')}>
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Key className="h-4 w-4 text-green-500" />
                  API Key Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Production Key</div>
                      <Button size="sm" variant="outline" onClick={() => toast.info('API key regenerated')}>
                        Regenerate
                      </Button>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex items-center justify-between">
                      <code className="text-sm">wha_prod_••••••••••••••••••••••••</code>
                      <Button size="sm" variant="ghost" onClick={() => toast.success('API key copied to clipboard')}>
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Development Key</div>
                      <Button size="sm" variant="outline" onClick={() => toast.info('API key regenerated')}>
                        Regenerate
                      </Button>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex items-center justify-between">
                      <code className="text-sm">wha_dev_••••••••••••••••••••••••</code>
                      <Button size="sm" variant="ghost" onClick={() => toast.success('API key copied to clipboard')}>
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Security Logs
                </CardTitle>
                <CardDescription>
                  Recent security-related events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.event}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(log.status)}`}>
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button onClick={() => toast.success('Security settings saved')}>
                <Settings className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecureMessaging;
