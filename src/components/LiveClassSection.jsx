import React, { useState } from 'react';
import { 
  Radio, Calendar, Clock, User, Play, Users, 
  Sparkles, ChevronRight, CheckCircle, Bell, Filter, Search 
} from 'lucide-react';

export function LiveClassSection({ onOpenLiveRoom }) {
  const [activeTab, setActiveTab] = useState('live_now'); // 'live_now' | 'today' | 'upcoming'
  const [selectedMedium, setSelectedMedium] = useState('All');

  const mediums = ['All', 'Sketching', 'Watercolor', 'Acrylic & Oil', 'Indian Heritage', 'Art Theory'];

  const liveClasses = [
    {
      id: 'live-101',
      status: 'live',
      title: 'Perspective Drawing & Vanishing Points in Architectural Art',
      instructor: 'Prof. Ramesh Kulkarni',
      instructorRole: 'Head of Fine Arts Faculty',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      time: 'Started 25 mins ago',
      duration: '90 Mins Session',
      viewersCount: 142,
      medium: 'Sketching',
      thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
      description: 'Master 1-point, 2-point, and atmospheric perspective for indoor and outdoor landscapes.',
      hasNotes: true
    }
  ];

  const todayClasses = [
    {
      id: 'today-201',
      status: 'upcoming_today',
      title: 'Watercolour Transparency & Brushwork Dynamics',
      instructor: 'Smt. Ananya Sen',
      instructorRole: 'Master Watercolourist',
      instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      time: '04:30 PM Today',
      countdown: 'Starts in 1h 45m',
      medium: 'Watercolor',
      thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      isReminded: true
    },
    {
      id: 'today-202',
      status: 'upcoming_today',
      title: 'Human Anatomy & Gesture Drawing Practice',
      instructor: 'Prof. Ramesh Kulkarni',
      instructorRole: 'Head of Fine Arts Faculty',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      time: '07:00 PM Today',
      countdown: 'Starts in 4h 15m',
      medium: 'Sketching',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      isReminded: false
    }
  ];

  const upcomingWeek = [
    {
      id: 'up-301',
      title: 'Classical Madhubani & Warli Art Traditions',
      instructor: 'Dr. Meera Chitrakar',
      time: 'Tomorrow, 11:00 AM',
      medium: 'Indian Heritage',
      thumbnail: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'up-302',
      title: 'Oil Impasto Technique & Palette Knife Mastery',
      instructor: 'Vikramaditya Rao',
      time: 'Friday, 05:00 PM',
      medium: 'Acrylic & Oil',
      thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              fontWeight: 800,
              color: '#EF4444',
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '2px 8px',
              borderRadius: 9999
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
              LIVE STUDIOS
            </span>
            <span className="devanagari-tagline" style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
              कला ज्ञानं जीवनम्
            </span>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
            Live Art Streaming
          </h2>
        </div>

        <button 
          onClick={() => onOpenLiveRoom()}
          className="btn-primary"
          style={{ padding: '8px 14px', fontSize: 12, borderRadius: 10 }}
        >
          <Radio size={14} />
          <span>Enter Live Room</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        background: 'var(--bg-surface-subtle)',
        padding: 4,
        borderRadius: 12,
        border: '1px solid var(--border-subtle)'
      }}>
        {[
          { id: 'live_now', label: 'Live Now (1)', isLive: true },
          { id: 'today', label: 'Today (2)', isLive: false },
          { id: 'upcoming', label: 'Upcoming Week', isLive: false }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '8px 0',
              border: 'none',
              background: activeTab === tab.id ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-primary-navy)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: 12,
              borderRadius: 9,
              boxShadow: activeTab === tab.id ? 'var(--shadow-xs)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              transition: 'all 0.15s ease'
            }}
          >
            {tab.isLive && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Medium Filter Chips */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 4,
        scrollbarWidth: 'none'
      }}>
        {mediums.map(med => (
          <button
            key={med}
            onClick={() => setSelectedMedium(med)}
            style={{
              whiteSpace: 'nowrap',
              padding: '6px 14px',
              borderRadius: 9999,
              border: '1px solid',
              borderColor: selectedMedium === med ? 'var(--color-accent-teal)' : 'var(--border-subtle)',
              background: selectedMedium === med ? 'var(--color-accent-teal)' : 'var(--bg-surface)',
              color: selectedMedium === med ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {med}
          </button>
        ))}
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'live_now' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {liveClasses.map(session => (
            <div 
              key={session.id}
              className="art-card"
              style={{
                borderRadius: 18,
                overflow: 'hidden',
                border: '1.5px solid rgba(13, 148, 136, 0.4)'
              }}
            >
              {/* Live Video Thumbnail */}
              <div style={{
                position: 'relative',
                height: 180,
                width: '100%',
                overflow: 'hidden'
              }}>
                <img 
                  src={session.thumbnail} 
                  alt={session.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Live Overlays */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 14
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#EF4444',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '0.04em'
                    }}>
                      <span className="live-badge-dot" style={{ position: 'static', margin: 0, border: 'none' }} />
                      LIVE STREAM
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      fontSize: 11,
                      fontWeight: 600
                    }}>
                      <Users size={12} color="#2DD4BF" />
                      <span>{session.viewersCount} active learners</span>
                    </div>
                  </div>

                  {/* Big Play Action */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      onClick={onOpenLiveRoom}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: 'var(--color-accent-teal)',
                        color: '#FFFFFF',
                        border: '3px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 8px 24px rgba(13, 148, 136, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transform: 'scale(1)',
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      <Play size={24} fill="currentColor" style={{ marginLeft: 3 }} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#E2E8F0', fontSize: 11 }}>
                    <span>{session.time}</span>
                    <span>HD 1080p Stream</span>
                  </div>
                </div>
              </div>

              {/* Class Info */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: 'var(--color-accent-teal)',
                      background: 'var(--color-accent-teal-tint)',
                      padding: '2px 8px',
                      borderRadius: 6
                    }}>
                      {session.medium}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                      {session.duration}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: 1.35,
                    marginBottom: 6
                  }}>
                    {session.title}
                  </h3>

                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {session.description}
                  </p>
                </div>

                {/* Instructor Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img 
                      src={session.instructorAvatar} 
                      alt={session.instructor} 
                      style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {session.instructor}
                      </h4>
                      <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                        {session.instructorRole}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onOpenLiveRoom}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: 12, borderRadius: 10 }}
                  >
                    <span>Join Class</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'today' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {todayClasses.map(cls => (
            <div key={cls.id} className="art-card" style={{ padding: '14px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <img 
                src={cls.thumbnail} 
                alt={cls.title} 
                style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#D97706',
                    background: 'rgba(245, 158, 11, 0.1)',
                    padding: '2px 6px',
                    borderRadius: 4
                  }}>
                    {cls.countdown}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                    {cls.time}
                  </span>
                </div>

                <h4 style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: 6
                }}>
                  {cls.title}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    {cls.instructor}
                  </span>
                  <button
                    style={{
                      background: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      padding: '4px 10px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      cursor: 'pointer'
                    }}
                  >
                    <Bell size={12} color="var(--color-accent-teal)" />
                    <span>Set Alert</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'upcoming' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {upcomingWeek.map(item => (
            <div key={item.id} className="art-card" style={{ padding: '14px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-accent-teal)' }}>
                  {item.medium} • {item.time}
                </span>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  By {item.instructor}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
