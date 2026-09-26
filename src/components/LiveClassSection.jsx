import React, { useState, useEffect } from 'react';
import { 
  Radio, Calendar, Clock, User, Play, Users, 
  Sparkles, ChevronRight, CheckCircle, Bell, Filter, Search,
  Target, PenTool, BookOpen, Database
} from 'lucide-react';
import { 
  CLASSES_CONFIG, 
  SUBJECTS_BY_CLASS, 
  LIVE_CLASSES_CONFIG,
  getClassDisplayName,
  getClassStreamDisplayName,
  getSubjectDisplayName
} from '../data/curriculumData';
import { translations } from '../data/translations';
import { isSupabaseConfigured, liveClassService } from '../lib/supabaseClient';

export function LiveClassSection({ 
  selectedClass = '12th', 
  onSelectClass, 
  selectedMode = 'all', 
  onSelectMode, 
  onOpenLiveRoom,
  language = 'en'
}) {
  const t = translations[language] || translations.en;

  const [activeTab, setActiveTab] = useState('live_now'); // 'live_now' | 'today' | 'upcoming'
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [supabaseClasses, setSupabaseClasses] = useState([]);
  
  const [adminLiveClasses, setAdminLiveClasses] = useState(() => {
    try {
      const saved = localStorage.getItem('ideal_admin_live');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const checkLiveUpdates = () => {
      try {
        const saved = localStorage.getItem('ideal_admin_live');
        if (saved) setAdminLiveClasses(JSON.parse(saved));
      } catch (e) {}
    };
    checkLiveUpdates();
    window.addEventListener('storage', checkLiveUpdates);
    return () => window.removeEventListener('storage', checkLiveUpdates);
  }, []);

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
      title: language === 'hi' 
        ? 'हड़प्पा सभ्यता & मौर्य साम्राज्य: 50 Super VVI वस्तुनिष्ठ MCQ मैराथन (OMR पोल)'
        : 'Harappan Civilization & Mauryan Empire: 50 Super VVI Objective MCQ Marathon (OMR Poll)',
      instructor: 'Prof. Anand Kumar',
      instructorRole: language === 'hi' ? 'वरिष्ठ संकाय - इतिहास' : 'Head Faculty - History',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      time: language === 'hi' ? '20 मिनट पहले शुरू हुआ' : 'Started 20 mins ago',
      duration: '60 Mins Session',
      viewersCount: 238,
      formatType: 'objective',
      badge: language === 'hi' ? 'वस्तुनिष्ठ (MCQ) LIVE' : 'Objective (MCQ) LIVE',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      description: language === 'hi' 
        ? 'लाइव OMR पोल के साथ अध्याय 1 व 2 के 50 सबसे महत्वपूर्ण वस्तुनिष्ठ प्रश्नों का हल।'
        : 'Live interactive OMR poll with solutions to 50 key objective MCQs for chapters 1 and 2.'
    }
  ];

  // Map Supabase classes to UI structure cleanly
  const mappedDbLive = supabaseClasses
    .filter(c => c.is_live)
    .map(c => ({
      id: c.id,
      classId: c.class_id,
      subjectId: c.subject_id,
      status: 'live',
      title: language === 'hi' ? (c.title_hindi || c.title) : c.title,
      instructor: c.teacher_name,
      instructorRole: `${c.subject_name} Faculty`,
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      time: language === 'hi' ? 'लाइव स्ट्रीम चालू है' : 'Live Stream Now',
      duration: `${c.duration_mins || 60} Mins Session`,
      viewersCount: c.viewers_count || 150,
      formatType: 'objective',
      badge: '🔴 LIVE',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      description: `${c.subject_name} live lecture conducted by ${c.teacher_name}.`
    }));

  const mappedDbUpcoming = supabaseClasses
    .filter(c => !c.is_live)
    .map(c => ({
      id: c.id,
      classId: c.class_id,
      subjectId: c.subject_id,
      status: 'upcoming',
      title: language === 'hi' ? (c.title_hindi || c.title) : c.title,
      instructor: c.teacher_name,
      instructorRole: `${c.subject_name} Faculty`,
      time: c.scheduled_at 
        ? new Date(c.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        : '05:00 PM',
      countdown: language === 'hi' ? 'जल्द शुरू होगा' : 'Starts soon',
      formatType: 'subjective',
      badge: language === 'hi' ? 'आगामी सत्र' : 'Upcoming Session',
      badgeColor: '#2563EB'
    }));

  const adminActiveLive = adminLiveClasses 
    ? adminLiveClasses.filter(c => c.status === 'live' && (c.classId === selectedClass || c.classId === 'all'))
    : [];

  const adminUpcoming = adminLiveClasses
    ? adminLiveClasses.filter(c => c.status !== 'live' && c.status !== 'completed' && (c.classId === selectedClass || c.classId === 'all'))
    : [];

  const staticUpcoming = LIVE_CLASSES_CONFIG.filter(c => c.classId === selectedClass);
  const displayLiveClasses = [...adminActiveLive, ...mappedDbLive, ...liveClasses.filter(c => c.classId === selectedClass)];
  const displayUpcomingClasses = [...adminUpcoming, ...mappedDbUpcoming, ...staticUpcoming];

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      
      {/* 1. Header with Live Status Pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 10,
              fontWeight: 800,
              color: '#EF4444',
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '2px 8px',
              borderRadius: 9999
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
              {t.live.headerBadge}
            </span>
            <span style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
              {t.common.taglineMotto}
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
          <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', margin: 0 }}>
            {t.live.headerTitle}
          </h2>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '3px 0 0' }}>
            {getClassDisplayName(currentClassInfo, language)} ({getClassStreamDisplayName(currentClassInfo, language)})
          </p>
        </div>

        <button 
          onClick={() => onOpenLiveRoom()}
          className="btn-primary"
          style={{ padding: '8px 14px', fontSize: 12, borderRadius: 10 }}
        >
          <Radio size={14} />
          <span>{t.live.joinRoomBtn}</span>
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
            {getClassDisplayName(cls, language)}
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
          { id: 'live_now', label: language === 'hi' ? 'अभी लाइव' : 'Live Now', isLive: true },
          { id: 'today', label: language === 'hi' ? 'आज की कक्षाएं' : "Today's Schedule" },
          { id: 'upcoming', label: language === 'hi' ? 'आगामी सत्र' : 'Upcoming' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 8,
              background: activeTab === tab.id ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.id ? 800 : 600,
              fontSize: 11,
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
          {displayLiveClasses.length === 0 ? (
            <div style={{
              padding: '36px 16px',
              textAlign: 'center',
              background: 'var(--bg-surface)',
              borderRadius: 14,
              border: '1px dashed var(--border-subtle)'
            }}>
              <Radio size={36} color="var(--text-tertiary)" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                {t.live.noLiveMsg}
              </p>
            </div>
          ) : (
            displayLiveClasses.map(session => (
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
                        <span>{language === 'hi' ? 'लाइव स्ट्रीम' : 'LIVE STREAM'}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        padding: '3px 8px',
                        borderRadius: 9999,
                        color: '#FFFFFF',
                        fontSize: 10,
                        fontWeight: 700
                      }}>
                        <Users size={11} />
                        <span>{session.viewersCount} {language === 'hi' ? 'छात्र जुड़े हैं' : 'Watching'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenLiveRoom && onOpenLiveRoom(session)}
                      style={{
                        alignSelf: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: 'var(--color-accent-teal)',
                        border: 'none',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 24px rgba(13, 148, 136, 0.8)',
                        cursor: 'pointer'
                      }}
                    >
                      <Play size={22} fill="#FFFFFF" style={{ marginLeft: 3 }} />
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#2DD4BF',
                        background: 'rgba(13, 148, 136, 0.3)',
                        padding: '2px 8px',
                        borderRadius: 4
                      }}>
                        {session.badge}
                      </span>
                      <span style={{ fontSize: 10, color: '#CBD5E1' }}>
                        {session.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.4, margin: 0 }}>
                    {session.title}
                  </h3>

                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {session.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 8,
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img 
                        src={session.instructorAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"} 
                        alt="teacher" 
                        style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-primary)' }}>
                          {session.instructor}
                        </div>
                        <div style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>
                          {session.instructorRole}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenLiveRoom && onOpenLiveRoom(session)}
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: 11, borderRadius: 8 }}
                    >
                      <span>{t.live.joinRoomBtn}</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Upcoming / Today Tab Content */}
      {(activeTab === 'today' || activeTab === 'upcoming') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {t.live.upcomingLectures}
          </h3>

          {displayUpcomingClasses.map(session => (
            <div
              key={session.id}
              className="art-card"
              style={{
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                borderRadius: 14
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: session.badgeColor || '#2563EB',
                  background: 'var(--bg-surface-subtle)',
                  padding: '2px 8px',
                  borderRadius: 6,
                  border: `1px solid ${session.badgeColor || '#2563EB'}`
                }}>
                  {session.badge}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-accent-teal)', fontSize: 11, fontWeight: 700 }}>
                  <Clock size={12} />
                  <span>{session.time}</span>
                </div>
              </div>

              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {session.title}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)' }}>
                <span>{session.instructor} ({session.instructorRole})</span>
                <span style={{ fontWeight: 600, color: '#D97706' }}>{session.countdown}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
