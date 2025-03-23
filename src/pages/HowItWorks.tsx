
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Motion, MotionStagger } from '@/components/ui/motion';
import { CheckCircle, ArrowLeft, MessageSquare, Users, BarChart, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingImage from '@/components/ui/LoadingImage';

const HowItWorks = () => {
  const steps = [
    {
      title: "Connect your WhatsApp",
      description: "Link your WhatsApp Business account to ChatFluence in under 5 minutes with our simple setup wizard.",
      icon: MessageSquare,
      image: "https://placehold.co/800x500/e0f2fe/0ea5e9?text=WhatsApp+Connection&font=Poppins"
    },
    {
      title: "Import your contacts",
      description: "Seamlessly import your existing contacts or add new ones directly through our interface.",
      icon: Users,
      image: "https://placehold.co/800x500/e0f2fe/0ea5e9?text=Contact+Management&font=Poppins"
    },
    {
      title: "Set up automations",
      description: "Create custom chatbots and automate responses using our intuitive drag-and-drop builder.",
      icon: Zap,
      image: "https://placehold.co/800x500/e0f2fe/0ea5e9?text=Automation+Builder&font=Poppins"
    },
    {
      title: "Monitor performance",
      description: "Track message delivery, response rates, and customer engagement through detailed analytics.",
      icon: BarChart,
      image: "https://placehold.co/800x500/e0f2fe/0ea5e9?text=Performance+Dashboard&font=Poppins"
    }
  ];

  const features = [
    "Real-time chat within admin area",
    "Campaign targeting and bulk sending",
    "Bot flow builder with drag-and-drop interface",
    "AI-powered responses and translations",
    "WhatsApp Cloud API integration",
    "Comprehensive analytics dashboard",
    "Team member management"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-16">
              <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
              
              <Motion variant="fade-up">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  How ChatFluence <span className="text-gradient">Works</span>
                </h1>
              </Motion>
              
              <Motion variant="fade-up" delay={100}>
                <p className="text-xl text-muted-foreground max-w-3xl">
                  Transform your WhatsApp into a powerful CRM in minutes. Follow these simple steps to get started.
                </p>
              </Motion>
            </div>
            
            <div className="space-y-24 mb-20">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Motion key={i} variant="fade-up" className="relative">
                    <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`space-y-6 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                          <Icon className={`h-5 w-5 ${i % 2 === 1 ? 'ml-2' : 'mr-2'}`} />
                          Step {i + 1}
                        </div>
                        
                        <h2 className="text-3xl font-bold">{step.title}</h2>
                        <p className="text-lg text-muted-foreground">{step.description}</p>
                        
                        {i === steps.length - 1 && (
                          <div className="pt-4">
                            <Button size="lg">
                              Get Started Now
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
                        <div className="relative glass rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-medium">
                          <LoadingImage
                            src={step.image}
                            alt={step.title}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full h-16 w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
                    )}
                  </Motion>
                );
              })}
            </div>
            
            <Motion variant="fade-up" className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-medium border border-gray-200 dark:border-gray-800">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Everything You Need in One Platform
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  ChatFluence combines all the essential tools for WhatsApp business management.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <MotionStagger variant="fade-up" staggerDelay={100}>
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start mb-4">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-lg">{feature}</p>
                      </div>
                    ))}
                  </MotionStagger>
                  
                  <Motion variant="fade-up" delay={800} className="mt-8">
                    <Button size="lg">Start Your Free Trial</Button>
                  </Motion>
                </div>
                
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
                  <div className="relative glass rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-medium">
                    <LoadingImage
                      src="https://placehold.co/800x600/e0f2fe/0ea5e9?text=Features+Overview&font=Poppins"
                      alt="ChatFluence Features"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </Motion>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
