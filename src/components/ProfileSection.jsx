import React, { useState } from 'react';
import { 
  User, Moon, Sun, Download, HelpCircle, LogOut, 
  Award, Shield, FileCheck, PhoneCall, ChevronRight, 
  HardDrive, CheckCircle2, Sparkles, ExternalLink, Languages
} from 'lucide-react';
import { 
  CLASSES_CONFIG, 
  SUBJECTS_BY_CLASS,
  getClassDisplayName,
  getClassStreamDisplayName,
  getSubjectDisplayName
} from '../data/curriculumData';
import { translations } from '../data/translations';

export function ProfileSection({ 
  selectedClass = '12th', 
  onSelectClass, 
  isDarkMode, 
  onToggleTheme, 
  onLogout,
  language = 'en',
  onSelectLanguage
}) {
  const t = translations[language] || translations.en;

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showReceiptToast, setShowReceiptToast] = useState(false);

  const currentClassInfo = CLASSES_CONFIG.find(c => c.id === selectedClass) || CLASSES_CONFIG[0];
  const currentSubjects = SUBJECTS_BY_CLASS[selectedClass] || [];

  const handleDownloadReceipt = () => {
    setShowReceiptToast(true);
    setTimeout(() => setShowReceiptToast(false), 3000);
  };

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      
      {/* Profile Header Card */}
      <div className="art-card" style={{
        padding: '18px 16px',
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow decoration */}
        <div style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(13, 148, 136, 0.2)',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" 
              alt="Aarav Sharma"
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2.5px solid var(--color-accent-teal)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: 14,
              height: 14,
              background: '#10B981',
              borderRadius: '50%',
              border: '2px solid #1E293B'
            }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-sans)', margin: 0 }}>
                Aarav Sharma
              </h3>
              <Sparkles size={14} color="#2DD4BF" />
            </div>
            <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 6, margin: '2px 0 6px' }}>
              {t.profile.rollLabel}: <strong style={{ color: '#E2E8F0' }}>IAC-2026-088</strong>
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(13, 148, 136, 0.25)',
              border: '1px solid rgba(45, 212, 191, 0.35)',
              padding: '2px 8px',
              borderRadius: 6,
              fontSize: 10,
              fontWeight: 700,
              color: '#2DD4BF'
            }}>
              <Award size={12} />
              <span>{getClassDisplayName(currentClassInfo, language)} • {getClassStreamDisplayName(currentClassInfo, language)}</span>
            </div>
          </div>
        </div>

        {/* Academic Performance Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          marginTop: 16,
          paddingTop: 12,
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          textAlign: 'center'
        }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#2DD4BF' }}>96%</span>
            <p style={{ fontSize: 10, color: '#94A3B8', margin: '2px 0 0' }}>{t.profile.attendance}</p>
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#10B981' }}>88%</span>
            <p style={{ fontSize: 10, color: '#94A3B8', margin: '2px 0 0' }}>{t.profile.testsCompleted}</p>
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#FF6B4A' }}>Top 5%</span>
            <p style={{ fontSize: 10, color: '#94A3B8', margin: '2px 0 0' }}>{t.profile.boardRank}</p>
          </div>
        </div>
      </div>

      {/* Class Switcher Pill Bar in Profile */}
      <div className="art-card" style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
            {language === 'hi' ? 'नामांकित कक्षा बदलें' : 'Switch Enrolled Class'}
          </span>
          <span style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 600 }}>
            {language === 'hi' ? 'सक्रिय:' : 'Active:'} {getClassDisplayName(currentClassInfo, language)}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {CLASSES_CONFIG.map(cls => (
            <button
              key={cls.id}
              onClick={() => onSelectClass && onSelectClass(cls.id)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: selectedClass === cls.id ? '1.5px solid var(--color-accent-teal)' : '1px solid var(--border-subtle)',
                background: selectedClass === cls.id ? 'var(--color-accent-teal)' : 'var(--bg-surface)',
                color: selectedClass === cls.id ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {getClassDisplayName(cls, language)}
            </button>
          ))}
        </div>
      </div>

      {/* Enrolled Subjects Tag Cloud (Clean single language, no dual text) */}
      <div className="art-card" style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {t.profile.enrolledSubjects} ({currentSubjects.length})
          </h4>
          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
            {getClassStreamDisplayName(currentClassInfo, language)}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {currentSubjects.map(sub => (
            <span
              key={sub.id}
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: sub.color,
                background: sub.bgLight,
                padding: '5px 10px',
                borderRadius: 8,
                border: `1px solid ${sub.color}25`
              }}
            >
              {getSubjectDisplayName(sub, language)}
            </span>
          ))}
        </div>
      </div>

      {/* Offline Storage Manager */}
      <div className="art-card" style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--color-accent-teal-tint)',
              color: 'var(--color-accent-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HardDrive size={16} />
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {language === 'hi' ? 'ऑफलाइन अध्ययन सामग्री' : 'Offline Downloaded Notes'}
              </h4>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: '1px 0 0' }}>
                42.8 MB / 1.0 GB {language === 'hi' ? 'उपयोग हुआ' : 'Used'}
              </p>
            </div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-accent-teal)' }}>
            4.3%
          </span>
        </div>

        {/* Storage Bar */}
        <div style={{
          height: 6,
          background: 'var(--bg-surface-subtle)',
          borderRadius: 9999,
          overflow: 'hidden',
          display: 'flex'
        }}>
          <div style={{ width: '4.3%', height: '100%', background: 'var(--color-accent-teal)' }} />
        </div>
      </div>

      {/* App & Academic Settings List */}
      <div className="art-card" style={{ padding: '6px 0', overflow: 'hidden' }}>
        
        {/* NEW: Language Switcher Setting Item */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: 'rgba(13, 148, 136, 0.1)',
              color: 'var(--color-accent-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Languages size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {t.profile.languageLabel}
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {t.profile.languageDesc}
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            background: 'var(--bg-surface-subtle)',
            padding: 2,
            borderRadius: 8,
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => onSelectLanguage && onSelectLanguage('en')}
              style={{
                border: 'none',
                background: language === 'en' ? 'var(--color-accent-teal)' : 'transparent',
                color: language === 'en' ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => onSelectLanguage && onSelectLanguage('hi')}
              style={{
                border: 'none',
                background: language === 'hi' ? 'var(--color-accent-teal)' : 'transparent',
                color: language === 'hi' ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              🇮🇳 हिन्दी
            </button>
          </div>
        </div>

        {/* Dark/Light Theme Toggle */}
        <div 
          onClick={onToggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            cursor: 'pointer',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: isDarkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.08)',
              color: isDarkMode ? '#F59E0B' : 'var(--color-primary-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {t.profile.darkModeLabel}
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {t.profile.darkModeDesc}
              </p>
            </div>
          </div>

          <div style={{
            width: 44,
            height: 24,
            borderRadius: 9999,
            background: isDarkMode ? 'var(--color-accent-teal)' : 'var(--border-subtle)',
            position: 'relative',
            padding: 2,
            transition: 'background 0.2s ease'
          }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#FFFFFF',
              transform: isDarkMode ? 'translateX(20px)' : 'translateX(0px)',
              transition: 'transform 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }} />
          </div>
        </div>

        {/* Fee Receipt & Invoice */}
        <div 
          onClick={handleDownloadReceipt}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            cursor: 'pointer',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileCheck size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {language === 'hi' ? 'नामांकन शुल्क रसीद 2026' : 'Tuition Fee Receipt 2026'}
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {language === 'hi' ? 'सत्र 2025-27 • सत्यापित एवं सहेजा गया' : 'Batch 2025-27 • Paid & Verified'}
              </p>
            </div>
          </div>
          <Download size={16} color="var(--text-tertiary)" />
        </div>

        {/* Help & Support / WhatsApp Faculty */}
        <div 
          onClick={() => setShowSupportModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            cursor: 'pointer',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: 'rgba(99, 102, 241, 0.1)',
              color: '#6366F1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PhoneCall size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {t.profile.helpSupport}
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {t.profile.helpDesc}
              </p>
            </div>
          </div>
          <ChevronRight size={16} color="var(--text-tertiary)" />
        </div>

        {/* Logout */}
        <div 
          onClick={() => setShowLogoutModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LogOut size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#EF4444', margin: 0 }}>
                {t.profile.logoutBtn}
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                {language === 'hi' ? 'सत्र समाप्त करें' : 'Sign out of current device session'}
              </p>
            </div>
          </div>
          <ChevronRight size={16} color="#EF4444" />
        </div>

      </div>

      {/* Institutional Accreditation Footer */}
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <p style={{ fontSize: 13, color: 'var(--color-accent-teal)', fontWeight: 700, margin: 0 }}>
          {t.common.taglineMotto}
        </p>
        <p style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>
          Ideal Arts Classes v2.5.0 • Reg. No. IAC-MH-401
        </p>
      </div>

      {/* Fee Receipt Toast */}
      {showReceiptToast && (
        <div style={{
          position: 'fixed',
          bottom: 80,
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
          fontWeight: 600,
          zIndex: 100
        }}>
          <CheckCircle2 size={16} color="#2DD4BF" />
          <span>Receipt IAC-2026-REC-088.pdf downloaded</span>
        </div>
      )}

      {/* Faculty Support Modal */}
      {showSupportModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 90,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            background: 'var(--bg-surface)',
            borderRadius: '20px 20px 0 0',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {t.profile.helpSupport}
              </h3>
              <button 
                onClick={() => setShowSupportModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 16, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
              {language === 'hi' 
                ? 'कला संकाय से जुड़े किसी भी प्रश्न या सहायता के लिए हमारे वरिष्ठ शिक्षकों से संपर्क करें।' 
                : 'Connect directly with senior faculty and admission coordinators for guidance.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  background: 'rgba(37, 211, 102, 0.1)',
                  border: '1px solid rgba(37, 211, 102, 0.25)',
                  borderRadius: 12,
                  textDecoration: 'none',
                  color: 'var(--text-primary)'
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: '#25D366',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <PhoneCall size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>WhatsApp Faculty Helpdesk</div>
                  <div style={{ fontSize: 11, color: '#059669' }}>+91 98765 43210 (24x7)</div>
                </div>
              </a>
            </div>

            <button
              onClick={() => setShowSupportModal(false)}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: 12, fontSize: 13 }}
            >
              {t.common.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24
        }}>
          <div style={{
            width: '100%',
            maxWidth: 320,
            background: 'var(--bg-surface)',
            borderRadius: 16,
            padding: 20,
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <LogOut size={24} />
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
              {language === 'hi' ? 'लॉगआउट की पुष्टि करें' : 'Confirm Logout'}
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 20 }}>
              {language === 'hi' 
                ? 'क्या आप वास्तव में अपने छात्र खाते से लॉगआउट करना चाहते हैं?' 
                : 'Are you sure you want to sign out from your student account on this device?'}
            </p>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                {t.common.cancel}
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  if (onLogout) onLogout();
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                {t.profile.logoutBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
