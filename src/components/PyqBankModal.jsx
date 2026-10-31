import React, { useState } from 'react';
import { 
  X, BookOpen, Download, FileText, CheckCircle2, ChevronRight, 
  Calendar, Award, Sparkles, Filter, Eye, Check, ExternalLink
} from 'lucide-react';

export function PyqBankModal({ isOpen, onClose, language = 'hi', selectedClass = '12th' }) {
  if (!isOpen) return null;

  const [activeSubject, setActiveSubject] = useState('history');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [readingPaper, setReadingPaper] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const subjects = [
    { id: 'history', name: language === 'hi' ? 'इतिहास' : 'History', icon: '🏛️' },
    { id: 'polscience', name: language === 'hi' ? 'राजनीति विज्ञान' : 'Pol Science', icon: '⚖️' },
    { id: 'geography', name: language === 'hi' ? 'भूगोल' : 'Geography', icon: '🌍' },
    { id: 'economics', name: language === 'hi' ? 'अर्थशास्त्र' : 'Economics', icon: '📈' },
    { id: 'hindi', name: language === 'hi' ? 'हिन्दी 100 अंक' : 'Hindi 100M', icon: '📜' },
    { id: 'english', name: language === 'hi' ? 'अंग्रेजी 100 अंक' : 'English 100M', icon: '✍️' }
  ];

  const pyqDatabase = {
    history: [
      {
        year: '2025',
        title: 'BSEB 12th History Annual Board Exam Paper 2025 (Solved)',
        totalMarks: 100,
        mcqs: 100,
        subjectiveMarks: 50,
        downloadUrl: '#',
        summary: 'सिंधु घाटी सभ्यता, मौर्य साम्राज्य, मुगल प्रशासन और 1857 की क्रांति के सर्वाधिक महत्वपूर्ण प्रश्न।'
      },
      {
        year: '2024',
        title: 'BSEB 12th History Annual Board Exam Paper 2024 (Solved)',
        totalMarks: 100,
        mcqs: 100,
        subjectiveMarks: 50,
        downloadUrl: '#',
        summary: 'अशोक के धम्म, अकबर की सुलह-ए-कुल नीति और गांधीजी के असहयोग आंदोलन के मॉडल उत्तर।'
      },
      {
        year: '2023',
        title: 'BSEB 12th History Annual Board Exam Paper 2023 (Solved)',
        totalMarks: 100,
        mcqs: 100,
        subjectiveMarks: 50,
        downloadUrl: '#',
        summary: 'विजयनगर साम्राज्य का स्थापत्य, भक्ति आंदोलन और भारतीय संविधान निर्माण की ऐतिहासिक पृष्ठभूमि।'
      },
      {
        year: '2022',
        title: 'BSEB 12th History Annual Board Exam Paper 2022 (Solved)',
        totalMarks: 100,
        mcqs: 100,
        subjectiveMarks: 50,
        downloadUrl: '#',
        summary: 'हड़प्पा की नगर योजना, कबीर के उपदेश तथा भारत छोड़ो आंदोलन का विस्तृत उत्तर।'
      }
    ],
    polscience: [
      {
        year: '2025',
        title: 'BSEB 12th Political Science Exam Paper 2025 (Solved)',
        totalMarks: 100,
        mcqs: 100,
        subjectiveMarks: 50,
        downloadUrl: '#',
        summary: 'शीत युद्ध का दौर, गुटनिरपेक्ष आंदोलन, योजना आयोग और भारतीय विदेश नीति के हल सहित प्रश्न।'
      },
      {
        year: '2024',
        title: 'BSEB 12th Political Science Exam Paper 2024 (Solved)',
        totalMarks: 100,
        mcqs: 100,
        subjectiveMarks: 50,
        downloadUrl: '#',
        summary: 'संयुक्त राष्ट्र संघ की सुरक्षा परिषद में भारत की स्थायी सदस्यता एवं क्षेत्रीय आकांक्षाओं का विश्लेषण।'
      }
    ],
    geography: [
      {
        year: '2025',
        title: 'BSEB 12th Geography Annual Exam Paper 2025 (Solved)',
        totalMarks: 70,
        mcqs: 70,
        subjectiveMarks: 35,
        downloadUrl: '#',
        summary: 'मानव भूगोल की प्रकृति, जनसंख्या वितरण, भारत के खनिज संसाधन और अंतरराष्ट्रीय व्यापार के मॉडल हल।'
      },
      {
        year: '2024',
        title: 'BSEB 12th Geography Annual Exam Paper 2024 (Solved)',
        totalMarks: 70,
        mcqs: 70,
        subjectiveMarks: 35,
        downloadUrl: '#',
        summary: 'लौह-इस्पात उद्योग, जल प्रदूषण निवारण एवं भारत में हरित क्रांति के प्रभाव।'
      }
    ],
    hindi: [
      {
        year: '2025',
        title: 'BSEB 12th Hindi (100 Marks) Annual Paper 2025 (Solved)',
        totalMarks: 100,
        mcqs: 100,
        subjectiveMarks: 50,
        downloadUrl: '#',
        summary: 'बातचीत, उसने कहा था, संपूर्ण क्रांति, अर्धनारीश्वर, सूरदास एवं तुलसीदास के पदों की सटीक व्याख्या।'
      },
      {
        year: '2024',
        title: 'BSEB 12th Hindi (100 Marks) Annual Paper 2024 (Solved)',
        totalMarks: 100,
        mcqs: 100,
        subjectiveMarks: 50,
        downloadUrl: '#',
        summary: 'निबंध लेखन, पत्र लेखन, संक्षेपण तथा दिगंत भाग-2 के सभी वस्तुनिष्ठ प्रश्नों की उत्तर कुंजी।'
      }
    ]
  };

  const papers = pyqDatabase[activeSubject] || pyqDatabase.history;

  const handleDownloadPaper = (paper) => {
    setDownloadSuccess(paper.year);
    setTimeout(() => setDownloadSuccess(null), 2500);

    const paperContent = `
============================================================
              IDEAL ARTS CLASSES, BIHAR
       ${paper.title.toUpperCase()}
============================================================
कक्षा: 12th कला संकाय (Arts) | बोर्ड: BSEB पटना
कुल अंक: ${paper.totalMarks} | समय: 3 घंटे 15 मिनट
============================================================

खंड-अ (वस्तुनिष्ठ प्रश्न - 50 प्रश्नों के उत्तर अनिवार्य):
1. हड़प्पा सभ्यता की सबसे अनूठी विशेषता क्या थी?
   उत्तर: (D) सुनियोजित जल निकास प्रणाली
   व्याख्या: हड़प्पा नगरों में नालियाँ ढकी हुई और ग्रिड पद्धति पर बनी थीं।

2. 'प्रयाग प्रशस्ति' की भाषा कौन सी है?
   उत्तर: (A) संस्कृत भाषा (हरिषेण द्वारा रचित)

3. बिहार में 1857 की क्रांति का नेतृत्व किसने किया था?
   उत्तर: (C) बाबू वीर कुंवर सिंह (जगदीशपुर)

4. भारतीय संविधान कब लागू हुआ था?
   उत्तर: (B) 26 जनवरी 1950 ई.

खंड-ब (गैर-वस्तुनिष्ठ प्रश्न - लघु व दीर्घ उत्तरीय हल):
प्रश्न 1: हड़प्पा सभ्यता के पतन के दो प्रमुख कारण लिखें।
उत्तर: 
1. जलवायु परिवर्तन एवं नदियों का सूखना: घग्घर-हाकरा नदी तंत्र के सूखने से बस्तियाँ उजड़ गईं।
2. बाढ़ तथा भूकंप जैसी प्राकृतिक आपदाएं: सिंधु नदी के मार्ग परिवर्तन और विनाशकारी बाढ़।

प्रश्न 2: अशोक के 'धम्म' के मूल सिद्धांत क्या थे?
उत्तर: बड़ों का आदर करना, जीवों पर दया करना, सत्य बोलना, और सभी धर्मों का सम्मान करना।

============================================================
आदर्श आर्ट्स क्लासेज टॉप फैकल्टी द्वारा तैयार एवं सत्यापित।
डाउनलोड व ऑफलाइन अध्ययन हेतु डिजिटल कॉपी।
============================================================
    `;

    const blob = new Blob([paperContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BSEB_12th_${activeSubject.toUpperCase()}_${paper.year}_Solved.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        maxHeight: '92vh',
        background: 'var(--bg-surface)',
        borderRadius: 24,
        border: '1.5px solid var(--border-subtle)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)'
            }}>
              <BookOpen size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                {language === 'hi' ? '10 वर्षों के हल किए हुए प्रश्न पत्र' : '10 Years Solved Board Papers'}
              </h3>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>
                Bihar Board (BSEB) Arts • Class {selectedClass}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Subject Pills Horizontal Strip */}
        <div style={{
          display: 'flex',
          gap: 6,
          padding: '12px 16px',
          background: 'var(--bg-app)',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto'
        }}>
          {subjects.map(sub => {
            const isActive = activeSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubject(sub.id)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: isActive ? '1.5px solid var(--color-accent-teal)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--color-accent-teal)' : 'var(--bg-surface)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Papers List Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            color: 'var(--text-secondary)'
          }}>
            <Sparkles size={16} color="#D97706" style={{ flexShrink: 0 }} />
            <span>
              {language === 'hi' 
                ? 'बिहार बोर्ड परीक्षा में 60-70% प्रश्न पिछले वर्षों से दोहराए जाते हैं। सभी प्रश्नों के पूर्ण हल दिए गए हैं।'
                : '60-70% questions in board exams repeat from previous years. Complete faculty solutions included.'}
            </span>
          </div>

          {papers.map((paper, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-surface)',
                borderRadius: 16,
                padding: '14px 16px',
                border: '1.5px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                boxShadow: 'var(--shadow-xs)',
                transition: 'border-color 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#D97706',
                      fontWeight: 800,
                      fontSize: 10
                    }}>
                      Year {paper.year}
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: 'var(--color-accent-teal-tint)',
                      color: 'var(--color-accent-teal)',
                      fontWeight: 700,
                      fontSize: 10
                    }}>
                      Full Solved Solution
                    </span>
                  </div>
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                    {paper.title}
                  </h4>
                </div>
              </div>

              <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {paper.summary}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
                <button
                  onClick={() => handleDownloadPaper(paper)}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    borderRadius: 10,
                    border: '1.5px solid var(--color-accent-teal)',
                    background: 'var(--color-accent-teal-tint)',
                    color: 'var(--color-accent-teal)',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  {downloadSuccess === paper.year ? (
                    <>
                      <Check size={14} color="#059669" />
                      <span style={{ color: '#059669' }}>{language === 'hi' ? 'डाउनलोड हुआ!' : 'Downloaded!'}</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>{language === 'hi' ? 'ऑफलाइन सेव करें (PDF)' : 'Download Solved PDF'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

