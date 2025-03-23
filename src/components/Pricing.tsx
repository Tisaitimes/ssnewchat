
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Motion } from './ui/motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  const navigate = useNavigate();
  
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just starting with WhatsApp.",
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        "1 WhatsApp business account",
        "Up to 1,000 messages/month",
        "Basic chatbot builder",
        "Email support",
        "1 team member",
        "7-day message history"
      ],
      limitations: [
        "No API access",
        "Limited analytics",
        "No custom integrations"
      ],
      cta: "Start free trial",
      highlight: false
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with active customer engagement.",
      monthlyPrice: 79,
      annualPrice: 69,
      features: [
        "3 WhatsApp business accounts",
        "Up to 10,000 messages/month",
        "Advanced chatbot builder",
        "Priority email & chat support",
        "5 team members",
        "30-day message history",
        "Basic API access",
        "Full analytics dashboard",
        "Standard integrations"
      ],
      limitations: [],
      cta: "Start free trial",
      highlight: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex WhatsApp needs.",
      monthlyPrice: 199,
      annualPrice: 169,
      features: [
        "10 WhatsApp business accounts",
        "Up to 50,000 messages/month",
        "Enterprise chatbot builder",
        "24/7 priority support",
        "Unlimited team members",
        "Unlimited message history",
        "Full API access",
        "Advanced analytics & reporting",
        "Custom integrations",
        "Dedicated account manager",
        "Service level agreement"
      ],
      limitations: [],
      cta: "Contact sales",
      highlight: false
    }
  ];

  const calculatePrice = (plan: any) => {
    return annual ? plan.annualPrice : plan.monthlyPrice;
  };

  const handlePlanSelect = (plan: any) => {
    if (plan.name === "Enterprise") {
      // Redirect to contact form
      window.location.href = "#contact";
    } else {
      // Redirect to sign up with plan info
      navigate(`/sign-up?plan=${plan.name.toLowerCase()}`);
    }
  };

  const handleContactSales = () => {
    window.location.href = "#contact";
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <Motion variant="fade-up">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-400 mb-2">
              Pricing
            </div>
          </Motion>
          
          <Motion variant="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h2>
          </Motion>
          
          <Motion variant="fade-up" delay={200}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your business needs. All plans include a 14-day free trial.
            </p>
          </Motion>
          
          <Motion variant="fade-up" delay={300}>
            <div className="flex items-center justify-center mb-12">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1 shadow-sm">
                <div className="relative flex">
                  <button
                    onClick={() => setAnnual(false)}
                    className={cn(
                      "relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors",
                      !annual 
                        ? "text-white" 
                        : "text-gray-600 dark:text-gray-400"
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
                    className={cn(
                      "relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors",
                      annual 
                        ? "text-white" 
                        : "text-gray-600 dark:text-gray-400"
                    )}
                  >
                    Annual (Save 15%)
                  </button>
                  <div 
                    className={cn(
                      "absolute inset-0 h-full flex transition-transform duration-200 ease-in-out",
                      annual ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className="h-full w-1/2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Motion 
              key={index}
              variant="fade-up" 
              delay={100 + index * 100}
            >
              <div className={cn(
                "relative h-full flex flex-col rounded-xl p-8 shadow-medium",
                plan.highlight 
                  ? "bg-white dark:bg-gray-900 border-2 border-blue-500 shadow-highlight" 
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              )}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${calculatePrice(plan)}</span>
                    <span className="text-muted-foreground ml-1">/ month</span>
                    {annual && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Save ${(plan.monthlyPrice - plan.annualPrice) * 12} annually
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-6">
                    <p className="font-medium mb-3">Includes:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mb-6">
                      <p className="font-medium mb-3 text-muted-foreground">Limitations:</p>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation, i) => (
                          <li key={i} className="flex items-start text-muted-foreground">
                            <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="mt-8">
                  <Button 
                    className={cn(
                      "w-full", 
                      plan.highlight ? "bg-blue-600 hover:bg-blue-700" : ""
                    )}
                    variant={plan.highlight ? "default" : "outline"}
                    size="lg"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </Motion>
          ))}
        </div>
        
        <Motion variant="fade-up" delay={400} className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-medium border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Need a custom solution?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We offer tailored plans for businesses with specific requirements. Contact our sales team to discuss your needs.
            </p>
            <Button variant="outline" size="lg" onClick={handleContactSales}>
              Contact Sales
            </Button>
          </div>
        </Motion>
      </div>
    </section>
  );
};

export default Pricing;
