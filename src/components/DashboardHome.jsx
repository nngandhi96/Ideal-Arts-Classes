import React, { useState, useEffect } from 'react';
import { 
  Bell, Play, Clock, Sparkles, ChevronRight, Video, 
  BookOpen, FileText, CheckSquare, Calendar, Users, 
  Flame, Award, ArrowUpRight, Radio, Landmark, Scale, 
  Globe2, Globe, Brain, Feather, Home, Music, Calculator, 
  Atom, Scroll, Languages, CheckCircle2, Target, PenTool,
  Layers, Filter, Database, Check, Search, MessageCircle, 
  PhoneCall, Zap, X, Trophy
} from 'lucide-react';
import { CLASSES_CONFIG, SUBJECTS_BY_CLASS } from '../data/curriculumData';
import { isSupabaseConfigured, announcementService, liveClassService } from '../lib/supabaseClient';
import { QuickQuizModal } from './QuickQuizModal';

// Icon resolver helper
const getSubjectIcon = (iconName) => {
  switch (iconName) {
    case 'Landmark': return Landmark;
    case 'Scale': return Scale;
    case 'Globe2': return Globe2;
    case 'Globe': return Globe;
    case 'Brain': return Brain;
    case 'BookOpen': return BookOpen;
    case 'Feather': return Feather;
    case 'Home': return Home;
    case 'Music': return Music;
    case 'Calculator': return Calculator;
    case 'Atom': return Atom;
    case 'Scroll': return Scroll;
    case 'Languages': return Languages;
    default: return BookOpen;
  }
};

export function DashboardHome({ 
  selectedClass = '12th', 
  onSelectClass, 
  selectedMode = 'all', 
  onSelectMode, 
  onNavigate, 
  onOpenLiveRoom, 
  onOpenNotifications 
}) {
  const [activeBanner, setActiveBanner] = useState(0);
  const [supabaseAnnouncements, setSupabaseAnnouncements] = useState([]);
  const [liveDbClasses, setLiveDbClasses] = useState([]);

  useEffect(() => {
    async function loadSupabaseData() {
      if (!isSupabaseConfigured) return;
      try {
        const [announcementsRes, liveRes] = await Promise.all([
          announcementService.getAnnouncements(selectedClass),
          liveClassService.getLiveClasses(selectedClass)
        ]);
        if (announcementsRes.data && announcementsRes.data.length > 0) {
          setSupabaseAnnouncements(announcementsRes.data);
        }
        if (liveRes.data && liveRes.data.length > 0) {
          setLiveDbClasses(liveRes.data);
        }
      } catch (err) {
        console.error('Failed to load Supabase data:', err);
      }
    }
    loadSupabaseData();
  }, [selectedClass]);

  const currentClassInfo = CLASSES_CONFIG.find(c => c.id === selectedClass) || CLASSES_CONFIG[0];
  const currentSubjects = SUBJECTS_BY_CLASS[selectedClass] || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizSubject, setQuizSubject] = useState({ id: 'history', name: 'इतिहास (History)' });

  const filteredSubjects = currentSubjects.filter(sub => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sub.name.toLowerCase().includes(q) ||
      sub.hindiName.toLowerCase().includes(q)
    );
  });

  const banners = [
    {
      id: 1,
      tag: "Bihar Board 2026",
      title: "Arts संकाय: 50/50 Objective OMR Target Batch",
      instructor: "विशेषज्ञ शिक्षकों द्वारा वस्तुनिष्ठ प्रश्न महा-मैराथन",
      date: "Daily Live • 05:00 PM",
      badge: "100% Guaranteed Hit",
      bgGradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
      accentColor: "#2DD4BF"
    },
    {
      id: 2,
      tag: "Topper Strategy",
      title: "विषयनिष्ठ (Subjective) उत्तर लेखन मास्टरक्लास",
      instructor: "2 व 5 अंकों वाले प्रश्नों में पूरे अंक कैसे प्राप्त करें",
      date: "Sunday Special • 10:30 AM",
      badge: "Model Answer Sheet",
      bgGradient: "linear-gradient(135deg, #0F766E 0%, #115E59 100%)",
      accentColor: "#F59E0B"
    },
    {
      id: 3,
      tag: "Special Lecture",
      title: "मैथिली ओ हिन्दी: गद्य-पद्य सम्पूर्ण व्याख्या माला",
      instructor: "आचार्य रामनाथ झा एवं पं. विद्याधर शास्त्री",
      date: "Live in Studio • 06:30 PM",
      badge: "High Scoring",
      bgGradient: "linear-gradient(135deg, #334155 0%, #1E293B 100%)",
      accentColor: "#EC4899"
    }
  ];

  const quickAccess = [
    {
      id: 'live',
      title: 'Live Classes',
      subtitle: '1 Live Now',
      icon: Radio,
      badge: 'LIVE',
      tintBg: 'rgba(239, 68, 68, 0.08)',
      iconColor: '#EF4444',
      badgeColor: '#EF4444',
      action: () => onNavigate('live')
    },
    {
      id: 'notes',
      title: 'Study Material',
      subtitle: 'Chapter PDFs & Notes',
      icon: BookOpen,
      badge: 'Updated',
      tintBg: 'rgba(13, 148, 136, 0.08)',
      iconColor: '#0D9488',
      badgeColor: '#0D9488',
      action: () => onNavigate('library')
    },
    {
      id: 'objective',
      title: 'Objective Bank',
      subtitle: 'MCQ & OMR Quizzes',
      icon: Target,
      badge: '50 Marks',
      tintBg: 'rgba(16, 185, 129, 0.08)',
      iconColor: '#10B981',
      badgeColor: '#10B981',
      action: () => {
        if (onSelectMode) onSelectMode('objective');
        onNavigate('library');
      }
    },
    {
      id: 'subjective',
      title: 'Subjective Q&A',
      subtitle: 'Short & Long Answers',
      icon: PenTool,
      badge: '50 Marks',
      tintBg: 'rgba(99, 102, 241, 0.08)',
      iconColor: '#6366F1',
      badgeColor: '#6366F1',
      action: () => {
        if (onSelectMode) onSelectMode('subjective');
        onNavigate('library');
      }
    }
  ];

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      
      {/* 1. Top Bar: Greeting & Enrolled Class */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 2px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
              alt="Aarav Sharma"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--color-accent-teal)',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 12,
              height: 12,
              background: '#10B981',
              borderRadius: '50%',
              border: '2px solid var(--bg-surface)'
            }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>
                नमस्ते 🙏
              </span>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--color-accent-teal)',
                background: 'var(--color-accent-teal-tint)',
                padding: '1px 8px',
                borderRadius: 9999,
                letterSpacing: '0.02em'
              }}>
                {currentClassInfo.hindiName} ({currentClassInfo.stream.split(' ')[0]})
              </span>
            </div>
            <h2 style={{
              fontSize: 16,
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.01em'
            }}>
              Aarav Sharma
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isSupabaseConfigured && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 10,
              fontWeight: 700,
              color: '#059669',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '4px 8px',
              borderRadius: 9999
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              <span>DB Connected</span>
            </div>
          )}

          <button
            onClick={onOpenNotifications}
            className="btn-icon"
            style={{ position: 'relative', width: 40, height: 40 }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              background: '#EF4444',
              borderRadius: '50%',
              border: '1.5px solid var(--bg-surface)'
            }} />
          </button>
        </div>
      </div>

      {/* Dynamic Supabase Live Announcement Card */}
      {supabaseAnnouncements.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(13, 148, 136, 0.08) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 12,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.08)'
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0
          }}>
            <Database size={16} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Supabase Live Notice
              </span>
              <span style={{ fontSize: 9, background: 'rgba(16, 185, 129, 0.2)', color: '#047857', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                {supabaseAnnouncements[0].priority?.toUpperCase()}
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {supabaseAnnouncements[0].title}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.3 }}>
              {supabaseAnnouncements[0].message}
            </div>
          </div>
        </div>
      )}

      {/* 2. Interactive Class Selector Bar (Class 12th, 11th, 10th, 9th, 8th) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, padding: '0 2px' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Select Class / कक्षा चुनें
          </span>
          <span style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
            {currentClassInfo.badge}
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 4,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {CLASSES_CONFIG.map((cls) => {
            const isSelected = selectedClass === cls.id;
            return (
              <button
                key={cls.id}
                onClick={() => onSelectClass(cls.id)}
                style={{
                  flex: '0 0 auto',
                  padding: '8px 14px',
                  borderRadius: 12,
                  border: isSelected 
                    ? '1.5px solid var(--color-accent-teal)' 
                    : '1px solid var(--border-subtle)',
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(13, 148, 136, 0.15) 0%, rgba(45, 212, 191, 0.08) 100%)' 
                    : 'var(--bg-surface)',
                  color: isSelected ? 'var(--color-accent-teal)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(13, 148, 136, 0.15)' : 'var(--shadow-xs)'
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 800 }}>{cls.name}</span>
                <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.85 }}>{cls.hindiName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2b. Modern Search Bar */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search size={16} style={{ position: 'absolute', left: 14, color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="खोजें: विषय, अध्याय या VVI प्रश्न... (उदा. हड़प्पा, संविधान, मैथिली)"
          style={{
            width: '100%',
            padding: '11px 36px 11px 40px',
            borderRadius: 14,
            border: '1.5px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            fontSize: 13,
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: 'var(--shadow-xs)'
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: 12,
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* 2c. Bihar Board 2026 Target & Streak Widget */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        borderRadius: 16,
        padding: '14px 16px',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#F87171',
              padding: '2px 8px',
              borderRadius: 9999,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}>
              TARGET 2026
            </span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              बिहार बोर्ड परीक्षा
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B', fontSize: 12, fontWeight: 700 }}>
            <Flame size={15} fill="#F59E0B" />
            <span>7 Days Streak</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, opacity: 0.9 }}>
          <span>सत्र प्रगति (Syllabus Covered)</span>
          <strong style={{ color: '#2DD4BF' }}>68% Complete</strong>
        </div>

        <div style={{ height: 6, background: 'rgba(255, 255, 255, 0.15)', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 100%)', borderRadius: 9999 }} />
        </div>
      </div>

      {/* 2d. Quick Practice Quiz Banner */}
      <div 
        onClick={() => {
          setQuizSubject({ id: 'history', name: 'इतिहास (History)' });
          setIsQuizOpen(true);
        }}
        className="art-card"
        style={{
          padding: '12px 16px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.12) 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 14,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          transition: 'all 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}>
            <Zap size={20} fill="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                वस्तुनिष्ठ (MCQ) लाइव टेस्ट
              </span>
              <span style={{ fontSize: 9, fontWeight: 800, background: '#F59E0B', color: '#FFF', padding: '1px 6px', borderRadius: 4 }}>
                50 MARKS
              </span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              5 महत्वपूर्ण प्रश्नों का टेस्ट दें और तुरंत स्कोर देखें
            </p>
          </div>
        </div>

        <button
          style={{
            background: '#F59E0B',
            color: '#FFFFFF',
            border: 'none',
            padding: '7px 12px',
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer'
          }}
        >
          <span>टेस्ट दें</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* 3. DEDICATED OBJECTIVE & SUBJECTIVE DIVISION (For Class 11th & 12th) */}
      {currentClassInfo.hasObjectiveSubjectiveSplit && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.04) 0%, rgba(13, 148, 136, 0.06) 100%)',
          borderRadius: 16,
          border: '1.5px solid rgba(13, 148, 136, 0.25)',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--color-accent-teal)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 800
              }}>
                ✓
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                बोर्ड परीक्षा प्रारूप (50% + 50%)
              </span>
            </div>

            <span style={{
              fontSize: 10,
              fontWeight: 700,
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              padding: '2px 8px',
              borderRadius: 9999
            }}>
              Subjective & Objective अलग-अलग
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {/* Objective Box */}
            <div 
              onClick={() => {
                if (onSelectMode) onSelectMode('objective');
                onNavigate('library');
              }}
              style={{
                background: selectedMode === 'objective' ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface)',
                border: selectedMode === 'objective' ? '1.5px solid #10B981' : '1px solid var(--border-subtle)',
                borderRadius: 12,
                padding: '12px 10px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: 9,
                  fontWeight: 800,
                  background: '#10B981',
                  color: '#FFF',
                  padding: '2px 6px',
                  borderRadius: 4
                }}>
                  50 अंक
                </span>
                <Target size={18} color="#10B981" />
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                Objective (वस्तुनिष्ठ)
              </h4>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                MCQs, OMR अभ्यास टेस्ट व पिछले वर्षों के प्रश्न
              </p>
            </div>

            {/* Subjective Box */}
            <div 
              onClick={() => {
                if (onSelectMode) onSelectMode('subjective');
                onNavigate('library');
              }}
              style={{
                background: selectedMode === 'subjective' ? 'rgba(37, 99, 235, 0.12)' : 'var(--bg-surface)',
                border: selectedMode === 'subjective' ? '1.5px solid #2563EB' : '1px solid var(--border-subtle)',
                borderRadius: 12,
                padding: '12px 10px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: 9,
                  fontWeight: 800,
                  background: '#2563EB',
                  color: '#FFF',
                  padding: '2px 6px',
                  borderRadius: 4
                }}>
                  50 अंक
                </span>
                <PenTool size={18} color="#2563EB" />
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                Subjective (विषयनिष्ठ)
              </h4>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                लघु व दीर्घ उत्तरीय हस्तलिखित मॉडल उत्तर नोट्स
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Banner Carousel (Arts Target / Board Preparation) */}
      <div>
        <div style={{
          position: 'relative',
          borderRadius: 18,
          overflow: 'hidden',
          background: banners[activeBanner].bgGradient,
          color: '#FFFFFF',
          padding: '16px 18px',
          boxShadow: 'var(--shadow-md)',
          minHeight: 155,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Subtle watermark art flourish */}
          <div style={{
            position: 'absolute',
            right: -10,
            bottom: -10,
            opacity: 0.12,
            transform: 'rotate(-15deg)',
            pointerEvents: 'none'
          }}>
            <Sparkles size={140} color="#FFFFFF" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                padding: '3px 8px',
                borderRadius: 9999,
                color: '#FFFFFF'
              }}>
                {banners[activeBanner].tag}
              </span>
              <span style={{ fontSize: 11, color: banners[activeBanner].accentColor, fontWeight: 700 }}>
                {banners[activeBanner].badge}
              </span>
            </div>

            <h3 style={{
              fontSize: 15,
              fontWeight: 800,
              lineHeight: 1.35,
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              marginBottom: 4,
              maxWidth: '90%'
            }}>
              {banners[activeBanner].title}
            </h3>

            <p style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>
              {banners[activeBanner].instructor}
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
            paddingTop: 8,
            borderTop: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <span style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Calendar size={12} />
              {banners[activeBanner].date}
            </span>

            <button
              onClick={() => onNavigate('live')}
              style={{
                background: '#FFFFFF',
                color: '#1E293B',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span>View Batch</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* Carousel indicator dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBanner(idx)}
              style={{
                width: activeBanner === idx ? 20 : 6,
                height: 5,
                borderRadius: 9999,
                background: activeBanner === idx ? 'var(--color-accent-teal)' : 'var(--border-subtle)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 5. SUBJECTS GRID FOR SELECTED CLASS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
              {currentClassInfo.name} पाठ्यक्रम ({filteredSubjects.length} {searchQuery ? 'Found' : 'Subjects'})
            </h3>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
              {currentClassInfo.stream}
            </span>
          </div>

          <button 
            onClick={() => onNavigate('library')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-accent-teal)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <span>All Material</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {filteredSubjects.length === 0 ? (
          <div style={{
            padding: '24px 16px',
            textAlign: 'center',
            background: 'var(--bg-surface-subtle)',
            borderRadius: 14,
            border: '1px dashed var(--border-subtle)'
          }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
              "{searchQuery}" के लिए कोई विषय नहीं मिला
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-secondary"
              style={{ fontSize: 12, padding: '6px 14px' }}
            >
              सभी विषय देखें
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10
          }}>
            {filteredSubjects.map((sub) => {
              const Icon = getSubjectIcon(sub.icon);
              return (
                <div
                  key={sub.id}
                  onClick={() => onNavigate('library')}
                  className="art-card"
                  style={{
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    position: 'relative',
                    borderTop: `3px solid ${sub.color}`
                  }}
                >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: sub.bgLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: sub.color
                  }}>
                    <Icon size={18} />
                  </div>

                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: sub.color,
                    background: sub.bgLight,
                    padding: '2px 6px',
                    borderRadius: 4
                  }}>
                    {sub.chapters} Chapters
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    {sub.name}
                  </h4>
                  <p style={{ fontSize: 11, fontWeight: 700, color: sub.color, marginTop: 1 }}>
                    {sub.hindiName}
                  </p>
                </div>

                {/* If Social Science group in 9th/10th, show 4 branches */}
                {sub.isGroup && sub.branches && (
                  <div style={{
                    background: 'var(--bg-surface-subtle)',
                    padding: '6px 8px',
                    borderRadius: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    marginTop: 2
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      4 Branches:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {sub.branches.map(b => (
                        <span key={b.id} style={{
                          fontSize: 9,
                          fontWeight: 600,
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          padding: '1px 5px',
                          borderRadius: 4,
                          color: 'var(--text-secondary)'
                        }}>
                          {b.name.split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* For 11th & 12th: Show Objective & Subjective breakdown */}
                {currentClassInfo.hasObjectiveSubjectiveSplit && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 6,
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: 10
                  }}>
                    <span style={{ color: '#059669', fontWeight: 700 }}>
                      🎯 {sub.objectiveCount}+ Obj
                    </span>
                    <span style={{ color: '#2563EB', fontWeight: 700 }}>
                      📝 {sub.subjectiveCount}+ Subj
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>

      {/* 6. Quick Access 4-Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
            Quick Study Tools
          </h3>
          <span className="devanagari-tagline" style={{ fontSize: 12, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
            कला ज्ञानं जीवनम्
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10
        }}>
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="art-card"
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: item.tintBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.iconColor
                  }}>
                    <Icon size={18} />
                  </div>

                  <span style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: item.badgeColor,
                    background: item.tintBg,
                    padding: '2px 6px',
                    borderRadius: 6
                  }}>
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Continue Learning Card */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
            Continue Preparation
          </h3>
          <span style={{ fontSize: 12, color: 'var(--color-accent-teal)', fontWeight: 600, cursor: 'pointer' }} onClick={() => onNavigate('library')}>
            View History
          </span>
        </div>

        <div className="art-card" style={{ padding: '12px', display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Thumbnail preview */}
          <div style={{
            width: 70,
            height: 70,
            borderRadius: 12,
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2DD4BF'
          }}>
            <BookOpen size={30} />
          </div>

          {/* Details & Progress */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                color: 'var(--color-accent-teal)',
                background: 'var(--color-accent-teal-tint)',
                padding: '1px 6px',
                borderRadius: 4
              }}>
                इतिहास - अध्याय 1
              </span>
              <span style={{ fontSize: 10, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
                <Clock size={10} />
                20m left
              </span>
            </div>

            <h4 style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: 6
            }}>
              हड़प्पा सभ्यता: नगर योजना एवं मोहरें (Objective + Subjective)
            </h4>

            {/* Sleek Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                flex: 1,
                height: 5,
                background: 'var(--bg-surface-subtle)',
                borderRadius: 9999,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '75%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 100%)',
                  borderRadius: 9999
                }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-accent-teal)' }}>
                75%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Ongoing Live Spotlight Card */}
      <div 
        onClick={onOpenLiveRoom}
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          border: '1.5px solid rgba(13, 148, 136, 0.4)',
          borderRadius: 16,
          padding: '14px 16px',
          color: '#FFFFFF',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444'
          }}>
            <Radio size={20} className="animate-pulse" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{
                fontSize: 9,
                fontWeight: 800,
                background: '#EF4444',
                color: '#FFFFFF',
                padding: '1px 6px',
                borderRadius: 4
              }}>
                HAPPENING NOW
              </span>
              <span style={{ fontSize: 10, color: '#94A3B8' }}>
                238 Students Live
              </span>
            </div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
              इतिहास: 50 VVI Objective MCQ Marathon (OMR Poll)
            </h4>
          </div>
        </div>

        <button
          onClick={() => onOpenLiveRoom && onOpenLiveRoom()}
          style={{
            background: 'var(--color-accent-teal)',
            color: '#FFFFFF',
            border: 'none',
            padding: '7px 12px',
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-teal)',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <span>Join</span>
          <ArrowUpRight size={13} />
        </button>
      </div>

      {/* 7. TOPPERS' HALL OF FAME (गौरव स्तम्भ) */}
      <div className="art-card" style={{
        padding: '16px',
        background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.08) 0%, rgba(30, 41, 59, 0.04) 100%)',
        border: '1px solid rgba(13, 148, 136, 0.25)',
        borderRadius: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#F59E0B',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trophy size={16} />
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Ideal Arts Toppers (कला गौरव)
              </h4>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: 0 }}>
                बिहार बोर्ड 12वीं कला संकाय 2024-2025
              </p>
            </div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#059669', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: 9999 }}>
            98.4% Results
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { name: 'पूजा कुमारी', score: '458/500', rank: 'जिला प्रथम', badge: '🥇 91.6%' },
            { name: 'अमित कुमार', score: '446/500', rank: 'Top 10 State', badge: '🥈 89.2%' },
            { name: 'खुशी मिश्रा', score: '442/500', rank: 'इतिहास 96/100', badge: '🥉 88.4%' }
          ].map((topper, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 10,
              padding: '10px 8px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }}>
                {topper.name}
              </div>
              <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--color-accent-teal)' }}>
                {topper.score}
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-secondary)', marginTop: 2 }}>
                {topper.rank}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. FACULTY HELPLINE & DOUBT CLEARING */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 14,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(37, 211, 102, 0.12)',
            color: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MessageCircle size={18} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)' }}>
              शिक्षक सहायता केंद्र (24x7 Faculty Helpline)
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
              किसी भी प्रश्न या नोट्स के लिए सीधे कॉल / WhatsApp करें
            </div>
          </div>
        </div>

        <a
          href="https://wa.me/919876543210?text=Namaste%20Sir%2C%20I%20have%20a%20doubt%20in%20Arts%20classes"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#25D366',
            color: '#FFFFFF',
            padding: '7px 12px',
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 800,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Quick Quiz Interactive Modal */}
      {isQuizOpen && (
        <QuickQuizModal 
          subjectId={quizSubject.id} 
          subjectName={quizSubject.name} 
          onClose={() => setIsQuizOpen(false)} 
        />
      )}

    </div>
  );
}
