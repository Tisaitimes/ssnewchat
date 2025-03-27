
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HowItWorksDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HowItWorksDialog: React.FC<HowItWorksDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <div className="absolute right-4 top-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl">How Marketing Automation Works</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] pr-4 mt-4">
          <div className="space-y-6 pb-6">
            <section>
              <h3 className="text-xl font-semibold mb-2">What is Marketing Automation?</h3>
              <p>Marketing automation helps you create personalized, targeted campaigns that run automatically based on triggers, schedules, or customer actions. It saves time and ensures consistent communication with your leads and customers.</p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Creating a Workflow</h3>
              <p>To create a new automation workflow:</p>
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li>Click the <strong>Create Workflow</strong> button</li>
                <li>Fill in the basic details including name, description, and status</li>
                <li>Define the trigger that will start the workflow</li>
                <li>Set up the actions that will execute automatically</li>
                <li>Review and activate your workflow</li>
              </ol>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Available Triggers</h3>
              <p>Triggers are events that start your workflow:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li><strong>Time-based:</strong> Schedule messages for specific dates or recurring times</li>
                <li><strong>Tag-based:</strong> Activate when a lead is tagged with specific labels</li>
                <li><strong>Activity-based:</strong> Start when a lead performs certain actions like clicking a link or visiting a page</li>
                <li><strong>Status change:</strong> Trigger when a lead moves to a different stage in your pipeline</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Available Actions</h3>
              <p>Actions are what happens when a workflow is triggered:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li><strong>Send WhatsApp message:</strong> Deliver personalized messages through WhatsApp</li>
                <li><strong>Send email:</strong> Send targeted email campaigns</li>
                <li><strong>Update lead status:</strong> Automatically move leads through your pipeline</li>
                <li><strong>Add/remove tags:</strong> Categorize leads based on their interactions</li>
                <li><strong>Assign to agent:</strong> Route leads to the appropriate team member</li>
                <li><strong>Create task:</strong> Generate follow-up tasks or reminders</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Conditional Logic</h3>
              <p>Create branches in your workflow based on lead behavior:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li><strong>If/Then branches:</strong> Execute different actions based on conditions</li>
                <li><strong>Wait periods:</strong> Add delays between actions</li>
                <li><strong>Exit conditions:</strong> Define when leads should exit the workflow</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Templates</h3>
              <p>Use our pre-built templates to quickly set up common workflows:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li><strong>Welcome series:</strong> Introduce new leads to your products or services</li>
                <li><strong>Follow-up sequence:</strong> Engage with leads after initial contact</li>
                <li><strong>Re-engagement campaign:</strong> Reconnect with inactive leads</li>
                <li><strong>Birthday/anniversary:</strong> Send timely congratulations</li>
                <li><strong>Abandoned cart:</strong> Recover potential lost sales</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p>Measure the effectiveness of your automation:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li><strong>Performance metrics:</strong> Track delivery rates, open rates, and response rates</li>
                <li><strong>Conversion tracking:</strong> See how many leads move to the next stage</li>
                <li><strong>A/B testing:</strong> Compare different messages or workflows</li>
                <li><strong>ROI calculation:</strong> Measure the return on your automation investment</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li>Start with simple workflows and gradually add complexity</li>
                <li>Segment your audience for more personalized messaging</li>
                <li>Test workflows before activation</li>
                <li>Monitor performance and adjust as needed</li>
                <li>Don't overwhelm leads with too many messages</li>
                <li>Include clear opt-out options in all communications</li>
                <li>Regularly clean your database to maintain high deliverability</li>
              </ol>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksDialog;
