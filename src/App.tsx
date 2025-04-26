import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import GetStartedPage from './pages/GetStartedPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AffirmationsPage from './pages/AffirmationsPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import JournalPage from './pages/JournalPage';
import ChatbotPage from './pages/ChatbotPage';
import MeditationPage from './pages/MeditationPage';
import ResourcesPage from './pages/ResourcesPage';
import EmergencyPage from './pages/EmergencyPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { MoodProvider } from './contexts/MoodContext';
import { JournalProvider } from './contexts/JournalContext';

function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <JournalProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/get-started" element={<GetStartedPage />} />
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/emergency" element={<EmergencyPage />} />
                  <Route 
                    path="/affirmations" 
                    element={
                      <ProtectedRoute>
                        <AffirmationsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/mood-tracker" 
                    element={
                      <ProtectedRoute>
                        <MoodTrackerPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/journal" 
                    element={
                      <ProtectedRoute>
                        <JournalPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/chatbot" 
                    element={
                      <ProtectedRoute>
                        <ChatbotPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/meditation" 
                    element={
                      <ProtectedRoute>
                        <MeditationPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/resources" 
                    element={
                      <ProtectedRoute>
                        <ResourcesPage />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </JournalProvider>
      </MoodProvider>
    </AuthProvider>
  );
}

export default App;