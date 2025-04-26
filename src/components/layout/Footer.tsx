import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Sun, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Sun className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-semibold text-neutral-900">WellNest</span>
            </div>
            <p className="mt-4 text-sm text-neutral-600 max-w-xs">
              Supporting your mental health journey with tools for mindfulness, tracking, and growth.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Features</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/affirmations" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Daily Affirmations
                </Link>
              </li>
              <li>
                <Link to="/mood-tracker" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Mood Tracker
                </Link>
              </li>
              <li>
                <Link to="/journal" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Support Chatbot
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Resources</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/meditation" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Meditation Guides
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Self-Help Resources
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Emergency Help
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Company</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 text-center">
            &copy; {new Date().getFullYear()} WellNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;