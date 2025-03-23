
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, RefreshCw, QrCode, Check, ArrowRight, Phone } from 'lucide-react';
import { toast } from 'sonner';

const WhatsAppIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConnect = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      toast.success('WhatsApp successfully connected!');
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsConnected(false);
      setIsLoading(false);
      toast.success('WhatsApp disconnected');
    }, 1000);
  };

  const handleSavePhoneNumber = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    toast.success(`Phone number ${phoneNumber} saved successfully`);
  };

  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            WhatsApp Integration
          </CardTitle>
          <CardDescription>
            Connect your WhatsApp Business account to start sending and receiving messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-900/50">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 mr-4">
                  <Check className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">Successfully Connected</p>
                  <p className="text-xs text-green-700 dark:text-green-400">Your WhatsApp Business account is now connected and ready to use</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Phone Number</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="+1 (555) 123-4567" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Button onClick={handleSavePhoneNumber}>Save</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Connection Status</label>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Option 1: Connect with QR Code</h3>
                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex flex-col items-center justify-center min-h-[200px]">
                    <QrCode className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-center text-sm text-muted-foreground mb-4">Scan this QR code with your WhatsApp app to connect</p>
                    <Button onClick={handleConnect} disabled={isLoading}>
                      {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <ArrowRight className="h-4 w-4 mr-2" />}
                      Generate QR Code
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Option 2: Connect with Phone Number</h3>
                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 space-y-4 min-h-[200px]">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">WhatsApp Business Phone</label>
                      <Input 
                        placeholder="+1 (555) 123-4567" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleConnect} 
                      disabled={isLoading}
                    >
                      {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Phone className="h-4 w-4 mr-2" />}
                      Connect Phone Number
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => toast.info('Documentation opened')}>View Documentation</Button>
          {isConnected && (
            <Button variant="destructive" onClick={handleDisconnect} disabled={isLoading}>
              {isLoading && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
              Disconnect
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Templates</CardTitle>
          <CardDescription>Create and manage message templates for WhatsApp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 text-center border border-dashed rounded-md">
            <h3 className="text-lg font-medium mb-2">Create Your First Template</h3>
            <p className="text-muted-foreground mb-4">Templates help you send structured messages at scale</p>
            <Button onClick={() => toast.info('Template creation coming soon')}>Create Template</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppIntegration;
