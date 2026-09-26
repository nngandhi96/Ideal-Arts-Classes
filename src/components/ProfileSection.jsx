import React, { useState } from 'react';
import { 
  User, Moon, Sun, Download, HelpCircle, LogOut, 
  Award, Shield, FileCheck, PhoneCall, ChevronRight, 
  HardDrive, CheckCircle2, Sparkles, ExternalLink 
} from 'lucide-react';
import { CLASSES_CONFIG, SUBJECTS_BY_CLASS } from '../data/curriculumData';

export function ProfileSection({ 
  selectedClass = '12th', 
  onSelectClass, 
  isDarkMode, 
  onToggleTheme, 
  onLogout 
}) {
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
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-sans)' }}>
                Aarav Sharma
              </h3>
              <Sparkles size={14} color="#2DD4BF" />
            </div>
            <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>
              Roll No: <strong style={{ color: '#E2E8F0' }}>IAC-2026-088</strong>
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
              <span>{currentClassInfo.name} • {currentClassInfo.hindiName} ({currentClassInfo.stream})</span>
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
            <p style={{ fontSize: 10, color: '#94A3B8' }}>Attendance</p>
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#10B981' }}>88%</span>
            <p style={{ fontSize: 10, color: '#94A3B8' }}>Objective Tests</p>
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#FF6B4A' }}>12/15</span>
            <p style={{ fontSize: 10, color: '#94A3B8' }}>Subjective Q&A</p>
          </div>
        </div>
      </div>

      {/* Class Switcher Pill Bar in Profile */}
      <div className="art-card" style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
            Switch Enrolled Class / कक्षा बदलें
          </span>
          <span style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 600 }}>
            Active: {currentClassInfo.name}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {CLASSES_CONFIG.map(cls => (
            <button
              key={cls.id}
              onClick={() => onSelectClass && onSelectClass(cls.id)}
              style={{
                padding: '6px 10px',
                borderRadius: 8,
                border: selectedClass === cls.id ? '1.5px solid var(--color-accent-teal)' : '1px solid var(--border-subtle)',
                background: selectedClass === cls.id ? 'var(--color-accent-teal)' : 'var(--bg-surface)',
                color: selectedClass === cls.id ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {cls.name}
            </button>
          ))}
        </div>
      </div>

      {/* Enrolled Subjects List */}
      <div className="art-card" style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
            Enrolled Subjects ({currentSubjects.length})
          </h4>
          <span style={{ fontSize: 10, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
            {currentClassInfo.stream}
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
                padding: '4px 10px',
                borderRadius: 8,
                border: `1px solid ${sub.color}25`
              }}
            >
              {sub.name} ({sub.hindiName})
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-accent-teal)'
            }}>
              <HardDrive size={16} />
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                Offline Downloads Storage
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                1.4 GB used of 32 GB allocated
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
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                App Theme
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Currently in {isDarkMode ? 'Dark Mode' : 'Light Mode'}
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
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                Tuition Fee Receipt 2026
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Batch 2025-27 • Paid & Verified
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
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                Faculty Helpline & Support
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Direct WhatsApp & Academic Advisors
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
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                Logout
              </h4>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Sign out of student account
              </p>
            </div>
          </div>
          <ChevronRight size={16} color="#EF4444" />
        </div>

      </div>

      {/* Institutional Accreditation Footer */}
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <p className="devanagari-tagline" style={{ fontSize: 13, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
          कला ज्ञानं जीवनम्
        </p>
        <p style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>
          Ideal Arts Classes v2.4.0 (Official Build) • Reg. No. IAC-MH-401
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
          <div className="art-card animate-slide-up" style={{
            width: '100%',
            maxHeight: '80%',
            borderRadius: '24px 24px 0 0',
            padding: '20px',
            background: 'var(--bg-surface)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                Academic Support Desk
              </h3>
              <button 
                onClick={() => setShowSupportModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18 }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
              Have questions regarding live streams, easel submissions, or certification? Reach our dedicated faculty:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10B981',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: 13
                }}
              >
                <span>💬 WhatsApp Student Desk (+91 98765 43210)</span>
                <ExternalLink size={14} />
              </a>

              <div style={{
                padding: '12px 14px',
                borderRadius: 12,
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                fontSize: 12,
                color: 'var(--text-secondary)'
              }}>
                <strong style={{ color: 'var(--text-primary)' }}>Office Hours:</strong> Monday - Saturday (09:00 AM - 07:00 PM IST)
              </div>
            </div>

            <button
              onClick={() => setShowSupportModal(false)}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: 12 }}
            >
              Close Support
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
          padding: 20
        }}>
          <div className="art-card animate-fade-in" style={{
            width: '100%',
            maxWidth: 320,
            borderRadius: 18,
            padding: 20,
            textAlign: 'center',
            background: 'var(--bg-surface)'
          }}>
            <div style={{
              width: 48,
              height: 48,
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
              Sign Out of Ideal Arts?
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 18 }}>
              You will need to verify your phone number via OTP when you log back in.
            </p>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="btn-secondary"
                style={{ flex: 1, padding: '10px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowLogoutModal(false); onLogout(); }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 12,
                  background: '#EF4444',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
