import React, { useState } from 'react';
import { 
  Trophy, Award, BookOpen, Star, CheckCircle, 
  Download, Eye, ChevronRight, X, Sparkles, FileText, 
  PenTool, Check
} from 'lucide-react';

const TOPPER_COPIES = [
  {
    id: 1,
    name: "नेहा कुमारी",
    nameEn: "Neha Kumari",
    rank: "State Rank 1 (478/500)",
    rollCode: "Roll: 11024 - BSEB 2024",
    subject: "इतिहास (History)",
    subjectEn: "History",
    marks: "98/100",
    sheetTitle: "दीर्घ उत्तरीय प्रश्न सं. 1: सिंधु घाटी सभ्यता की नगर योजना",
    sheetTitleEn: "Long Answer Q.1: Town Planning of Indus Valley Civilization",
    writtenAnswer: [
      {
        section: "प्रस्तावना (Introduction)",
        content: "सिंधु घाटी सभ्यता (2600 ई.पू. - 1900 ई.पू.) कांस्य युगीन विश्व की सबसे सुव्यवस्थित नगरीय सभ्यता थी। इसके नगरों का निर्माण पूर्व नियोजित वैज्ञानिक आधार पर किया गया था।"
      },
      {
        section: "1. नगर का द्वि-विभाजन (Town Layout)",
        content: "• पश्चिमी भाग (दुर्ग/किला): यह ऊँचाई पर था और संभवतः प्रशासनिक व धार्मिक कार्यों के लिए था।\n• पूर्वी भाग (निचला नगर): यह विस्तृत क्षेत्र में आवासीय बस्तियों के लिए बनाया गया था।"
      },
      {
        section: "2. उन्नत जल-निकासी प्रणाली (Drainage System)",
        content: "सड़क के दोनों ओर पक्की ईंटों से ढकी हुई नालियां थीं। घरों के गंदे पानी की निकासी के लिए शोषक गर्त (Soak pits) बनाए गए थे, जो समय-समय पर साफ किए जाते थे।"
      },
      {
        section: "3. विशाल स्नानागार (The Great Bath - मोहनजोदड़ो)",
        content: "यह 39 फीट लंबा, 23 फीट चौड़ा और 8 फीट गहरा जलाशय था। इसके फर्श पर जिप्सम का लेप था ताकि पानी का रिसाव न हो। धार्मिक स्नान हेतु इसका उपयोग होता था।"
      }
    ],
    writtenAnswerEn: [
      {
        section: "Introduction",
        content: "The Indus Valley Civilization (2600 BCE - 1900 BCE) was a sophisticated Bronze Age urban society laid out on scientific planning principles."
      },
      {
        section: "1. Citadel vs Lower Town",
        content: "• Western Citadel: Built on higher ground, utilized for administrative and ceremonial functions.\n• Eastern Lower Town: Extended residential sector for citizens and craftspeople."
      },
      {
        section: "2. Engineered Drainage Network",
        content: "Baked brick covered drains flanking thoroughfares connected to domestic soak pits with periodic maintenance manholes."
      },
      {
        section: "3. The Great Bath (Mohenjo-daro)",
        content: "A 39ft x 23ft x 8ft rectangular ceremonial tank coated with gypsum mortar to prevent seepage."
      }
    ],
    examinerNote: "✓ अति उत्तम प्रस्तुति! ग्रिड प्रणाली और जिप्सम का सटीक उल्लेख। पूरे 5/5 अंक।",
    examinerNoteEn: "✓ Outstanding presentation! Accurate mention of grid layout and gypsum plaster. 5/5 Marks.",
    goldenTips: [
      "प्रश्नोत्तर संख्या कॉपी के बीचों-बीच बड़े अक्षरों में लिखें।",
      "मुख्य तथ्यों (2600 ई.पू., जिप्सम, दुर्ग) को काले पेन से अंडरलाइन करें।",
      "प्रत्येक बिंदु के बाद 1 पंक्ति अवश्य छोड़ें।"
    ],
    goldenTipsEn: [
      "Write Question Number centrally at the top in bold letters.",
      "Underline core facts (2600 BCE, Gypsum, Citadel) in black ink.",
      "Leave one blank line between each numbered point."
    ]
  },
  {
    id: 2,
    name: "रोहित कुमार",
    nameEn: "Rohit Kumar",
    rank: "State Rank 3 (472/500)",
    rollCode: "Roll: 11058 - BSEB 2024",
    subject: "राजनीति शास्त्र (Pol Science)",
    subjectEn: "Political Science",
    marks: "96/100",
    sheetTitle: "लघु उत्तरीय प्रश्न सं. 4: गुटनिरपेक्ष आंदोलन (NAM) की प्रासंगिकता",
    sheetTitleEn: "Short Answer Q.4: Relevance of Non-Aligned Movement (NAM)",
    writtenAnswer: [
      {
        section: "मुख्य अवधारणा",
        content: "गुटनिरपेक्षता का अर्थ किसी भी महाशक्ति गुट (USA या USSR) में शामिल न होकर स्वतंत्र विदेश नीति का अनुसरण करना है। इसके संस्थापक पं. जवाहरलाल नेहरू, मार्शल टीटो और कर्नल नासिर थे।"
      },
      {
        section: "आज की प्रासंगिकता के 3 मुख्य बिंदु",
        content: "1. बहुध्रुवीय विश्व में विकासशील देशों की संप्रभुता की रक्षा।\n2. वैश्विक आतंकवाद, जलवायु परिवर्तन एवं आर्थिक विषमता पर साझा मंच।\n3. दक्षिण-दक्षिण सहयोग (South-South Cooperation) को सुदृढ़ बनाना।"
      }
    ],
    writtenAnswerEn: [
      {
        section: "Core Concept",
        content: "Non-Alignment denotes preserving an autonomous foreign policy without subordinate accession to rival power blocs (USA or USSR). Key founders included Pt. Nehru, Tito, and Nasser."
      },
      {
        section: "Relevance in 21st Century",
        content: "1. Safeguarding sovereignty of developing nations in a multipolar world.\n2. Unified bargaining on climate change, trade, and terrorism.\n3. Strengthening South-South technological and economic partnerships."
      }
    ],
    examinerNote: "✓ सटीक व संतुलित उत्तर। पं. नेहरू और बांडुंग सम्मेलन का उल्लेख सराहनीय। 2/2 अंक।",
    examinerNoteEn: "✓ Crisp and balanced argument. Commendable citation of Pt. Nehru and Bandung ideals. 2/2 Marks.",
    goldenTips: [
      "अंतर्राष्ट्रीय संबंधों में हमेशा समकालीन उदाहरण (Current Examples) जोड़ें।",
      "2 अंक के प्रश्न में 30 से 50 शब्दों में संतुलित उत्तर दें।"
    ],
    goldenTipsEn: [
      "Incorporate contemporary geopolitical examples.",
      "Keep 2-mark answers within 30-50 words without unnecessary filler."
    ]
  }
];

