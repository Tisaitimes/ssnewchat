
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Motion } from './ui/motion';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'How It Works', href: '/how-it-works' },
  ];

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleStartFree = () => {
    navigate('/sign-up');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <Motion variant="fade-in" duration={600}>
          <Link to="/" className="flex items-center space-x-2">
            <span className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold">W</span>
            </span>
            <span className="font-semibold text-xl">ChatFluence</span>
          </Link>
        </Motion>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Motion variant="fade-down" duration={700}>
            <ul className="flex space-x-8">
              {navItems.map((item, i) => (
                <li key={i}>
                  {item.href.startsWith('#') ? (
                    <a 
                      href={item.href}
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      to={item.href}
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Motion>
          
          <Motion variant="fade-down" duration={800} delay={100}>
            <div className="flex items-center space-x-3">
              {user ? (
                <Button onClick={handleDashboard}>
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="h-9" onClick={handleSignIn}>
                    Sign in
                  </Button>
                  <Button size="sm" className="h-9" onClick={handleSignUp}>
                    Get started
                  </Button>
                </>
              )}
            </div>
          </Motion>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div 
        className={cn(
          'fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-transform duration-300 ease-in-out pt-20',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="container py-6">
          <ul className="flex flex-col space-y-6">
            {navItems.map((item, i) => (
              <li key={i}>
                {item.href.startsWith('#') ? (
                  <a 
                    href={item.href}
                    className="text-lg font-medium block py-2 border-b border-gray-100 dark:border-gray-800"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      document.body.style.overflow = '';
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="text-lg font-medium block py-2 border-b border-gray-100 dark:border-gray-800"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      document.body.style.overflow = '';
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="mt-8 flex flex-col space-y-4">
            {user ? (
              <Button className="w-full" size="lg" onClick={() => {
                handleDashboard();
                setMobileMenuOpen(false);
                document.body.style.overflow = '';
              }}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    handleSignIn();
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                  }}
                >
                  Sign in
                </Button>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    handleSignUp();
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                  }}
                >
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
