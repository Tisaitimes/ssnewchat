
import { Motion } from './ui/motion';
import LoadingImage from './ui/LoadingImage';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "ChatFluence transformed how we engage with customers. The integration was seamless, and our response time has improved by 60%.",
      author: "Sarah Johnson",
      role: "Customer Success Manager",
      company: "TechGrow Solutions",
      avatar: "https://placehold.co/400/f0f9ff/0ea5e9?text=SJ"
    },
    {
      text: "The automation capabilities are incredible. We've set up workflows that nurture leads and our conversion rate has doubled since implementation.",
      author: "Michael Chen",
      role: "Marketing Director",
      company: "Visionary Brands",
      avatar: "https://placehold.co/400/f0f9ff/0ea5e9?text=MC"
    },
    {
      text: "As a small business owner, I needed an affordable solution that didn't compromise on features. ChatFluence delivered exactly that.",
      author: "Amelia Rodriguez",
      role: "Founder & CEO",
      company: "Boutique Essentials",
      avatar: "https://placehold.co/400/f0f9ff/0ea5e9?text=AR"
    }
  ];

  return (
    <section id="testimonials" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <Motion variant="fade-up">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-400 mb-2">
              Testimonials
            </div>
          </Motion>
          
          <Motion variant="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Trusted by Businesses <span className="text-gradient">Worldwide</span>
            </h2>
          </Motion>
          
          <Motion variant="fade-up" delay={200}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what our customers are saying about how ChatFluence has revolutionized their WhatsApp business strategy.
            </p>
          </Motion>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Motion 
              key={index}
              variant="fade-up" 
              delay={100 + index * 100}
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-soft border border-gray-100 dark:border-gray-800 h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex space-x-1 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.text}"</p>
                </div>
                
                <div className="flex items-center mt-4">
                  <LoadingImage
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Motion>
          ))}
        </div>
        
        <Motion variant="fade-up" delay={400} className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white shadow-strong overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 rounded-full bg-blue-700 opacity-20 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Join 10,000+ businesses elevating their WhatsApp strategy</h3>
                <p className="text-blue-100 max-w-2xl">
                  From small startups to enterprise corporations, businesses of all sizes trust ChatFluence to deliver exceptional WhatsApp experiences.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 transition-colors font-medium rounded-lg shadow-medium">
                  View case studies
                </button>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  );
};

export default Testimonials;
