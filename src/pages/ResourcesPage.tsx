import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Video, FileText, Link as LinkIcon, Search, Tag, ExternalLink } from 'lucide-react';

type ResourceType = {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'pdf' | 'website';
  tags: string[];
  url: string;
};

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Resource data
  const resources: ResourceType[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: Causes, Symptoms, and Treatments',
      description: 'A comprehensive guide to understanding anxiety disorders, their causes, common symptoms, and evidence-based treatment options.',
      type: 'article',
      tags: ['anxiety', 'mental health', 'education'],
      url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders/index.shtml'
    },
    {
      id: '2',
      title: 'Mindfulness Meditation for Beginners',
      description: 'Learn the basics of mindfulness meditation with this step-by-step guide for beginners looking to reduce stress and increase awareness.',
      type: 'article',
      tags: ['meditation', 'mindfulness', 'stress', 'beginners'],
      url: 'https://www.mindful.org/meditation/mindfulness-getting-started/'
    },
    {
      id: '3',
      title: 'Cognitive Behavioral Therapy Techniques',
      description: 'An introduction to common CBT techniques that you can practice at home to challenge negative thought patterns.',
      type: 'pdf',
      tags: ['cbt', 'therapy', 'techniques', 'self-help'],
      url: 'https://www.div12.org/wp-content/uploads/2015/06/Cognitive-Behavioral-Therapy-for-Depression.pdf'
    },
    {
      id: '4',
      title: 'Guided Sleep Meditation for Insomnia',
      description: 'A calming guided meditation designed to help those struggling with insomnia and sleep difficulties.',
      type: 'video',
      tags: ['sleep', 'meditation', 'insomnia', 'relaxation'],
      url: 'https://www.youtube.com/watch?v=aEqlQvczMJQ'
    },
    {
      id: '5',
      title: 'Managing Depression: Self-Care Strategies',
      description: 'Evidence-based self-care strategies to help manage symptoms of depression and improve mood.',
      type: 'article',
      tags: ['depression', 'self-care', 'mental health'],
      url: 'https://www.helpguide.org/articles/depression/coping-with-depression.htm'
    },
    {
      id: '6',
      title: 'Stress Management Workbook',
      description: 'A practical workbook with exercises to identify stressors and develop personalized stress management techniques.',
      type: 'pdf',
      tags: ['stress', 'workbook', 'exercises', 'self-help'],
      url: 'https://www.va.gov/WHOLEHEALTH/veteran-handouts/docs/StressMgmt_FullManual_508_07-25-2019.pdf'
    },
    {
      id: '7',
      title: 'Understanding the Science of Emotions',
      description: 'An educational video explaining the neuroscience behind emotions and how they affect our mental well-being.',
      type: 'video',
      tags: ['emotions', 'neuroscience', 'education', 'science'],
      url: 'https://www.youtube.com/watch?v=xNY0AAUtH3g'
    },
    {
      id: '8',
      title: 'Healthy Boundaries in Relationships',
      description: 'Learn how to establish and maintain healthy boundaries in various relationships to protect your mental health.',
      type: 'article',
      tags: ['relationships', 'boundaries', 'self-care', 'communication'],
      url: 'https://psychcentral.com/lib/10-way-to-build-and-preserve-better-boundaries/'
    },
    {
      id: '9',
      title: 'Panic Attack Management Techniques',
      description: 'Quick techniques to help manage and reduce the intensity of panic attacks when they occur.',
      type: 'pdf',
      tags: ['anxiety', 'panic attacks', 'techniques', 'emergency'],
      url: 'https://www.anxietycanada.com/sites/default/files/PanicAttack_Worksheet.pdf'
    },
    {
      id: '10',
      title: 'Mindfulness-Based Stress Reduction (MBSR) Guide',
      description: 'An introduction to MBSR techniques that have been scientifically proven to reduce stress and anxiety.',
      type: 'website',
      tags: ['mbsr', 'mindfulness', 'stress', 'evidence-based'],
      url: 'https://www.mindfulnesscds.com/'
    },
    {
      id: '11',
      title: 'Positive Psychology Exercises',
      description: 'Evidence-based positive psychology interventions to increase happiness and well-being.',
      type: 'website',
      tags: ['positive psychology', 'exercises', 'happiness', 'well-being'],
      url: 'https://positivepsychology.com/category/positive-psychology-exercises/'
    },
    {
      id: '12',
      title: 'Grief and Loss: Coping Strategies',
      description: 'Guidance on navigating the complex emotions of grief and loss, with practical coping strategies.',
      type: 'article',
      tags: ['grief', 'loss', 'coping', 'emotional health'],
      url: 'https://www.helpguide.org/articles/grief/coping-with-grief-and-loss.htm'
    }
  ];

  // Get all unique tags from resources
  const getAllTags = () => {
    const allTags = new Set<string>();
    resources.forEach(resource => {
      resource.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  };

  // Toggle tag filter
  const toggleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType(null);
    setSelectedTags([]);
  };

  // Filter resources based on search query, type, and tags
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || resource.type === selectedType;
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => resource.tags.includes(tag));
    
    return matchesSearch && matchesType && matchesTags;
  });

  // Get icon for resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Book size={20} />;
      case 'video':
        return <Video size={20} />;
      case 'pdf':
        return <FileText size={20} />;
      case 'website':
        return <LinkIcon size={20} />;
      default:
        return <Book size={20} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Self-Help Resources</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Explore our curated collection of mental health resources, including articles, videos, workbooks, and more.
        </p>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          {/* Search input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
              placeholder="Search resources..."
            />
          </div>
          
          {/* Resource type filter */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedType === null
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('article')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedType === 'article'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedType === 'video'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setSelectedType('pdf')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedType === 'pdf'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              PDFs
            </button>
            <button
              onClick={() => setSelectedType('website')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedType === 'website'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Websites
            </button>
          </div>
        </div>
        
        {/* Tags */}
        <div>
          <h3 className="font-medium mb-3 flex items-center text-sm">
            <Tag size={16} className="mr-2" />
            Filter by topics:
          </h3>
          <div className="flex flex-wrap gap-2">
            {getAllTags().map((tag, index) => (
              <button
                key={index}
                onClick={() => toggleTagFilter(tag)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                #{tag}
              </button>
            ))}
            {(searchQuery || selectedType || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resources list */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 rounded-lg">
          <Book className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-neutral-700 mb-2">No resources found</h3>
          <p className="text-neutral-500 mb-6">
            Try adjusting your filters or search terms.
          </p>
          <button
            onClick={clearFilters}
            className="btn btn-outline"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="card card-hover">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    resource.type === 'article' ? 'bg-primary-100 text-primary-800' :
                    resource.type === 'video' ? 'bg-accent-100 text-accent-800' :
                    resource.type === 'pdf' ? 'bg-secondary-100 text-secondary-800' :
                    'bg-neutral-100 text-neutral-800'
                  }`}>
                    <span className="mr-1">{getResourceIcon(resource.type)}</span>
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{resource.title}</h3>
                <p className="text-neutral-600 mb-4 line-clamp-3">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-neutral-100 text-neutral-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                  View Resource
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Additional resources section */}
      <div className="mt-16 bg-neutral-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Additional Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="font-medium text-lg mb-3">Professional Help</h3>
            <p className="text-neutral-600 mb-4">
              While self-help resources are valuable, sometimes professional support is needed. Consider reaching out to a mental health professional.
            </p>
            <a
              href="https://www.psychologytoday.com/us/therapists"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Find a Therapist
            </a>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-lg mb-3">Support Groups</h3>
            <p className="text-neutral-600 mb-4">
              Connecting with others who share similar experiences can provide validation, encouragement, and practical advice.
            </p>
            <a
              href="https://www.nami.org/Support-Education/Support-Groups"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Find Support Groups
            </a>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-lg mb-3">Crisis Support</h3>
            <p className="text-neutral-600 mb-4">
              If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for immediate help.
            </p>
            <Link
              to="/emergency"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Emergency Resources
            </Link>
          </div>
        </div>
      </div>

      {/* Request resources section */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h2>
        <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
          We're constantly updating our resource library. If you have a specific topic or type of resource in mind, let us know.
        </p>
        <button className="btn btn-primary">
          Request a Resource
        </button>
      </div>
    </div>
  );
};

export default ResourcesPage;