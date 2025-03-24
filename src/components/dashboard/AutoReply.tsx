
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ListChecks, MessageSquare, Clock } from 'lucide-react';

const AutoReply = () => {
  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-orange-500" />
                Auto Reply Messages
              </CardTitle>
              <CardDescription>
                Set up automatic responses to common inquiries and welcome messages
              </CardDescription>
            </div>
            <Button>Create New Reply</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure automatic responses to be sent when specific keywords are detected in incoming messages.
            </p>
            
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-medium">Welcome Message</h3>
                  <p className="text-sm text-muted-foreground">Sent when a new conversation starts</p>
                </div>
                <Switch id="welcome-active" defaultChecked />
              </div>
              <Input 
                className="mb-2"
                defaultValue="Hello! Thank you for reaching out to us. How can we help you today?"
              />
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-medium">Away Message</h3>
                  <p className="text-sm text-muted-foreground">Sent outside of business hours</p>
                </div>
                <Switch id="away-active" defaultChecked />
              </div>
              <Input 
                className="mb-2"
                defaultValue="Thanks for your message. Our team is currently away but we'll get back to you as soon as possible."
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Auto-Reply Settings</CardTitle>
          <CardDescription>
            Configure global settings for your auto-reply messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-sm font-medium">Business Hours</h3>
                <p className="text-xs text-muted-foreground">
                  Define your business hours to automatically enable away messages
                </p>
              </div>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Configure Hours
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Smart Response</h3>
                <p className="text-xs text-muted-foreground">
                  Use AI to generate better auto-replies based on conversation context
                </p>
              </div>
              <Switch id="smart-response" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoReply;
