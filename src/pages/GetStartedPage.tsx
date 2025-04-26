import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight } from 'lucide-react';

const GetStartedPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleAnswer = (question: string, answer: string) => {
    setAnswers({ ...answers, [question]: answer });
    setStep(step + 1);
  };

  const handleComplete = () => {
    // In a real app, you would save this data to the user's profile
    console.log('Onboarding complete with answers:', answers);
    navigate('/sign-up');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Get Started with Mindful</h1>
        <p className="text-neutral-600">
          Answer a few questions to help us personalize your experience
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-neutral-200 rounded-full h-2 mb-12">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>

      {/* Step 1: Goal */}
      {step === 1 && (
        <div className="slide-up">
          <h2 className="text-2xl font-semibold mb-6">What's your primary wellness goal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer('goal', 'reduce anxiety')}
              className="card card-hover p-6 text-left flex items-start space-x-4"
            >
              <div className="bg-primary-100 rounded-full p-3">
                <CheckCircle className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Reduce Anxiety</h3>
                <p className="text-neutral-600 text-sm">Learn techniques to manage and reduce anxiety and stress.</p>
              </div>
            </button>
            <button
              onClick={() => handleAnswer('goal', 'improve mood')}
              className="card card-hover p-6 text-left flex items-start space-x-4"
            >
              <div className="bg-primary-100 rounded-full p-3">
                <CheckCircle className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Improve Mood</h3>
                <p className="text-neutral-600 text-sm">Develop habits that help elevate and stabilize your mood.</p>
              </div>
            </button>
            <button
              onClick={() => handleAnswer('goal', 'sleep better')}
              className="card card-hover p-6 text-left flex items-start space-x-4"
            >
              <div className="bg-primary-100 rounded-full p-3">
                <CheckCircle className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Sleep Better</h3>
                <p className="text-neutral-600 text-sm">Improve your sleep quality and establish healthy sleep patterns.</p>
              </div>
            </button>
            <button
              onClick={() => handleAnswer('goal', 'mindfulness')}
              className="card card-hover p-6 text-left flex items-start space-x-4"
            >
              <div className="bg-primary-100 rounded-full p-3">
                <CheckCircle className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Practice Mindfulness</h3>
                <p className="text-neutral-600 text-sm">Build a regular mindfulness practice for greater awareness and presence.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Current Feeling */}
      {step === 2 && (
        <div className="slide-up">
          <h2 className="text-2xl font-semibold mb-6">How are you feeling today?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <button
              onClick={() => handleAnswer('feeling', 'great')}
              className="card card-hover p-6 text-center"
            >
              <div className="text-3xl mb-2">😄</div>
              <div className="font-medium">Great</div>
            </button>
            <button
              onClick={() => handleAnswer('feeling', 'good')}
              className="card card-hover p-6 text-center"
            >
              <div className="text-3xl mb-2">🙂</div>
              <div className="font-medium">Good</div>
            </button>
            <button
              onClick={() => handleAnswer('feeling', 'okay')}
              className="card card-hover p-6 text-center"
            >
              <div className="text-3xl mb-2">😐</div>
              <div className="font-medium">Okay</div>
            </button>
            <button
              onClick={() => handleAnswer('feeling', 'down')}
              className="card card-hover p-6 text-center"
            >
              <div className="text-3xl mb-2">😔</div>
              <div className="font-medium">Down</div>
            </button>
            <button
              onClick={() => handleAnswer('feeling', 'terrible')}
              className="card card-hover p-6 text-center"
            >
              <div className="text-3xl mb-2">😞</div>
              <div className="font-medium">Terrible</div>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Experience */}
      {step === 3 && (
        <div className="slide-up">
          <h2 className="text-2xl font-semibold mb-6">Have you used mental health apps before?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleAnswer('experience', 'never')}
              className="card card-hover p-6 text-center"
            >
              <h3 className="font-medium text-lg mb-2">Never</h3>
              <p className="text-neutral-600 text-sm">This is my first time using a mental health app.</p>
            </button>
            <button
              onClick={() => handleAnswer('experience', 'some')}
              className="card card-hover p-6 text-center"
            >
              <h3 className="font-medium text-lg mb-2">Some Experience</h3>
              <p className="text-neutral-600 text-sm">I've tried one or two apps in the past.</p>
            </button>
            <button
              onClick={() => handleAnswer('experience', 'experienced')}
              className="card card-hover p-6 text-center"
            >
              <h3 className="font-medium text-lg mb-2">Experienced</h3>
              <p className="text-neutral-600 text-sm">I regularly use mental health apps.</p>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Time */}
      {step === 4 && (
        <div className="slide-up">
          <h2 className="text-2xl font-semibold mb-6">How much time can you dedicate daily?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleAnswer('time', 'minimal')}
              className="card card-hover p-6 text-center"
            >
              <h3 className="font-medium text-lg mb-2">A Few Minutes</h3>
              <p className="text-neutral-600 text-sm">Just the essentials, 5 minutes or less.</p>
            </button>
            <button
              onClick={() => handleAnswer('time', 'moderate')}
              className="card card-hover p-6 text-center"
            >
              <h3 className="font-medium text-lg mb-2">Up to 15 Minutes</h3>
              <p className="text-neutral-600 text-sm">I can spare around 10-15 minutes daily.</p>
            </button>
            <button
              onClick={() => handleAnswer('time', 'dedicated')}
              className="card card-hover p-6 text-center"
            >
              <h3 className="font-medium text-lg mb-2">More Than 15 Minutes</h3>
              <p className="text-neutral-600 text-sm">I'm committed to setting aside time for my mental health.</p>
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Summary and Next Steps */}
      {step === 5 && (
        <div className="slide-up">
          <h2 className="text-2xl font-semibold mb-6">Great! We're ready to get started</h2>
          <div className="card p-6 mb-8">
            <h3 className="font-medium text-lg mb-4">Your personalized wellness plan:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Goal:</strong> {answers.goal?.charAt(0).toUpperCase() + answers.goal?.slice(1)}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Current Feeling:</strong> {answers.feeling?.charAt(0).toUpperCase() + answers.feeling?.slice(1)}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Experience Level:</strong> {answers.experience === 'never' ? 'Beginner' : answers.experience === 'some' ? 'Intermediate' : 'Advanced'}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Daily Time:</strong> {answers.time === 'minimal' ? 'A few minutes' : answers.time === 'moderate' ? 'Up to 15 minutes' : 'More than 15 minutes'}
                </span>
              </li>
            </ul>
          </div>
          <p className="text-neutral-600 mb-8">
            To access your personalized dashboard and start tracking your mental wellness journey, create an account or sign in.
          </p>
          <button 
            onClick={handleComplete}
            className="btn btn-primary flex items-center"
          >
            Continue to Sign Up <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GetStartedPage;