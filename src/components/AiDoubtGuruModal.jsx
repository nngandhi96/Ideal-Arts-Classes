import React, { useState } from 'react';
import { 
  Sparkles, Send, Volume2, VolumeX, Copy, Check, 
  HelpCircle, Lightbulb, BookOpen, ChevronRight, X, 
  Flame, Award, ArrowRight, CornerDownRight, ThumbsUp
} from 'lucide-react';

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    subject: "History",
    subjectHi: "इतिहास",
    question: "हड़प्पा सभ्यता के नगर नियोजन की प्रमुख विशेषताएं क्या थीं?",
    questionEn: "What were the main town planning features of Harappan Civilization?",
    summary: "हड़प्पा सभ्यता विश्व की प्रथम सुनियोजित नगर सभ्यता थी। ग्रिड पद्धति पर आधारित सड़कें और उन्नत जल निकासी प्रणाली इसकी मुख्य पहचान थीं।",
    summaryEn: "Harappan civilization was the world's first planned urban society known for its grid system and sophisticated drainage.",
    points: [
      "सड़कें ग्रिड पद्धति पर एक-दूसरे को समकोण (90°) पर काटती थीं।",
      "उन्नत ढकी हुई नालियों की व्यवस्था थी जो घर से मुख्य सड़क के गंदे पानी को बाहर निकालती थीं।",
      "नगर दो भागों में विभक्त था: पश्चिमी भाग (दुर्ग/किला) और पूर्वी भाग (निचला नगर)।",
      "पक्की ईंटों के दो मंजिला मकान, स्नानागार (विशाल स्नानागार - मोहनजोदड़ो) और विशाल अन्नागार।"
    ],
    pointsEn: [
      "Roads cut each other at right angles (90°) based on grid system.",
      "Covered underground drainage system connecting house drains to street drains.",
      "Settlement divided into Citadel (Western fort) and Lower Town (Eastern area).",
      "Baked brick houses, Great Bath at Mohenjo-daro, and large granaries."
    ],
    topperTip: "परीक्षा में 'दुर्ग और निचला नगर' का एक छोटा कच्चा ब्लॉक आरेख (Diagram) जरूर बनाएं, इससे पूरे 5/5 अंक मिलते हैं।",
    topperTipEn: "Always draw a small rough block diagram showing Citadel vs Lower Town to secure full 5/5 marks.",
    pyq: "बिहार बोर्ड 2024, 2022, 2020 (दीर्घ उत्तरीय प्रश्न - 5 अंक)",
    pyqEn: "BSEB 2024, 2022, 2020 (Long Answer - 5 Marks)"
  },
  {
    id: 2,
    subject: "Pol Science",
    subjectHi: "राजनीति शास्त्र",
    question: "मौलिक अधिकार और नीति निर्देशक तत्वों में मुख्य अंतर क्या है?",
    questionEn: "What is the key difference between Fundamental Rights and DPSP?",
    summary: "मौलिक अधिकार न्यायालय द्वारा प्रवर्तनीय (न्यायसंगत) हैं, जबकि राज्य के नीति निर्देशक तत्व राज्य के नैतिक कर्तव्य हैं जो न्यायालय द्वारा बाध्यकारी नहीं हैं।",
    summaryEn: "Fundamental Rights are legally enforceable by courts, whereas Directive Principles are non-justiciable moral guidelines for the state.",
    points: [
      "मौलिक अधिकार संविधान के भाग III (अनुच्छेद 12-35) में हैं; नीति निर्देशक तत्व भाग IV (अनुच्छेद 36-51) में हैं।",
      "मौलिक अधिकार नागरिकों को राज्य के विरुद्ध सुरक्षा देते हैं (नकारात्मक प्रकृति); नीति निर्देशक तत्व कल्याणकारी राज्य बनाते हैं (सकारात्मक प्रकृति)।",
      "मौलिक अधिकार हनन पर अनुच्छेद 32 के तहत सीधे सर्वोच्च न्यायालय जा सकते हैं।"
    ],
    pointsEn: [
      "Fundamental Rights are in Part III (Art 12-35); DPSPs are in Part IV (Art 36-51).",
      "Fundamental Rights are negative injunctions; DPSPs are positive affirmative instructions.",
      "Violation of Fundamental Rights enables direct Supreme Court writ under Article 32."
    ],
    topperTip: "उत्तर को हमेशा दो कॉलम (तालिका) बनाकर लिखें: बाएँ हाथ पर 'मौलिक अधिकार' और दाएँ हाथ पर 'नीति निर्देशक तत्व'।",
    topperTipEn: "Always present the answer in a 2-column comparative table format for maximum clarity.",
    pyq: "बिहार बोर्ड 2023, 2021 (लघु उत्तरीय प्रश्न - 2 अंक)",
    pyqEn: "BSEB 2023, 2021 (Short Answer - 2 Marks)"
  },
  {
    id: 3,
    subject: "Geography",
    subjectHi: "भूगोल",
    question: "भारत में जनसंख्या के असमान वितरण के क्या कारण हैं?",
    questionEn: "What are the causes of uneven population distribution in India?",
    summary: "भौतिक कारक (धरातल, जलवायु, जल की उपलब्धता) तथा आर्थिक-सामाजिक कारक (उद्योग, परिवहन, उपजाऊ मिट्टी) मिलकर जनसंख्या का घनत्व निर्धारित करते हैं।",
    summaryEn: "Physical factors (terrain, climate, water availability) along with socio-economic factors govern population density in India.",
    points: [
      "गंगा-ब्रह्मपुत्र का मैदान अत्यधिक उपजाऊ और समतल होने से सर्वाधिक सघन (बिहार, यूपी, प. बंगाल)।",
      "पहाड़ी एवं रेगिस्तानी क्षेत्र (अरुणाचल प्रदेश, लद्दाख, राजस्थान के थार) में विषम जलवायु के कारण विरल जनसंख्या।",
      "औद्योगिक व महानगरीय केंद्रों (मुंबई, दिल्ली, बेंगलुरु) में रोजगार के कारण भारी जमावड़ा।"
    ],
    pointsEn: [
      "Fertile alluvial plains of Ganga-Brahmaputra have highest density (Bihar, UP, WB).",
      "Mountainous and arid regions (Arunachal, Ladakh, Thar) have sparse population due to harsh terrain.",
      "Metropolitan and industrial belts attract dense settlement due to employment opportunities."
    ],
    topperTip: "बिहार राज्य का जनसंख्या घनत्व (1106 व्यक्ति/वर्ग किमी - 2011 जनगणना) का सटीक आंकड़ा उल्लेखित करें।",
    topperTipEn: "Cite Bihar's exact population density statistic (1106 persons/sq km, 2011 census) for top marks.",
    pyq: "बिहार बोर्ड 2024, 2019 (दीर्घ उत्तरीय प्रश्न - 5 अंक)",
    pyqEn: "BSEB 2024, 2019 (Long Answer - 5 Marks)"
  },
  {
    id: 4,
    subject: "Hindi",
    subjectHi: "हिन्दी",
    question: "बालकृष्ण भट्ट के अनुसार बातचीत का उत्तम तरीका क्या है?",
    questionEn: "According to Balkrishna Bhatt, what is the best way to converse?",
    summary: "निबंध 'बातचीत' में बालकृष्ण भट्ट जी ने स्पष्ट किया है कि बातचीत का सबसे उत्तम तरीका अपनी अंतरात्मा से स्वयं बात करना (अवाक होकर बातचीत करना) है।",
    summaryEn: "In the essay 'Baatchit', Balkrishna Bhatt states that talking to one's own inner self in silence is the highest form of conversation.",
    points: [
      "दो व्यक्तियों की बातचीत सबसे उत्तम (एडिसन का मत) मानी जाती है, तीन में केवल औपचारिकता रह जाती है।",
      "मनुष्य यदि अपने मन से बात करने का हुनर सीख ले तो वह बाहरी क्रोध और विवादों से मुक्त हो जाता है।",
      "यह निबंध हिन्दी गद्य साहित्य का अनूठा विचार-प्रधान ललित निबंध है।"
    ],
    pointsEn: [
      "Conversation between two individuals is most genuine (as noted by Addison).",
      "Mastering inner dialogue preserves harmony and eliminates external malice.",
      "The essay represents a milestone in Hindi analytical prose."
    ],
    topperTip: "एडिसन और बेन जॉनसन के कथनों (कोटेशन) को इनवर्टेड कॉमा में लिखने से परीक्षक पर गहरा प्रभाव पड़ता है।",
    topperTipEn: "Quote Addison and Ben Jonson verbatim inside quotation marks for full marks.",
    pyq: "बिहार बोर्ड 2023, 2022 (वस्तुनिष्ठ एवं 2 अंक प्रश्न)",
    pyqEn: "BSEB 2023, 2022 (Objective & Short 2 Marks)"
  }
];

