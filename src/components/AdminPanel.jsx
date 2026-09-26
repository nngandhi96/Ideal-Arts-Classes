import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Radio, BookOpen, Bell, Users, 
  Trophy, Plus, Trash2, Edit3, CheckCircle, AlertCircle, 
  ArrowLeft, Search, Eye, Filter, Calendar, Clock, 
  Video, FileText, Download, Phone, Sparkles, Check, 
  ChevronRight, RefreshCw, X, HardDrive, Play, Square,
  Layers, Target, PenTool, ExternalLink, UserCheck
} from 'lucide-react';
import { 
  CLASSES_CONFIG, 
  SUBJECTS_BY_CLASS, 
  LIVE_CLASSES_CONFIG, 
  STUDY_MATERIALS,
  getClassDisplayName,
  getClassStreamDisplayName,
  getSubjectDisplayName
} from '../data/curriculumData';
import { translations } from '../data/translations';
import { isSupabaseConfigured, liveClassService, announcementService } from '../lib/supabaseClient';

export function AdminPanel({ 
  onBackToApp, 
  language = 'en', 
  onSelectLanguage 
}) {
  const t = translations[language] || translations.en;
  const adminT = t.admin || translations.en.admin;

  // 1. PIN Security Gate State
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('ideal_admin_unlocked') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // 2. Active Tab State ('overview' | 'live' | 'notes' | 'notices' | 'students' | 'toppers')
  const [activeTab, setActiveTab] = useState('overview');
  const [filterClass, setFilterClass] = useState('all');

  // 3. Modals State
  const [showAddLiveModal, setShowAddLiveModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTopperModal, setShowAddTopperModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 4. Data States with LocalStorage Persistence
  const [liveClassesList, setLiveClassesList] = useState(() => {
    try {
      const saved = localStorage.getItem('ideal_admin_live');
      return saved ? JSON.parse(saved) : LIVE_CLASSES_CONFIG;
    } catch {
      return LIVE_CLASSES_CONFIG;
    }
  });

  const [notesList, setNotesList] = useState(() => {
    try {
      const saved = localStorage.getItem('ideal_admin_notes');
      return saved ? JSON.parse(saved) : STUDY_MATERIALS;
    } catch {
      return STUDY_MATERIALS;
    }
  });

  const [noticesList, setNoticesList] = useState(() => {
    try {
      const saved = localStorage.getItem('ideal_admin_notices');
      return saved ? JSON.parse(saved) : [
        {
          id: 'not-1',
          classId: '12th',
          title: 'बिहार बोर्ड 2026: मॉडल प्रश्न पत्र एवं OMR टेस्ट सीरीज़ जारी',
          content: 'सभी 12वीं कला संकाय के छात्र लाइब्रेरी सेक्शन से 50-अंकों वाले VVI वस्तुनिष्ठ प्रश्न पत्र डाउनलोड करें।',
          priority: 'urgent',
          date: 'Today, 11:30 AM',
          badge: 'परीक्षा सूचना'
        },
        {
          id: 'not-2',
          classId: 'all',
          title: 'रविवार विशेष: इतिहास एवं राजनीति विज्ञान महा-मैराथन',
          content: 'रविवार सुबह 10:00 बजे से 4 घंटे की नॉन-स्टॉप लाइव क्लास आयोजित की जाएगी।',
          priority: 'normal',
          date: 'Yesterday',
          badge: 'लाइव क्लास'
        }
      ];
    } catch {
      return [];
    }
  });

  const [studentsList, setStudentsList] = useState(() => {
    try {
      const saved = localStorage.getItem('ideal_admin_students');
      return saved ? JSON.parse(saved) : [
        { id: 'std-1', name: 'Aarav Sharma', rollNo: 'IAC-2026-088', phone: '9876543210', classId: '12th', attendance: '96%', score: '91.4%', fees: 'paid' },
        { id: 'std-2', name: 'Pooja Kumari', rollNo: 'IAC-2026-012', phone: '9876543211', classId: '12th', attendance: '98%', score: '94.2%', fees: 'paid' },
        { id: 'std-3', name: 'Amit Kumar', rollNo: 'IAC-2026-045', phone: '9876543212', classId: '12th', attendance: '92%', score: '88.6%', fees: 'paid' },
        { id: 'std-4', name: 'Khushi Mishra', rollNo: 'IAC-2026-094', phone: '9876543213', classId: '11th', attendance: '95%', score: '89.0%', fees: 'paid' },
        { id: 'std-5', name: 'Rahul Jha', rollNo: 'IAC-2026-102', phone: '9876543214', classId: '10th', attendance: '88%', score: '82.5%', fees: 'pending' },
        { id: 'std-6', name: 'Sneha Patel', rollNo: 'IAC-2026-118', phone: '9876543215', classId: '8th', attendance: '94%', score: '86.0%', fees: 'paid' }
      ];
    } catch {
      return [];
    }
  });

  const [toppersList, setToppersList] = useState(() => {
    try {
      const saved = localStorage.getItem('ideal_admin_toppers');
      return saved ? JSON.parse(saved) : [
        { id: 'top-1', name: 'पूजा कुमारी', score: '458/500', rank: 'जिला प्रथम (District Rank 1)', classId: '12th', year: '2024-25', badge: '🥇 91.6%' },
        { id: 'top-2', name: 'अमित कुमार', score: '446/500', rank: 'State Top 10', classId: '12th', year: '2024-25', badge: '🥈 89.2%' },
        { id: 'top-3', name: 'खुशी मिश्रा', score: '442/500', rank: 'इतिहास 96/100', classId: '12th', year: '2024-25', badge: '🥉 88.4%' }
      ];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ideal_admin_live', JSON.stringify(liveClassesList));
  }, [liveClassesList]);

  useEffect(() => {
    localStorage.setItem('ideal_admin_notes', JSON.stringify(notesList));
  }, [notesList]);

  useEffect(() => {
    localStorage.setItem('ideal_admin_notices', JSON.stringify(noticesList));
  }, [noticesList]);

  useEffect(() => {
    localStorage.setItem('ideal_admin_students', JSON.stringify(studentsList));
  }, [studentsList]);

  useEffect(() => {
    localStorage.setItem('ideal_admin_toppers', JSON.stringify(toppersList));
  }, [toppersList]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // PIN Unlock Verification
  const handlePinSubmit = (e) => {
    e?.preventDefault();
    if (pinInput === '1234') {
      setIsUnlocked(true);
      sessionStorage.setItem('ideal_admin_unlocked', 'true');
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleDemoUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('ideal_admin_unlocked', 'true');
  };

  // Live Toggle Action
  const toggleLiveStatus = (classId) => {
    setLiveClassesList(prev => prev.map(item => {
      if (item.id === classId) {
        const isNowLive = item.status !== 'live';
        return {
          ...item,
          status: isNowLive ? 'live' : 'completed',
          time: isNowLive ? (language === 'hi' ? 'अभी लाइव शुरू हुआ' : 'Live Stream Started') : (language === 'hi' ? 'सत्र समाप्त' : 'Session Ended'),
          badge: isNowLive ? (language === 'hi' ? '🔴 लाइव प्रसारण' : '🔴 LIVE NOW') : (language === 'hi' ? 'समाप्त' : 'Ended')
        };
      }
      return item;
    }));
    showToast(adminT.savedSuccess);
  };

  const deleteLiveClass = (id) => {
    if (confirm(adminT.deleteConfirm)) {
      setLiveClassesList(prev => prev.filter(c => c.id !== id));
      showToast(adminT.savedSuccess);
    }
  };

  const deleteNote = (id) => {
    if (confirm(adminT.deleteConfirm)) {
      setNotesList(prev => prev.filter(n => n.id !== id));
      showToast(adminT.savedSuccess);
    }
  };

  const deleteNotice = (id) => {
    if (confirm(adminT.deleteConfirm)) {
      setNoticesList(prev => prev.filter(n => n.id !== id));
      showToast(adminT.savedSuccess);
    }
  };

  /* ---------------- PIN LOCK SCREEN ---------------- */
  if (!isUnlocked) {
    return (
      <div style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
        color: '#FFFFFF'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 380,
          background: 'var(--bg-surface)',
          borderRadius: 20,
          padding: '28px 24px',
          boxShadow: 'var(--shadow-xl)',
          border: '1.5px solid rgba(13, 148, 136, 0.3)',
          textAlign: 'center',
          color: 'var(--text-primary)'
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'rgba(13, 148, 136, 0.15)',
            border: '2px solid var(--color-accent-teal)',
            color: 'var(--color-accent-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 20px rgba(13, 148, 136, 0.25)'
          }}>
            <Lock size={26} />
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 6px' }}>
            {adminT.pinTitle}
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 20px', lineHeight: 1.5 }}>
            {adminT.pinSub}
          </p>

          <form onSubmit={handlePinSubmit}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 16
            }}>
              <input
                type="password"
                maxLength="4"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                autoFocus
                style={{
                  width: 140,
                  fontSize: 28,
                  fontWeight: 800,
                  textAlign: 'center',
                  letterSpacing: '0.4em',
                  padding: '10px 14px',
                  borderRadius: 14,
                  border: pinError ? '2px solid #EF4444' : '2px solid var(--color-accent-teal)',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  boxShadow: 'var(--shadow-xs)'
                }}
              />
            </div>

            {pinError && (
              <div style={{
                color: '#EF4444',
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4
              }}>
                <AlertCircle size={14} />
                <span>{adminT.incorrectPin}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: 12, fontSize: 14, fontWeight: 700, marginBottom: 10 }}
            >
              <ShieldCheck size={16} />
              <span>{adminT.unlockBtn}</span>
            </button>
          </form>

          <button
            onClick={handleDemoUnlock}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 12,
              background: 'var(--color-accent-teal-tint)',
              border: '1px dashed var(--color-accent-teal)',
              color: 'var(--color-accent-teal)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: 16
            }}
          >
            ⚡ {adminT.quickDemoUnlock}
          </button>

          <button
            onClick={onBackToApp}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <ArrowLeft size={14} />
            <span>{adminT.switchStudentView}</span>
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN ADMIN DASHBOARD ---------------- */
  return (
    <div style={{
      minHeight: '100%',
      padding: '16px 16px 80px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      background: 'var(--bg-app)'
    }}>
      
      {/* 1. Admin Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-surface)',
        padding: '10px 14px',
        borderRadius: 14,
        border: '1.5px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onBackToApp}
            style={{
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              padding: '6px 10px',
              color: 'var(--text-primary)',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            title="Return to Student View"
          >
            <ArrowLeft size={14} />
            <span>{language === 'hi' ? 'छात्र ऐप' : 'Student App'}</span>
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                {adminT.panelTitle}
              </span>
              <span style={{
                fontSize: 9,
                fontWeight: 800,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #0D9488 0%, #115E59 100%)',
                padding: '1px 6px',
                borderRadius: 4
              }}>
                ADMIN
              </span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
              {adminT.panelBadge}
            </div>
          </div>
        </div>

        {/* Quick Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => onSelectLanguage && onSelectLanguage(language === 'en' ? 'hi' : 'en')}
            style={{
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              padding: '5px 8px',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--color-accent-teal)',
              cursor: 'pointer'
            }}
          >
            {language === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 EN'}
          </button>
        </div>
      </div>

      {/* 2. Admin Module Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 2,
        scrollbarWidth: 'none'
      }}>
        {[
          { id: 'overview', label: adminT.tabOverview, icon: ShieldCheck, count: null },
          { id: 'live', label: adminT.tabLive, icon: Radio, count: liveClassesList.filter(c => c.status === 'live').length || null, isLiveDot: true },
          { id: 'notes', label: adminT.tabNotes, icon: BookOpen, count: notesList.length },
          { id: 'notices', label: adminT.tabNotices, icon: Bell, count: noticesList.length },
          { id: 'students', label: adminT.tabStudents, icon: Users, count: studentsList.length },
          { id: 'toppers', label: adminT.tabToppers, icon: Trophy, count: toppersList.length }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                whiteSpace: 'nowrap',
                padding: '7px 12px',
                borderRadius: 10,
                border: isActive ? '1.5px solid var(--color-accent-teal)' : '1px solid var(--border-subtle)',
                background: isActive ? 'var(--color-accent-teal)' : 'var(--bg-surface)',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 2px 8px rgba(13, 148, 136, 0.25)' : 'none'
              }}
            >
              <Icon size={13} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span style={{
                  fontSize: 9,
                  fontWeight: 800,
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--bg-surface-subtle)',
                  color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                  padding: '1px 5px',
                  borderRadius: 9999
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Class Filter Bar (for Live, Notes, and Students) */}
      {(activeTab === 'live' || activeTab === 'notes' || activeTab === 'students') && (
        <div style={{
          display: 'flex',
          gap: 5,
          overflowX: 'auto',
          paddingBottom: 2,
          scrollbarWidth: 'none'
        }}>
          <button
            onClick={() => setFilterClass('all')}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: filterClass === 'all' ? '1.5px solid var(--color-accent-teal)' : '1px solid var(--border-subtle)',
              background: filterClass === 'all' ? 'var(--color-accent-teal-tint)' : 'var(--bg-surface)',
              color: filterClass === 'all' ? 'var(--color-accent-teal)' : 'var(--text-secondary)',
              fontSize: 10,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {t.common.all}
          </button>
          {CLASSES_CONFIG.map(cls => (
            <button
              key={cls.id}
              onClick={() => setFilterClass(cls.id)}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: filterClass === cls.id ? '1.5px solid var(--color-accent-teal)' : '1px solid var(--border-subtle)',
                background: filterClass === cls.id ? 'var(--color-accent-teal-tint)' : 'var(--bg-surface)',
                color: filterClass === cls.id ? 'var(--color-accent-teal)' : 'var(--text-secondary)',
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {getClassDisplayName(cls, language)}
            </button>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 1: OVERVIEW DASHBOARD */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          
          {/* Key Metric 4-Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            
            {/* Stat 1 */}
            <div className="art-card" style={{ padding: '14px', borderLeft: '4px solid #0D9488' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {adminT.totalStudents}
                </span>
                <Users size={16} color="#0D9488" />
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>
                {studentsList.length + 1414}
              </div>
              <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>
                ↑ +42 this week
              </span>
            </div>

            {/* Stat 2 */}
            <div className="art-card" style={{ padding: '14px', borderLeft: '4px solid #EF4444' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {adminT.activeLive}
                </span>
                <Radio size={16} color="#EF4444" />
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#EF4444' }}>
                {liveClassesList.filter(c => c.status === 'live').length} Active
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                {liveClassesList.length} Scheduled
              </span>
            </div>

            {/* Stat 3 */}
            <div className="art-card" style={{ padding: '14px', borderLeft: '4px solid #2563EB' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {adminT.totalNotes}
                </span>
                <BookOpen size={16} color="#2563EB" />
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>
                {notesList.length} PDFs
              </div>
              <span style={{ fontSize: 10, color: '#2563EB', fontWeight: 700 }}>
                100% Bihar Board Syllabus
              </span>
            </div>

            {/* Stat 4 */}
            <div className="art-card" style={{ padding: '14px', borderLeft: '4px solid #F59E0B' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {adminT.avgAttendance}
                </span>
                <Trophy size={16} color="#F59E0B" />
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>
                94.8%
              </div>
              <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>
                Top Student Engagement
              </span>
            </div>

          </div>

          {/* Quick Admin Actions Row */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
              {language === 'hi' ? 'त्वरित प्रशासनिक कार्य' : 'Quick Actions'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              <button
                onClick={() => setShowAddLiveModal(true)}
                className="btn-primary"
                style={{ padding: '10px 12px', borderRadius: 10, fontSize: 12, justifyContent: 'center' }}
              >
                <Radio size={14} />
                <span>{adminT.scheduleLiveBtn}</span>
              </button>

              <button
                onClick={() => setShowAddNoteModal(true)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1.5px solid var(--color-accent-teal)',
                  background: 'var(--color-accent-teal-tint)',
                  color: 'var(--color-accent-teal)',
                  fontWeight: 700,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
              >
                <FileText size={14} />
                <span>{adminT.uploadNoteBtn}</span>
              </button>

              <button
                onClick={() => setShowAddNoticeModal(true)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
              >
                <Bell size={14} />
                <span>{adminT.postNoticeBtn}</span>
              </button>

              <button
                onClick={() => setShowAddStudentModal(true)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
              >
                <Users size={14} />
                <span>{adminT.addStudentBtn}</span>
              </button>
            </div>
          </div>

          {/* Broadcast Live Banner Simulator */}
          <div style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            borderRadius: 16,
            padding: '14px 16px',
            color: '#FFFFFF',
            border: '1px solid rgba(13, 148, 136, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#2DD4BF' }}>
                  {language === 'hi' ? 'शिक्षक नियंत्रण कक्ष' : 'Faculty Broadcast Center'}
                </span>
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 800, margin: 0 }}>
                {language === 'hi' ? 'लाइव क्लासरूम ब्रॉडकास्ट' : 'Studio Broadcast Console'}
              </h4>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '2px 0 0' }}>
                {language === 'hi' ? 'एक क्लिक से छात्रों को लाइव नोटिफिकेशन भेजें' : 'Broadcast immediate lecture alerts to enrolled students'}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('live')}
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: 11, borderRadius: 8 }}
            >
              <span>{language === 'hi' ? 'प्रसारण देखें' : 'Manage Stream'}</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Recent Enrolled Students Preview */}
          <div className="art-card" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {language === 'hi' ? 'हाल में नामांकित छात्र' : 'Recently Enrolled Students'}
              </h4>
              <button
                onClick={() => setActiveTab('students')}
                style={{ background: 'none', border: 'none', color: 'var(--color-accent-teal)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
              >
                {t.common.viewAll} ({studentsList.length})
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {studentsList.slice(0, 4).map(st => (
                <div key={st.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: 11
                }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{st.name}</span>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: 6 }}>({st.rollNo})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 700,
                      background: 'var(--color-accent-teal-tint)',
                      color: 'var(--color-accent-teal)',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}>
                      Class {st.classId}
                    </span>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 700,
                      background: st.fees === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: st.fees === 'paid' ? '#059669' : '#EF4444',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}>
                      {st.fees.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: LIVE CLASSES MANAGER */}
      {/* ========================================================= */}
      {activeTab === 'live' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {adminT.tabLive} ({liveClassesList.length})
              </h3>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {language === 'hi' ? 'लाइव प्रसारण शुरू करें या नई क्लास शेड्यूल करें' : 'Toggle live broadcasting or schedule upcoming sessions'}
              </p>
            </div>

            <button
              onClick={() => setShowAddLiveModal(true)}
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: 11, borderRadius: 8 }}
            >
              <Plus size={14} />
              <span>{adminT.scheduleLiveBtn}</span>
            </button>
          </div>

          {/* List of live classes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {liveClassesList
              .filter(c => filterClass === 'all' || c.classId === filterClass)
              .map(clsItem => {
                const isLiveNow = clsItem.status === 'live';
                return (
                  <div
                    key={clsItem.id}
                    className="art-card"
                    style={{
                      padding: '14px',
                      borderRadius: 14,
                      border: isLiveNow ? '1.5px solid #EF4444' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{
                          fontSize: 9,
                          fontWeight: 800,
                          background: isLiveNow ? '#EF4444' : 'var(--bg-surface-subtle)',
                          color: isLiveNow ? '#FFFFFF' : 'var(--text-primary)',
                          padding: '2px 8px',
                          borderRadius: 9999,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4
                        }}>
                          {isLiveNow && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF' }} />}
                          {clsItem.badge || (isLiveNow ? '🔴 LIVE' : 'SCHEDULED')}
                        </span>

                        <span style={{
                          fontSize: 9,
                          fontWeight: 700,
                          background: 'var(--color-accent-teal-tint)',
                          color: 'var(--color-accent-teal)',
                          padding: '2px 6px',
                          borderRadius: 4
                        }}>
                          Class {clsItem.classId}
                        </span>

                        <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                          {clsItem.time}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteLiveClass(clsItem.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-tertiary)',
                          cursor: 'pointer',
                          padding: 4
                        }}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                        {clsItem.title}
                      </h4>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                        👨‍🏫 {clsItem.instructor} ({clsItem.instructorRole || 'Faculty'})
                      </div>
                    </div>

                    {/* Action button: Go Live Now / End Live */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 8,
                      borderTop: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>
                        {clsItem.viewersCount ? `${clsItem.viewersCount} active viewers` : 'Ready to stream'}
                      </div>

                      <button
                        onClick={() => toggleLiveStatus(clsItem.id)}
                        style={{
                          background: isLiveNow ? '#EF4444' : 'var(--color-accent-teal)',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 8,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        {isLiveNow ? <Square size={12} fill="#FFF" /> : <Play size={12} fill="#FFF" />}
                        <span>{isLiveNow ? adminT.endLiveNow : adminT.goLiveNow}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: NOTES & PDF LIBRARY MANAGER */}
      {/* ========================================================= */}
      {activeTab === 'notes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {adminT.tabNotes} ({notesList.length})
              </h3>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {language === 'hi' ? 'हस्तलिखित नोट्स एवं VVI सेट्स प्रबंधित करें' : 'Upload and manage student downloadable PDFs'}
              </p>
            </div>

            <button
              onClick={() => setShowAddNoteModal(true)}
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: 11, borderRadius: 8 }}
            >
              <Plus size={14} />
              <span>{adminT.uploadNoteBtn}</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {notesList
              .filter(n => filterClass === 'all' || n.classId === filterClass)
              .map(note => (
                <div
                  key={note.id}
                  className="art-card"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(13, 148, 136, 0.1)',
                      color: 'var(--color-accent-teal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <FileText size={18} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <span style={{
                          fontSize: 9,
                          fontWeight: 700,
                          background: 'var(--color-accent-teal-tint)',
                          color: 'var(--color-accent-teal)',
                          padding: '1px 5px',
                          borderRadius: 4
                        }}>
                          Class {note.classId}
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                          {note.subjectName}
                        </span>
                      </div>
                      <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                        {note.title}
                      </h4>
                      <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>
                        {note.pages || '24 Pages'} • {note.author}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteNote(note.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-tertiary)',
                      cursor: 'pointer',
                      padding: 4
                    }}
                    title="Delete Note"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: ANNOUNCEMENTS & NOTICES */}
      {/* ========================================================= */}
      {activeTab === 'notices' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {adminT.tabNotices} ({noticesList.length})
              </h3>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {language === 'hi' ? 'छात्रों को परीक्षा व बैच सूचनाएं प्रसारित करें' : 'Broadcast official notices and exam announcements'}
              </p>
            </div>

            <button
              onClick={() => setShowAddNoticeModal(true)}
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: 11, borderRadius: 8 }}
            >
              <Plus size={14} />
              <span>{adminT.postNoticeBtn}</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {noticesList.map(notice => (
              <div
                key={notice.id}
                className="art-card"
                style={{
                  padding: '14px',
                  borderRadius: 14,
                  borderLeft: notice.priority === 'urgent' ? '4px solid #EF4444' : '4px solid var(--color-accent-teal)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 800,
                      background: notice.priority === 'urgent' ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-accent-teal-tint)',
                      color: notice.priority === 'urgent' ? '#EF4444' : 'var(--color-accent-teal)',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}>
                      {notice.badge || 'NOTICE'}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                      Target: {notice.classId === 'all' ? 'All Classes' : `Class ${notice.classId}`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{notice.date}</span>
                    <button
                      onClick={() => deleteNotice(notice.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 2 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {notice.title}
                </h4>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: STUDENTS DIRECTORY */}
      {/* ========================================================= */}
      {activeTab === 'students' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {adminT.tabStudents} ({studentsList.length})
              </h3>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {language === 'hi' ? 'नामांकित छात्र सूची, उपस्थिति एवं शुल्क स्थिति' : 'Student profiles, attendance and fee records'}
              </p>
            </div>

            <button
              onClick={() => setShowAddStudentModal(true)}
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: 11, borderRadius: 8 }}
            >
              <Plus size={14} />
              <span>{adminT.addStudentBtn}</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {studentsList
              .filter(s => filterClass === 'all' || s.classId === filterClass)
              .map(student => (
                <div
                  key={student.id}
                  className="art-card"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0D9488 0%, #115E59 100%)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 13
                    }}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                          {student.name}
                        </span>
                        <span style={{
                          fontSize: 9,
                          fontWeight: 700,
                          background: 'var(--color-accent-teal-tint)',
                          color: 'var(--color-accent-teal)',
                          padding: '1px 5px',
                          borderRadius: 4
                        }}>
                          Class {student.classId}
                        </span>
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 }}>
                        Roll: {student.rollNo} • 📞 {student.phone}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 800,
                      background: student.fees === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: student.fees === 'paid' ? '#059669' : '#EF4444',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}>
                      {student.fees.toUpperCase()}
                    </span>
                    <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 3 }}>
                      Att: {student.attendance}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: TOPPERS SHOWCASE MANAGER */}
      {/* ========================================================= */}
      {activeTab === 'toppers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {adminT.tabToppers} ({toppersList.length})
              </h3>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {language === 'hi' ? 'संस्थान के बोर्ड परीक्षा टॉपर छात्रों की सूची' : 'Manage yearly Bihar Board Arts rank holders'}
              </p>
            </div>

            <button
              onClick={() => setShowAddTopperModal(true)}
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: 11, borderRadius: 8 }}
            >
              <Plus size={14} />
              <span>{language === 'hi' ? '+ नया टॉपर जोड़ें' : '+ Add Topper'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {toppersList.map(topper => (
              <div
                key={topper.id}
                className="art-card"
                style={{
                  padding: '14px',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: '#F59E0B',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Trophy size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                        {topper.name}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#059669' }}>
                        {topper.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 800, marginTop: 2 }}>
                      {topper.score} • {topper.rank}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setToppersList(prev => prev.filter(t => t.id !== topper.id));
                    showToast(adminT.savedSuccess);
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: SCHEDULE LIVE CLASS */}
      {/* ========================================================= */}
      {showAddLiveModal && (
        <ModalWrapper onClose={() => setShowAddLiveModal(false)} title={language === 'hi' ? 'नई लाइव क्लास शेड्यूल करें' : 'Schedule New Live Class'}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const newClass = {
              id: 'live-' + Date.now(),
              classId: fd.get('classId') || '12th',
              subjectId: fd.get('subject') || 'history',
              title: fd.get('title'),
              instructor: fd.get('instructor') || 'Prof. Anand Kumar',
              instructorRole: fd.get('role') || 'Senior Faculty',
              time: fd.get('time') || 'Today 06:00 PM',
              formatType: fd.get('formatType') || 'objective',
              status: fd.get('goLiveNow') === 'on' ? 'live' : 'upcoming',
              badge: fd.get('goLiveNow') === 'on' ? '🔴 LIVE NOW' : 'SCHEDULED'
            };
            setLiveClassesList(prev => [newClass, ...prev]);
            setShowAddLiveModal(false);
            showToast(adminT.savedSuccess);
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>{language === 'hi' ? 'कक्षा (Class)' : 'Target Class'}</label>
                <select name="classId" style={inputStyle} defaultValue="12th">
                  {CLASSES_CONFIG.map(c => (
                    <option key={c.id} value={c.id}>{getClassDisplayName(c, language)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'विषय (Subject)' : 'Subject'}</label>
                <input name="subject" required placeholder="e.g. History (इतिहास)" style={inputStyle} defaultValue="History" />
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'क्लास का शीर्षक / टॉपिक' : 'Lecture Title / Topic'}</label>
                <input name="title" required placeholder="e.g. Chapter 3 VVI MCQs Live Marathon" style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={labelStyle}>{language === 'hi' ? 'शिक्षक का नाम' : 'Teacher Name'}</label>
                  <input name="instructor" defaultValue="Prof. Anand Kumar" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{language === 'hi' ? 'समय / तारीख' : 'Scheduled Time'}</label>
                  <input name="time" defaultValue="Today 06:00 PM" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'प्रारूप (Format)' : 'Format Track'}</label>
                <select name="formatType" style={inputStyle}>
                  <option value="objective">Objective (वस्तुनिष्ठ 50 Marks)</option>
                  <option value="subjective">Subjective (विषयनिष्ठ 50 Marks)</option>
                  <option value="all">General Class (सम्पूर्ण)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                <input type="checkbox" id="goLiveNow" name="goLiveNow" style={{ width: 18, height: 18, accentColor: '#EF4444' }} />
                <label htmlFor="goLiveNow" style={{ fontSize: 12, fontWeight: 700, color: '#EF4444', cursor: 'pointer' }}>
                  {language === 'hi' ? 'तुरंत लाइव प्रसारण शुरू करें (Broadcast Immediately)' : 'Broadcast Live Immediately'}
                </label>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 10, fontSize: 13, marginTop: 4 }}>
                <span>{language === 'hi' ? 'क्लास शेड्यूल करें' : 'Publish Schedule'}</span>
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: UPLOAD NOTE / PDF */}
      {/* ========================================================= */}
      {showAddNoteModal && (
        <ModalWrapper onClose={() => setShowAddNoteModal(false)} title={language === 'hi' ? 'नया नोट्स PDF जोड़ें' : 'Upload Study Material PDF'}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const newNote = {
              id: 'mat-' + Date.now(),
              classId: fd.get('classId') || '12th',
              subjectName: fd.get('subject') || 'History',
              title: fd.get('title'),
              pages: `${fd.get('pages') || '28'} Pages`,
              fileSize: `${fd.get('fileSize') || '6.5'} MB`,
              author: fd.get('author') || 'Prof. Anand Kumar',
              formatType: fd.get('formatType') || 'all',
              badge: fd.get('badge') || 'VVI नोट्स',
              badgeColor: '#0D9488'
            };
            setNotesList(prev => [newNote, ...prev]);
            setShowAddNoteModal(false);
            showToast(adminT.savedSuccess);
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>{language === 'hi' ? 'कक्षा (Class)' : 'Class'}</label>
                <select name="classId" style={inputStyle} defaultValue="12th">
                  {CLASSES_CONFIG.map(c => (
                    <option key={c.id} value={c.id}>{getClassDisplayName(c, language)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'विषय (Subject)' : 'Subject'}</label>
                <input name="subject" required placeholder="e.g. Political Science" style={inputStyle} defaultValue="History" />
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'नोट्स शीर्षक (Title)' : 'Notes Title'}</label>
                <input name="title" required placeholder="e.g. हड़प्पा सभ्यता: सम्पूर्ण हस्तलिखित नोट्स" style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={labelStyle}>{language === 'hi' ? 'पृष्ठ संख्या' : 'Pages'}</label>
                  <input name="pages" defaultValue="28" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{language === 'hi' ? 'साइज (MB)' : 'File Size'}</label>
                  <input name="fileSize" defaultValue="6.5" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'लेखक / शिक्षक' : 'Faculty / Author'}</label>
                <input name="author" defaultValue="Prof. Anand Kumar" style={inputStyle} />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 10, fontSize: 13, marginTop: 4 }}>
                <span>{language === 'hi' ? 'नोट्स प्रकाशित करें' : 'Save & Publish Note'}</span>
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: POST NOTICE */}
      {/* ========================================================= */}
      {showAddNoticeModal && (
        <ModalWrapper onClose={() => setShowAddNoticeModal(false)} title={language === 'hi' ? 'नई सूचना जारी करें' : 'Broadcast Announcement'}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const newNotice = {
              id: 'not-' + Date.now(),
              classId: fd.get('classId') || 'all',
              title: fd.get('title'),
              content: fd.get('content'),
              priority: fd.get('priority') || 'normal',
              date: 'Just Now',
              badge: fd.get('priority') === 'urgent' ? 'महत्वपूर्ण' : 'सूचना'
            };
            setNoticesList(prev => [newNotice, ...prev]);
            setShowAddNoticeModal(false);
            showToast(adminT.savedSuccess);
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>{language === 'hi' ? 'लक्षित कक्षा' : 'Target Audience'}</label>
                <select name="classId" style={inputStyle} defaultValue="all">
                  <option value="all">{language === 'hi' ? 'सभी कक्षाएं (All Classes)' : 'All Classes'}</option>
                  {CLASSES_CONFIG.map(c => (
                    <option key={c.id} value={c.id}>{getClassDisplayName(c, language)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'सूचना का शीर्षक' : 'Notice Headline'}</label>
                <input name="title" required placeholder="e.g. बिहार बोर्ड 2026 परीक्षा फॉर्म सूचना" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'विस्तृत विवरण' : 'Detailed Message'}</label>
                <textarea name="content" required rows="3" placeholder="Enter notice content for students..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'प्राथमिकता (Priority)' : 'Priority'}</label>
                <select name="priority" style={inputStyle}>
                  <option value="normal">Normal Notice</option>
                  <option value="urgent">Urgent / Exam Alert (Red Highlight)</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 10, fontSize: 13, marginTop: 4 }}>
                <span>{language === 'hi' ? 'सूचना जारी करें' : 'Post Announcement'}</span>
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: ENROLL NEW STUDENT */}
      {/* ========================================================= */}
      {showAddStudentModal && (
        <ModalWrapper onClose={() => setShowAddStudentModal(false)} title={language === 'hi' ? 'नया छात्र नामांकित करें' : 'Enroll New Student'}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const newStudent = {
              id: 'std-' + Date.now(),
              name: fd.get('name'),
              rollNo: fd.get('rollNo') || `IAC-2026-${Math.floor(100 + Math.random() * 900)}`,
              phone: fd.get('phone') || '9876543210',
              classId: fd.get('classId') || '12th',
              attendance: '100%',
              score: '0.0%',
              fees: fd.get('fees') || 'paid'
            };
            setStudentsList(prev => [newStudent, ...prev]);
            setShowAddStudentModal(false);
            showToast(adminT.savedSuccess);
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>{language === 'hi' ? 'विद्यार्थी का नाम' : 'Student Full Name'}</label>
                <input name="name" required placeholder="e.g. Ramesh Kumar" style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={labelStyle}>{language === 'hi' ? 'मोबाइल नंबर' : 'Phone'}</label>
                  <input name="phone" required placeholder="10-digit number" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{language === 'hi' ? 'कक्षा' : 'Class'}</label>
                  <select name="classId" style={inputStyle} defaultValue="12th">
                    {CLASSES_CONFIG.map(c => (
                      <option key={c.id} value={c.id}>{getClassDisplayName(c, language)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'नामांकन शुल्क स्थिति' : 'Fee Payment Status'}</label>
                <select name="fees" style={inputStyle}>
                  <option value="paid">Paid (पूर्ण भुगतान)</option>
                  <option value="pending">Pending (बकाया)</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 10, fontSize: 13, marginTop: 4 }}>
                <span>{language === 'hi' ? 'छात्र नामांकित करें' : 'Enroll Student'}</span>
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: ADD TOPPER */}
      {/* ========================================================= */}
      {showAddTopperModal && (
        <ModalWrapper onClose={() => setShowAddTopperModal(false)} title={language === 'hi' ? 'नया टॉपर छात्र जोड़ें' : 'Add Board Topper'}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const newTopper = {
              id: 'top-' + Date.now(),
              name: fd.get('name'),
              score: fd.get('score') || '450/500',
              rank: fd.get('rank') || 'District Rank 1',
              classId: '12th',
              year: '2024-25',
              badge: '🥇 ' + (fd.get('percent') || '90%')
            };
            setToppersList(prev => [newTopper, ...prev]);
            setShowAddTopperModal(false);
            showToast(adminT.savedSuccess);
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>{language === 'hi' ? 'छात्र का नाम' : 'Topper Name'}</label>
                <input name="name" required placeholder="e.g. Pooja Kumari" style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={labelStyle}>{language === 'hi' ? 'प्राप्तांक (Score)' : 'Score'}</label>
                  <input name="score" required placeholder="e.g. 458/500" style={inputStyle} defaultValue="458/500" />
                </div>
                <div>
                  <label style={labelStyle}>{language === 'hi' ? 'प्रतिशत' : 'Percentage'}</label>
                  <input name="percent" placeholder="e.g. 91.6%" style={inputStyle} defaultValue="91.6%" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>{language === 'hi' ? 'रैंक / सम्मान' : 'Rank / Title'}</label>
                <input name="rank" required placeholder="e.g. जिला प्रथम (Rank 1)" style={inputStyle} defaultValue="District Rank 1" />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 10, fontSize: 13, marginTop: 4 }}>
                <span>{language === 'hi' ? 'टॉपर सूची में जोड़ें' : 'Save Topper'}</span>
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Floating Toast Message */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--color-primary-navy)',
          color: '#FFFFFF',
          padding: '10px 18px',
          borderRadius: 12,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 12,
          fontWeight: 700,
          zIndex: 150
        }}>
          <CheckCircle size={16} color="#2DD4BF" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

// Modal helper wrapper component
function ModalWrapper({ children, title, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 120,
      padding: 16
    }}>
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 18,
        width: '100%',
        maxWidth: 440,
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface-subtle)'
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 16 }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: '16px 18px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: 4,
  display: 'block'
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-subtle)',
  color: 'var(--text-primary)',
  fontSize: 12,
  outline: 'none',
  boxSizing: 'border-box'
};
