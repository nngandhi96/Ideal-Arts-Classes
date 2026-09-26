import React, { useState, useEffect } from 'react';
import { 
  Wifi, Battery, Smartphone, Moon, Sun, Sparkles, 
  Layers, Maximize2, Minimize2, Check, RefreshCw, Languages 
} from 'lucide-react';

import { SplashOnboarding } from './components/SplashOnboarding';
import { DashboardHome } from './components/DashboardHome';
import { LiveClassSection } from './components/LiveClassSection';
import { LiveRoomModal } from './components/LiveRoomModal';
import { LibrarySection } from './components/LibrarySection';
import { ProfileSection } from './components/ProfileSection';
import { BottomNavBar } from './components/BottomNavBar';
import { NotificationsModal } from './components/NotificationsModal';
import { PdfViewerModal } from './components/PdfViewerModal';

export default function App() {
  // App state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'live' | 'library' | 'profile'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiveRoomOpen, setIsLiveRoomOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedPdfResource, setSelectedPdfResource] = useState(null);

  // App Language State: 'en' | 'hi'
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('ideal_arts_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ideal_arts_lang', language);
    } catch (e) {
      console.error('Failed to save language preference:', e);
    }
  }, [language]);

  // Curriculum State (Classes 8th to 12th, Objective vs Subjective)
  const [selectedClass, setSelectedClass] = useState('12th'); // '12th' | '11th' | '10th' | '9th' | '8th'
  const [selectedMode, setSelectedMode] = useState('all'); // 'all' | 'objective' | 'subjective'
  
  // Simulator Viewport State (default to true for sleek modern web view)
  const [isFrameless, setIsFrameless] = useState(true);
  const [currentTime, setCurrentTime] = useState('10:30');

  // Live digital clock for Android status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleFinishAuth = () => {
    setIsAuthenticated(true);
    setCurrentTab('home');
  };

  return (
    <div className={`simulator-container ${isDarkMode ? 'dark-theme' : ''}`}>
      
      {/* Background Ambient Glow */}
      <div className="simulator-ambient-glow" />

      {/* Top Presentation Toolbar */}
      <header className="preview-toolbar">
        <div className="toolbar-brand">
          <img src="/logo.svg" alt="Ideal Arts Classes" style={{ width: 34, height: 34 }} />
          <div>
            <div className="toolbar-brand-title">
              <span>Ideal Arts Classes</span>
              <span className="toolbar-tagline-badge">कला ज्ञानं जीवनम्</span>
            </div>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="toolbar-actions">
          {/* Direct Screen Jump Pill Selector */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 9999,
            padding: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {[
              { id: 'splash', label: language === 'hi' ? 'लॉगिन / भाषा' : 'Auth / Splash' },
              { id: 'home', label: language === 'hi' ? 'होम' : 'Home' },
              { id: 'live', label: language === 'hi' ? 'लाइव' : 'Live' },
              { id: 'library', label: language === 'hi' ? 'लाइब्रेरी' : 'Library' },
              { id: 'profile', label: language === 'hi' ? 'प्रोफ़ाइल' : 'Profile' }
            ].map(screen => (
              <button
                key={screen.id}
                onClick={() => {
                  if (screen.id === 'splash') {
                    setIsAuthenticated(false);
                  } else {
                    setIsAuthenticated(true);
                    setCurrentTab(screen.id);
                  }
                }}
                style={{
                  border: 'none',
                  background: (!isAuthenticated && screen.id === 'splash') || (isAuthenticated && currentTab === screen.id) 
                    ? 'var(--color-accent-teal)' 
                    : 'transparent',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 9999,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {screen.label}
              </button>
            ))}
          </div>

          {/* Quick Language Switcher Segment */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 9999,
            padding: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              onClick={() => setLanguage('en')}
              style={{
                border: 'none',
                background: language === 'en' ? 'var(--color-accent-teal)' : 'transparent',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 9999,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Switch to English"
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              style={{
                border: 'none',
                background: language === 'hi' ? 'var(--color-accent-teal)' : 'transparent',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 9999,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="हिंदी में देखें"
            >
              🇮🇳 हिन्दी
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={handleToggleTheme}
            className="tool-btn"
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? <Sun size={14} color="#F59E0B" /> : <Moon size={14} color="#CBD5E1" />}
            <span>{isDarkMode ? 'Dark' : 'Light'}</span>
          </button>

          {/* Device Frame Toggle */}
          <button
            onClick={() => setIsFrameless(!isFrameless)}
            className={`tool-btn ${isFrameless ? 'active' : ''}`}
            title="Toggle Android Device Frame"
          >
            <Smartphone size={14} />
            <span>{isFrameless ? 'Phone Frame' : 'Web View'}</span>
          </button>
        </div>
      </header>

      {/* Main Android Phone Device Canvas */}
      <main className={`android-phone-frame ${isFrameless ? 'frameless' : ''}`}>
        
        {/* Android Status Bar */}
        <div className="android-status-bar">
          <div className="status-left">
            <span>{currentTime}</span>
          </div>

          {/* Front Camera Punch-Hole */}
          <div className="status-punch-hole" />

          <div className="status-right">
            <span style={{ fontSize: 10, fontWeight: 700 }}>5G</span>
            <Wifi size={13} strokeWidth={2.5} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 10 }}>98%</span>
              <Battery size={14} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="android-screen-content">
          {!isAuthenticated ? (
            <SplashOnboarding 
              selectedClass={selectedClass}
              onSelectClass={setSelectedClass}
              onFinishAuth={handleFinishAuth}
              language={language}
              onSelectLanguage={setLanguage}
            />
          ) : (
            <>
              {currentTab === 'home' && (
                <DashboardHome 
                  selectedClass={selectedClass}
                  onSelectClass={setSelectedClass}
                  selectedMode={selectedMode}
                  onSelectMode={setSelectedMode}
                  onNavigate={(tab) => setCurrentTab(tab)}
                  onOpenLiveRoom={() => setIsLiveRoomOpen(true)}
                  onOpenNotifications={() => setIsNotificationsOpen(true)}
                  language={language}
                />
              )}

              {currentTab === 'live' && (
                <LiveClassSection 
                  selectedClass={selectedClass}
                  onSelectClass={setSelectedClass}
                  selectedMode={selectedMode}
                  onSelectMode={setSelectedMode}
                  onOpenLiveRoom={() => setIsLiveRoomOpen(true)}
                  language={language}
                />
              )}

              {currentTab === 'library' && (
                <LibrarySection 
                  selectedClass={selectedClass}
                  onSelectClass={setSelectedClass}
                  selectedMode={selectedMode}
                  onSelectMode={setSelectedMode}
                  onOpenPdfPreview={(item) => setSelectedPdfResource(item)}
                  language={language}
                />
              )}

              {currentTab === 'profile' && (
                <ProfileSection 
                  selectedClass={selectedClass}
                  onSelectClass={setSelectedClass}
                  isDarkMode={isDarkMode}
                  onToggleTheme={handleToggleTheme}
                  onLogout={handleLogout}
                  language={language}
                  onSelectLanguage={setLanguage}
                />
              )}
            </>
          )}

          {/* Interactive Live Classroom Modal */}
          {isLiveRoomOpen && (
            <LiveRoomModal onClose={() => setIsLiveRoomOpen(false)} />
          )}

          {/* Notifications Modal */}
          {isNotificationsOpen && (
            <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
          )}

          {/* In-app PDF & Resource Viewer Sheet */}
          {selectedPdfResource && (
            <PdfViewerModal 
              resource={selectedPdfResource} 
              onClose={() => setSelectedPdfResource(null)} 
            />
          )}
        </div>

        {/* Material 3 Bottom Navigation Bar */}
        {isAuthenticated && !isLiveRoomOpen && (
          <BottomNavBar 
            currentTab={currentTab} 
            onSelectTab={(tab) => setCurrentTab(tab)} 
            language={language}
          />
        )}

        {/* Android Gesture Navigation Indicator */}
        <div className="android-gesture-bar">
          <div className="gesture-pill" />
        </div>
      </main>

    </div>
  );
}
