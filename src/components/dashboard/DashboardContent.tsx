
import React from 'react';
import { Motion } from '@/components/ui/motion';
import DashboardOverview from './DashboardOverview';
import WhatsAppIntegration from './WhatsAppIntegration';
import ChatbotBuilder from './ChatbotBuilder';
import Broadcasting from './Broadcasting';
import AgentManagement from './AgentManagement';
import Analytics from './Analytics';
import SecureMessaging from './SecureMessaging';
import MarketingAutomation from './MarketingAutomation';
import TicketSystem from './TicketSystem';
import Conversation from './Conversation';
import AutoReply from './AutoReply';
import AutoFollowUp from './AutoFollowUp';
import LeadManagement from './LeadManagement';

interface DashboardContentProps {
  activeTab: string;
}

const DashboardContent = ({ activeTab }: DashboardContentProps) => {
  return (
    <main className="container py-8 px-4">
      <Motion variant="fade-up">
        <h1 className="text-3xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        
        {activeTab === 'overview' && <DashboardOverview />}
        {activeTab === 'whatsapp' && <WhatsAppIntegration />}
        {activeTab === 'conversation' && <Conversation />}
        {activeTab === 'chatbot' && <ChatbotBuilder />}
        {activeTab === 'broadcasting' && <Broadcasting />}
        {activeTab === 'autoreply' && <AutoReply />}
        {activeTab === 'followup' && <AutoFollowUp />}
        {activeTab === 'leads' && <LeadManagement />}
        {activeTab === 'agents' && <AgentManagement />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'marketing' && <MarketingAutomation />}
        {activeTab === 'tickets' && <TicketSystem />}
      </Motion>
    </main>
  );
};

export default DashboardContent;
