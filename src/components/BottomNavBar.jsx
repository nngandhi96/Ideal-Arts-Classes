import React from 'react';
import { Home, Radio, BookOpen, User } from 'lucide-react';
import { translations } from '../data/translations';

export function BottomNavBar({ currentTab, onSelectTab, language = 'en' }) {
  const t = translations[language]?.nav || translations.en.nav;

  const tabs = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'live', label: t.live, icon: Radio, hasLiveBadge: true },
    { id: 'library', label: t.library, icon: BookOpen },
    { id: 'profile', label: t.profile, icon: User }
  ];

  return (
    <nav className="bottom-nav-container" aria-label="Main Navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="nav-icon-wrapper">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {tab.hasLiveBadge && <span className="live-badge-dot" />}
            </div>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
