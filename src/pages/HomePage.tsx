import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BarChart2, BookOpen, MessageCircle, Compass, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Journey to <span className="text-primary-500">Better Mental Health</span> Starts Here
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-neutral-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Track your moods, practice mindfulness, and access resources to improve your wellbeing. Your personalized mental wellness companion.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/get-started" className="btn btn-primary px-8 py-3 text-base">
                Get Started
              </Link>
              <Link to="/sign-in" className="btn btn-outline px-8 py-3 text-base">
                Sign In
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Supporting Your Mental Health Journey</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our tools are designed to help you track, understand, and improve your mental wellbeing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-primary-500" />}
              title="Daily Affirmations"
              description="Start your day with positive affirmations customized to your needs and goals."
              link="/affirmations"
            />
            <FeatureCard 
              icon={<BarChart2 className="h-8 w-8 text-primary-500" />}
              title="Mood Tracker"
              description="Track your moods and emotions to identify patterns and triggers over time."
              link="/mood-tracker"
            />
            <FeatureCard 
              icon={<BookOpen className="h-8 w-8 text-primary-500" />}
              title="Journal"
              description="Express your thoughts and feelings in a private, guided journaling experience."
              link="/journal"
            />
            <FeatureCard 
              icon={<MessageCircle className="h-8 w-8 text-primary-500" />}
              title="Support Chatbot"
              description="Get immediate support and resources from our AI-powered mental health chatbot."
              link="/chatbot"
            />
            <FeatureCard 
              icon={<Compass className="h-8 w-8 text-primary-500" />}
              title="Guided Meditation"
              description="Practice mindfulness with guided meditation and breathing exercises."
              link="/meditation"
            />
            <FeatureCard 
              icon={<Phone className="h-8 w-8 text-primary-500" />}
              title="Emergency Help"
              description="Quickly access crisis resources and helplines when you need immediate support."
              link="/emergency"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">How It Works</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Start your mental wellness journey in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Create Your Account"
              description="Sign up and complete a brief mental wellness assessment to personalize your experience."
            />
            <StepCard 
              number="2"
              title="Track Daily"
              description="Record your moods, journal your thoughts, and practice mindfulness exercises."
            />
            <StepCard 
              number="3"
              title="Gain Insights"
              description="Review your progress, identify patterns, and access resources tailored to your needs."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Wellness Journey Today</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of others who are taking control of their mental health and wellbeing.
          </p>
          <Link to="/get-started" className="btn bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 text-base">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}> = ({ icon, title, description, link }) => {
  return (
    <motion.div 
      className="card card-hover h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="p-5 rounded-full bg-primary-50 inline-flex w-min mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-neutral-600 mb-5 flex-grow">{description}</p>
      <Link to={link} className="flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors mt-auto">
        Learn more <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </motion.div>
  );
};

const StepCard: React.FC<{
  number: string;
  title: string;
  description: string;
}> = ({ number, title, description }) => {
  return (
    <div className="text-center p-8">
      <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold mb-5 mx-auto">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
};

export default HomePage;