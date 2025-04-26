import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, Volume2, Volume1, VolumeX, Clock } from 'lucide-react';

type MeditationType = {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  category: 'breathing' | 'guided' | 'sleep' | 'focus';
  imageUrl: string;
};

const MeditationPage: React.FC = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [filter, setFilter] = useState<'all' | 'breathing' | 'guided' | 'sleep' | 'focus'>('all');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Meditation options
  const meditations: MeditationType[] = [
    {
      id: 'breathing-4-7-8',
      title: '4-7-8 Breathing Exercise',
      description: 'Inhale for 4 counts, hold for 7, exhale for 8. A natural tranquilizer for the nervous system.',
      duration: 300, // 5 minutes
      category: 'breathing',
      imageUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'guided-body-scan',
      title: 'Body Scan Meditation',
      description: 'A guided practice focusing attention on each part of your body, releasing tension and promoting awareness.',
      duration: 600, // 10 minutes
      category: 'guided',
      imageUrl: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'sleep-relaxation',
      title: 'Sleep Relaxation',
      description: 'A gentle meditation to help you wind down and prepare for restful sleep.',
      duration: 900, // 15 minutes
      category: 'sleep',
      imageUrl: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'focus-mindfulness',
      title: 'Mindful Focus',
      description: 'Enhance your concentration and attention through mindful awareness of the present moment.',
      duration: 600, // 10 minutes
      category: 'focus',
      imageUrl: 'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'breathing-box',
      title: 'Box Breathing',
      description: 'Inhale, hold, exhale, and hold again, each for equal counts. Excellent for stress reduction.',
      duration: 300, // 5 minutes
      category: 'breathing',
      imageUrl: 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'guided-loving-kindness',
      title: 'Loving-Kindness Meditation',
      description: 'Cultivate feelings of goodwill, kindness, and warmth towards yourself and others.',
      duration: 720, // 12 minutes
      category: 'guided',
      imageUrl: 'https://images.pexels.com/photos/736355/pexels-photo-736355.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'sleep-deep-relaxation',
      title: 'Deep Sleep Journey',
      description: 'A progressive relaxation exercise to guide you into restful, deep sleep.',
      duration: 1200, // 20 minutes
      category: 'sleep',
      imageUrl: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'focus-attention-training',
      title: 'Attention Training',
      description: 'Strengthen your ability to direct and sustain attention with this focused practice.',
      duration: 480, // 8 minutes
      category: 'focus',
      imageUrl: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // Filter meditations based on selected category
  const filteredMeditations = filter === 'all' 
    ? meditations 
    : meditations.filter(med => med.category === filter);

  // Start/stop meditation timer
  useEffect(() => {
    if (isPlaying && selectedMeditation) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev < selectedMeditation.duration) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            clearInterval(timerRef.current!);
            return 0;
          }
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, selectedMeditation]);

  // Handle play/pause
  const togglePlay = () => {
    if (!selectedMeditation) return;
    
    // Reset timer if completed
    if (currentTime >= selectedMeditation.duration) {
      setCurrentTime(0);
    }
    
    setIsPlaying(!isPlaying);
  };

  // Reset timer
  const resetTimer = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = selectedMeditation 
    ? (currentTime / selectedMeditation.duration) * 100 
    : 0;

  // Select a meditation
  const selectMeditation = (meditation: MeditationType) => {
    setSelectedMeditation(meditation);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  // Animation variants for breathing circle
  const breathingVariants = {
    inhale: {
      scale: 1.2,
      transition: { duration: 4, ease: "easeInOut" }
    },
    hold1: {
      scale: 1.2,
      transition: { duration: 7, ease: "linear" }
    },
    exhale: {
      scale: 1,
      transition: { duration: 8, ease: "easeInOut" }
    },
    reset: {
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  // Animation variants for box breathing
  const boxBreathingVariants = {
    inhale: {
      scale: 1.2,
      borderRadius: "15%",
      transition: { duration: 4, ease: "easeInOut" }
    },
    hold1: {
      scale: 1.2,
      borderRadius: "15%",
      transition: { duration: 4, ease: "linear" }
    },
    exhale: {
      scale: 1,
      borderRadius: "50%",
      transition: { duration: 4, ease: "easeInOut" }
    },
    hold2: {
      scale: 1,
      borderRadius: "50%",
      transition: { duration: 4, ease: "linear" }
    }
  };

  // Determine current animation state based on time for 4-7-8 breathing
  const getBreathingState = () => {
    if (!isPlaying) return "reset";
    
    const cycleTime = currentTime % 19; // 4 + 7 + 8 = 19 seconds per cycle
    
    if (cycleTime < 4) return "inhale";
    if (cycleTime < 11) return "hold1";
    return "exhale";
  };

  // Determine current animation state based on time for box breathing
  const getBoxBreathingState = () => {
    if (!isPlaying) return "reset";
    
    const cycleTime = currentTime % 16; // 4 + 4 + 4 + 4 = 16 seconds per cycle
    
    if (cycleTime < 4) return "inhale";
    if (cycleTime < 8) return "hold1";
    if (cycleTime < 12) return "exhale";
    return "hold2";
  };

  // Get instruction text based on breathing pattern and current time
  const getInstructionText = () => {
    if (!isPlaying || !selectedMeditation) return "";
    
    if (selectedMeditation.id === 'breathing-4-7-8') {
      const cycleTime = currentTime % 19;
      
      if (cycleTime < 4) return "Inhale through your nose";
      if (cycleTime < 11) return "Hold your breath";
      return "Exhale through your mouth";
    } 
    else if (selectedMeditation.id === 'breathing-box') {
      const cycleTime = currentTime % 16;
      
      if (cycleTime < 4) return "Inhale through your nose";
      if (cycleTime < 8) return "Hold your breath";
      if (cycleTime < 12) return "Exhale through your mouth";
      return "Hold your breath";
    }
    
    return "";
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Meditation & Breathing</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Practice mindfulness with guided meditations and breathing exercises to reduce stress and improve focus.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex justify-center mb-10">
        <div className="bg-neutral-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('breathing')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'breathing'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Breathing
          </button>
          <button
            onClick={() => setFilter('guided')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'guided'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Guided
          </button>
          <button
            onClick={() => setFilter('sleep')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'sleep'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Sleep
          </button>
          <button
            onClick={() => setFilter('focus')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'focus'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Focus
          </button>
        </div>
      </div>

      {/* Meditation player (when a meditation is selected) */}
      {selectedMeditation && (
        <div className="card p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Visualization */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              {(selectedMeditation.id === 'breathing-4-7-8' || selectedMeditation.id === 'breathing-box') ? (
                <div className="relative flex items-center justify-center h-64 w-64">
                  {/* Breathing animation */}
                  <motion.div
                    className={`h-40 w-40 bg-primary-100 ${
                      selectedMeditation.id === 'breathing-box' ? 'rounded-2xl' : 'rounded-full'
                    } border-4 border-primary-300 flex items-center justify-center`}
                    animate={
                      selectedMeditation.id === 'breathing-4-7-8' 
                        ? getBreathingState() 
                        : getBoxBreathingState()
                    }
                    variants={
                      selectedMeditation.id === 'breathing-4-7-8'
                        ? breathingVariants
                        : boxBreathingVariants
                    }
                  >
                    <span className="text-primary-700 font-medium">
                      {getInstructionText()}
                    </span>
                  </motion.div>
                </div>
              ) : (
                <div 
                  className="h-64 w-full md:w-64 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedMeditation.imageUrl})` }}
                ></div>
              )}
            </div>
            
            {/* Right side - Controls */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-2">{selectedMeditation.title}</h2>
              <p className="text-neutral-600 mb-6">{selectedMeditation.description}</p>
              
              {/* Timer display */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Clock size={18} className="text-neutral-500 mr-2" />
                  <span>{formatTime(currentTime)} / {formatTime(selectedMeditation.duration)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Volume control */}
                  <div className="flex items-center space-x-2">
                    <button className="text-neutral-500">
                      {getVolumeIcon()}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 accent-primary-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-neutral-200 rounded-full mb-6 overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              {/* Controls */}
              <div className="flex justify-center space-x-6">
                <button
                  onClick={resetTimer}
                  className="p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  aria-label="Reset"
                >
                  <SkipBack size={24} className="text-neutral-700" />
                </button>
                <button
                  onClick={togglePlay}
                  className="p-6 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={32} className="text-white" />
                  ) : (
                    <Play size={32} className="text-white ml-1" />
                  )}
                </button>
              </div>
              
              <p className="text-center text-sm text-neutral-500 mt-6">
                {isPlaying 
                  ? "Close your eyes and follow the guidance" 
                  : "Press play to begin your meditation"}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setSelectedMeditation(null)}
            className="mt-8 text-primary-600 hover:text-primary-800 transition-colors text-sm font-medium"
          >
            ← Back to all meditations
          </button>
        </div>
      )}

      {/* Meditation list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMeditations.map(meditation => (
          <div
            key={meditation.id}
            onClick={() => selectMeditation(meditation)}
            className="card card-hover overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
          >
            <div 
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${meditation.imageUrl})` }}
            ></div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  meditation.category === 'breathing' ? 'bg-secondary-100 text-secondary-800' :
                  meditation.category === 'guided' ? 'bg-primary-100 text-primary-800' :
                  meditation.category === 'sleep' ? 'bg-accent-100 text-accent-800' :
                  'bg-neutral-100 text-neutral-800'
                }`}>
                  {meditation.category.charAt(0).toUpperCase() + meditation.category.slice(1)}
                </span>
                <span className="flex items-center text-xs text-neutral-500">
                  <Clock size={12} className="mr-1" />
                  {Math.floor(meditation.duration / 60)} min
                </span>
              </div>
              <h3 className="font-medium text-lg mb-2">{meditation.title}</h3>
              <p className="text-sm text-neutral-600 line-clamp-2">{meditation.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tips section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Meditation Tips for Beginners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6">
            <h3 className="font-medium text-lg mb-3">Find a Comfortable Position</h3>
            <p className="text-neutral-600">
              You don't need to sit in a perfect lotus position. Choose any comfortable position that allows you to remain alert and comfortable.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-medium text-lg mb-3">Start Small</h3>
            <p className="text-neutral-600">
              Begin with just 5 minutes a day and gradually increase. Consistency is more important than duration when starting out.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-medium text-lg mb-3">Be Kind to Yourself</h3>
            <p className="text-neutral-600">
              Your mind will wander, and that's normal. When you notice it, gently bring your attention back without judgment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationPage;