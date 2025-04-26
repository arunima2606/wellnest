import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, BarChart2, BookOpen, MessageCircle, Compass, Phone, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsOpen(false);
  }, [location]);

  const NavLink = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive 
            ? 'bg-primary-50 text-primary-700' 
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary-600'
        }`}
      >
        {icon}
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sun className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-semibold text-neutral-900">WellNest</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex md:space-x-1 items-center">
            <NavLink to="/affirmations" icon={<Heart size={18} />}>
              Affirmations
            </NavLink>
            <NavLink to="/mood-tracker" icon={<BarChart2 size={18} />}>
              Mood Tracker
            </NavLink>
            <NavLink to="/journal" icon={<BookOpen size={18} />}>
              Journal
            </NavLink>
            <NavLink to="/chatbot" icon={<MessageCircle size={18} />}>
              Chatbot
            </NavLink>
            <NavLink to="/meditation" icon={<Compass size={18} />}>
              Meditation
            </NavLink>
            <NavLink to="/resources" icon={<Compass size={18} />}>
              Resources
            </NavLink>
            <NavLink to="/emergency" icon={<Phone size={18} />}>
              Emergency
            </NavLink>
            
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="ml-4 btn btn-outline"
              >
                Sign Out
              </button>
            ) : (
              <div className="ml-4 flex items-center space-x-3">
                <Link to="/sign-in" className="btn btn-outline">Sign In</Link>
                <Link to="/sign-up" className="btn btn-primary">Sign Up</Link>
              </div>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-4 space-y-1 px-4 sm:px-6">
          <NavLink to="/affirmations" icon={<Heart size={18} />}>
            Affirmations
          </NavLink>
          <NavLink to="/mood-tracker" icon={<BarChart2 size={18} />}>
            Mood Tracker
          </NavLink>
          <NavLink to="/journal" icon={<BookOpen size={18} />}>
            Journal
          </NavLink>
          <NavLink to="/chatbot" icon={<MessageCircle size={18} />}>
            Chatbot
          </NavLink>
          <NavLink to="/meditation" icon={<Compass size={18} />}>
            Meditation
          </NavLink>
          <NavLink to="/resources" icon={<Compass size={18} />}>
            Resources
          </NavLink>
          <NavLink to="/emergency" icon={<Phone size={18} />}>
            Emergency
          </NavLink>
          
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="w-full mt-4 btn btn-outline"
            >
              Sign Out
            </button>
          ) : (
            <div className="mt-4 flex flex-col space-y-3">
              <Link to="/sign-in" className="btn btn-outline text-center">Sign In</Link>
              <Link to="/sign-up" className="btn btn-primary text-center">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;