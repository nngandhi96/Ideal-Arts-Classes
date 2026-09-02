import React, { useState } from 'react';
import { 
  Bell, Play, Clock, Sparkles, ChevronRight, Video, 
  BookOpen, FileText, CheckSquare, Calendar, Users, 
  Flame, Award, ArrowUpRight, Radio 
} from 'lucide-react';

export function DashboardHome({ onNavigate, onOpenLiveRoom, onOpenNotifications }) {
  const [activeBanner, setActiveBanner] = useState(0);

  const banners = [
    {
      id: 1,
      tag: "National Workshop",
      title: "Mastering Wet-on-Wet Watercolor Landscapes",
      instructor: "By Master Artist Mahendra Patil",
      date: "Sunday, 15 March • 10:00 AM",
      badge: "Certificate Provided",
      bgGradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
      accentColor: "#0D9488"
    },
    {
      id: 2,
      tag: "Annual Exhibition",
      title: "Kala Srijan 2026 Student Art Showcase",
      instructor: "Submit Your Canvas Artworks Before 25 March",
      date: "Exhibition Date: 5-8 April",
      badge: "Cash Prizes & Medals",
      bgGradient: "linear-gradient(135deg, #0F766E 0%, #115E59 100%)",
      accentColor: "#2DD4BF"
    },
    {
      id: 3,
      tag: "Guest Masterclass",
      title: "Classical Indian Miniature Art & Gold Leaf Technique",
      instructor: "By Traditional Artisan S. R. Sharma",
      date: "Live in 2 Days • Studio 1",
      badge: "Exclusive Batch",
      bgGradient: "linear-gradient(135deg, #334155 0%, #1E293B 100%)",
      accentColor: "#FF6B4A"
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
      id: 'recorded',
      title: 'Recorded',
      subtitle: '140+ HD Videos',
      icon: Video,
      badge: 'On-Demand',
      tintBg: 'rgba(13, 148, 136, 0.08)',
      iconColor: '#0D9488',
      badgeColor: '#0D9488',
      action: () => onNavigate('library')
    },
    {
      id: 'study',
      title: 'Study Material',
      subtitle: 'PDFs & Sketch Bank',
      icon: BookOpen,
      badge: 'Updated',
      tintBg: 'rgba(245, 158, 11, 0.08)',
      iconColor: '#D97706',
      badgeColor: '#D97706',
      action: () => onNavigate('library')
    },
    {
      id: 'assignments',
      title: 'Assignments',
      subtitle: '2 Pending Review',
      icon: CheckSquare,
      badge: 'Graded',
      tintBg: 'rgba(99, 102, 241, 0.08)',
      iconColor: '#6366F1',
      badgeColor: '#6366F1',
      action: () => onNavigate('profile')
    }
  ];

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* 1. Top Bar: Greeting & Notifications */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 4px'
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
                Namaste 🙏
              </span>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--color-accent-teal)',
                background: 'var(--color-accent-teal-tint)',
                padding: '1px 6px',
                borderRadius: 4
              }}>
                Diploma Yr 1
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

      {/* 2. Banner Carousel (Custom hand-crafted art cards) */}
      <div>
        <div style={{
          position: 'relative',
          borderRadius: 18,
          overflow: 'hidden',
          background: banners[activeBanner].bgGradient,
          color: '#FFFFFF',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-md)',
          minHeight: 160,
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
              fontSize: 16,
              fontWeight: 800,
              lineHeight: 1.35,
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              marginBottom: 4,
              maxWidth: '85%'
            }}>
              {banners[activeBanner].title}
            </h3>

            <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>
              {banners[activeBanner].instructor}
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 14,
            paddingTop: 10,
            borderTop: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <span style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Calendar size={13} />
              {banners[activeBanner].date}
            </span>

            <button
              onClick={() => onNavigate('live')}
              style={{
                background: '#FFFFFF',
                color: '#1E293B',
                border: 'none',
                padding: '5px 12px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span>View Details</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Carousel indicator dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
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

      {/* 3. Quick Access 4-Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
            Quick Access
          </h3>
          <span className="devanagari-tagline" style={{ fontSize: 12, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
            कला ज्ञानं जीवनम्
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12
        }}>
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="art-card"
                style={{
                  padding: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: item.tintBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.iconColor
                  }}>
                    <Icon size={20} />
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
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. "Continue Learning" Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
            Continue Learning
          </h3>
          <span style={{ fontSize: 12, color: 'var(--color-accent-teal)', fontWeight: 600, cursor: 'pointer' }} onClick={() => onNavigate('library')}>
            View History
          </span>
        </div>

        <div className="art-card" style={{ padding: '14px', display: 'flex', gap: 14, alignItems: 'center' }}>
          {/* Thumbnail preview */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img 
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&auto=format&fit=crop&q=80" 
              alt="Portrait Sketching"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--color-primary-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <Play size={14} fill="currentColor" style={{ marginLeft: 2 }} />
              </div>
            </div>
          </div>

          {/* Details & Progress */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--color-accent-teal)',
                background: 'var(--color-accent-teal-tint)',
                padding: '1px 6px',
                borderRadius: 4
              }}>
                Lesson 04
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
                <Clock size={11} />
                18m left
              </span>
            </div>

            <h4 style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: 8
            }}>
              Human Head & Facial Proportions
            </h4>

            {/* Sleek Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                flex: 1,
                height: 6,
                background: 'var(--bg-surface-subtle)',
                borderRadius: 9999,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '68%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 100%)',
                  borderRadius: 9999
                }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-accent-teal)' }}>
                68%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Ongoing Live Spotlight Card */}
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
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444'
          }}>
            <Radio size={22} className="animate-pulse" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 800,
                background: '#EF4444',
                color: '#FFFFFF',
                padding: '1px 6px',
                borderRadius: 4
              }}>
                HAPPENING NOW
              </span>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>
                142 Students Live
              </span>
            </div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
              Perspective Drawing in Acrylics
            </h4>
          </div>
        </div>

        <button
          style={{
            background: 'var(--color-accent-teal)',
            color: '#FFFFFF',
            border: 'none',
            padding: '8px 14px',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-teal)',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <span>Join</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

    </div>
  );
}
