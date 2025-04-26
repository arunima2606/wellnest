import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = (): { score: number; text: string; color: string } => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    
    // Length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    if (score === 0) return { score, text: 'Very Weak', color: 'bg-error-500' };
    if (score <= 2) return { score, text: 'Weak', color: 'bg-error-500' };
    if (score <= 3) return { score, text: 'Moderate', color: 'bg-warning-500' };
    if (score <= 4) return { score, text: 'Strong', color: 'bg-success-500' };
    return { score, text: 'Very Strong', color: 'bg-success-600' };
  };
  
  const strengthInfo = passwordStrength();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions to sign up.');
      return;
    }
    
    try {
      await signup(name, email, password);
      navigate('/affirmations');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-neutral-50">
      {/* Left side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create Your Account</h1>
            <p className="text-neutral-600">Start your mental wellness journey today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="label">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-neutral-700">Password strength:</span>
                    <span className="text-xs font-medium">{strengthInfo.text}</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strengthInfo.color} transition-all duration-300`} 
                      style={{ width: `${(strengthInfo.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                      <CheckCircle 
                        size={14} 
                        className={password.length >= 8 ? "text-success-500" : "text-neutral-300"} 
                      />
                      <span className="ml-1">8+ characters</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle 
                        size={14} 
                        className={/[A-Z]/.test(password) ? "text-success-500" : "text-neutral-300"} 
                      />
                      <span className="ml-1">Capital letter</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle 
                        size={14} 
                        className={/[0-9]/.test(password) ? "text-success-500" : "text-neutral-300"} 
                      />
                      <span className="ml-1">Number</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle 
                        size={14} 
                        className={/[^A-Za-z0-9]/.test(password) ? "text-success-500" : "text-neutral-300"} 
                      />
                      <span className="ml-1">Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="label">Confirm Password</label>
              <input
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`input ${
                  confirmPassword && password !== confirmPassword 
                    ? 'border-error-500 focus:ring-error-500' 
                    : ''
                }`}
                placeholder="••••••••"
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-error-600">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-neutral-700">
                  I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading || !agreeTerms || (confirmPassword && password !== confirmPassword)}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link to="/sign-in" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Benefits */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-12">
        <div className="h-full flex flex-col justify-center max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-8">Your wellness journey begins here</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-4 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Personal Wellness Tracking</h3>
                <p className="text-white/80">Track your moods, emotions, and growth over time with easy-to-use tools.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-4 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Guided Wellbeing Practices</h3>
                <p className="text-white/80">Access meditation, journaling prompts, and breathing exercises tailored to you.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-4 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Supportive Resources</h3>
                <p className="text-white/80">Get resources and support for your specific mental health needs and goals.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 mr-4 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
                <p className="text-white/80">Your data is secure and private. We never share your information without consent.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;