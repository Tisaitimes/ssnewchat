
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart } from 'recharts';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Download, Calendar, Filter, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Analytics = () => {
  // Sample data for charts
  const lineChartData = [
    { name: 'Jan', messages: 400, responses: 240 },
    { name: 'Feb', messages: 300, responses: 198 },
    { name: 'Mar', messages: 520, responses: 350 },
    { name: 'Apr', messages: 470, responses: 410 },
    { name: 'May', messages: 540, responses: 480 },
    { name: 'Jun', messages: 620, responses: 560 },
  ];

  const pieChartData = [
    { name: 'Sales Inquiries', value: 400 },
    { name: 'Support Requests', value: 300 },
    { name: 'Product Questions', value: 300 },
    { name: 'Feedback', value: 200 },
  ];

  const barChartData = [
    { name: 'Mon', sent: 40, delivered: 38, read: 32 },
    { name: 'Tue', sent: 30, delivered: 28, read: 25 },
    { name: 'Wed', sent: 20, delivered: 20, read: 17 },
    { name: 'Thu', sent: 27, delivered: 25, read: 20 },
    { name: 'Fri', sent: 18, delivered: 18, read: 15 },
    { name: 'Sat', sent: 23, delivered: 21, read: 18 },
    { name: 'Sun', sent: 34, delivered: 30, read: 24 },
  ];

  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                Advanced Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive metrics for your WhatsApp business activities
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => toast.info('Date filter opening')}>
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline" onClick={() => toast.info('Export started')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={() => toast.info('Filter dialog opening')}>
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => toast.success('Refreshed')}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Messages</p>
                <p className="text-2xl font-bold">8,942</p>
                <p className="text-sm text-green-600 mt-2">+12% from last month</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Response Time</p>
                <p className="text-2xl font-bold">4.3 min</p>
                <p className="text-sm text-green-600 mt-2">-0.5 min from last month</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground mb-1">Delivery Rate</p>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-sm text-green-600 mt-2">+0.5% from last month</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground mb-1">Customer Satisfaction</p>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-green-600 mt-2">+2% from last month</p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-blue-500" />
                  Message Volume
                </CardTitle>
                <CardDescription>
                  Message sent and responses over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <LineChart width={500} height={300} data={lineChartData}>
                    {/* Chart implementation would go here */}
                  </LineChart>
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                        <span className="text-sm">Messages</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-sm">Responses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-purple-500" />
                  Conversation Categories
                </CardTitle>
                <CardDescription>
                  Breakdown of conversation types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <PieChart width={500} height={300} data={pieChartData}>
                    {/* Chart implementation would go here */}
                  </PieChart>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {pieChartData.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][index % 4] }} />
                        <span className="text-sm">{entry.name}: {entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                Message Delivery Analytics
              </CardTitle>
              <CardDescription>
                Weekly breakdown of message sent, delivered, and read status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <BarChart width={800} height={300} data={barChartData}>
                  {/* Chart implementation would go here */}
                </BarChart>
                <div className="flex justify-center mt-4">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm">Sent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Delivered</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span className="text-sm">Read</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
