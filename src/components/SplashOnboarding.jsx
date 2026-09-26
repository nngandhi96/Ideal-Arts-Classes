import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Phone, CheckCircle2, 
  Palette, Video, Award, ChevronRight, RefreshCw, BookOpen, Target, Landmark
} from 'lucide-react';

export function SplashOnboarding({ onFinishAuth }) {
  const [step, setStep] = useState('splash'); // 'splash' | 'onboarding' | 'phone_auth' | 'otp_verify'
  const [activeSlide, setActiveSlide] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState(['5', '8', '2', '4', '1', '9']);
  const [isVerifying, setIsVerifying] = useState(false);

  const slides = [
    {
      title: "बिहार बोर्ड कला संकाय का नंबर #1 संस्थान",
      subtitle: "कक्षा 11वीं एवं 12वीं के इतिहास, भूगोल, राजनीति विज्ञान, अर्थशास्त्र और सभी 8 विषयों की सम्पूर्ण तैयारी।",
      tag: "Bihar Board Arts Special",
      icon: Landmark,
      color: "#0D9488"
    },
    {
      title: "ऑब्जेक्टिव (50 Marks) & विषयनिष्ठ विशेष नोट्स",
      subtitle: "100% सटीक VVI MCQs, OMR टेस्ट सीरीज़ और 2 व 5 अंकों वाले प्रश्नों के लिए हस्तलिखित उत्तर पुस्तिका।",
      tag: "50/50 Target Strategy",
      icon: Target,
      color: "#F59E0B"
    },
    {
      title: "लाइव लेक्चर्स और डिजिटल लाइब्रेरी",
      subtitle: "विशेषज्ञ शिक्षकों द्वारा लाइव कक्षाएं, रिकॉर्डिंग और हाई-क्वालिटी डाउनलोडेबल PDF नोट्स कभी भी, कहीं भी।",
      tag: "कला ज्ञानं जीवनम्",
      icon: BookOpen,
      color: "#10B981"
    }
  ];

  // Auto transition from splash to onboarding if user clicks or waits
  const handleStartOnboarding = () => {
    setStep('onboarding');
  };

  const handleNextSlide = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(prev => prev + 1);
    } else {
      setStep('phone_auth');
    }
  };

  const handleSendOtp = (e) => {
    e?.preventDefault();
    if (phoneNumber.length >= 10) {
      setStep('otp_verify');
    }
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onFinishAuth();
    }, 900);
  };

  /* ---------------- Splash Screen ---------------- */
  if (step === 'splash') {
    return (
      <div 
        onClick={handleStartOnboarding}
        style={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px 24px 36px',
          background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
          color: '#FFFFFF',
          cursor: 'pointer',
          userSelect: 'none',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Ambient background rings */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1px solid rgba(13, 148, 136, 0.25)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none'
        }} />

        <div style={{ height: 20 }} />

        {/* Center Logo & Branding */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 2
        }}>
          <div style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: '#FFFFFF',
            padding: 6,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(13, 148, 136, 0.4)',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/logo.svg" 
              alt="Ideal Arts Classes Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <h1 style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: '#FFFFFF',
            fontFamily: 'var(--font-sans)',
            marginBottom: 6
          }}>
            IDEAL ARTS CLASSES
          </h1>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 18px',
            background: 'rgba(13, 148, 136, 0.25)',
            border: '1px solid rgba(45, 212, 191, 0.4)',
            borderRadius: 9999,
            marginTop: 6
          }}>
            <Sparkles size={14} color="#2DD4BF" />
            <span className="devanagari-tagline" style={{
              fontSize: 15,
              color: '#2DD4BF',
              fontWeight: 700
            }}>
              कला ज्ञानं जीवनम्
            </span>
          </div>

          <p style={{
            fontSize: 13,
            color: '#94A3B8',
            marginTop: 14,
            maxWidth: 260,
            lineHeight: 1.5
          }}>
            Premier Fine Arts Institute & Digital Academy
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 2 }}>
          <button
            onClick={handleStartOnboarding}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 700
            }}
          >
            <span>Explore Academy</span>
            <ArrowRight size={18} />
          </button>
          
          <span style={{ fontSize: 11, color: '#64748B' }}>
            Tap anywhere to proceed
          </span>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 12px',
            borderRadius: 9999,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginTop: 2
          }}>
            <span style={{ fontSize: 11, color: '#94A3B8', letterSpacing: '0.04em' }}>
              Powered by <strong style={{ color: '#2DD4BF', fontWeight: 700 }}>MMV</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Onboarding Carousel ---------------- */
  if (step === 'onboarding') {
    const slide = slides[activeSlide];
    const IconComponent = slide.icon;

    return (
      <div style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px 24px',
        background: 'var(--bg-app)'
      }}>
        {/* Header Skip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo.svg" alt="logo" style={{ width: 28, height: 28 }} />
            <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary)' }}>IDEAL ARTS</span>
          </div>
          <button 
            onClick={() => setStep('phone_auth')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-accent-teal)',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            Skip
          </button>
        </div>

        {/* Slide Visual Card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          margin: '20px 0'
        }}>
          <div style={{
            width: '100%',
            height: 240,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${slide.color}15 0%, ${slide.color}05 100%)`,
            border: `1.5px solid ${slide.color}30`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: 28,
            overflow: 'hidden'
          }}>
            <div style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: slide.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: `0 12px 24px ${slide.color}40`,
              marginBottom: 12
            }}>
              <IconComponent size={44} />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--bg-surface)',
              padding: '6px 14px',
              borderRadius: 9999,
              boxShadow: 'var(--shadow-sm)',
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}>
              <Sparkles size={14} color={slide.color} />
              {slide.tag}
            </div>
          </div>

          <h2 style={{
            fontSize: 20,
            fontWeight: 800,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            marginBottom: 10,
            lineHeight: 1.3
          }}>
            {slide.title}
          </h2>

          <p style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 320
          }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Slide Indicators & Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {slides.map((_, idx) => (
              <div 
                key={idx}
                style={{
                  width: activeSlide === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 9999,
                  background: activeSlide === idx ? 'var(--color-accent-teal)' : 'var(--border-subtle)',
                  transition: 'all 0.25s ease'
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 700
            }}
          >
            <span>{activeSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- Phone Authentication ---------------- */
  if (step === 'phone_auth') {
    return (
      <div style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px 20px 24px',
        background: 'var(--bg-app)'
      }}>
        <div>
          {/* Brand header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <img src="/logo.svg" alt="logo" style={{ width: 44, height: 44 }} />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                IDEAL ARTS CLASSES
              </h3>
              <span className="devanagari-tagline" style={{ fontSize: 12, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
                कला ज्ञानं जीवनम्
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
            Welcome to Art Portal
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
            Enter your registered mobile number to access live studios, study material & assignments.
          </p>

          <form onSubmit={handleSendOtp}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
              Student Mobile Number
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: 14,
              padding: '4px 14px',
              marginBottom: 16,
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                paddingRight: 10,
                borderRight: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: 14
              }}>
                <span style={{ fontSize: 16 }}>🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="tel"
                maxLength="10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 10-digit number"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '12px 12px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  background: 'transparent'
                }}
              />
              <Phone size={18} color="var(--text-tertiary)" />
            </div>

            <div style={{
              background: 'var(--color-accent-teal-tint)',
              border: '1px solid rgba(13, 148, 136, 0.25)',
              borderRadius: 12,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              marginBottom: 20
            }}>
              <ShieldCheck size={18} color="var(--color-accent-teal)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Instant OTP verification for enrolled students of Ideal Arts Academy.
              </span>
            </div>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={handleSendOtp}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: 14, fontSize: 15, fontWeight: 700 }}
          >
            <span>Get OTP Verification Code</span>
            <ChevronRight size={18} />
          </button>
          <span style={{ fontSize: 11, textAlign: 'center', color: 'var(--text-tertiary)' }}>
            By continuing, you agree to Ideal Arts Terms of Service & Privacy Policy
          </span>
        </div>
      </div>
    );
  }

  /* ---------------- OTP Verification ---------------- */
  return (
    <div style={{
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '28px 20px 24px',
      background: 'var(--bg-app)'
    }}>
      <div>
        <button 
          onClick={() => setStep('phone_auth')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-accent-teal)',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          ← Change Number
        </button>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
          Verify OTP Code
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
          Enter the 6-digit code sent to <strong style={{ color: 'var(--text-primary)' }}>+91 {phoneNumber}</strong>
        </p>

        {/* 6-box OTP Input Demo */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', marginBottom: 24 }}>
          {otp.map((digit, index) => (
            <div
              key={index}
              style={{
                width: 44,
                height: 52,
                borderRadius: 12,
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--color-accent-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--color-primary-navy)',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              {digit}
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 12
        }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Didn't receive code?
          </span>
          <button 
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-accent-teal)',
              fontWeight: 700,
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={12} />
            Resend (00:45)
          </button>
        </div>
      </div>

      <button
        onClick={handleVerifyOtp}
        disabled={isVerifying}
        className="btn-primary"
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: 14,
          fontSize: 15,
          fontWeight: 700,
          opacity: isVerifying ? 0.7 : 1
        }}
      >
        {isVerifying ? (
          <span>Verifying Credentials...</span>
        ) : (
          <>
            <CheckCircle2 size={18} />
            <span>Verify & Enter Academy</span>
          </>
        )}
      </button>
    </div>
  );
}
