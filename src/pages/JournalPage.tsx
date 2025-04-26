import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useJournal } from '../contexts/JournalContext';
import { BookOpen, Save, Plus, Trash2, Tag, Calendar, Edit3, ChevronLeft, X } from 'lucide-react';

const JournalPage: React.FC = () => {
  const { entries, addEntry, updateEntry, deleteEntry, getEntryById } = useJournal();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Templates for quick journal entries
  const templates = [
    {
      id: 'gratitude',
      name: 'Gratitude',
      title: 'Gratitude Journal - ' + format(new Date(), 'MMM d, yyyy'),
      content: 
        "Today, I am grateful for:\n\n" +
        "1. \n\n" +
        "2. \n\n" +
        "3. \n\n" +
        "One small joy I experienced today: \n\n" +
        "Someone I appreciate in my life and why: \n\n"
    },
    {
      id: 'reflection',
      name: 'Daily Reflection',
      title: 'Daily Reflection - ' + format(new Date(), 'MMM d, yyyy'),
      content:
        "How I'm feeling today: \n\n" +
        "Three main things that happened today: \n\n" +
        "1. \n\n" +
        "2. \n\n" +
        "3. \n\n" +
        "What I learned or realized today: \n\n" +
        "What I could have done better: \n\n" +
        "What I'm looking forward to tomorrow: \n\n"
    },
    {
      id: 'anxiety',
      name: 'Anxiety Check-in',
      title: 'Anxiety Check-in - ' + format(new Date(), 'MMM d, yyyy'),
      content:
        "My anxiety level today (1-10): \n\n" +
        "What's triggering my anxiety right now: \n\n" +
        "Physical sensations I'm experiencing: \n\n" +
        "Thoughts that are contributing to my anxiety: \n\n" +
        "Coping strategies I can use right now: \n\n" +
        "Positive affirmation for today: \n\n"
    },
    {
      id: 'free',
      name: 'Free Writing',
      title: 'Journal Entry - ' + format(new Date(), 'MMM d, yyyy'),
      content: ""
    }
  ];

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        setTitle(template.title);
        setContent(template.content);
      }
    }
  }, [selectedTemplate]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
    setIsEditing(false);
    setEditingId(null);
    setSelectedTemplate(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required!');
      return;
    }
    
    if (isEditing && editingId) {
      updateEntry(editingId, title, content, tags);
    } else {
      addEntry(title, content, tags);
    }
    
    resetForm();
    setShowEditor(false);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleEditEntry = (id: string) => {
    const entry = getEntryById(id);
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setTags(entry.tags);
      setIsEditing(true);
      setEditingId(id);
      setShowEditor(true);
    }
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
      deleteEntry(id);
      if (id === editingId) {
        resetForm();
      }
    }
  };

  const toggleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Get all unique tags from entries
  const getAllTags = () => {
    const allTags = new Set<string>();
    entries.forEach(entry => {
      entry.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  };

  // Filter entries based on search query and selected tags
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchQuery === '' || 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => entry.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Journal</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Write down your thoughts, feelings, and experiences to promote self-reflection and personal growth.
        </p>
      </div>

      {showEditor ? (
        <div className="slide-up">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => {
                if (isEditing || title || content) {
                  if (window.confirm('Are you sure you want to discard your changes?')) {
                    setShowEditor(false);
                    resetForm();
                  }
                } else {
                  setShowEditor(false);
                }
              }}
              className="btn btn-outline flex items-center"
            >
              <ChevronLeft size={18} className="mr-1" />
              Back to Entries
            </button>
            <h2 className="text-2xl font-semibold ml-4">
              {isEditing ? 'Edit Entry' : 'New Entry'}
            </h2>
          </div>

          {!isEditing && (
            <div className="mb-8">
              <h3 className="font-medium mb-3">Choose a template:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      selectedTemplate === template.id
                        ? 'bg-primary-100 border-2 border-primary-500'
                        : 'bg-neutral-50 border border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    <h4 className="font-medium mb-1">{template.name}</h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {template.id === 'free' 
                        ? 'Open-ended journaling without prompts.' 
                        : template.content.split('\n\n')[0]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="label">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Entry title"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="label">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input min-h-80 font-mono text-sm"
                placeholder="Write your thoughts here..."
                required
              />
            </div>

            <div>
              <label className="label">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-primary-600 hover:text-primary-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="input flex-grow"
                  placeholder="Add tags (press Enter)"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="ml-2 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-md transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => {
                  if (isEditing || title || content) {
                    if (window.confirm('Are you sure you want to discard your changes?')) {
                      setShowEditor(false);
                      resetForm();
                    }
                  } else {
                    setShowEditor(false);
                  }
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center"
              >
                <Save size={18} className="mr-2" />
                {isEditing ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="slide-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <button
              onClick={() => {
                resetForm();
                setShowEditor(true);
              }}
              className="btn btn-primary flex items-center"
            >
              <Plus size={18} className="mr-2" />
              New Journal Entry
            </button>
            
            <div className="flex-grow max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                  placeholder="Search entries..."
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tags filter */}
          {getAllTags().length > 0 && (
            <div className="mb-8">
              <h3 className="font-medium mb-3 flex items-center">
                <Tag size={18} className="mr-2" />
                Filter by tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {getAllTags().map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => toggleTagFilter(tag)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Journal entries */}
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-lg">
              <BookOpen className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-neutral-700 mb-2">No journal entries yet</h3>
              <p className="text-neutral-500 mb-6">
                {searchQuery || selectedTags.length > 0
                  ? "No entries match your current filters."
                  : "Start writing to track your thoughts and feelings."}
              </p>
              {searchQuery || selectedTags.length > 0 ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="btn btn-outline"
                >
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={() => {
                    resetForm();
                    setShowEditor(true);
                  }}
                  className="btn btn-primary"
                >
                  Write Your First Entry
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEntries.slice().reverse().map((entry) => (
                <div key={entry.id} className="card card-hover">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg line-clamp-1">{entry.title}</h3>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditEntry(entry.id)}
                        className="p-1 text-neutral-500 hover:text-primary-500 transition-colors"
                        aria-label="Edit"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-1 text-neutral-500 hover:text-error-500 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-neutral-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    {format(new Date(entry.date), 'MMMM d, yyyy')}
                  </div>
                  
                  <p className="text-neutral-700 mb-4 line-clamp-3 whitespace-pre-wrap">
                    {entry.content}
                  </p>
                  
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {entry.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary-100 text-primary-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleEditEntry(entry.id)}
                    className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    Read more
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JournalPage;