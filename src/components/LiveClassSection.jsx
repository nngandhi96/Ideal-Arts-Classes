import React, { useState, useEffect } from 'react';
import { 
  Radio, Calendar, Clock, User, Play, Users, 
  Sparkles, ChevronRight, CheckCircle, Bell, Filter, Search,
  Target, PenTool, BookOpen, Database
} from 'lucide-react';
import { CLASSES_CONFIG, SUBJECTS_BY_CLASS, LIVE_CLASSES_CONFIG } from '../data/curriculumData';
import { isSupabaseConfigured, liveClassService } from '../lib/supabaseClient';

export function LiveClassSection({ 
  selectedClass = '12th', 
  onSelectClass, 
  selectedMode = 'all', 
  onSelectMode, 
  onOpenLiveRoom 
}) {
  const [activeTab, setActiveTab] = useState('live_now'); // 'live_now' | 'today' | 'upcoming'
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [supabaseClasses, setSupabaseClasses] = useState([]);

  useEffect(() => {
    async function fetchDbClasses() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await liveClassService.getLiveClasses(selectedClass);
        if (data && data.length > 0) {
          setSupabaseClasses(data);
        }
      } catch (err) {
        console.error('Error fetching Supabase live classes:', err);
      }
    }
    fetchDbClasses();
  }, [selectedClass]);

  const currentClassInfo = CLASSES_CONFIG.find(c => c.id === selectedClass) || CLASSES_CONFIG[0];
  const classSubjects = SUBJECTS_BY_CLASS[selectedClass] || [];

  const liveClasses = [
    {
      id: 'live-hist-12',
      classId: '12th',
      subjectId: 'history',
      status: 'live',
      title: 'हड़प्पा सभ्यता & मौर्य साम्राज्य: 50 Super VVI Objective MCQ Marathon (OMR Poll)',
      instructor: 'Prof. Anand Kumar',
      instructorRole: 'Head Faculty - History',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      time: 'Started 20 mins ago',
      duration: '60 Mins Session',
      viewersCount: 238,
      formatType: 'objective',
      badge: 'वस्तुनिष्ठ (MCQ) LIVE',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      description: 'लाइव OMR पोल के साथ अध्याय 1 व 2 के 50 सबसे महत्वपूर्ण वस्तुनिष्ठ प्रश्नों का हल।'
    }
  ];

  // Map Supabase classes to UI structure
  const mappedDbLive = supabaseClasses
    .filter(c => c.is_live)
    .map(c => ({
      id: c.id,
      classId: c.class_id,
      subjectId: c.subject_id,
      status: 'live',
      title: c.title_hindi ? `${c.title_hindi} (${c.title})` : c.title,
      instructor: c.teacher_name,
      instructorRole: `${c.subject_name} Faculty`,
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      time: 'Live Stream Now',
      duration: `${c.duration_mins || 60} Mins Session`,
      viewersCount: c.viewers_count || 150,
      formatType: 'objective',
      badge: '🔴 SUPABASE LIVE',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      description: `${c.subject_name} live lecture conducted by ${c.teacher_name}.`
    }));

  const mappedDbUpcoming = supabaseClasses
    .filter(c => !c.is_live)
    .map(c => ({
      id: c.id,
      classId: c.class_id,
      subjectId: c.subject_id,
      status: 'upcoming_today',
      title: c.title_hindi ? `${c.title_hindi} (${c.title})` : c.title,
      instructor: c.teacher_name,
      instructorRole: `${c.subject_name} Faculty`,
      instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      time: new Date(c.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      countdown: 'Today Scheduled',
      formatType: 'subjective',
      badge: c.badge_label || 'DB Scheduled',
      thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
      isReminded: false
    }));

  const displayLiveClasses = mappedDbLive.length > 0 ? mappedDbLive : liveClasses;

  const todayClasses = [
    {
      id: 'today-pol-12',
      classId: '12th',
      subjectId: 'polscience',
      status: 'upcoming_today',
      title: 'शीत युद्ध का दौर: 5-अंकों वाले दीर्घ उत्तरीय प्रश्नों का सटीक उत्तर कैसे लिखें?',
      instructor: 'Dr. Rajeshwar Mishra',
      instructorRole: 'Senior Faculty - Political Science',
      instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      time: '04:30 PM Today',
      countdown: 'Starts in 1h 15m',
      formatType: 'subjective',
      badge: 'विषयनिष्ठ (Subjective)',
      thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
      isReminded: true
    },
    {
      id: 'today-hin-12',
      classId: '12th',
      subjectId: 'hindi',
      status: 'upcoming_today',
      title: 'दिगंत भाग 2 - पद खंड (सूरदास & तुलसीदास) वस्तुनिष्ठ प्रश्न अभ्यास',
      instructor: 'Pandit Vidyadhar Shastri',
      instructorRole: 'HOD - Hindi Literature',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      time: '06:30 PM Today',
      countdown: 'Starts in 3h 15m',
      formatType: 'objective',
      badge: 'वस्तुनिष्ठ (MCQ)',
      thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      isReminded: false
    }
  ];

  const displayTodayClasses = mappedDbUpcoming.length > 0 ? [...mappedDbUpcoming, ...todayClasses] : todayClasses;

  const upcomingWeek = [
    {
      id: 'up-mai-12',
      title: 'मैथिली 100 अंक: विद्यापति पदावली ओ गद्य-पद्य व्याख्या',
      instructor: 'Acharya Ramanath Jha',
      time: 'Tomorrow, 11:00 AM',
      badge: 'मैथिली लाइव',
      thumbnail: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'up-geo-12',
      title: 'भूगोल: भारत लोग और अर्थव्यवस्था सम्पूर्ण मानचित्र कार्य',
      instructor: 'Shri Manoj Jha',
      time: 'Friday, 05:00 PM',
      badge: 'मानचित्र मास्टरक्लास',
      thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      
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
              LIVE CLASSROOM
            </span>
            <span className="devanagari-tagline" style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
              कला ज्ञानं जीवनम्
            </span>
            {isSupabaseConfigured && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 10,
                fontWeight: 700,
                color: '#10B981',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '2px 8px',
                borderRadius: 9999
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
                <span>Supabase Sync</span>
              </span>
            )}
          </div>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
            Live Lecture Studios
          </h2>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
            {currentClassInfo.hindiName} ({currentClassInfo.stream})
          </p>
        </div>

        <button 
          onClick={() => onOpenLiveRoom()}
          className="btn-primary"
          style={{ padding: '8px 14px', fontSize: 12, borderRadius: 10 }}
        >
          <Radio size={14} />
          <span>Join Room</span>
        </button>
      </div>

      {/* Class Selector Bar */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 2,
        scrollbarWidth: 'none'
      }}>
        {CLASSES_CONFIG.map(cls => (
          <button
            key={cls.id}
            onClick={() => {
              if (onSelectClass) onSelectClass(cls.id);
              setSelectedSubject('All');
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 10,
              border: selectedClass === cls.id 
                ? '1.5px solid var(--color-accent-teal)' 
                : '1px solid var(--border-subtle)',
              background: selectedClass === cls.id 
                ? 'var(--color-accent-teal)' 
                : 'var(--bg-surface)',
              color: selectedClass === cls.id ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {cls.name}
          </button>
        ))}
      </div>

      {/* Tabs (Live Now / Today / Upcoming) */}
      <div style={{
        display: 'flex',
        background: 'var(--bg-surface-subtle)',
        padding: 4,
        borderRadius: 12,
        border: '1px solid var(--border-subtle)'
      }}>
        {[
          { id: 'live_now', label: `Live Now (${displayLiveClasses.length})`, isLive: true },
          { id: 'today', label: `Today (${displayTodayClasses.length})`, isLive: false },
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
              fontSize: 11,
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

      {/* Active Tab Content */}
      {activeTab === 'live_now' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {displayLiveClasses.map(session => (
            <div 
              key={session.id}
              className="art-card"
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1.5px solid rgba(13, 148, 136, 0.4)'
              }}
            >
              {/* Live Video Thumbnail */}
              <div style={{
                position: 'relative',
                height: 160,
                width: '100%',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 12
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#EF4444',
                      color: '#FFFFFF',
                      padding: '3px 8px',
                      borderRadius: 9999,
                      fontSize: 10,
                      fontWeight: 800
                    }}>
                      <span className="live-badge-dot" style={{ position: 'static', margin: 0, border: 'none' }} />
                      LIVE STREAM
                    </div>

                    <span style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <Users size={12} />
                      {session.viewersCount} watching
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      onClick={onOpenLiveRoom}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'rgba(13, 148, 136, 0.95)',
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(13, 148, 136, 0.5)'
                      }}
                    >
                      <Play size={20} fill="#FFFFFF" style={{ marginLeft: 3 }} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      background: '#10B981',
                      color: '#FFF',
                      padding: '2px 8px',
                      borderRadius: 4
                    }}>
                      {session.badge}
                    </span>
                    <span style={{ fontSize: 11, color: '#E2E8F0', fontWeight: 600 }}>
                      {session.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: 4 }}>
                    {session.title}
                  </h3>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    {session.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 8,
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img 
                      src={session.instructorAvatar} 
                      alt={session.instructor} 
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
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
                    style={{ padding: '6px 12px', fontSize: 11, borderRadius: 8 }}
                  >
                    <span>Join Class</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Today's Schedule */}
      {activeTab === 'today' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {displayTodayClasses.map(item => (
            <div key={item.id} className="art-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: item.formatType === 'objective' ? '#059669' : '#2563EB',
                  background: 'var(--bg-surface-subtle)',
                  padding: '2px 8px',
                  borderRadius: 6,
                  border: `1px solid ${item.formatType === 'objective' ? '#059669' : '#2563EB'}`
                }}>
                  {item.badge}
                </span>
                <span style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
                  {item.countdown}
                </span>
              </div>

              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                {item.title}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  शिक्षक: <strong>{item.instructor}</strong>
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-primary)', fontWeight: 700 }}>
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Week */}
      {activeTab === 'upcoming' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {upcomingWeek.map(item => (
            <div key={item.id} className="art-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-accent-teal)', background: 'var(--color-accent-teal-tint)', padding: '2px 8px', borderRadius: 6 }}>
                  {item.badge}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {item.time}
                </span>
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                मार्गदर्शन: <strong>{item.instructor}</strong>
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
