import React from 'react';
import { Phone, MessageSquare, Globe, Heart, AlertTriangle, Clock, MapPin } from 'lucide-react';

type HelplineType = {
  name: string;
  phone: string;
  text?: string;
  website: string;
  hours: string;
  description: string;
  type: 'crisis' | 'mental health' | 'substance' | 'special';
};

const EmergencyPage: React.FC = () => {
  const helplines: HelplineType[] = [
    {
      name: "988 Suicide & Crisis Lifeline",
      phone: "988",
      text: "988",
      website: "https://988lifeline.org/",
      hours: "24/7",
      description: "Call or text 988 for support during a suicidal, mental health, and/or substance use crisis.",
      type: "crisis"
    },
    {
      name: "Crisis Text Line",
      phone: "",
      text: "HOME to 741741",
      website: "https://www.crisistextline.org/",
      hours: "24/7",
      description: "Text HOME to 741741 to connect with a Crisis Counselor for free support during any type of crisis.",
      type: "crisis"
    },
    {
      name: "Veterans Crisis Line",
      phone: "1-800-273-8255 (Press 1)",
      text: "838255",
      website: "https://www.veteranscrisisline.net/",
      hours: "24/7",
      description: "Connects veterans in crisis and their families with qualified responders through a confidential toll-free hotline.",
      type: "special"
    },
    {
      name: "SAMHSA's National Helpline",
      phone: "1-800-662-4357",
      website: "https://www.samhsa.gov/find-help/national-helpline",
      hours: "24/7, 365 days a year",
      description: "Treatment referral and information service for individuals and families facing mental health and/or substance use disorders.",
      type: "mental health"
    },
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      text: "LOVEIS to 22522",
      website: "https://www.thehotline.org/",
      hours: "24/7",
      description: "Provides essential tools and support to help survivors of domestic violence.",
      type: "crisis"
    },
    {
      name: "NAMI HelpLine",
      phone: "1-800-950-6264",
      website: "https://www.nami.org/help",
      hours: "Monday through Friday, 10 a.m. – 10 p.m. ET",
      description: "Provides information, resource referrals and support to people living with mental health conditions.",
      type: "mental health"
    },
    {
      name: "Trevor Project",
      phone: "1-866-488-7386",
      text: "START to 678678",
      website: "https://www.thetrevorproject.org/",
      hours: "24/7",
      description: "Crisis intervention and suicide prevention services for LGBTQ young people under 25.",
      type: "special"
    },
    {
      name: "Substance Abuse Helpline",
      phone: "1-844-289-0879",
      website: "https://www.drugabuse.gov/drug-topics/treatment",
      hours: "24/7",
      description: "Free, confidential help for substance use disorders, including information about treatment options.",
      type: "substance"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Emergency Resources</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          If you or someone you know is in immediate danger, please call emergency services at <span className="font-bold">911</span> or visit your nearest emergency room.
        </p>
      </div>

      {/* Immediate Action Notice */}
      <div className="bg-error-50 border-l-4 border-error-500 p-5 rounded-md mb-12">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-error-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-error-800">Immediate Risk</h3>
            <p className="mt-2 text-error-700">
              If you're thinking about suicide, are worried about a friend or loved one, or would like emotional support, call or text 988 to connect with the 988 Suicide & Crisis Lifeline.
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Helplines */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Phone className="mr-2 text-error-500" />
          Crisis Helplines
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {helplines.filter(h => h.type === 'crisis').map((helpline, index) => (
            <HelplineCard key={index} helpline={helpline} />
          ))}
        </div>
      </div>

      {/* Mental Health Support */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Heart className="mr-2 text-primary-500" />
          Mental Health Support
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {helplines.filter(h => h.type === 'mental health').map((helpline, index) => (
            <HelplineCard key={index} helpline={helpline} />
          ))}
        </div>
      </div>

      {/* Specialized Support */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <MessageSquare className="mr-2 text-secondary-500" />
          Specialized Support
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {helplines.filter(h => h.type === 'special' || h.type === 'substance').map((helpline, index) => (
            <HelplineCard key={index} helpline={helpline} />
          ))}
        </div>
      </div>

      {/* Find Local Resources */}
      <div className="bg-neutral-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <MapPin className="mr-2 text-accent-400" />
          Find Local Resources
        </h2>
        <p className="text-neutral-700 mb-6">
          Mental health services often vary by location. Use these tools to find resources near you:
        </p>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <a 
            href="https://findtreatment.samhsa.gov/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="card card-hover p-5 flex items-center"
          >
            <Globe className="h-8 w-8 text-primary-500 mr-4" />
            <div>
              <h3 className="font-medium">SAMHSA Treatment Locator</h3>
              <p className="text-sm text-neutral-600">Find treatment facilities for mental health and substance use disorders</p>
            </div>
          </a>
          <a 
            href="https://www.psychologytoday.com/us/therapists" 
            target="_blank" 
            rel="noopener noreferrer"
            className="card card-hover p-5 flex items-center"
          >
            <Globe className="h-8 w-8 text-primary-500 mr-4" />
            <div>
              <h3 className="font-medium">Psychology Today Therapist Directory</h3>
              <p className="text-sm text-neutral-600">Find therapists, counselors, and treatment centers near you</p>
            </div>
          </a>
        </div>
      </div>

      {/* Safety Planning */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Creating a Safety Plan</h2>
        <p className="text-neutral-700 mb-6">
          A safety plan is a personalized, practical plan that can help you avoid dangerous situations and know the best way to react when you're in danger. Here are key components to include in your safety plan:
        </p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="card p-5">
            <h3 className="font-medium mb-3">1. Warning Signs</h3>
            <p className="text-sm text-neutral-600">
              Identify thoughts, feelings, behaviors, or situations that may signal a crisis is developing.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-medium mb-3">2. Coping Strategies</h3>
            <p className="text-sm text-neutral-600">
              List activities you can do by yourself to take your mind off problems or help you cope with difficult emotions.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-medium mb-3">3. Social Contacts</h3>
            <p className="text-sm text-neutral-600">
              Identify people who can provide support and distraction during difficult times.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-medium mb-3">4. Professional Help</h3>
            <p className="text-sm text-neutral-600">
              List the names and contact information of professionals you can contact during a crisis.
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a 
            href="https://suicidepreventionlifeline.org/wp-content/uploads/2016/08/Brown_StanleySafetyPlanTemplate.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Download Safety Plan Template
          </a>
        </div>
      </div>

      {/* Note to Caregivers */}
      <div className="bg-primary-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">For Friends and Family Members</h2>
        <p className="text-neutral-700 mb-4">
          If you're concerned about someone's mental health or safety:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-neutral-700">
          <li>Take all talk of suicide seriously</li>
          <li>Listen with empathy and without judgment</li>
          <li>Encourage them to seek professional help</li>
          <li>Help them connect with resources and support</li>
          <li>Remove potentially harmful items from their environment if possible</li>
          <li>Check in regularly and be persistent</li>
          <li>Take care of your own mental health too</li>
        </ul>
        <p className="mt-6 text-neutral-700">
          Remember, you don't have to be a mental health professional to provide support. Sometimes just being there and showing you care can make a difference.
        </p>
      </div>
    </div>
  );
};

const HelplineCard: React.FC<{helpline: HelplineType}> = ({ helpline }) => {
  return (
    <div className="card card-hover">
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2">{helpline.name}</h3>
        <p className="text-neutral-600 mb-4">{helpline.description}</p>
        
        <div className="space-y-3">
          {helpline.phone && (
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Call</p>
                <p className="text-neutral-700">{helpline.phone}</p>
              </div>
            </div>
          )}
          
          {helpline.text && (
            <div className="flex items-start">
              <MessageSquare className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Text</p>
                <p className="text-neutral-700">{helpline.text}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-start">
            <Globe className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Website</p>
              <a 
                href={helpline.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 underline"
              >
                Visit Website
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Hours</p>
              <p className="text-neutral-700">{helpline.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;