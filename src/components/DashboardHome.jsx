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
import { 
  CLASSES_CONFIG, 
  SUBJECTS_BY_CLASS,
  getSubjectDisplayName,
  getClassDisplayName,
  getClassStreamDisplayName
} from '../data/curriculumData';
import { translations } from '../data/translations';
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
  onOpenNotifications,
  language = 'en'
}) {
  const t = translations[language] || translations.en;

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
  const [quizSubject, setQuizSubject] = useState({ 
    id: 'history', 
    name: language === 'hi' ? 'इतिहास' : 'History' 
  });

  const filteredSubjects = currentSubjects.filter(sub => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sub.name.toLowerCase().includes(q) ||
      sub.hindiName.toLowerCase().includes(q)
    );
  });

  const bannersEn = [
    {
      id: 1,
      tag: "Bihar Board 2026",
      title: "Arts Stream: 50/50 Objective OMR Target Batch",
      instructor: "Master Faculty Marathon for VVI MCQs",
      date: "Daily Live • 05:00 PM",
      badge: "Target 50/50",
      bgGradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
      accentColor: "#2DD4BF"
    },
    {
      id: 2,
      tag: "Topper Strategy",
      title: "Subjective Answer Writing Masterclass",
      instructor: "How to score full marks in 2 and 5 marks questions",
      date: "Sunday Special • 10:30 AM",
      badge: "Model Answers",
      bgGradient: "linear-gradient(135deg, #0F766E 0%, #115E59 100%)",
      accentColor: "#F59E0B"
    },
    {
      id: 3,
      tag: "Literature Special",
      title: "Hindi & Maithili: Complete Poetry & Prose Analysis",
      instructor: "Acharya Ramnath Jha & Pt. Vidyadhar Shastri",
      date: "Live in Studio • 06:30 PM",
      badge: "High Scoring",
      bgGradient: "linear-gradient(135deg, #334155 0%, #1E293B 100%)",
      accentColor: "#EC4899"
    }
  ];

  const bannersHi = [
    {
      id: 1,
      tag: "बिहार बोर्ड 2026",
      title: "कला संकाय: 50/50 वस्तुनिष्ठ OMR टारगेट बैच",
      instructor: "विशेषज्ञ शिक्षकों द्वारा VVI MCQs महा-मैराथन",
      date: "दैनिक लाइव • शाम 05:00 बजे",
      badge: "100% सटीक तैयारी",
      bgGradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
      accentColor: "#2DD4BF"
    },
    {
      id: 2,
      tag: "टॉपर रणनीति",
      title: "विषयनिष्ठ (Subjective) उत्तर लेखन मास्टरक्लास",
      instructor: "2 व 5 अंकों वाले प्रश्नों में पूरे अंक कैसे प्राप्त करें",
      date: "रविवार स्पेशल • सुबह 10:30 बजे",
      badge: "मॉडल उत्तर पुस्तिका",
      bgGradient: "linear-gradient(135deg, #0F766E 0%, #115E59 100%)",
      accentColor: "#F59E0B"
    },
    {
      id: 3,
      tag: "साहित्य विशेष",
      title: "मैथिली एवं हिन्दी: गद्य-पद्य सम्पूर्ण व्याख्या माला",
      instructor: "आचार्य रामनाथ झा एवं पं. विद्याधर शास्त्री",
      date: "लाइव स्टूडियो • शाम 06:30 बजे",
      badge: "स्कोरिंग विषय",
      bgGradient: "linear-gradient(135deg, #334155 0%, #1E293B 100%)",
      accentColor: "#EC4899"
    }
  ];

  const banners = language === 'hi' ? bannersHi : bannersEn;

  const quickAccess = [
    {
      id: 'live',
      title: language === 'hi' ? 'लाइव कक्षाएं' : 'Live Classes',
      subtitle: language === 'hi' ? '1 क्लास अभी लाइव' : '1 Class Live Now',
      icon: Radio,
      badge: 'LIVE',
      tintBg: 'rgba(239, 68, 68, 0.08)',
      iconColor: '#EF4444',
      badgeColor: '#EF4444',
      action: () => onNavigate('live')
    },
    {
      id: 'notes',
      title: language === 'hi' ? 'अध्ययन सामग्री' : 'Study Notes',
      subtitle: language === 'hi' ? 'अध्यायवार नोट्स & PDF' : 'Chapter PDFs & Notes',
      icon: BookOpen,
      badge: language === 'hi' ? 'अपडेटेड' : 'Updated',
      tintBg: 'rgba(13, 148, 136, 0.08)',
      iconColor: '#0D9488',
      badgeColor: '#0D9488',
      action: () => onNavigate('library')
    },
    {
      id: 'objective',
      title: language === 'hi' ? 'ऑब्जेक्टिव बैंक' : 'Objective Bank',
      subtitle: language === 'hi' ? 'MCQ व OMR क्विज़' : 'MCQs & OMR Drills',
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
      title: language === 'hi' ? 'विषयनिष्ठ बैंक' : 'Subjective Bank',
      subtitle: language === 'hi' ? 'हस्तलिखित उत्तर' : 'Model Answer Sheets',
      icon: PenTool,
      badge: '50 Marks',
      tintBg: 'rgba(37, 99, 235, 0.08)',
      iconColor: '#2563EB',
      badgeColor: '#2563EB',
      action: () => {
        if (onSelectMode) onSelectMode('subjective');
        onNavigate('library');
      }
    }
  ];

  const toppersList = language === 'hi' ? [
    { name: 'पूजा कुमारी', score: '458/500', rank: 'जिला प्रथम (Rank 1)', badge: '🥇 91.6%' },
    { name: 'अमित कुमार', score: '446/500', rank: 'राज्य टॉप 10', badge: '🥈 89.2%' },
    { name: 'खुशी मिश्रा', score: '442/500', rank: 'इतिहास 96/100', badge: '🥉 88.4%' }
  ] : [
    { name: 'Pooja Kumari', score: '458/500', rank: 'District Rank 1', badge: '🥇 91.6%' },
    { name: 'Amit Kumar', score: '446/500', rank: 'State Top 10', badge: '🥈 89.2%' },
    { name: 'Khushi Mishra', score: '442/500', rank: 'History 96/100', badge: '🥉 88.4%' }
  ];

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      
      {/* 1. Header with Student Greeting & Live Sync indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Avatar with Status */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0D9488 0%, #115E59 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 16,
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)',
              border: '2px solid var(--bg-surface)'
            }}>
              AS
            </div>
            <div style={{
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
                {t.dashboard.greeting}
              </span>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--color-accent-teal)',
                background: 'var(--color-accent-teal-tint)',
                padding: '2px 8px',
                borderRadius: 9999,
                letterSpacing: '0.02em'
              }}>
                {getClassDisplayName(currentClassInfo, language)} • {getClassStreamDisplayName(currentClassInfo, language)}
              </span>
            </div>
            <h2 style={{
              fontSize: 17,
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.01em',
              margin: '2px 0 0'
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
              gap: 4,
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '4px 8px',
              borderRadius: 9999,
              fontSize: 10,
              fontWeight: 700,
              color: '#059669'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              <span>Live Sync</span>
            </div>
          )}

          <button
            onClick={onOpenNotifications}
            style={{
              position: 'relative',
              width: 38,
              height: 38,
              borderRadius: 12,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)'
            }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: 7,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#EF4444',
              border: '1.5px solid var(--bg-surface)'
            }} />
          </button>
        </div>
      </div>

      {/* 2. Class Selector Strip (Clean single line - NO secondary Hindi text underneath) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 6,
          background: 'var(--bg-surface-subtle)',
          padding: 4,
          borderRadius: 12,
          border: '1px solid var(--border-subtle)'
        }}>
          {CLASSES_CONFIG.map(cls => {
            const isSelected = selectedClass === cls.id;
            return (
              <button
                key={cls.id}
                onClick={() => onSelectClass && onSelectClass(cls.id)}
                style={{
                  padding: '9px 4px',
                  borderRadius: 8,
                  border: isSelected 
                    ? '1.5px solid var(--color-accent-teal)' 
                    : '1px solid transparent',
                  background: isSelected 
                    ? 'var(--color-accent-teal)' 
                    : 'transparent',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(13, 148, 136, 0.25)' : 'none'
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {getClassDisplayName(cls, language)}
                </span>
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
          placeholder={t.dashboard.searchPlaceholder}
          style={{
            width: '100%',
            padding: '11px 36px 11px 38px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 14,
            fontSize: 13,
            color: 'var(--text-primary)',
            outline: 'none',
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

      {/* 2c. Target & Streak Widget */}
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
              {t.dashboard.targetBadge}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              {t.dashboard.targetTitle}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B', fontSize: 12, fontWeight: 700 }}>
            <Flame size={15} fill="#F59E0B" />
            <span>{t.dashboard.streakText}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, opacity: 0.9 }}>
          <span>{t.dashboard.syllabusProgress}</span>
          <strong style={{ color: '#2DD4BF' }}>{t.dashboard.completePercent}</strong>
        </div>

        <div style={{ height: 6, background: 'rgba(255, 255, 255, 0.15)', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 100%)', borderRadius: 9999 }} />
        </div>
      </div>

      {/* 2d. Quick Practice Quiz Banner */}
      <div 
        onClick={() => {
          setQuizSubject({ 
            id: 'history', 
            name: language === 'hi' ? 'इतिहास' : 'History' 
          });
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
                {t.dashboard.quizBannerTitle}
              </span>
              <span style={{ fontSize: 9, fontWeight: 800, background: '#F59E0B', color: '#FFF', padding: '1px 6px', borderRadius: 4 }}>
                {t.dashboard.quizBannerBadge}
              </span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              {t.dashboard.quizBannerSub}
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
          <span>{t.dashboard.takeQuizBtn}</span>
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
                {t.dashboard.boardFormatTitle}
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
              {t.dashboard.boardFormatBadge}
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
                  {t.dashboard.objectiveBoxBadge}
                </span>
                <Target size={18} color="#10B981" />
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {t.dashboard.objectiveBoxTitle}
              </h4>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.3, margin: 0 }}>
                {t.dashboard.objectiveBoxSub}
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
                  {t.dashboard.subjectiveBoxBadge}
                </span>
                <PenTool size={18} color="#2563EB" />
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {t.dashboard.subjectiveBoxTitle}
              </h4>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.3, margin: 0 }}>
                {t.dashboard.subjectiveBoxSub}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Banner Carousel */}
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
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: banners[activeBanner].accentColor,
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '2px 8px',
                borderRadius: 6
              }}>
                {banners[activeBanner].badge}
              </span>
            </div>

            <h3 style={{
              fontSize: 16,
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: 4,
              color: '#FFFFFF'
            }}>
              {banners[activeBanner].title}
            </h3>

            <p style={{ fontSize: 11, color: '#E2E8F0', opacity: 0.9 }}>
              {banners[activeBanner].instructor}
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
            paddingTop: 10,
            borderTop: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#CBD5E1' }}>
              {banners[activeBanner].date}
            </span>

            <button
              onClick={() => onNavigate('live')}
              style={{
                background: '#FFFFFF',
                color: '#0F172A',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer'
              }}
            >
              <span>{language === 'hi' ? 'बैच देखें' : 'View Batch'}</span>
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

      {/* 5. SUBJECTS GRID FOR SELECTED CLASS (Clean single-language title, no secondary stacked text) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', margin: 0 }}>
              {getClassDisplayName(currentClassInfo, language)} {t.dashboard.subjectsSectionTitle} ({filteredSubjects.length})
            </h3>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
              {getClassStreamDisplayName(currentClassInfo, language)}
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
            <span>{t.dashboard.allMaterialBtn}</span>
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
              {t.dashboard.noResults} "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'var(--color-accent-teal)',
                color: '#FFFFFF',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {language === 'hi' ? 'खोज साफ़ करें' : 'Clear Search'}
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10
          }}>
            {filteredSubjects.map(sub => {
              const Icon = getSubjectIcon(sub.icon);
              return (
                <div
                  key={sub.id}
                  onClick={() => onNavigate('library')}
                  className="art-card"
                  style={{
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative'
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
                      {sub.chapters} {t.common.chapters}
                    </span>
                  </div>

                  <div>
                    {/* Clean single language title without duplicate translation underneath */}
                    <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
                      {getSubjectDisplayName(sub, language)}
                    </h4>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 3, margin: 0 }}>
                      {sub.teacher}
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
                        {language === 'hi' ? '4 शाखाएं:' : '4 Branches:'}
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
                            {getSubjectDisplayName(b, language)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 11th & 12th Objective vs Subjective Counts */}
                  {currentClassInfo.hasObjectiveSubjectiveSplit && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 10,
                      paddingTop: 6,
                      borderTop: '1px solid var(--border-subtle)'
                    }}>
                      <span style={{ color: '#059669', fontWeight: 700 }}>
                        🎯 {sub.objectiveCount}+ {t.common.mcqs}
                      </span>
                      <span style={{ color: '#2563EB', fontWeight: 700 }}>
                        📝 {sub.subjectiveCount}+ {t.common.notes}
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
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', margin: 0 }}>
            {t.dashboard.quickToolsTitle}
          </h3>
          <span style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
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
                    color: item.badgeColor,
                    background: item.tintBg,
                    padding: '2px 6px',
                    borderRadius: 4
                  }}>
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Ongoing Live Spotlight Card */}
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
                {language === 'hi' ? 'अभी लाइव' : 'LIVE NOW'}
              </span>
              <span style={{ fontSize: 10, color: '#94A3B8' }}>
                238 {t.live.studentsWatching}
              </span>
            </div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              {language === 'hi' 
                ? 'इतिहास: 50 VVI वस्तुनिष्ठ MCQ मैराथन (OMR टेस्ट)' 
                : 'History: 50 VVI Objective MCQ Marathon (OMR Poll)'}
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
          <span>{t.live.joinRoomBtn}</span>
          <ArrowUpRight size={13} />
        </button>
      </div>

      {/* 8. TOPPERS' HALL OF FAME */}
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
                {t.dashboard.toppersTitle}
              </h4>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: 0 }}>
                {t.dashboard.toppersSub}
              </p>
            </div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#059669', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: 9999 }}>
            {t.dashboard.toppersBadge}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {toppersList.map((topper, idx) => (
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

      {/* 9. FACULTY HELPLINE */}
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
              {t.dashboard.facultyTitle}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
              {t.dashboard.facultySub}
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
          language={language}
        />
      )}

    </div>
  );
}
