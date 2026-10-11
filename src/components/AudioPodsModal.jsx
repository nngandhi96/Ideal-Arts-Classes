import React, { useState, useEffect } from 'react';
import { 
  Headphones, Play, Pause, RotateCcw, FastForward, 
  Volume2, Clock, Sparkles, BookOpen, X, Download, 
  Check, FileText, ChevronRight
} from 'lucide-react';

const AUDIO_TRACKS = [
  {
    id: 1,
    subject: "History",
    subjectHi: "इतिहास",
    title: "5 मिनट में हड़प्पा सभ्यता की नगर योजना एवं पतन",
    titleEn: "5-Min Capsule: Harappan Town Planning & Fall",
    speaker: "आचार्य विद्याधर झा",
    duration: "04:50",
    totalSeconds: 290,
    summary: "हड़प्पा सभ्यता की ग्रिड प्रणाली, उन्नत नालियां, विशाल स्नानागार तथा संभावित पतन के 4 मुख्य कारण (बाढ़, जलवायु परिवर्तन, आर्य आक्रमण का खंडन)।",
    summaryEn: "Grid road networks, covered drainage, the Great Bath, and the 4 verified theories on the civilization's gradual decline.",
    bulletPoints: [
      "सड़कें समकोण पर काटती थीं (ग्रिड पद्धति)।",
      "मोहनजोदड़ो में विशाल स्नानागार (जिप्सम लेपित)।",
      "पतन के कारण: नदियों का मार्ग बदलना, वनों का विनाश, बाढ़।"
    ],
    bulletPointsEn: [
      "Roads intersected at 90-degree angles (Grid plan).",
      "Mohenjo-daro Great Bath lined with waterproof gypsum.",
      "Collapse factors: shifting river courses, deforestation, flood."
    ]
  },
  {
    id: 2,
    subject: "Pol Science",
    subjectHi: "राजनीति शास्त्र",
    title: "संविधान की प्रस्तावना एवं 6 मौलिक अधिकार",
    titleEn: "5-Min Capsule: Preamble & 6 Fundamental Rights",
    speaker: "प्रोफेसर आर. के. शर्मा",
    duration: "05:12",
    totalSeconds: 312,
    summary: "हम भारत के लोग से लेकर 42वें संशोधन (समाजवादी, पंथनिरपेक्ष, अखंडता) और अनुच्छेद 12 से 35 तक के 6 मौलिक अधिकारों का त्वरित रिवीजन।",
    summaryEn: "From 'We the People' to the 42nd Amendment insertions and rapid memorization of Articles 12 to 35.",
    bulletPoints: [
      "प्रस्तावना संविधान की आत्मा है (के.एम. मुंशी)।",
      "42वें संशोधन (1976) में 3 नए शब्द जोड़े गए।",
      "अनुच्छेद 32: संवैधानिक उपचारों का अधिकार (संविधान का हृदय व आत्मा)।"
    ],
    bulletPointsEn: [
      "Preamble is the identity card of the constitution.",
      "42nd Amendment (1976) added Socialist, Secular, Integrity.",
      "Article 32: Right to Constitutional Remedies."
    ]
  },
  {
    id: 3,
    subject: "Geography",
    subjectHi: "भूगोल",
    title: "भारत में जनसंख्या का घनत्व एवं प्रवास (Migration)",
    titleEn: "5-Min Capsule: Population Density & Migration",
    speaker: "डॉ. अलका सहाय",
    duration: "04:35",
    totalSeconds: 275,
    summary: "बिहार का जनसंख्या घनत्व (1106), प्रवास के प्रतिकर्ष (Push) एवं अपकर्ष (Pull) कारक तथा बोर्ड परीक्षा में आने वाले प्रमुख सांख्यिकी बिंदु।",
    summaryEn: "Bihar's population density (1106), Push vs Pull migration drivers, and high-frequency census data.",
    bulletPoints: [
      "सर्वाधिक घनत्व वाला राज्य: बिहार (1106/वर्ग किमी)।",
      "प्रतिकर्ष कारक (Push): बेरोजगारी, प्राकृतिक आपदा, गरीबी।",
      "अपकर्ष कारक (Pull): बेहतर रोजगार, शिक्षा, स्वास्थ्य सुविधाएं।"
    ],
    bulletPointsEn: [
      "Highest density state: Bihar (1106 per sq km).",
      "Push factors: unemployment, agrarian distress, floods.",
      "Pull factors: industrial wages, universities, healthcare."
    ]
  },
  {
    id: 4,
    subject: "Hindi",
    subjectHi: "हिन्दी",
    title: "दिगंत भाग 2: बालकृष्ण भट्ट का 'बातचीत' निबंध सारांश",
    titleEn: "5-Min Capsule: Balkrishna Bhatt's 'Baatchit'",
    speaker: "पं. विद्याधर शास्त्री",
    duration: "03:58",
    totalSeconds: 238,
    summary: "बातचीत निबंध का केंद्रीय भाव, एडिसन का मत (सच बातचीत केवल दो में), बेन जॉनसन का मत (बोलने से ही रूप का साक्षात्कार), और अवाक बातचीत।",
    summaryEn: "Central theme of the essay, Addison's hypothesis, Ben Jonson's quote, and conversational introspection.",
    bulletPoints: [
      "एडिसन: असली बातचीत सिर्फ दो व्यक्तियों में हो सकती है।",
      "बेन जॉनसन: बोलने से ही मनुष्य के रूप का साक्षात्कार होता है।",
      "उत्तम तरीका: अपने आप से बात करने की शक्ति विकसित करना।"
    ],
    bulletPointsEn: [
      "Addison: True exchange occurs strictly between two souls.",
      "Ben Jonson: Speech alone reveals true character.",
      "Highest virtue: Inner monologue and self-restraint."
    ]
  }
];