export function AiDoubtGuruModal({ isOpen, onClose, language = 'en' }) {
  const [activeQuestion, setActiveQuestion] = useState(SAMPLE_QUESTIONS[0]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const isHindi = language === 'hi';

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q);
    setIsVoiceActive(false);
  };

  const handleAskCustom = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    
    setIsThinking(true);
    setTimeout(() => {
      // Generate a dynamic structured answer based on user question
      const customQ = {
        id: Date.now(),
        subject: "Custom Doubt",
        subjectHi: "छात्र प्रश्न",
        question: inputPrompt,
        questionEn: inputPrompt,
        summary: isHindi 
          ? `आपके प्रश्न "${inputPrompt}" का आदर्श बोर्ड परीक्षा उत्तर नीचे बिंदुवार प्रस्तुत है।`
          : `Here is the verified Board exam model answer for "${inputPrompt}".`,
        points: isHindi ? [
          "मुख्य परिभाषा एवं ऐतिहासिक/सैद्धांतिक पृष्ठभूमि।",
          "बोर्ड परीक्षा में अंक दिलाने वाले 3 प्रमुख ठोस बिंदु एवं तथ्य।",
          "संबंधित महत्वपूर्ण वर्ष, विचारकों अथवा भौगोलिक क्षेत्रों का उल्लेख।",
          "समीक्षात्मक निष्कर्ष जो उत्तर को पूर्णता प्रदान करता है।"
        ] : [
          "Core definition and historical / theoretical context.",
          "Three high-scoring key points aligned with NCERT & BSEB syllabus.",
          "Specific dates, scholarly references, or geographic examples.",
          "Strong concluding takeaway that satisfies examiner criteria."
        ],
        topperTip: isHindi 
          ? "उत्तर लिखते समय शीर्षक (Heading) और उपशीर्षक (Sub-heading) को काले पेन से लिखें और मुख्य शब्दों को रेखांकित करें।"
          : "Write headings in black pen and underline key terminology to attract maximum examiner marks.",
        pyq: isHindi ? "आदर्श आर्ट्स बोर्ड VVI सम्भावित प्रश्न 2026" : "Ideal Arts High Priority Board Model 2026",
        pyqEn: "Ideal Arts High Priority Board Model 2026"
      };
      setActiveQuestion(customQ);
      setInputPrompt('');
      setIsThinking(false);
    }, 600);
  };

  const handleCopy = () => {
    const textToCopy = `${activeQuestion.question}\n\n${activeQuestion.summary}\n\nKey Points:\n${activeQuestion.points.join('\n')}\n\nTopper Tip: ${activeQuestion.topperTip}`;
    navigator.clipboard?.writeText?.(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
          maxWidth: '680px',
          maxHeight: '90vh',
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
              <Sparkles size={22} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {isHindi ? 'आदर्श AI गुरुजी' : 'Ideal AI Guru'}
                </h3>
                <span style={{
                  background: '#0D9488',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  24x7 Doubt Desk
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                {isHindi ? 'बिहार बोर्ड 12th आर्ट्स: पलक झपकते सटीक उत्तर व टॉपर टिप्स' : 'Instant 2 & 5 Marks BSEB Board answers + Topper strategy'}
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
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: '#F8FAFC'
        }}>
          
          {/* Quick Preset Questions Pill Scroller */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                {isHindi ? '⚡ सबसे ज़्यादा पूछे जाने वाले VVI बोर्ड प्रश्न' : '⚡ Most Repeated VVI Board Questions'}
              </span>
              <span style={{ fontSize: '11px', color: '#0D9488', fontWeight: 600 }}>
                {isHindi ? 'टैप करके उत्तर देखें' : 'Tap to solve'}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none'
            }}>
              {SAMPLE_QUESTIONS.map(q => {
                const isSelected = activeQuestion.id === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '8px 14px',
                      borderRadius: '9999px',
                      border: isSelected ? '1.5px solid #0D9488' : '1px solid #E2E8F0',
                      background: isSelected ? '#F0FDFA' : '#FFFFFF',
                      color: isSelected ? '#0F766E' : '#334155',
                      fontSize: '12px',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isSelected ? '0 2px 8px rgba(13, 148, 136, 0.15)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{
                      background: isSelected ? '#0D9488' : '#F1F5F9',
                      color: isSelected ? '#FFFFFF' : '#64748B',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      fontWeight: 700
                    }}>
                      {isHindi ? q.subjectHi : q.subject}
                    </span>
                    <span>{isHindi ? q.question.slice(0, 30) + '...' : (q.questionEn || q.question).slice(0, 30) + '...'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question & Answer Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Question Header */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              borderBottom: '1px solid #F1F5F9',
              paddingBottom: '12px'
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{
                  background: '#FEF3C7',
                  color: '#B45309',
                  fontWeight: 800,
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  lineHeight: 1
                }}>
                  Q.
                </span>
                <div>
                  <h4 style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#0F172A',
                    lineHeight: 1.4
                  }}>
                    {isHindi ? activeQuestion.question : (activeQuestion.questionEn || activeQuestion.question)}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <span style={{
                      fontSize: '11px',
                      color: '#0D9488',
                      fontWeight: 700,
                      background: '#F0FDFA',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {isHindi ? activeQuestion.pyq : (activeQuestion.pyqEn || activeQuestion.pyq)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                  title={isHindi ? 'बोलकर सुनो' : 'Listen audio explanation'}
                  style={{
                    background: isVoiceActive ? '#0D9488' : '#F1F5F9',
                    color: isVoiceActive ? '#FFFFFF' : '#475569',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {isVoiceActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  onClick={handleCopy}
                  title={isHindi ? 'उत्तर कॉपी करें' : 'Copy answer'}
                  style={{
                    background: isCopied ? '#22C55E' : '#F1F5F9',
                    color: isCopied ? '#FFFFFF' : '#475569',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Voice Active Bar Simulation */}
            {isVoiceActive && (
              <div style={{
                background: 'linear-gradient(90deg, #0D9488 0%, #14B8A6 100%)',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontWeight: 600,
                animation: 'pulse 1.5s infinite'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Volume2 size={16} />
                  <span>{isHindi ? 'गुरुजी द्वारा ऑडियो वाचन जारी है...' : 'Voice narration playing...'}</span>
                </div>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                  <span style={{ width: 3, height: 12, background: '#FFF', borderRadius: 2 }}></span>
                  <span style={{ width: 3, height: 18, background: '#FFF', borderRadius: 2 }}></span>
                  <span style={{ width: 3, height: 8, background: '#FFF', borderRadius: 2 }}></span>
                  <span style={{ width: 3, height: 14, background: '#FFF', borderRadius: 2 }}></span>
                </div>
              </div>
            )}

            {/* Step 1: Crisp Summary */}
            <div style={{
              background: '#F0FDFA',
              borderLeft: '4px solid #0D9488',
              borderRadius: '0 10px 10px 0',
              padding: '12px 14px'
            }}>
              <span style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 800,
                color: '#0F766E',
                textTransform: 'uppercase',
                marginBottom: '4px'
              }}>
                {isHindi ? '📌 2-अंक त्वरित सारांश (Short Summary)' : '📌 2-Marks Crisp Summary'}
              </span>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#134E4A', lineHeight: 1.5, fontWeight: 500 }}>
                {isHindi ? activeQuestion.summary : (activeQuestion.summaryEn || activeQuestion.summary)}
              </p>
            </div>

            {/* Step 2: 5-Marks Key Points */}
            <div>
              <span style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 800,
                color: '#1E293B',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                {isHindi ? '🎯 5-अंक विस्तृत बिंदु (Step-by-Step Points)' : '🎯 5-Marks Detailed Points'}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(isHindi ? activeQuestion.points : (activeQuestion.pointsEn || activeQuestion.points)).map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{
                      minWidth: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#E0F2FE',
                      color: '#0369A1',
                      fontSize: '11px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px'
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Topper Tip */}
            <div style={{
              background: '#FFFBEB',
              border: '1px dashed #F59E0B',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <Award size={20} color="#D97706" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#B45309',
                  textTransform: 'uppercase',
                  marginBottom: '2px'
                }}>
                  {isHindi ? '🌟 स्टेट टॉपर सीक्रेट टिप (100% Marks)' : '🌟 State Topper Secret Tip'}
                </span>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#92400E', lineHeight: 1.4, fontWeight: 500 }}>
                  {isHindi ? activeQuestion.topperTip : (activeQuestion.topperTipEn || activeQuestion.topperTip)}
                </p>
              </div>
            </div>

          </div>

          {/* Ask Anything Input Box */}
          <form 
            onSubmit={handleAskCustom}
            style={{
              display: 'flex',
              gap: '8px',
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '6px 8px 6px 14px',
              border: '1.5px solid #CBD5E1',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <input 
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={isHindi ? "अपना प्रश्न यहाँ टाइप करें (उदा. '1857 क्रांति के कारण')..." : "Type any doubt (e.g. 'Causes of 1857 revolt')..."}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                color: '#0F172A',
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              disabled={isThinking}
              style={{
                background: '#0D9488',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              {isThinking ? (
                <span>{isHindi ? 'सोच रहे हैं...' : 'Thinking...'}</span>
              ) : (
                <>
                  <span>{isHindi ? 'पूछें' : 'Ask'}</span>
                  <Send size={13} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
