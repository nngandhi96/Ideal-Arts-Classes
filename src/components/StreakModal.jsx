import React, { useState } from 'react';
import { 
  Flame, Zap, Trophy, Award, CheckCircle2, Circle, 
  Calendar, Star, ChevronRight, X, Sparkles, Gift
} from 'lucide-react';

export function StreakModal({ isOpen, onClose, language = 'en' }) {
  const [hasClaimedToday, setHasClaimedToday] = useState(false);
  const [xpPoints, setXpPoints] = useState(850);
  const [streakDays, setStreakDays] = useState(7);

  if (!isOpen) return null;

  const isHindi = language === 'hi';

  const daysOfWeek = isHindi 
    ? [
        { day: 'सोम', completed: true },
        { day: 'मंगल', completed: true },
        { day: 'बुध', completed: true },
        { day: 'गुरु', completed: true },
        { day: 'शुक्र', completed: true },
        { day: 'शनि', completed: true },
        { day: 'रवि', completed: true, isToday: true }
      ]
    : [
        { day: 'Mon', completed: true },
        { day: 'Tue', completed: true },
        { day: 'Wed', completed: true },
        { day: 'Thu', completed: true },
        { day: 'Fri', completed: true },
        { day: 'Sat', completed: true },
        { day: 'Sun', completed: true, isToday: true }
      ];

  const handleClaimReward = () => {
    if (hasClaimedToday) return;
    setHasClaimedToday(true);
    setXpPoints(prev => prev + 50);
  };

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div 
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(245, 158, 11, 0.25)'
        }}
      >
        {/* Banner with Glowing Fire */}
        <div style={{
          background: 'linear-gradient(135deg, #FF6B4A 0%, #D97706 100%)',
          padding: '24px 20px',
          color: '#FFFFFF',
          textAlign: 'center',
          position: 'relative'
        }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0, 0, 0, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
          }}>
            <Flame size={38} color="#FFFFFF" />
          </div>

          <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900 }}>
            {streakDays} {isHindi ? 'दिनों की अटूट स्ट्रीक!' : 'Days Continuous Streak!'}
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.9 }}>
            {isHindi ? 'लगातार पढ़ने से बिहार बोर्ड में टॉप 1% रैंक पक्की होती है।' : 'Daily consistent learning puts you in the top 1% state rank.'}
          </p>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          background: '#FAFAFA'
        }}>

          {/* 7-Days Calendar Dots */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
                {isHindi ? 'इस सप्ताह का अध्ययन रिकॉर्ड' : 'This Week Study Tracker'}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: '6px' }}>
                100% {isHindi ? 'सक्रिय' : 'Active'}
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '6px',
              textAlign: 'center'
            }}>
              {daysOfWeek.map((d, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: d.completed ? 'linear-gradient(135deg, #F59E0B 0%, #FF6B4A 100%)' : '#E2E8F0',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: d.completed ? '0 2px 6px rgba(245, 158, 11, 0.3)' : 'none'
                  }}>
                    {d.completed ? <Flame size={18} /> : <Circle size={14} color="#94A3B8" />}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: d.isToday ? '#FF6B4A' : '#64748B' }}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* XP & Rank Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {/* XP Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap size={22} color="#D97706" />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>
                  {isHindi ? 'कुल XP अंक' : 'Total XP Score'}
                </span>
                <span style={{ fontSize: '17px', fontWeight: 900, color: '#0F172A' }}>
                  {xpPoints} XP
                </span>
              </div>
            </div>

            {/* Rank Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#EDE9FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Trophy size={22} color="#7C3AED" />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>
                  {isHindi ? 'बिहार बोर्ड रैंक' : 'State Arts Rank'}
                </span>
                <span style={{ fontSize: '17px', fontWeight: 900, color: '#0F172A' }}>
                  #14 Rank
                </span>
              </div>
            </div>
          </div>

          {/* Daily Goal Checklist */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>
                {isHindi ? '🎯 आज के दैनिक लक्ष्य (2/3 पूर्ण)' : '🎯 Today\'s Study Goals (2/3 Done)'}
              </span>
              <span style={{ fontSize: '11px', color: '#0D9488', fontWeight: 700 }}>
                +70 XP
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#16A34A' }}>
                <CheckCircle2 size={16} />
                <span style={{ textDecoration: 'line-through', color: '#64748B' }}>
                  {isHindi ? '1 लाइव कक्षा अथवा रिकॉर्डेड लेक्चर देखा' : 'Attended 1 Live Class or Lecture'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#16A34A' }}>
                <CheckCircle2 size={16} />
                <span style={{ textDecoration: 'line-through', color: '#64748B' }}>
                  {isHindi ? 'दैनिक 5 वस्तुनिष्ठ VVI क्विज़ हल किया' : 'Solved Daily 5 VVI OMR Quiz'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#0F172A', fontWeight: 600 }}>
                <Circle size={16} color="#D97706" />
                <span>
                  {isHindi ? '1 अध्याय के हस्तलिखित नोट्स पढ़ें (+20 XP)' : 'Read 1 Chapter Handwritten Note (+20 XP)'}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Reward Claim Button */}
          <button
            onClick={handleClaimReward}
            disabled={hasClaimedToday}
            style={{
              background: hasClaimedToday 
                ? '#E2E8F0' 
                : 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
              color: hasClaimedToday ? '#94A3B8' : '#FFFFFF',
              border: 'none',
              borderRadius: '14px',
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: hasClaimedToday ? 'default' : 'pointer',
              boxShadow: hasClaimedToday ? 'none' : '0 6px 18px rgba(13, 148, 136, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <Gift size={18} />
            <span>
              {hasClaimedToday 
                ? (isHindi ? '✅ आज का +50 XP रिवॉर्ड प्राप्त हो चुका है' : '✅ Today\'s +50 XP Reward Claimed')
                : (isHindi ? '🎁 आज का दैनिक रिवॉर्ड प्राप्त करें (+50 XP)' : '🎁 Claim Today\'s Daily Reward (+50 XP)')
              }
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}
