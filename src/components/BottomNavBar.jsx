import React from 'react';
import { Home, Radio, BookOpen, User } from 'lucide-react';

export function BottomNavBar({ currentTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'live', label: 'Live Classes', icon: Radio, hasLiveBadge: true },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User }
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
