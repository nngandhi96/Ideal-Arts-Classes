import React, { useState } from 'react';
import { 
  Sparkles, RotateCw, Check, X, ChevronLeft, ChevronRight, 
  Layers, Award, CheckCircle2, RefreshCw
} from 'lucide-react';

const FLASHCARDS_DATA = [
  {
    id: 1,
    subject: "History",
    subjectHi: "इतिहास",
    question: "हड़प्पा सभ्यता की सर्वप्रथम खोज किसने और कब की थी?",
    questionEn: "Who discovered Harappa first and in which year?",
    answer: "1921 ई. में रायबहादुर दयाराम साहनी ने (सर जॉन मार्शल के निर्देशन में)।",
    answerEn: "In 1921 by Rai Bahadur Daya Ram Sahni under the guidance of Sir John Marshall.",
    keyFact: "स्थान: मोंटगोमरी जिला (पंजाब, वर्तमान पाकिस्तान) रावी नदी के तट पर।",
    keyFactEn: "Location: Banks of Ravi River in Montgomery district (now in Pakistan)."
  },
  {
    id: 2,
    subject: "History",
    subjectHi: "इतिहास",
    question: "बिहार में 1857 की क्रांति का नेतृत्व किसने किया था?",
    questionEn: "Who led the 1857 revolt in Bihar?",
    answer: "जगदीशपुर (भोजपुर) के वीर कुंवर सिंह ने।",
    answerEn: "Veer Kunwar Singh of Jagdishpur (Bhojpur).",
    keyFact: "80 वर्ष की उम्र में अंग्रेजों को कई युद्धों में पराजित किया और आरा पर अधिकार किया।",
    keyFactEn: "Defeated British forces and liberated Arrah at the age of 80."
  },
  {
    id: 3,
    subject: "Pol Science",
    subjectHi: "राजनीति शास्त्र",
    question: "भारतीय संविधान सभा की प्रथम बैठक कब आयोजित हुई थी?",
    questionEn: "When was the first meeting of the Constituent Assembly held?",
    answer: "9 दिसंबर 1946 (अस्थायी अध्यक्ष: डॉ. सच्चिदानंद सिन्हा)।",
    answerEn: "9 December 1946 (Interim President: Dr. Sachchidananda Sinha).",
    keyFact: "11 दिसंबर 1946 को डॉ. राजेन्द्र प्रसाद स्थायी अध्यक्ष चुने गए।",
    keyFactEn: "On 11 December 1946, Dr. Rajendra Prasad was elected permanent President."
  },
  {
    id: 4,
    subject: "History",
    subjectHi: "इतिहास",
    question: "प्रयाग प्रशस्ति (इलाहाबाद स्तंभ लेख) की रचना किसने की थी?",
    questionEn: "Who composed the Prayag Prashasti (Allahabad Pillar inscription)?",
    answer: "गुप्त सम्राट समुद्रगुप्त के दरबारी कवि 'हरिषेण' ने संस्कृत भाषा में।",
    answerEn: "Harishena, court poet of Gupta Emperor Samudragupta, in classical Sanskrit.",
    keyFact: "इसमें समुद्रगुप्त की दिग्विजयों का विस्तृत वर्णन मिलता है (भारत का नेपोलियन)।",
    keyFactEn: "Details Samudragupta's extensive military campaigns (often termed Napoleon of India)."
  },
  {
    id: 5,
    subject: "Pol Science",
    subjectHi: "राजनीति शास्त्र",
    question: "संविधान के किस अनुच्छेद को डॉ. अंबेडकर ने 'संविधान की आत्मा' कहा?",
    questionEn: "Which Article did Dr. Ambedkar call the 'Heart and Soul of the Constitution'?",
    answer: "अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार)।",
    answerEn: "Article 32 (Right to Constitutional Remedies).",
    keyFact: "इसके अंतर्गत मौलिक अधिकारों की रक्षा हेतु 5 प्रकार की रिटें (Writs) जारी की जाती हैं।",
    keyFactEn: "Empowers the Supreme Court to issue 5 types of constitutional writs."
  },
  {
    id: 6,
    subject: "Geography",
    subjectHi: "भूगोल",
    question: "2011 की जनगणना के अनुसार भारत में सर्वाधिक जनसंख्या घनत्व वाला राज्य कौन सा है?",
    questionEn: "According to the 2011 Census, which state has the highest population density?",
    answer: "बिहार (1,106 व्यक्ति प्रति वर्ग किलोमीटर)।",
    answerEn: "Bihar (1,106 persons per square kilometre).",
    keyFact: "जबकि सबसे कम जनसंख्या घनत्व वाला राज्य अरुणाचल प्रदेश (17 व्यक्ति/वर्ग किमी) है।",
    keyFactEn: "Arunachal Pradesh has the lowest density (17 persons per sq km)."
  }
];

