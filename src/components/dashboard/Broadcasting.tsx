
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Users, BarChart, Upload, PlusCircle, Clock, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Campaign = {
  id: string;
  name: string;
  status: 'scheduled' | 'completed' | 'draft';
  audience: string;
  sent: number;
  delivered: number;
  read: number;
  date: string;
};

const Broadcasting = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale Announcement',
      status: 'completed',
      audience: 'All Customers',
      sent: 1250,
      delivered: 1200,
      read: 890,
      date: '2023-06-15'
    },
    {
      id: '2',
      name: 'Product Launch Teaser',
      status: 'scheduled',
      audience: 'Premium Customers',
      sent: 0,
      delivered: 0,
      read: 0,
      date: '2023-11-20'
    },
    {
      id: '3',
      name: 'Customer Feedback Survey',
      status: 'draft',
      audience: 'Recent Buyers',
      sent: 0,
      delivered: 0,
      read: 0,
      date: '2023-10-28'
    }
  ]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
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
                <Send className="h-5 w-5 text-indigo-500" />
                WhatsApp Broadcasting
              </CardTitle>
              <CardDescription>
                Send messages to multiple recipients at once
              </CardDescription>
            </div>
            <Button onClick={() => toast.info('New broadcast campaign creation started')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Recent Campaigns</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Sent/Delivered/Read</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id} onClick={() => toast.info(`Viewing campaign: ${campaign.name}`)} className="cursor-pointer">
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(campaign.status)}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{campaign.audience}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 text-sm">
                        <span title="Sent">{campaign.sent}</span>
                        <span className="text-muted-foreground">/</span>
                        <span title="Delivered">{campaign.delivered}</span>
                        <span className="text-muted-foreground">/</span>
                        <span title="Read">{campaign.read}</span>
                      </div>
                    </TableCell>
                    <TableCell>{campaign.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-indigo-500" />
              Quick Broadcast
            </CardTitle>
            <CardDescription>
              Send a message to a specific audience quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Name</label>
                <Input placeholder="Enter campaign name" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Audience</label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => toast.info('Select audience dialog opening')}>
                    <Users className="h-4 w-4 mr-2" />
                    Select Recipients
                  </Button>
                  <Button variant="outline" onClick={() => toast.info('Upload contacts dialog opening')}>
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message Content</label>
                <Textarea placeholder="Type your message here..." className="min-h-[100px]" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Schedule</label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => toast.info('Schedule dialog opening')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
              
              <Button className="w-full" onClick={() => toast.success('Broadcast scheduled successfully')}>
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-indigo-500" />
              Campaign Performance
            </CardTitle>
            <CardDescription>
              Track the performance of your broadcast campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 text-center border border-dashed rounded-md">
              <BarChart className="h-12 w-12 mx-auto mb-4 text-indigo-500/50" />
              <h3 className="text-lg font-medium mb-2">Campaign Analytics</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Track delivery rates, open rates, and click-through rates for your broadcast campaigns
              </p>
              <Button variant="outline" onClick={() => toast.info('Analytics dashboard opening soon')}>
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Broadcasting;
