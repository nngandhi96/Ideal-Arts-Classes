import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, Clock, AlertTriangle, ArrowRight, ArrowLeft, 
  RotateCcw, Download, Share2, Award, Sparkles, BookOpen, 
  Check, FileText, ChevronRight, HelpCircle, BarChart3, Trophy
} from 'lucide-react';

export function OmrTestModal({ isOpen, onClose, language = 'hi', selectedClass = '12th', currentUser }) {
  if (!isOpen) return null;

  // Test Phase: 'select_subject' | 'testing' | 'result'
  const [phase, setPhase] = useState('select_subject');
  const [selectedSubject, setSelectedSubject] = useState('history');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { 0: 'A', 1: 'C', ... }
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins in seconds
  const [isOmrSheetOpen, setIsOmrSheetOpen] = useState(false);
  const [scoreData, setScoreData] = useState(null);

  // Subject Question Sets (Authentic Bihar Board Class 12th Arts VVI Questions)
  const questionBanks = {
    history: {
      name: language === 'hi' ? 'इतिहास (History)' : 'History',
      code: 'HIS-12',
      questions: [
        {
          id: 1,
          q: language === 'hi' ? 'हड़प्पा सभ्यता किस युग की सभ्यता है?' : 'Harappan civilization belongs to which age?',
          options: ['A) पूर्व पाषाण युग', 'B) नव पाषाण युग', 'C) लौह युग', 'D) कांस्य युग (Bronze Age)'],
          ans: 'D',
          expl: language === 'hi' ? 'हड़प्पा सभ्यता को कांस्य युगीन सभ्यता माना जाता है।' : 'Harappan civilization is recognized as a Bronze Age civilization.'
        },
        {
          id: 2,
          q: language === 'hi' ? 'मोहनजोदड़ो की खोज 1922 ई. में किसने की थी?' : 'Who discovered Mohenjo-daro in 1922?',
          options: ['A) दयाराम साहनी', 'B) राखालदास बनर्जी (R.D. Banerjee)', 'C) जॉन मार्शल', 'D) माधव स्वरूप वत्स'],
          ans: 'B',
          expl: language === 'hi' ? 'राखालदास बनर्जी ने 1922 में मोहनजोदड़ो की खोज की थी।' : 'R.D. Banerjee discovered Mohenjo-daro in 1922.'
        },
        {
          id: 3,
          q: language === 'hi' ? 'प्रयाग प्रशस्ति की रचना किसने की थी?' : 'Who composed Prayag Prashasti?',
          options: ['A) कालिदास', 'B) बाणभट्ट', 'C) हरिषेण (Harishena)', 'D) पतंजलि'],
          ans: 'C',
          expl: language === 'hi' ? 'समुद्रगुप्त के दरबारी कवि हरिषेण ने प्रयाग प्रशस्ति की रचना की थी।' : 'Harishena, court poet of Samudragupta, composed Prayag Prashasti.'
        },
        {
          id: 4,
          q: language === 'hi' ? 'महाभारत की रचना किस भाषा में हुई है?' : 'In which language was Mahabharata composed?',
          options: ['A) संस्कृत (Sanskrit)', 'B) पालि', 'C) प्राकृत', 'D) हिन्दी'],
          ans: 'A',
          expl: language === 'hi' ? 'महर्षि वेदव्यास द्वारा महाभारत की मूल रचना संस्कृत भाषा में की गई।' : 'Mahabharata was composed in Sanskrit by Sage Ved Vyasa.'
        },
        {
          id: 5,
          q: language === 'hi' ? 'आईन-ए-अकबरी कितने भागों में विभक्त है?' : 'In how many parts is Ain-i-Akbari divided?',
          options: ['A) दो', 'B) तीन', 'C) चार', 'D) पाँच (5 Parts)'],
          ans: 'D',
          expl: language === 'hi' ? 'अबुल फजल द्वारा रचित आईन-ए-अकबरी 5 भागों में विभाजित है।' : 'Ain-i-Akbari composed by Abul Fazl is divided into 5 parts.'
        },
        {
          id: 6,
          q: language === 'hi' ? '1857 के विद्रोह के समय भारत का गवर्नर-जनरल कौन था?' : 'Who was Governor-General of India during 1857 Revolt?',
          options: ['A) लॉर्ड डलहौजी', 'B) लॉर्ड कैनिंग (Lord Canning)', 'C) लॉर्ड वेलेस्ली', 'D) लॉर्ड कर्जन'],
          ans: 'B',
          expl: language === 'hi' ? '1857 की क्रांति के समय लॉर्ड कैनिंग भारत के गवर्नर-जनरल थे।' : 'Lord Canning was Governor-General during the 1857 revolt.'
        },
        {
          id: 7,
          q: language === 'hi' ? 'दांडी किस राज्य में स्थित है?' : 'Dandi is located in which Indian state?',
          options: ['A) बिहार', 'B) उत्तर प्रदेश', 'C) गुजरात (Gujarat)', 'D) महाराष्ट्र'],
          ans: 'C',
          expl: language === 'hi' ? 'महात्मा गांधी ने 1930 में गुजरात के दांडी में नमक कानून तोड़ा था।' : 'Mahatma Gandhi broke Salt Law at Dandi in Gujarat in 1930.'
        },
        {
          id: 8,
          q: language === 'hi' ? 'भारतीय संविधान सभा के प्रारूप समिति के अध्यक्ष कौन थे?' : 'Who was Chairman of Drafting Committee of Constituent Assembly?',
          options: ['A) डॉ. राजेन्द्र प्रसाद', 'B) डॉ. बी. आर. अम्बेडकर (Dr. B.R. Ambedkar)', 'C) जवाहरलाल नेहरू', 'D) सरदार पटेल'],
          ans: 'B',
          expl: language === 'hi' ? 'प्रारूप समिति के अध्यक्ष डॉ. भीमराव अम्बेडकर थे।' : 'Dr. B.R. Ambedkar was Chairman of Drafting Committee.'
        }
      ]
    },
    polscience: {
      name: language === 'hi' ? 'राजनीति विज्ञान (Political Science)' : 'Political Science',
      code: 'POL-12',
      questions: [
        {
          id: 1,
          q: language === 'hi' ? 'भारत में पहला परमाणु परीक्षण कब हुआ था?' : 'When was India’s first nuclear test conducted?',
          options: ['A) 1971', 'B) 1974 (Pokhran-I)', 'C) 1998', 'D) 1980'],
          ans: 'B',
          expl: language === 'hi' ? 'मई 1974 में राजस्थान के पोखरण में पहला परमाणु परीक्षण हुआ।' : 'First nuclear test was conducted in May 1974 at Pokhran.'
        },
        {
          id: 2,
          q: language === 'hi' ? 'संयुक्त राष्ट्र संघ (UNO) की स्थापना कब हुई?' : 'When was the United Nations Organization established?',
          options: ['A) 24 अक्टूबर 1945', 'B) 15 अगस्त 1947', 'C) 10 दिसम्बर 1948', 'D) 26 जनवरी 1950'],
          ans: 'A',
          expl: language === 'hi' ? '24 अक्टूबर 1945 को UNO की विधिवत स्थापना हुई।' : 'UNO was formally established on 24 October 1945.'
        },
        {
          id: 3,
          q: language === 'hi' ? 'पंचशील समझौता किन दो देशों के बीच हुआ था?' : 'Panchsheel Agreement was signed between which two countries?',
          options: ['A) भारत और पाकिस्तान', 'B) भारत और चीन (India & China)', 'C) भारत और रूस', 'D) भारत और अमेरिका'],
          ans: 'B',
          expl: language === 'hi' ? '1954 में भारत और चीन के बीच पंचशील समझौते पर हस्ताक्षर हुए।' : 'Panchsheel Agreement was signed between India and China in 1954.'
        },
        {
          id: 4,
          q: language === 'hi' ? 'भारत में योजना आयोग की स्थापना कब हुई थी?' : 'When was the Planning Commission established in India?',
          options: ['A) 1947', 'B) 1950 (March 1950)', 'C) 1952', 'D) 2014'],
          ans: 'B',
          expl: language === 'hi' ? 'मार्च 1950 में भारत सरकार द्वारा योजना आयोग की स्थापना की गई थी।' : 'Planning Commission was set up in March 1950.'
        }
      ]
    },
    geography: {
      name: language === 'hi' ? 'भूगोल (Geography)' : 'Geography',
      code: 'GEO-12',
      questions: [
        {
          id: 1,
          q: language === 'hi' ? 'मानव भूगोल का जनक किसे कहा जाता है?' : 'Who is known as the father of Human Geography?',
          options: ['A) स्ट्रैबो', 'B) फ्रेडरिक रैटजेल (Friedrich Ratzel)', 'C) हम्बोल्ट', 'D) एलेन सेम्पल'],
          ans: 'B',
          expl: language === 'hi' ? 'फ्रेडरिक रैटजेल को आधुनिक मानव भूगोल का पिता कहा जाता है।' : 'Friedrich Ratzel is regarded as the father of Human Geography.'
        },
        {
          id: 2,
          q: language === 'hi' ? 'भारत में सर्वाधिक जनसंख्या घनत्व वाला राज्य कौन सा है?' : 'Which state in India has highest population density (2011)?',
          options: ['A) उत्तर प्रदेश', 'B) पश्चिम बंगाल', 'C) बिहार (Bihar - 1106/sq km)', 'D) केरल'],
          ans: 'C',
          expl: language === 'hi' ? '2011 की जनगणना के अनुसार 1106 व्यक्ति/वर्ग किमी के साथ बिहार शीर्ष पर है।' : 'According to 2011 census, Bihar ranks #1 with 1,106 persons per sq km.'
        },
        {
          id: 3,
          q: language === 'hi' ? 'बॉक्साइट किस धातु का मुख्य अयस्क है?' : 'Bauxite is an ore of which metal?',
          options: ['A) लोहा', 'B) तांबा', 'C) एल्युमिनियम (Aluminium)', 'D) सोना'],
          ans: 'C',
          expl: language === 'hi' ? 'बॉक्साइट एल्युमिनियम का प्राथमिक अयस्क है।' : 'Bauxite is the primary ore of aluminium.'
        }
      ]
    },
    hindi: {
      name: language === 'hi' ? 'हिन्दी 100 अंक (Hindi 100 Marks)' : 'Hindi 100 Marks',
      code: 'HIN-12',
      questions: [
        {
          id: 1,
          q: '‘बातचीत’ शीर्षक निबंध के निबंधकार कौन हैं?',
          options: ['A) बालकृष्ण भट्ट', 'B) चन्द्रधर शर्मा गुलेरी', 'C) जयप्रकाश नारायण', 'D) रामधारी सिंह दिनकर'],
          ans: 'A',
          expl: '‘बातचीत’ निबंध के रचयिता भारतेंदु युग के प्रमुख निबंधकार बालकृष्ण भट्ट हैं।'
        },
        {
          id: 2,
          q: '‘उसने कहा था’ कहानी किस वर्ष प्रकाशित हुई थी?',
          options: ['A) 1915 ई.', 'B) 1920 ई.', 'C) 1912 ई.', 'D) 1925 ई.'],
          ans: 'A',
          expl: 'चंद्रधर शर्मा गुलेरी जी की अमर कहानी ‘उसने कहा था’ 1915 में सरस्वती पत्रिका में छपी।'
        },
        {
          id: 3,
          q: '‘संपूर्ण क्रांति’ का ऐतिहासिक भाषण पटना के गांधी मैदान में जयप्रकाश नारायण ने कब दिया था?',
          options: ['A) 5 जून 1974', 'B) 6 जून 1975', 'C) 15 अगस्त 1977', 'D) 2 अक्टूबर 1973'],
          ans: 'A',
          expl: 'लोकनायक जयप्रकाश नारायण ने 5 जून 1974 को पटना में संपूर्ण क्रांति का आह्वान किया।'
        }
      ]
    }
  };

  const currentQuestions = questionBanks[selectedSubject]?.questions || questionBanks.history.questions;
  const currentQ = currentQuestions[currentQIndex] || currentQuestions[0];

  // Timer countdown in testing phase
  useEffect(() => {
    if (phase !== 'testing') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartTest = (subKey) => {
    setSelectedSubject(subKey);
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentQIndex(0);
    setTimeLeft(25 * 60);
    setPhase('testing');
  };

  const handleSelectOption = (optChar) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: optChar
    }));
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQIndex]: !prev[currentQIndex]
    }));
  };

  const handleFinishTest = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let unattempted = 0;

    currentQuestions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      if (!selected) {
        unattempted++;
      } else if (selected === q.ans) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const total = currentQuestions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const simulatedRank = Math.max(1, Math.floor(100 - (percentage * 0.95)) + 3);

    setScoreData({
      total,
      correct: correctCount,
      wrong: wrongCount,
      unattempted,
      percentage,
      rank: simulatedRank,
      timeTaken: `${25 - Math.floor(timeLeft / 60)}m ${60 - (timeLeft % 60)}s`,
      subject: questionBanks[selectedSubject]?.name || 'History'
    });
    setPhase('result');
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
              background: 'linear-gradient(135deg, #0D9488, #2DD4BF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(13, 148, 136, 0.4)'
            }}>
              <Award size={20} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                {language === 'hi' ? 'बिहार बोर्ड 2026: OMR टेस्ट सीरीज़' : 'BSEB 2026: OMR Mock Test'}
              </h3>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>
                {phase === 'testing' 
                  ? `${questionBanks[selectedSubject]?.name} • Class ${selectedClass}`
                  : (language === 'hi' ? '50/50 वस्तुनिष्ठ टारगेट मॉडल टेस्ट' : 'Full Marks Target Series')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {phase === 'testing' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 10px',
                background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(13, 148, 136, 0.2)',
                border: timeLeft < 300 ? '1px solid #EF4444' : '1px solid #2DD4BF',
                borderRadius: 9999,
                color: timeLeft < 300 ? '#F87171' : '#2DD4BF',
                fontSize: 12,
                fontWeight: 800
              }}>
                <Clock size={14} />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}
            
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
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>
          
          {/* PHASE 1: SELECT SUBJECT */}
          {phase === 'select_subject' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                background: 'var(--color-accent-teal-tint)',
                border: '1px solid rgba(13, 148, 136, 0.25)',
                borderRadius: 14,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10
              }}>
                <Sparkles size={18} color="var(--color-accent-teal)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--color-accent-teal)' }}>
                    {language === 'hi' ? 'ओएमआर शीट पर अभ्यास करें:' : 'Real OMR Exam Practice:'}
                  </strong>{' '}
                  {language === 'hi' 
                    ? 'बिहार बोर्ड के नए पैटर्न के अनुसार वस्तुनिष्ठ प्रश्नों का लाइव टाइमर टेस्ट दें और तुरंत रिज़ल्ट व रैंक देखें।'
                    : 'Practice board pattern MCQs with live timer and get instant scorecard and state rank.'}
                </div>
              </div>

              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 0' }}>
                {language === 'hi' ? 'विषय चुनें और टेस्ट शुरू करें:' : 'Select Subject to Begin Test:'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Object.keys(questionBanks).map(key => {
                  const sub = questionBanks[key];
                  return (
                    <div
                      key={key}
                      onClick={() => handleStartTest(key)}
                      style={{
                        background: 'var(--bg-app)',
                        border: '1.5px solid var(--border-subtle)',
                        borderRadius: 16,
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent-teal)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: 'var(--color-accent-teal-tint)',
                          color: 'var(--color-accent-teal)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: 15
                        }}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                            {sub.name}
                          </h4>
                          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                            {sub.questions.length} {language === 'hi' ? 'VVI प्रश्न • 25 मिनट' : 'VVI Questions • 25 Mins'}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 700,
                        color: 'var(--color-accent-teal)'
                      }}>
                        <span>{language === 'hi' ? 'टेस्ट दें' : 'Start'}</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PHASE 2: TESTING WITH OMR BUBBLE SIMULATOR */}
          {phase === 'testing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Question Navigation Bubbles Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 8,
                borderBottom: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {language === 'hi' ? 'प्रश्न संख्या:' : 'Question:'} <strong style={{ color: 'var(--text-primary)' }}>{currentQIndex + 1} / {currentQuestions.length}</strong>
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={handleToggleFlag}
                    style={{
                      background: flaggedQuestions[currentQIndex] ? 'rgba(245, 158, 11, 0.15)' : 'none',
                      border: flaggedQuestions[currentQIndex] ? '1px solid #F59E0B' : '1px solid var(--border-subtle)',
                      borderRadius: 8,
                      padding: '4px 8px',
                      fontSize: 11,
                      fontWeight: 700,
                      color: flaggedQuestions[currentQIndex] ? '#D97706' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    ★ {flaggedQuestions[currentQIndex] ? (language === 'hi' ? 'चिह्नित' : 'Flagged') : (language === 'hi' ? 'मार्क करें' : 'Flag')}
                  </button>

                  <button
                    onClick={() => setIsOmrSheetOpen(!isOmrSheetOpen)}
                    style={{
                      background: isOmrSheetOpen ? 'var(--color-accent-teal)' : 'var(--color-accent-teal-tint)',
                      border: '1px solid var(--color-accent-teal)',
                      color: isOmrSheetOpen ? '#FFFFFF' : 'var(--color-accent-teal)',
                      borderRadius: 8,
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {isOmrSheetOpen ? 'Hide OMR' : 'View OMR'}
                  </button>
                </div>
              </div>

              {/* Quick Number Strip */}
              <div style={{
                display: 'flex',
                gap: 6,
                overflowX: 'auto',
                paddingBottom: 4
              }}>
                {currentQuestions.map((_, idx) => {
                  const isCurrent = idx === currentQIndex;
                  const isAnswered = Boolean(userAnswers[idx]);
                  const isFlagged = Boolean(flaggedQuestions[idx]);

                  let bgColor = 'var(--bg-app)';
                  let textColor = 'var(--text-secondary)';
                  let borderColor = 'var(--border-subtle)';

                  if (isAnswered) {
                    bgColor = 'rgba(16, 185, 129, 0.15)';
                    textColor = '#059669';
                    borderColor = '#10B981';
                  }
                  if (isFlagged) {
                    bgColor = 'rgba(245, 158, 11, 0.2)';
                    textColor = '#D97706';
                    borderColor = '#F59E0B';
                  }
                  if (isCurrent) {
                    bgColor = 'var(--color-accent-teal)';
                    textColor = '#FFFFFF';
                    borderColor = 'var(--color-accent-teal)';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQIndex(idx)}
                      style={{
                        minWidth: 32,
                        height: 32,
                        borderRadius: 8,
                        background: bgColor,
                        color: textColor,
                        border: `1.5px solid ${borderColor}`,
                        fontSize: 12,
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* OMR Grid Popover if active */}
              {isOmrSheetOpen && (
                <div style={{
                  background: 'var(--bg-surface-subtle)',
                  border: '1.5px solid var(--color-accent-teal)',
                  borderRadius: 14,
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-accent-teal)' }}>
                    {language === 'hi' ? 'डिजिटल ओएमआर शीट (टैप करके भरें):' : 'Interactive Digital OMR Sheet:'}
                  </span>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 8,
                    maxHeight: '140px',
                    overflowY: 'auto'
                  }}>
                    {currentQuestions.map((_, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                        fontWeight: 700
                      }}>
                        <span style={{ width: 18, color: 'var(--text-tertiary)' }}>{idx + 1}.</span>
                        {['A', 'B', 'C', 'D'].map(letter => {
                          const isFilled = userAnswers[idx] === letter;
                          return (
                            <div
                              key={letter}
                              onClick={() => {
                                setUserAnswers(prev => ({ ...prev, [idx]: letter }));
                                setCurrentQIndex(idx);
                              }}
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: isFilled ? '2px solid #0D9488' : '1.5px solid var(--border-subtle)',
                                background: isFilled ? '#0D9488' : 'transparent',
                                color: isFilled ? '#FFFFFF' : 'var(--text-secondary)',
                                fontSize: 9,
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              {letter}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Question Display Card */}
              <div style={{
                background: 'var(--bg-app)',
                borderRadius: 16,
                padding: '16px',
                border: '1px solid var(--border-subtle)'
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                  Q{currentQIndex + 1}. {currentQ.q}
                </h3>
              </div>

              {/* Options List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {currentQ.options.map((optText, optIdx) => {
                  const optLetter = ['A', 'B', 'C', 'D'][optIdx];
                  const isSelected = userAnswers[currentQIndex] === optLetter;

                  return (
                    <div
                      key={optLetter}
                      onClick={() => handleSelectOption(optLetter)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 14,
                        background: isSelected ? 'var(--color-accent-teal-tint)' : 'var(--bg-surface)',
                        border: isSelected ? '2px solid var(--color-accent-teal)' : '1.5px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* OMR Bubble */}
                      <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: isSelected ? '2px solid var(--color-accent-teal)' : '2px solid var(--border-subtle)',
                        background: isSelected ? 'var(--color-accent-teal)' : 'transparent',
                        color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 12,
                        flexShrink: 0
                      }}>
                        {optLetter}
                      </div>

                      <span style={{
                        fontSize: 13,
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? 'var(--color-accent-teal)' : 'var(--text-primary)'
                      }}>
                        {optText.replace(/^[A-D]\)\s*/, '')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Navigation Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
                paddingTop: 12,
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-app)',
                    color: 'var(--text-primary)',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: currentQIndex === 0 ? 'default' : 'pointer',
                    opacity: currentQIndex === 0 ? 0.4 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <ArrowLeft size={14} />
                  <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
                </button>

                {currentQIndex < currentQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="btn-primary"
                    style={{ padding: '10px 18px', fontSize: 13, borderRadius: 12 }}
                  >
                    <span>{language === 'hi' ? 'अगला प्रश्न' : 'Next Question'}</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishTest}
                    style={{
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)'
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>{language === 'hi' ? 'OMR सबमिट करें' : 'Submit OMR'}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* PHASE 3: OFFICIAL RESULT CARD & SCORE */}
          {phase === 'result' && scoreData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Scorecard Banner */}
              <div style={{
                background: scoreData.percentage >= 80 
                  ? 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)' 
                  : 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                color: '#FFFFFF',
                borderRadius: 20,
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px'
                }}>
                  <Trophy size={28} color="#FBBF24" />
                </div>

                <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85 }}>
                  {language === 'hi' ? 'आदर्श आर्ट्स क्लासेज • स्कोरकार्ड' : 'Ideal Arts Academy Scorecard'}
                </span>
                
                <h2 style={{ fontSize: 32, fontWeight: 900, margin: '4px 0 2px' }}>
                  {scoreData.correct} / {scoreData.total}
                </h2>
                
                <p style={{ fontSize: 13, margin: '0 0 14px', opacity: 0.9 }}>
                  {scoreData.percentage >= 80 
                    ? (language === 'hi' ? 'शानदार! आप टॉपर ज़ोन में हैं' : 'Outstanding! You are in Topper Zone') 
                    : (language === 'hi' ? 'अच्छा प्रयास! थोड़ी और मेहनत से 100% अंक आएँगे' : 'Good effort! Practice more to score 100%')}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '10px',
                  borderRadius: 14
                }}>
                  <div>
                    <span style={{ fontSize: 10, opacity: 0.75 }}>{language === 'hi' ? 'सटीकता' : 'Accuracy'}</span>
                    <h4 style={{ fontSize: 15, fontWeight: 800, margin: '2px 0 0', color: '#34D399' }}>{scoreData.percentage}%</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, opacity: 0.75 }}>{language === 'hi' ? 'अनुमानित रैंक' : 'Est. Rank'}</span>
                    <h4 style={{ fontSize: 15, fontWeight: 800, margin: '2px 0 0', color: '#FBBF24' }}>#{scoreData.rank}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, opacity: 0.75 }}>{language === 'hi' ? 'समय लिया' : 'Time Taken'}</span>
                    <h4 style={{ fontSize: 15, fontWeight: 800, margin: '2px 0 0', color: '#93C5FD' }}>{scoreData.timeTaken}</h4>
                  </div>
                </div>
              </div>

              {/* Detailed Solutions & Answers Review */}
              <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0' }}>
                {language === 'hi' ? 'उत्तर कुंजी व व्याख्या (Answer Key):' : 'Answer Key & Explanations:'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {currentQuestions.map((q, idx) => {
                  const userChoice = userAnswers[idx];
                  const isCorrect = userChoice === q.ans;
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 14px',
                        background: 'var(--bg-app)',
                        borderRadius: 14,
                        border: isCorrect ? '1.5px solid #10B981' : (userChoice ? '1.5px solid #EF4444' : '1px solid var(--border-subtle)'),
                        fontSize: 12
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 6 }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{idx + 1}. {q.q}</strong>
                        <span style={{
                          fontSize: 10,
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: 6,
                          background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: isCorrect ? '#059669' : '#DC2626'
                        }}>
                          {isCorrect ? '✓ Correct' : (userChoice ? '✗ Wrong' : 'Skipped')}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>
                        <span>{language === 'hi' ? 'आपका उत्तर:' : 'Your Ans:'} <strong>{userChoice || 'None'}</strong></span>
                        <span>{language === 'hi' ? 'सही उत्तर:' : 'Correct Ans:'} <strong style={{ color: '#059669' }}>{q.ans}</strong></span>
                      </div>

                      <div style={{ fontSize: 11, color: 'var(--color-accent-teal)', background: 'var(--color-accent-teal-tint)', padding: '6px 8px', borderRadius: 8 }}>
                        💡 {q.expl}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions Button */}
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button
                  onClick={() => handleStartTest(selectedSubject)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 12,
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--bg-app)',
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <RotateCcw size={15} />
                  <span>{language === 'hi' ? 'पुनः टेस्ट दें' : 'Retake Test'}</span>
                </button>

                <button
                  onClick={() => setPhase('select_subject')}
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px', fontSize: 13, borderRadius: 12 }}
                >
                  <span>{language === 'hi' ? 'अन्य विषय चुनें' : 'Other Subjects'}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