export function FlashcardsModal({ isOpen, onClose, language = 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const card = FLASHCARDS_DATA[currentIndex];
  const totalCards = FLASHCARDS_DATA.length;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + totalCards) % totalCards);
  };

  const handleMarkMastered = () => {
    setMasteredCount(prev => Math.min(totalCards, prev + 1));
    handleNext();
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
          maxWidth: '560px',
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
              <Layers size={22} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                  {isHindi ? '1-स्वाइप फ्लैशकार्ड्स' : '1-Swipe Rapid Flashcards'}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#CBD5E1', marginTop: '2px' }}>
                {isHindi ? 'महत्वपूर्ण वर्ष, लेखक एवं परिभाषाएं चुटकियों में याद करें' : 'Memorize high-scoring dates, authors & definitions instantly'}
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

        {/* Body Content */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: '#F8FAFC'
        }}>

          {/* Progress Tracker */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
              {isHindi ? `कार्ड ${currentIndex + 1} / ${totalCards}` : `Card ${currentIndex + 1} of ${totalCards}`}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0D9488', background: '#F0FDFA', padding: '2px 8px', borderRadius: '6px' }}>
              {masteredCount} {isHindi ? 'याद हो गए' : 'Mastered'}
            </span>
          </div>

          {/* Flashcard 3D Interactive Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              minHeight: '220px',
              borderRadius: '20px',
              background: isFlipped 
                ? 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)' 
                : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
              color: isFlipped ? '#FFFFFF' : '#0F172A',
              border: isFlipped ? '2px solid #2DD4BF' : '1.5px solid #CBD5E1',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            {/* Card Subject Pill */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                background: isFlipped ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
                color: isFlipped ? '#FFFFFF' : '#334155',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}>
                {isHindi ? card.subjectHi : card.subject}
              </span>

              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                color: isFlipped ? '#2DD4BF' : '#0D9488',
                fontWeight: 700
              }}>
                <RotateCw size={12} />
                <span>{isFlipped ? (isHindi ? 'प्रश्न देखें' : 'Show Question') : (isHindi ? 'उत्तर देखने के लिए टैप करें' : 'Tap to reveal answer')}</span>
              </span>
            </div>

            {/* Main Content (Front vs Back) */}
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              {!isFlipped ? (
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                    {isHindi ? 'प्रश्न (Question)' : 'Question'}
                  </span>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800, lineHeight: 1.4, color: '#0F172A' }}>
                    {isHindi ? card.question : (card.questionEn || card.question)}
                  </h4>
                </div>
              ) : (
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: '#2DD4BF', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                    {isHindi ? '✓ सही उत्तर (Verified Answer)' : '✓ Verified Answer'}
                  </span>
                  <h4 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 800, lineHeight: 1.4, color: '#FFFFFF' }}>
                    {isHindi ? card.answer : (card.answerEn || card.answer)}
                  </h4>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#E0F2FE', opacity: 0.9 }}>
                    💡 {isHindi ? card.keyFact : (card.keyFactEn || card.keyFact)}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Flip Hint */}
            <div style={{ textAlign: 'center', fontSize: '11px', opacity: 0.7 }}>
              {isFlipped ? (isHindi ? '🔄 दोबारा क्लिक करके प्रश्न पर लौटें' : '🔄 Click again to flip back') : (isHindi ? '👆 उत्तर जांचने के लिए कार्ड पर टैप करें' : '👆 Tap card to check answer')}
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={handleNext}
              style={{
                background: '#FFFFFF',
                color: '#475569',
                border: '1.5px solid #CBD5E1',
                borderRadius: '14px',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} />
              <span>{isHindi ? 'अगला कार्ड' : 'Next Card'}</span>
            </button>

            <button
              onClick={handleMarkMastered}
              style={{
                background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '14px',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{isHindi ? 'याद हो गया (+10 XP)' : 'Got It (+10 XP)'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
