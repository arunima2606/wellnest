import React, { createContext, useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from './AuthContext';

export type MoodType = 'great' | 'good' | 'okay' | 'bad' | 'awful';

interface MoodEntry {
  id: string;
  date: string;
  mood: MoodType;
  notes: string;
}

interface MoodContextType {
  entries: MoodEntry[];
  addEntry: (mood: MoodType, notes: string) => void;
  updateEntry: (id: string, mood: MoodType, notes: string) => void;
  deleteEntry: (id: string) => void;
  getTodayEntry: () => MoodEntry | undefined;
  loading: boolean;
}

const MoodContext = createContext<MoodContextType>({} as MoodContextType);

export const useMood = () => useContext(MoodContext);

export const MoodProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load entries from localStorage
      const storedEntries = localStorage.getItem(`mood_entries_${user.id}`);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } else {
      // Clear entries when user logs out
      setEntries([]);
    }
    setLoading(false);
  }, [user]);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (user && entries.length > 0) {
      localStorage.setItem(`mood_entries_${user.id}`, JSON.stringify(entries));
    }
  }, [entries, user]);

  const addEntry = (mood: MoodType, notes: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Check if entry for today already exists
    const existingEntryIndex = entries.findIndex(entry => entry.date === today);
    
    if (existingEntryIndex !== -1) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        mood,
        notes
      };
      setEntries(updatedEntries);
    } else {
      // Add new entry
      const newEntry: MoodEntry = {
        id: Math.random().toString(36).substr(2, 9),
        date: today,
        mood,
        notes
      };
      setEntries([...entries, newEntry]);
    }
  };

  const updateEntry = (id: string, mood: MoodType, notes: string) => {
    const updatedEntries = entries.map(entry => 
      entry.id === id ? { ...entry, mood, notes } : entry
    );
    setEntries(updatedEntries);
  };

  const deleteEntry = (id: string) => {
    const filteredEntries = entries.filter(entry => entry.id !== id);
    setEntries(filteredEntries);
  };

  const getTodayEntry = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return entries.find(entry => entry.date === today);
  };

  const value = {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getTodayEntry,
    loading
  };

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
};