import React, { useState, useRef, useEffect } from 'react';
import { Send, Info, ThumbsUp, ThumbsDown, RefreshCw, BotIcon } from 'lucide-react';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

type SuggestionType = {
  text: string;
  action: () => void;
};

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: "Hi there! I'm your mental wellness assistant. How can I support you today? You can ask me about anxiety, stress, sleep, or tell me how you're feeling.",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate response delay
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple response generation based on keywords
  const generateResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let response = "I'm not sure I understand. Could you rephrase that?";
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      response = "Hello! How are you feeling today?";
    } else if (input.includes('how are you')) {
      response = "I'm here and ready to help you! How are you doing?";
    } else if (input.includes('anxious') || input.includes('anxiety') || input.includes('worried')) {
      response = "I'm sorry to hear you're feeling anxious. Try this breathing exercise: Breathe in for 4 counts, hold for 2, then exhale for 6. Repeat this a few times. Would you like me to guide you through a more detailed anxiety-reduction technique?";
    } else if (input.includes('sad') || input.includes('depressed') || input.includes('unhappy')) {
      response = "I'm sorry you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to explore some mood-lifting activities or talk more about what's causing these feelings?";
    } else if (input.includes('stressed') || input.includes('overwhelmed')) {
      response = "Feeling stressed is common. Consider taking a short break to reset. Even 5 minutes of mindfulness or a brief walk can help. Would you like to discuss some stress management strategies?";
    } else if (input.includes('meditation') || input.includes('breathe') || input.includes('relax')) {
      response = "Meditation and breathing exercises are great tools for mental wellness. Our guided meditation page has several options you might find helpful. Would you like me to direct you there?";
    } else if (input.includes('sleep') || input.includes('insomnia') || input.includes('tired')) {
      response = "Sleep issues can significantly impact mental health. Establishing a regular sleep routine and avoiding screens before bed can help. Would you like some more specific sleep improvement tips?";
    } else if (input.includes('help') || input.includes('emergency') || input.includes('crisis') || input.includes('suicidal')) {
      response = "If you're experiencing a mental health emergency or having thoughts of harming yourself, please reach out for immediate help. You can call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line. Would you like me to direct you to our emergency resources page?";
    } else if (input.includes('resources') || input.includes('support') || input.includes('therapy')) {
      response = "We have many self-help resources available on our Resources page. These include articles, worksheets, and links to professional services. Would you like me to direct you there?";
    } else if (input.includes('thank you') || input.includes('thanks')) {
      response = "You're welcome! I'm here anytime you need support or someone to talk to.";
    }
    
    return {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: response,
      timestamp: new Date()
    };
  };

  // Suggested messages/actions for the user
  const suggestions: SuggestionType[] = [
    {
      text: "I'm feeling anxious",
      action: () => {
        setInput("I'm feeling anxious");
        setTimeout(() => handleSendMessage(), 100);
      }
    },
    {
      text: "Help me sleep better",
      action: () => {
        setInput("I'm having trouble sleeping");
        setTimeout(() => handleSendMessage(), 100);
      }
    },
    {
      text: "Stress management techniques",
      action: () => {
        setInput("What are some good stress management techniques?");
        setTimeout(() => handleSendMessage(), 100);
      }
    },
    {
      text: "Meditation guide",
      action: () => {
        setInput("Can you help me with meditation?");
        setTimeout(() => handleSendMessage(), 100);
      }
    }
  ];

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: "Hi there! I'm your mental wellness assistant. How can I support you today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Support Chatbot</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Chat with our AI assistant for mental wellness support and resources.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col h-[600px]">
        {/* Chat header */}
        <div className="bg-primary-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <BotIcon className="h-6 w-6 mr-2" />
            <h2 className="font-medium">Mindful Assistant</h2>
          </div>
          <button
            onClick={clearChat}
            className="text-white/80 hover:text-white transition-colors"
            title="Clear chat"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 bg-neutral-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white rounded-br-none'
                      : 'bg-white border border-neutral-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-100' : 'text-neutral-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 rounded-lg rounded-bl-none p-4 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-neutral-300 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-neutral-300 rounded-full animate-bounce delay-75"></div>
                    <div className="h-2 w-2 bg-neutral-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Suggestions */}
        <div className="border-t border-neutral-200 p-3 bg-white">
          <p className="text-xs text-neutral-500 mb-2">Suggested topics:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={suggestion.action}
                className="px-3 py-1 text-sm bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors text-neutral-700"
              >
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
        
        {/* Input area */}
        <div className="border-t border-neutral-200 p-4 bg-white">
          <div className="flex">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-4 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Type a message..."
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading}
              className="bg-primary-500 text-white px-4 rounded-r-md hover:bg-primary-600 disabled:bg-primary-300 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-neutral-500 flex items-center">
              <Info size={12} className="mr-1" />
              Not a substitute for professional help
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-neutral-400 hover:text-primary-500 transition-colors" title="Helpful">
                <ThumbsUp size={14} />
              </button>
              <button className="text-neutral-400 hover:text-error-500 transition-colors" title="Not helpful">
                <ThumbsDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
        <h3 className="font-medium text-lg mb-3 flex items-center">
          <Info size={18} className="mr-2 text-primary-500" />
          About the Chatbot
        </h3>
        <p className="text-neutral-600 mb-4">
          This is a simulated chatbot designed to provide basic mental wellness support and resources. While it can offer general guidance, it is not a substitute for professional mental health care.
        </p>
        <p className="text-neutral-600">
          If you're experiencing a mental health crisis or emergency, please contact a crisis helpline or seek professional help immediately. Visit our <a href="/emergency" className="text-primary-600 hover:underline">Emergency Resources</a> page for immediate support options.
        </p>
      </div>
    </div>
  );
};

export default ChatbotPage;