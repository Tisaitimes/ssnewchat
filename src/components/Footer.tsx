
import { Link } from 'react-router-dom';
import { Motion } from './ui/motion';
import { MessageSquare, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Use Cases', href: '#' },
      { label: 'Roadmap', href: '#' },
      { label: 'Integrations', href: '#' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Support', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#contact' },
      { label: 'Partners', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Security', href: '#' },
    ],
  };

  return (
    <footer id="contact" className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Motion variant="fade-up">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <span className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold">W</span>
                </span>
                <span className="font-semibold text-xl">ChatFluence</span>
              </Link>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                Transform your WhatsApp into a powerful CRM solution. Manage customer relationships, automate marketing, and provide exceptional support.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </Motion>
          </div>
          
          <Motion variant="fade-up" delay={100}>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-blue-600 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Motion>
          
          <Motion variant="fade-up" delay={200}>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-blue-600 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Motion>
          
          <Motion variant="fade-up" delay={300}>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-blue-600 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Motion>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between">
          <Motion variant="fade-up" delay={400}>
            <p className="text-muted-foreground">
              © {currentYear} ChatFluence. All rights reserved.
            </p>
          </Motion>
          
          <Motion variant="fade-up" delay={500}>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap gap-4 md:gap-8">
                {footerLinks.legal.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-blue-600 dark:hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Motion>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
