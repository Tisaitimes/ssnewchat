
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, PlusCircle, AlarmClock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AutoFollowUp = () => {
  const followUps = [
    {
      name: 'No Reply Follow-up',
      message: 'Hi there! We noticed you haven\'t replied to our last message. Is there anything we can help you with?',
      condition: 'No Reply',
      delay: '24 hours',
      status: 'Active',
    },
    {
      name: 'Product Demo Reminder',
      message: 'Hello! Just a friendly reminder about the product demo you expressed interest in. Would you like to schedule a time this week?',
      condition: 'Scheduled',
      delay: '48 hours',
      status: 'Active',
    }
  ];

  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Auto Follow-up Messages
              </CardTitle>
              <CardDescription>
                Set up automated follow-up messages to re-engage your contacts
              </CardDescription>
            </div>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Follow-up
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Automatically send follow-up messages when contacts haven't responded within a specific timeframe.
            </p>
            
            {followUps.map((followUp, index) => (
              <div key={index} className="bg-muted/50 p-4 rounded-lg border border-border">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{followUp.name}</h3>
                  <Badge variant="outline">{followUp.status}</Badge>
                </div>
                <p className="text-sm mb-2">{followUp.message}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <AlarmClock className="h-4 w-4 mr-1" />
                    <span>{followUp.delay} after {followUp.condition}</span>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Follow-up Analytics</CardTitle>
          <CardDescription>
            Track the performance of your follow-up campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Follow-ups Sent</h3>
              <p className="text-2xl font-bold">142</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Response Rate</h3>
              <p className="text-2xl font-bold">68%</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Response Time</h3>
              <p className="text-2xl font-bold">4.2 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoFollowUp;
