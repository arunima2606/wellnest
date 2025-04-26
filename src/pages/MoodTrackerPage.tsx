import React, { useState, useEffect } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import CalendarHeatmap from 'react-calendar-heatmap';
import { useNavigate } from 'react-router-dom';
import { useMood, MoodType } from '../contexts/MoodContext';
import { Smile, Frown, Meh, TrendingUp, Calendar, Edit3, Trash2 } from 'lucide-react';

const MoodTrackerPage: React.FC = () => {
  const { entries, addEntry, updateEntry, deleteEntry, getTodayEntry } = useMood();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'calendar' | 'insights'>('today');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an entry for today
    const todayEntry = getTodayEntry();
    if (todayEntry) {
      setSelectedMood(todayEntry.mood);
      setNotes(todayEntry.notes);
      setIsEditing(true);
      setEditingId(todayEntry.id);
    } else {
      setSelectedMood(null);
      setNotes('');
      setIsEditing(false);
      setEditingId(null);
    }
  }, [getTodayEntry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) return;
    
    if (isEditing && editingId) {
      updateEntry(editingId, selectedMood, notes);
    } else {
      addEntry(selectedMood, notes);
    }
    
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(id);
      if (id === editingId) {
        setSelectedMood(null);
        setNotes('');
        setIsEditing(false);
        setEditingId(null);
      }
    }
  };

  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case 'great':
        return <Smile className="text-success-500" />;
      case 'good':
        return <Smile className="text-primary-500" />;
      case 'okay':
        return <Meh className="text-neutral-500" />;
      case 'bad':
        return <Frown className="text-warning-500" />;
      case 'awful':
        return <Frown className="text-error-500" />;
      default:
        return null;
    }
  };

  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case 'great':
        return 'bg-success-500';
      case 'good':
        return 'bg-primary-500';
      case 'okay':
        return 'bg-neutral-500';
      case 'bad':
        return 'bg-warning-500';
      case 'awful':
        return 'bg-error-500';
      default:
        return 'bg-neutral-200';
    }
  };

  const getHeatmapData = () => {
    // Create data for heatmap
    return entries.map(entry => ({
      date: entry.date,
      count: getMoodValue(entry.mood),
    }));
  };

  const getMoodValue = (mood: MoodType): number => {
    switch (mood) {
      case 'great': return 4;
      case 'good': return 3;
      case 'okay': return 2;
      case 'bad': return 1;
      case 'awful': return 0;
      default: return 0;
    }
  };

  const calculateMoodStats = () => {
    if (entries.length === 0) return null;
    
    // Count occurrences of each mood
    const moodCounts = {
      great: 0,
      good: 0,
      okay: 0,
      bad: 0,
      awful: 0
    };
    
    entries.forEach(entry => {
      moodCounts[entry.mood]++;
    });
    
    // Calculate percentages
    const total = entries.length;
    const positivePercentage = Math.round(((moodCounts.great + moodCounts.good) / total) * 100);
    const neutralPercentage = Math.round((moodCounts.okay / total) * 100);
    const negativePercentage = Math.round(((moodCounts.bad + moodCounts.awful) / total) * 100);
    
    // Most common mood
    let mostCommonMood: MoodType = 'okay';
    let highestCount = 0;
    
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > highestCount) {
        highestCount = count;
        mostCommonMood = mood as MoodType;
      }
    });
    
    return {
      moodCounts,
      positivePercentage,
      neutralPercentage,
      negativePercentage,
      mostCommonMood
    };
  };

  const moodStats = calculateMoodStats();

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Mood Tracker</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Track your daily mood to identify patterns and gain insights into your emotional wellbeing.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex justify-center mb-10">
        <div className="bg-neutral-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'today'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Today's Mood
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'calendar'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'insights'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Insights
          </button>
        </div>
      </div>

      {/* Today's Mood Tab */}
      {activeTab === 'today' && (
        <div className="slide-up">
          <div className="card p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">How are you feeling today?</h2>
            
            {!showForm && !isEditing ? (
              <div className="text-center py-6">
                <p className="text-neutral-600 mb-6">
                  Track your mood to build awareness of your emotional patterns.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary"
                >
                  Log Today's Mood
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="label mb-3">Select your mood:</label>
                  <div className="grid grid-cols-5 gap-3">
                    <MoodButton
                      mood="great"
                      label="Great"
                      icon={<Smile size={24} />}
                      selected={selectedMood === 'great'}
                      onClick={() => setSelectedMood('great')}
                    />
                    <MoodButton
                      mood="good"
                      label="Good"
                      icon={<Smile size={24} />}
                      selected={selectedMood === 'good'}
                      onClick={() => setSelectedMood('good')}
                    />
                    <MoodButton
                      mood="okay"
                      label="Okay"
                      icon={<Meh size={24} />}
                      selected={selectedMood === 'okay'}
                      onClick={() => setSelectedMood('okay')}
                    />
                    <MoodButton
                      mood="bad"
                      label="Bad"
                      icon={<Frown size={24} />}
                      selected={selectedMood === 'bad'}
                      onClick={() => setSelectedMood('bad')}
                    />
                    <MoodButton
                      mood="awful"
                      label="Awful"
                      icon={<Frown size={24} />}
                      selected={selectedMood === 'awful'}
                      onClick={() => setSelectedMood('awful')}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="notes" className="label">Notes (optional):</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input min-h-32"
                    placeholder="What's contributing to your mood today? Any events, thoughts, or feelings you want to note?"
                  />
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      if (!isEditing) {
                        setSelectedMood(null);
                        setNotes('');
                      }
                    }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!selectedMood}
                  >
                    {isEditing ? 'Update Mood' : 'Save Mood'}
                  </button>
                </div>
              </form>
            )}
            
            {isEditing && !showForm && (
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Today's Recorded Mood</h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => setShowForm(true)}
                      className="p-2 text-neutral-500 hover:text-primary-500 transition-colors"
                      aria-label="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => editingId && handleDelete(editingId)}
                      className="p-2 text-neutral-500 hover:text-error-500 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-full ${selectedMood ? getMoodColor(selectedMood) : 'bg-neutral-200'}`}>
                    {selectedMood && getMoodIcon(selectedMood)}
                  </div>
                  <span className="font-medium capitalize">{selectedMood}</span>
                </div>
                {notes && (
                  <div className="bg-neutral-50 p-4 rounded-md">
                    <p className="text-neutral-700 whitespace-pre-wrap">{notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Quick mood stats */}
          {entries.length > 0 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="card p-6 text-center">
                <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">Total Entries</h3>
                <p className="text-3xl font-bold text-primary-500">{entries.length}</p>
              </div>
              <div className="card p-6 text-center">
                <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">Mood Today</h3>
                <div className="flex justify-center">
                  {selectedMood ? (
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${getMoodColor(selectedMood)}`}>
                        {getMoodIcon(selectedMood)}
                      </div>
                      <span className="ml-2 font-medium capitalize">{selectedMood}</span>
                    </div>
                  ) : (
                    <p className="text-neutral-500">Not logged yet</p>
                  )}
                </div>
              </div>
              <div className="card p-6 text-center">
                <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">Current Streak</h3>
                <p className="text-3xl font-bold text-primary-500">3 days</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendar View Tab */}
      {activeTab === 'calendar' && (
        <div className="slide-up">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Mood Calendar</h2>
            
            <div className="mb-8">
              <CalendarHeatmap
                startDate={startOfMonth(new Date(new Date().getFullYear(), 0, 1))}
                endDate={endOfMonth(new Date(new Date().getFullYear(), 11, 31))}
                values={getHeatmapData()}
                classForValue={(value) => {
                  if (!value) {
                    return 'color-empty';
                  }
                  return `color-scale-${value.count}`;
                }}
                tooltipDataAttrs={(value: any) => {
                  if (!value || !value.date) return {};
                  const entry = entries.find(e => e.date === value.date);
                  return {
                    'data-tip': entry ? `${format(parseISO(entry.date), 'MMM d')}: ${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}` : '',
                  };
                }}
              />
              <div className="flex justify-center items-center mt-4 space-x-4">
                <span className="text-sm text-neutral-600">Legend:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-error-500 rounded-sm"></div>
                  <span className="text-xs">Awful</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-warning-500 rounded-sm"></div>
                  <span className="text-xs">Bad</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-neutral-500 rounded-sm"></div>
                  <span className="text-xs">Okay</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-primary-500 rounded-sm"></div>
                  <span className="text-xs">Good</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-success-500 rounded-sm"></div>
                  <span className="text-xs">Great</span>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium text-lg mb-4">Recent Entries</h3>
            {entries.length === 0 ? (
              <p className="text-neutral-500 text-center py-4">No mood entries yet.</p>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {entries.slice().reverse().slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-start p-4 bg-neutral-50 rounded-lg">
                    <div className={`p-2 rounded-full ${getMoodColor(entry.mood)} flex-shrink-0 mr-4`}>
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <span className="font-medium capitalize">{entry.mood}</span>
                          <span className="text-sm text-neutral-500 ml-2">
                            {format(parseISO(entry.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="space-x-1">
                          <button
                            onClick={() => {
                              setSelectedMood(entry.mood);
                              setNotes(entry.notes);
                              setIsEditing(true);
                              setEditingId(entry.id);
                              setShowForm(true);
                              setActiveTab('today');
                            }}
                            className="p-1 text-neutral-500 hover:text-primary-500 transition-colors"
                            aria-label="Edit"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="p-1 text-neutral-500 hover:text-error-500 transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-neutral-700 mt-1">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="slide-up">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Mood Insights</h2>
            
            {entries.length < 5 ? (
              <div className="text-center py-6">
                <p className="text-neutral-600 mb-6">
                  Log at least 5 days of mood data to see your personalized insights.
                </p>
                <button
                  onClick={() => setActiveTab('today')}
                  className="btn btn-primary"
                >
                  Log Today's Mood
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="card p-6 text-center">
                    <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">Positive Days</h3>
                    <p className="text-3xl font-bold text-success-500">{moodStats?.positivePercentage}%</p>
                    <p className="text-sm text-neutral-500 mt-1">Great or Good moods</p>
                  </div>
                  <div className="card p-6 text-center">
                    <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">Neutral Days</h3>
                    <p className="text-3xl font-bold text-neutral-500">{moodStats?.neutralPercentage}%</p>
                    <p className="text-sm text-neutral-500 mt-1">Okay moods</p>
                  </div>
                  <div className="card p-6 text-center">
                    <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">Challenging Days</h3>
                    <p className="text-3xl font-bold text-warning-500">{moodStats?.negativePercentage}%</p>
                    <p className="text-sm text-neutral-500 mt-1">Bad or Awful moods</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-medium text-lg mb-4">Mood Distribution</h3>
                  <div className="h-12 bg-neutral-100 rounded-lg overflow-hidden flex">
                    {moodStats && (
                      <>
                        <div 
                          className="h-full bg-success-500" 
                          style={{ width: `${(moodStats.moodCounts.great / entries.length) * 100}%` }}
                          title={`Great: ${moodStats.moodCounts.great} days`}
                        ></div>
                        <div 
                          className="h-full bg-primary-500" 
                          style={{ width: `${(moodStats.moodCounts.good / entries.length) * 100}%` }}
                          title={`Good: ${moodStats.moodCounts.good} days`}
                        ></div>
                        <div 
                          className="h-full bg-neutral-500" 
                          style={{ width: `${(moodStats.moodCounts.okay / entries.length) * 100}%` }}
                          title={`Okay: ${moodStats.moodCounts.okay} days`}
                        ></div>
                        <div 
                          className="h-full bg-warning-500" 
                          style={{ width: `${(moodStats.moodCounts.bad / entries.length) * 100}%` }}
                          title={`Bad: ${moodStats.moodCounts.bad} days`}
                        ></div>
                        <div 
                          className="h-full bg-error-500" 
                          style={{ width: `${(moodStats.moodCounts.awful / entries.length) * 100}%` }}
                          title={`Awful: ${moodStats.moodCounts.awful} days`}
                        ></div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-neutral-500">
                    <span>Awful</span>
                    <span>Bad</span>
                    <span>Okay</span>
                    <span>Good</span>
                    <span>Great</span>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-3">Insights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <TrendingUp className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={18} />
                      <span>Your most common mood is <strong className="capitalize">{moodStats?.mostCommonMood}</strong>.</span>
                    </li>
                    {moodStats?.positivePercentage > 60 && (
                      <li className="flex items-start">
                        <TrendingUp className="text-success-500 mt-1 mr-2 flex-shrink-0" size={18} />
                        <span>You're having more positive days than negative ones. Great job!</span>
                      </li>
                    )}
                    {moodStats?.negativePercentage > 50 && (
                      <li className="flex items-start">
                        <TrendingUp className="text-warning-500 mt-1 mr-2 flex-shrink-0" size={18} />
                        <span>You've been experiencing more challenging days lately. Consider exploring the self-help resources or guided meditations.</span>
                      </li>
                    )}
                    <li className="flex items-start">
                      <Calendar className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={18} />
                      <span>You've tracked your mood for {entries.length} days. Consistency helps build better insights!</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Custom styles for calendar heatmap */}
      <style jsx>{`
        .react-calendar-heatmap .color-scale-0 { fill: #ef4444; }
        .react-calendar-heatmap .color-scale-1 { fill: #f59e0b; }
        .react-calendar-heatmap .color-scale-2 { fill: #6b7280; }
        .react-calendar-heatmap .color-scale-3 { fill: #4A90E2; }
        .react-calendar-heatmap .color-scale-4 { fill: #22c55e; }
        .react-calendar-heatmap .color-empty { fill: #f3f4f6; }
        .react-calendar-heatmap rect {
          rx: 2;
          stroke: white;
          stroke-width: 2;
        }
      `}</style>
    </div>
  );
};

const MoodButton: React.FC<{
  mood: MoodType;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}> = ({ mood, label, icon, selected, onClick }) => {
  let bgColor;
  switch (mood) {
    case 'great':
      bgColor = selected ? 'bg-success-500 text-white' : 'bg-success-100 text-success-700';
      break;
    case 'good':
      bgColor = selected ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-700';
      break;
    case 'okay':
      bgColor = selected ? 'bg-neutral-500 text-white' : 'bg-neutral-100 text-neutral-700';
      break;
    case 'bad':
      bgColor = selected ? 'bg-warning-500 text-white' : 'bg-warning-100 text-warning-700';
      break;
    case 'awful':
      bgColor = selected ? 'bg-error-500 text-white' : 'bg-error-100 text-error-700';
      break;
    default:
      bgColor = selected ? 'bg-neutral-500 text-white' : 'bg-neutral-100 text-neutral-700';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${bgColor} ${selected ? 'ring-2 ring-offset-2' : 'hover:bg-opacity-80'}`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default MoodTrackerPage;