export function AudioPodsModal({ isOpen, onClose, language = 'en' }) {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSeconds, setCurrentSeconds] = useState(65);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showNotes, setShowNotes] = useState(true);

  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const track = AUDIO_TRACKS[activeTrackIndex];

  // Simulated audio progress timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds(prev => {
          if (prev >= track.totalSeconds) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, track]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const speeds = [1.0, 1.25, 1.5, 2.0];

  const handleNextSpeed = () => {
    const currIdx = speeds.indexOf(playbackSpeed);
    const nextIdx = (currIdx + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const handleTrackChange = (idx) => {
    setActiveTrackIndex(idx);
    setCurrentSeconds(0);
    setIsPlaying(true);
  };

  const progressPercent = Math.min(100, (currentSeconds / track.totalSeconds) * 100);

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
          maxWidth: '620px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(13, 148, 136, 0.2)'
        }}
      >
        {/* Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          padding: '18px 24px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #0D9488'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
            }}>
              <Headphones size={22} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                  {isHindi ? '5-मिनट ऑडियो रिवीज़न पॉड्स' : '5-Min Audio Revision Pods'}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#CBD5E1', marginTop: '2px' }}>
                {isHindi ? 'चलते-फिरते या सोने से पहले पूरा चैप्टर 5 मिनट में सुनें' : 'Listen and revise key Arts chapters on the go or before sleep'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Player Body */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: '#F8FAFC'
        }}>

          {/* Active Audio Player Visualizer Box */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '20px',
            padding: '22px 20px',
            color: '#FFFFFF',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Top Tag & Speaker */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                background: '#0D9488',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '9999px',
                textTransform: 'uppercase'
              }}>
                {isHindi ? track.subjectHi : track.subject}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94A3B8' }}>
                <Clock size={13} />
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Title & Instructor */}
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 800, lineHeight: 1.35 }}>
                {isHindi ? track.title : (track.titleEn || track.title)}
              </h4>
              <span style={{ fontSize: '12.5px', color: '#2DD4BF', fontWeight: 600 }}>
                {isHindi ? `स्वर: ${track.speaker}` : `Narration: ${track.speaker}`}
              </span>
            </div>

            {/* Animated Sound Waves Visualizer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              height: '36px',
              padding: '0 20px'
            }}>
              {[18, 30, 12, 24, 34, 16, 28, 36, 20, 32, 14, 26, 35, 18, 28, 12].map((height, i) => (
                <div 
                  key={i}
                  style={{
                    width: '3.5px',
                    height: isPlaying ? `${height}px` : '6px',
                    backgroundColor: i % 2 === 0 ? '#2DD4BF' : '#0D9488',
                    borderRadius: '9999px',
                    transition: 'height 0.25s ease'
                  }}
                />
              ))}
            </div>

            {/* Seek Bar */}
            <div>
              <div 
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setCurrentSeconds(Math.floor(ratio * track.totalSeconds));
                }}
              >
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 100%)',
                  borderRadius: '9999px'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: '#94A3B8' }}>
                <span>{formatTime(currentSeconds)}</span>
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Playback speed pill */}
              <button
                onClick={handleNextSpeed}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {playbackSpeed}x
              </button>

              {/* Main Play/Pause */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setCurrentSeconds(prev => Math.max(0, prev - 15))}
                  title="-15s"
                  style={{
                    background: 'transparent',
                    color: '#CBD5E1',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <RotateCcw size={20} />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(13, 148, 136, 0.4)'
                  }}
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 2 }} />}
                </button>

                <button
                  onClick={() => setCurrentSeconds(prev => Math.min(track.totalSeconds, prev + 15))}
                  title="+15s"
                  style={{
                    background: 'transparent',
                    color: '#CBD5E1',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FastForward size={20} />
                </button>
              </div>

              {/* Toggle Notes */}
              <button
                onClick={() => setShowNotes(!showNotes)}
                style={{
                  background: showNotes ? '#0D9488' : 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <FileText size={13} />
                <span>{isHindi ? 'नोट्स' : 'Notes'}</span>
              </button>
            </div>
          </div>

          {/* Quick Track Selection Playlist */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              {isHindi ? '🎧 अन्य महत्वपूर्ण ऑडियो कैप्सूल' : '🎧 Other High Priority Audio Capsules'}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              {AUDIO_TRACKS.map((t, idx) => {
                const isSelected = activeTrackIndex === idx;
                return (
                  <div
                    key={t.id}
                    onClick={() => handleTrackChange(idx)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '1.5px solid #0D9488' : '1px solid #E2E8F0',
                      background: isSelected ? '#F0FDFA' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isSelected ? '#0D9488' : '#F1F5F9',
                        color: isSelected ? '#FFFFFF' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '12px'
                      }}>
                        {isSelected && isPlaying ? <Headphones size={16} /> : idx + 1}
                      </div>
                      <div>
                        <h5 style={{ margin: 0, fontSize: '13px', fontWeight: isSelected ? 800 : 600, color: '#0F172A' }}>
                          {isHindi ? t.title : (t.titleEn || t.title)}
                        </h5>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>
                          {isHindi ? t.subjectHi : t.subject} • {t.duration}
                        </span>
                      </div>
                    </div>

                    <ChevronRight size={16} color={isSelected ? '#0D9488' : '#94A3B8'} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Notes Dropdown if active */}
          {showNotes && (
            <div style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '14px 16px',
              border: '1px solid #E2E8F0'
            }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0D9488', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                {isHindi ? '📝 इस कैप्सूल के मुख्य परीक्षा बिंदु:' : '📝 Capsule Core Board Takeaways:'}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {(isHindi ? track.bulletPoints : (track.bulletPointsEn || track.bulletPoints)).map((bp, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12.5px', color: '#334155' }}>
                    <span style={{ color: '#0D9488' }}>✓</span>
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
