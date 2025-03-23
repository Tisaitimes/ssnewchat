
import { MessageSquare, Bot, Send, Users, BarChart, Lock, Zap, Headphones } from 'lucide-react';
import { Motion, MotionStagger } from './ui/motion';
import FeatureCard from './ui/FeatureCard';
import { cn } from '@/lib/utils';

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "WhatsApp Integration",
      description: "Connect WhatsApp to your business operations seamlessly using the official Cloud API."
    },
    {
      icon: Bot,
      title: "AI Chatbot Builder",
      description: "Create intelligent chatbots with our intuitive drag-and-drop builder, no coding required."
    },
    {
      icon: Send,
      title: "Broadcasting",
      description: "Send targeted messages to specific customer segments with detailed delivery analytics."
    },
    {
      icon: Users,
      title: "Multi-Agent Support",
      description: "Assign conversations to team members and collaborate efficiently on customer support."
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Track performance metrics with comprehensive dashboards and detailed reports."
    },
    {
      icon: Lock,
      title: "Secure Messaging",
      description: "End-to-end encryption ensures your customer conversations remain private and secure."
    },
    {
      icon: Zap,
      title: "Marketing Automation",
      description: "Create powerful automation workflows that nurture leads and engage customers."
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Provide exceptional service with quick responses and organized customer history."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <Motion variant="fade-up">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-400 mb-2">
              Features
            </div>
          </Motion>
          
          <Motion variant="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything You Need For <span className="text-gradient">WhatsApp Business</span>
            </h2>
          </Motion>
          
          <Motion variant="fade-up" delay={200}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines powerful features to transform WhatsApp into your ultimate business tool for marketing, sales, and customer support.
            </p>
          </Motion>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Motion 
              key={index}
              variant="fade-up" 
              delay={100 + index * 50}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className={cn(
                  index === 0 && "md:col-span-2 lg:col-span-2 md:row-span-2",
                  index === 3 && "lg:col-span-2"
                )}
              />
            </Motion>
          ))}
        </div>
        
        <Motion variant="fade-up" delay={400} className="mt-16 text-center">
          <div className="inline-flex items-center p-8 rounded-xl bg-white dark:bg-gray-900/80 shadow-medium border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex flex-col text-left">
                <h3 className="text-2xl font-semibold mb-2">Ready to enhance your WhatsApp business?</h3>
                <p className="text-muted-foreground">Start with our 14-day free trial. No credit card required.</p>
              </div>
              <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors whitespace-nowrap">
                Get Started Free
              </button>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  );
};

export default Features;
