import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, Copy, Check } from 'lucide-react';

const AffirmationsPage: React.FC = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('general');

  const affirmationsByCategory = {
    general: [
      "I am worthy of love, happiness, and fulfillment.",
      "I am enough just as I am, and I'm getting stronger every day.",
      "I choose to be kind to myself and treat myself with compassion.",
      "I have the power to create positive change in my life.",
      "My potential to succeed is limitless.",
      "I am in charge of how I feel, and today I choose happiness.",
      "I celebrate my individuality and know that I have unique gifts to offer.",
      "My thoughts and feelings are valid, and I deserve to be heard.",
      "I release the need to compare myself to others.",
      "I trust that I am on the right path."
    ],
    anxiety: [
      "I breathe in calmness and breathe out tension.",
      "This moment is temporary, and I have the strength to move through it.",
      "I am safe and supported, even when I feel anxious.",
      "I release all fear and doubt and embrace peace and understanding.",
      "With each breath, I become more relaxed and centered.",
      "I am stronger than my anxiety.",
      "I acknowledge my anxious thoughts without judgment and let them pass.",
      "I trust in my ability to handle whatever comes my way.",
      "Even when my mind feels chaotic, I can find moments of calm.",
      "I give myself permission to take things one moment at a time."
    ],
    confidence: [
      "I believe in myself and my abilities.",
      "I am confident in my skills and continue to grow every day.",
      "I speak with confidence and self-assurance.",
      "I am proud of my achievements and excited about my potential.",
      "I have the courage to be myself in all situations.",
      "I trust my intuition and make decisions with confidence.",
      "I am resilient and can overcome any challenge.",
      "I radiate confidence, certainty, and positivity.",
      "I am worthy of respect and acceptance.",
      "My confidence grows when I step outside my comfort zone."
    ],
    gratitude: [
      "I am grateful for the abundance in my life.",
      "Each day brings new opportunities to be thankful for.",
      "I appreciate the small joys and moments of beauty in my life.",
      "I am thankful for my body and all that it allows me to experience.",
      "I express gratitude for the lessons I've learned through challenges.",
      "I appreciate the love and support of those around me.",
      "I find joy in the present moment and all it contains.",
      "I am grateful for my unique gifts and talents.",
      "My heart is full of appreciation for this day.",
      "I acknowledge and am thankful for my growth and progress."
    ],
    healing: [
      "I am healing more and more every day.",
      "My body knows how to heal, and I trust in this process.",
      "I release past hurts and welcome healing energy.",
      "I am gentle with myself during my healing journey.",
      "I deserve to heal and live a full, healthy life.",
      "Each day I grow stronger in mind, body, and spirit.",
      "I allow myself the time and space needed to heal completely.",
      "My scars are proof of my strength and resilience.",
      "I embrace healing as a positive force in my life.",
      "I am patient with the healing process and trust its timing."
    ]
  };

  // Get a random affirmation from the selected category
  const getRandomAffirmation = () => {
    const categoryAffirmations = affirmationsByCategory[category as keyof typeof affirmationsByCategory];
    const randomIndex = Math.floor(Math.random() * categoryAffirmations.length);
    return categoryAffirmations[randomIndex];
  };

  // Initialize with a random affirmation
  useEffect(() => {
    setCurrentAffirmation(getRandomAffirmation());
    
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favoriteAffirmations');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [category]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteAffirmations', JSON.stringify(favorites));
  }, [favorites]);

  const handleNewAffirmation = () => {
    setCurrentAffirmation(getRandomAffirmation());
  };

  const toggleFavorite = (affirmation: string) => {
    if (favorites.includes(affirmation)) {
      setFavorites(favorites.filter(fav => fav !== affirmation));
    } else {
      setFavorites([...favorites, affirmation]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Daily Affirmations</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Positive affirmations can help shift your mindset. Read them aloud, reflect on them, or save your favorites.
        </p>
      </div>

      {/* Category selection */}
      <div className="mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {Object.keys(affirmationsByCategory).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Current affirmation card */}
      <motion.div 
        className="card p-10 mb-12 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={currentAffirmation}
      >
        <p className="text-2xl font-medium text-neutral-800 leading-relaxed mb-6">
          {currentAffirmation}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleNewAffirmation}
            className="btn btn-outline flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            New Affirmation
          </button>
          <button
            onClick={() => toggleFavorite(currentAffirmation)}
            className={`btn ${
              favorites.includes(currentAffirmation) 
                ? 'bg-accent-400 text-white hover:bg-accent-500' 
                : 'btn-outline'
            } flex items-center`}
          >
            <Heart size={18} className="mr-2" />
            {favorites.includes(currentAffirmation) ? 'Favorited' : 'Favorite'}
          </button>
          <button
            onClick={() => copyToClipboard(currentAffirmation)}
            className="btn btn-outline flex items-center"
            disabled={copied}
          >
            {copied ? (
              <>
                <Check size={18} className="mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} className="mr-2" />
                Copy
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Favorite affirmations section */}
      {favorites.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
            Your Favorite Affirmations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((affirmation, index) => (
              <div key={index} className="card card-hover p-6 relative">
                <p className="text-lg text-neutral-800 mb-4">{affirmation}</p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => toggleFavorite(affirmation)}
                    className="text-accent-400 hover:text-accent-500"
                    aria-label="Remove from favorites"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips section */}
      <div className="mt-20 bg-neutral-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
          How to Use Affirmations Effectively
        </h2>
        <ul className="space-y-3 text-neutral-700">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mr-3 flex-shrink-0">1</span>
            <span>Repeat them aloud daily, ideally in front of a mirror</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mr-3 flex-shrink-0">2</span>
            <span>Write them down in a journal or on sticky notes around your home</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mr-3 flex-shrink-0">3</span>
            <span>Set them as reminders or notifications on your phone</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mr-3 flex-shrink-0">4</span>
            <span>Take a moment to truly feel the meaning behind the words</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mr-3 flex-shrink-0">5</span>
            <span>Incorporate them into your meditation or mindfulness practice</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AffirmationsPage;