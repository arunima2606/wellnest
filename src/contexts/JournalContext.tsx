import React, { createContext, useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from './AuthContext';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (title: string, content: string, tags: string[]) => void;
  updateEntry: (id: string, title: string, content: string, tags: string[]) => void;
  deleteEntry: (id: string) => void;
  getEntryById: (id: string) => JournalEntry | undefined;
  loading: boolean;
}

const JournalContext = createContext<JournalContextType>({} as JournalContextType);

export const useJournal = () => useContext(JournalContext);

export const JournalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load entries from localStorage
      const storedEntries = localStorage.getItem(`journal_entries_${user.id}`);
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
      localStorage.setItem(`journal_entries_${user.id}`, JSON.stringify(entries));
    }
  }, [entries, user]);

  const addEntry = (title: string, content: string, tags: string[]) => {
    const newEntry: JournalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: format(new Date(), 'yyyy-MM-dd'),
      title,
      content,
      tags
    };
    setEntries([...entries, newEntry]);
  };

  const updateEntry = (id: string, title: string, content: string, tags: string[]) => {
    const updatedEntries = entries.map(entry => 
      entry.id === id ? { ...entry, title, content, tags } : entry
    );
    setEntries(updatedEntries);
  };

  const deleteEntry = (id: string) => {
    const filteredEntries = entries.filter(entry => entry.id !== id);
    setEntries(filteredEntries);
  };

  const getEntryById = (id: string) => {
    return entries.find(entry => entry.id === id);
  };

  const value = {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryById,
    loading
  };

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
};