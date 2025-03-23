
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Activity, Users } from 'lucide-react';
import { Motion, MotionStagger } from './ui/motion';
import LoadingImage from './ui/LoadingImage';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    navigate('/sign-up');
  };

  const handleHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <section className="pt-32 pb-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col space-y-4">
            <Motion variant="fade-up">
              <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-400 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
                WhatsApp CRM Solution
              </div>
            </Motion>
            
            <Motion variant="fade-up" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Transform Your <span className="text-gradient">WhatsApp</span> Into A Powerful CRM
              </h1>
            </Motion>
            
            <Motion variant="fade-up" delay={200}>
              <p className="text-xl text-muted-foreground mb-8 md:pr-10">
                Seamlessly integrate WhatsApp with your business operations. Manage conversations, automate responses, and convert chats into valuable customer relationships.
              </p>
            </Motion>
            
            <Motion variant="fade-up" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="pulse-btn group" onClick={handleStartFree}>
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleHowItWorks}>
                  See how it works
                </Button>
              </div>
            </Motion>
            
            <Motion variant="fade-up" delay={400}>
              <div className="mt-8 pt-8 border-t flex items-center justify-between">
                <MotionStagger 
                  variant="fade-up" 
                  staggerDelay={100} 
                  baseDelay={500}
                >
                  {[
                    { icon: MessageSquare, text: '150+ Templates' },
                    { icon: Activity, text: '99.9% Uptime' },
                    { icon: Users, text: '10k+ Users' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center text-sm font-medium">
                        <Icon className="mr-2 h-4 w-4 text-blue-600" />
                        {item.text}
                      </div>
                    );
                  })}
                </MotionStagger>
              </div>
            </Motion>
          </div>
          
          <Motion 
            variant="fade-in" 
            delay={300} 
            className="relative"
          >
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative glass rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 h-6 w-48 rounded-md bg-gray-100 dark:bg-gray-800"></div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden">
                  <LoadingImage
                    src="https://placehold.co/600x400/e0f2fe/0ea5e9?text=ChatFluence+Dashboard&font=Poppins"
                    alt="ChatFluence Dashboard"
                    className="w-full h-auto"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-col space-y-2">
                      <div className="h-4 w-3/4 rounded-md bg-white/20"></div>
                      <div className="h-4 w-1/2 rounded-md bg-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 transform">
                <div className="animate-float glass rounded-lg p-4 shadow-medium border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <MessageSquare size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">New Message</span>
                      <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-4 bottom-10">
                <div className="animate-float delay-700 glass rounded-lg p-4 shadow-medium border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Activity size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Response Rate</span>
                      <span className="text-xs text-green-500">+28% this week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </section>
  );
};

export default Hero;
