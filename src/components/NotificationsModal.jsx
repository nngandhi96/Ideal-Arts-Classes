import React from 'react';
import { Bell, X, CheckCircle, Radio, Award, BookOpen } from 'lucide-react';

export function NotificationsModal({ onClose }) {
  const notifications = [
    {
      id: 1,
      title: '🔴 Perspective Drawing Class Started',
      desc: 'Prof. Ramesh Kulkarni is live in Studio 1. Join to learn vanishing points.',
      time: '25m ago',
      type: 'live',
      unread: true
    },
    {
      id: 2,
      title: '🎨 Assignment Graded: Portrait Shading',
      desc: 'Your submission scored 9.5/10. Instructor note: "Excellent cross-hatch depth around the jawline."',
      time: '3 hours ago',
      type: 'grade',
      unread: true
    },
    {
      id: 3,
      title: '📚 New PDF Guide Uploaded',
      desc: '"Classical Color Theory & Pigment Chemistry" is now available in your Library.',
      time: 'Yesterday',
      type: 'library',
      unread: false
    }
  ];

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 85,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="art-card animate-fade-in" style={{
        width: '100%',
        maxHeight: '90%',
        borderRadius: 20,
        background: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={18} color="var(--color-accent-teal)" />
            <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
              Notifications
            </h3>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              background: '#EF4444',
              color: '#FFFFFF',
              padding: '1px 6px',
              borderRadius: 9999
            }}>
              2 New
            </span>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: 4
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '12px 14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {notifications.map(n => (
            <div 
              key={n.id}
              style={{
                padding: '12px',
                borderRadius: 12,
                background: n.unread ? 'var(--color-accent-teal-tint)' : 'var(--bg-surface-subtle)',
                border: n.unread ? '1px solid rgba(13, 148, 136, 0.3)' : '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {n.title}
                </h4>
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{n.time}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {n.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-accent-teal)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
