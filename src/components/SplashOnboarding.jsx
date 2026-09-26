import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Phone, CheckCircle2, 
  ChevronRight, RefreshCw, BookOpen, Target, Landmark, Languages, Check
} from 'lucide-react';
import { translations } from '../data/translations';

export function SplashOnboarding({ onFinishAuth, language = 'en', onSelectLanguage }) {
  // Steps: 'splash' | 'language_select' | 'onboarding' | 'phone_auth' | 'otp_verify'
  const [step, setStep] = useState('splash');
  const [activeSlide, setActiveSlide] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp] = useState(['5', '8', '2', '4', '1', '9']);
  const [isVerifying, setIsVerifying] = useState(false);

  const t = translations[language] || translations.en;

  const slidesEn = [
    {
      title: "Bihar Board Arts Faculty #1 Premier Institute",
      subtitle: "Comprehensive curriculum for Classes 11th & 12th covering History, Political Science, Geography, Economics and all 8 subjects.",
      tag: "Bihar Board Arts Special",
      icon: Landmark,
      color: "#0D9488"
    },
    {
      title: "Objective (50 Marks) & Subjective Specialized Notes",
      subtitle: "100% verified VVI MCQs, OMR test series, and handwritten answer sheets for 2 and 5 marks questions.",
      tag: "50/50 Target Strategy",
      icon: Target,
      color: "#F59E0B"
    },
    {
      title: "Live Lectures & Digital Study Library",
      subtitle: "Live classes by master mentors, recorded video archives and downloadable high-quality PDF notes anytime, anywhere.",
      tag: "Excellence in Arts",
      icon: BookOpen,
      color: "#10B981"
    }
  ];

  const slidesHi = [
    {
      title: "बिहार बोर्ड कला संकाय का नंबर #1 संस्थान",
      subtitle: "कक्षा 11वीं एवं 12वीं के इतिहास, भूगोल, राजनीति विज्ञान, अर्थशास्त्र और सभी 8 विषयों की सम्पूर्ण तैयारी।",
      tag: "बिहार बोर्ड कला संकाय विशेष",
      icon: Landmark,
      color: "#0D9488"
    },
    {
      title: "ऑब्जेक्टिव (50 अंक) & विषयनिष्ठ विशेष नोट्स",
      subtitle: "100% सटीक VVI MCQs, OMR टेस्ट सीरीज़ और 2 व 5 अंकों वाले प्रश्नों के लिए हस्तलिखित उत्तर पुस्तिका।",
      tag: "50/50 लक्ष्य रणनीति",
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

  const currentSlides = language === 'hi' ? slidesHi : slidesEn;

  const handleStartFromSplash = () => {
    // Go directly to language selection so student can select preferred language right at login!
    setStep('language_select');
  };

  const handleLanguageChosen = (selectedLang) => {
    if (onSelectLanguage) {
      onSelectLanguage(selectedLang);
    }
  };

  const handleProceedFromLanguage = () => {
    setStep('phone_auth');
  };

  const handleNextSlide = () => {
    if (activeSlide < currentSlides.length - 1) {
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
    }, 800);
  };

  /* ---------------- 1. Splash Screen ---------------- */
  if (step === 'splash') {
    return (
      <div 
        onClick={handleStartFromSplash}
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
            <span style={{
              fontSize: 14,
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
            maxWidth: 280,
            lineHeight: 1.5
          }}>
            Premier Fine Arts Institute & Digital Academy
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 2 }}>
          <button
            onClick={handleStartFromSplash}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 700
            }}
          >
            <span>{t.auth.exploreBtn}</span>
            <ArrowRight size={18} />
          </button>
          
          <span style={{ fontSize: 11, color: '#64748B' }}>
            {t.auth.tapToProceed}
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

  /* ---------------- 2. Language Selection Screen (Requested by User) ---------------- */
  if (step === 'language_select') {
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
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/logo.svg" alt="logo" style={{ width: 36, height: 36 }} />
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  IDEAL ARTS
                </h3>
                <span style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
                  कला ज्ञानं जीवनम्
                </span>
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 10px',
              borderRadius: 9999,
              background: 'var(--color-accent-teal-tint)',
              border: '1px solid rgba(13, 148, 136, 0.25)',
              color: 'var(--color-accent-teal)',
              fontSize: 11,
              fontWeight: 700
            }}>
              <Languages size={13} />
              <span>Step 1 of 2</span>
            </div>
          </div>

          <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>
            {t.auth.selectLanguageTitle}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
            {t.auth.selectLanguageSub}
          </p>

          {/* Interactive Language Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            
            {/* English Card */}
            <div 
              onClick={() => handleLanguageChosen('en')}
              style={{
                padding: '16px 18px',
                borderRadius: 16,
                border: language === 'en' 
                  ? '2px solid var(--color-accent-teal)' 
                  : '1.5px solid var(--border-subtle)',
                background: language === 'en' 
                  ? 'linear-gradient(135deg, rgba(13, 148, 136, 0.12) 0%, rgba(45, 212, 191, 0.05) 100%)' 
                  : 'var(--bg-surface)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: language === 'en' ? '0 6px 16px rgba(13, 148, 136, 0.15)' : 'var(--shadow-xs)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: language === 'en' ? 'var(--color-accent-teal)' : 'var(--bg-surface-subtle)',
                  color: language === 'en' ? '#FFFFFF' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 800
                }}>
                  🇬🇧
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      English
                    </h4>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: 'rgba(13, 148, 136, 0.15)',
                      color: 'var(--color-accent-teal)',
                      padding: '2px 8px',
                      borderRadius: 9999
                    }}>
                      English Medium
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0', lineHeight: 1.3 }}>
                    Display app menus, syllabus, and study notes in clean English.
                  </p>
                </div>
              </div>

              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: language === 'en' ? 'none' : '2px solid var(--border-subtle)',
                background: language === 'en' ? 'var(--color-accent-teal)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                {language === 'en' && <Check size={14} strokeWidth={3} />}
              </div>
            </div>

            {/* Hindi Card */}
            <div 
              onClick={() => handleLanguageChosen('hi')}
              style={{
                padding: '16px 18px',
                borderRadius: 16,
                border: language === 'hi' 
                  ? '2px solid var(--color-accent-teal)' 
                  : '1.5px solid var(--border-subtle)',
                background: language === 'hi' 
                  ? 'linear-gradient(135deg, rgba(13, 148, 136, 0.12) 0%, rgba(45, 212, 191, 0.05) 100%)' 
                  : 'var(--bg-surface)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: language === 'hi' ? '0 6px 16px rgba(13, 148, 136, 0.15)' : 'var(--shadow-xs)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: language === 'hi' ? 'var(--color-accent-teal)' : 'var(--bg-surface-subtle)',
                  color: language === 'hi' ? '#FFFFFF' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 800
                }}>
                  🇮🇳
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      हिन्दी (Hindi)
                    </h4>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#D97706',
                      padding: '2px 8px',
                      borderRadius: 9999
                    }}>
                      बिहार बोर्ड विशेष
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0', lineHeight: 1.3 }}>
                    कला संकाय के सभी 8 विषयों के विस्तृत नोट्स एवं इंटरफ़ेस हिंदी में।
                  </p>
                </div>
              </div>

              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: language === 'hi' ? 'none' : '2px solid var(--border-subtle)',
                background: language === 'hi' ? 'var(--color-accent-teal)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                {language === 'hi' && <Check size={14} strokeWidth={3} />}
              </div>
            </div>

          </div>
        </div>

        {/* Continue Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={handleProceedFromLanguage}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: 14, fontSize: 15, fontWeight: 700 }}
          >
            <span>{t.common.continue}</span>
            <ArrowRight size={18} />
          </button>
          
          <button
            onClick={() => setStep('onboarding')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'center',
              padding: '4px'
            }}
          >
            {language === 'hi' ? 'अकादमी की विशेषताएं देखें' : 'View Academy Highlights'}
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- 3. Onboarding Carousel ---------------- */
  if (step === 'onboarding') {
    const slide = currentSlides[activeSlide];
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
        {/* Header Skip & Language Quick Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo.svg" alt="logo" style={{ width: 28, height: 28 }} />
            <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary)' }}>IDEAL ARTS</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => handleLanguageChosen(language === 'en' ? 'hi' : 'en')}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 9999,
                padding: '3px 8px',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--color-accent-teal)',
                cursor: 'pointer'
              }}
            >
              {language === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}
            </button>

            <button 
              onClick={() => setStep('phone_auth')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              {t.auth.skip}
            </button>
          </div>
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
            height: 230,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${slide.color}15 0%, ${slide.color}05 100%)`,
            border: `1.5px solid ${slide.color}30`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: 24,
            overflow: 'hidden'
          }}>
            <div style={{
              width: 86,
              height: 86,
              borderRadius: '50%',
              background: slide.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: `0 12px 24px ${slide.color}40`,
              marginBottom: 12
            }}>
              <IconComponent size={42} />
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
            fontSize: 19,
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
            {currentSlides.map((_, idx) => (
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
            <span>{activeSlide === currentSlides.length - 1 ? t.auth.getStarted : t.auth.next}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- 4. Phone Authentication Screen ---------------- */
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
          {/* Brand header with Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="/logo.svg" alt="logo" style={{ width: 40, height: 40 }} />
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  IDEAL ARTS CLASSES
                </h3>
                <span style={{ fontSize: 12, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
                  कला ज्ञानं जीवनम्
                </span>
              </div>
            </div>

            {/* Quick Language Toggle Pill */}
            <button
              onClick={() => handleLanguageChosen(language === 'en' ? 'hi' : 'en')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 9999,
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--color-accent-teal)',
                cursor: 'pointer'
              }}
              title="Change Language"
            >
              <Languages size={13} />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>
          </div>

          <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
            {t.auth.title}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
            {t.auth.subtitle}
          </p>

          <form onSubmit={handleSendOtp}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
              {t.auth.mobileLabel}
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
                placeholder={t.auth.mobilePlaceholder}
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
                {t.auth.otpHelper}
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
            <span>{t.auth.getOtpBtn}</span>
            <ChevronRight size={18} />
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => setStep('language_select')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-accent-teal)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Languages size={13} />
              <span>{t.auth.selectLanguageTitle} ({language === 'en' ? 'English' : 'हिन्दी'})</span>
            </button>
          </div>

          <span style={{ fontSize: 11, textAlign: 'center', color: 'var(--text-tertiary)' }}>
            {t.auth.termsNotice}
          </span>
        </div>
      </div>
    );
  }

  /* ---------------- 5. OTP Verification Screen ---------------- */
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
          ← {t.auth.changeNumber}
        </button>

        <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
          {t.auth.verifyTitle}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
          {t.auth.verifySub} <strong style={{ color: 'var(--text-primary)' }}>+91 {phoneNumber}</strong>
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
            {t.auth.didntReceive}
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
            {t.auth.resendCode} (00:45)
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
          <span>{t.auth.verifying}</span>
        ) : (
          <>
            <CheckCircle2 size={18} />
            <span>{t.auth.verifyBtn}</span>
          </>
        )}
      </button>
    </div>
  );
}