export function TopperCopyModal({ isOpen, onClose, language = 'en' }) {
  const [selectedTopperIndex, setSelectedTopperIndex] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const topper = TOPPER_COPIES[selectedTopperIndex];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
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
          maxWidth: '720px',
          maxHeight: '92vh',
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
          borderBottom: '2px solid #F59E0B'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}>
              <Trophy size={22} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                  {isHindi ? 'बिहार बोर्ड स्टेट टॉपर की उत्तर पुस्तिका' : 'BSEB State Topper Model Answer Sheet'}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#CBD5E1', marginTop: '2px' }}>
                {isHindi ? 'सत्यापित हस्तलिखित कॉपी • परीक्षक के अंक व विशेष निर्देश' : 'Verified handwritten model copy with examiner marking & feedback'}
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

        {/* Toppers Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 20px',
          background: '#F1F5F9',
          borderBottom: '1px solid #E2E8F0'
        }}>
          {TOPPER_COPIES.map((t, idx) => {
            const isSelected = selectedTopperIndex === idx;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTopperIndex(idx)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: isSelected ? '1.5px solid #0D9488' : '1px solid #CBD5E1',
                  background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                  color: isSelected ? '#0F172A' : '#64748B',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Award size={16} color={isSelected ? '#0D9488' : '#94A3B8'} />
                <span>{isHindi ? t.name : t.nameEn} ({t.rank})</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div style={{
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: '#F8FAFC'
        }}>

          {/* Topper Info Bar */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '14px 18px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                  {isHindi ? topper.name : topper.nameEn}
                </span>
                <span style={{
                  background: '#FEF3C7',
                  color: '#B45309',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '9999px'
                }}>
                  {topper.rank}
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                {isHindi ? topper.subject : topper.subjectEn} • {topper.rollCode}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '10px',
                padding: '6px 12px',
                textAlign: 'center'
              }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
                  {isHindi ? 'प्राप्तांक' : 'Subject Score'}
                </span>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#047857' }}>
                  {topper.marks}
                </span>
              </div>

              <button
                onClick={handleDownload}
                style={{
                  background: downloadSuccess ? '#16A34A' : '#0D9488',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {downloadSuccess ? <Check size={14} /> : <Download size={14} />}
                <span>{downloadSuccess ? (isHindi ? 'सेव हो गया' : 'Saved') : (isHindi ? 'PDF डाउनलोड' : 'Save PDF')}</span>
              </button>
            </div>
          </div>

          {/* Realistic Exam Sheet Mockup */}
          <div style={{
            background: '#FFFDF9',
            borderRadius: '16px',
            padding: '24px 20px',
            border: '1.5px solid #E2D9C8',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
            position: 'relative'
          }}>
            {/* Left Margin Line (Red ruling like real board answer sheets) */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '42px',
              width: '1.5px',
              backgroundColor: 'rgba(239, 68, 68, 0.4)'
            }} />

            {/* Answer Title in Center */}
            <div style={{ textAlign: 'center', marginBottom: '18px', paddingLeft: '24px' }}>
              <span style={{
                display: 'inline-block',
                background: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FCD34D',
                padding: '4px 14px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '13px'
              }}>
                {isHindi ? topper.sheetTitle : (topper.sheetTitleEn || topper.sheetTitle)}
              </span>
            </div>

            {/* Ruled lines and handwritten text blocks */}
            <div style={{ paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {(isHindi ? topper.writtenAnswer : (topper.writtenAnswerEn || topper.writtenAnswer)).map((section, idx) => (
                <div key={idx}>
                  <h5 style={{
                    margin: '0 0 4px',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#0F172A',
                    textDecoration: 'underline'
                  }}>
                    {section.section}
                  </h5>
                  <p style={{
                    margin: 0,
                    fontSize: '13.5px',
                    color: '#334155',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                    fontFamily: 'inherit'
                  }}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Red Ink Examiner Grading Stamp */}
            <div style={{
              marginTop: '20px',
              paddingLeft: '32px',
              borderTop: '1px dashed #CBD5E1',
              paddingTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{
                color: '#DC2626',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '13px'
              }}>
                {isHindi ? topper.examinerNote : (topper.examinerNoteEn || topper.examinerNote)}
              </span>
              <span style={{
                color: '#DC2626',
                border: '2px solid #DC2626',
                borderRadius: '8px',
                padding: '2px 8px',
                fontWeight: 900,
                fontSize: '14px',
                transform: 'rotate(-5deg)'
              }}>
                VERIFIED
              </span>
            </div>
          </div>

          {/* Golden Rules Box */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E2E8F0'
          }}>
            <h5 style={{
              margin: '0 0 10px',
              fontSize: '13px',
              fontWeight: 800,
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={16} />
              <span>{isHindi ? 'टॉपर के 3 उत्तर-लेखन नियम (Golden Presentation Rules)' : 'Top 3 Golden Presentation Rules'}</span>
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(isHindi ? topper.goldenTips : (topper.goldenTipsEn || topper.goldenTips)).map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
                  <span style={{ color: '#0D9488', fontWeight: 800 }}>•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
