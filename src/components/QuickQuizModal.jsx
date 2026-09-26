import React, { useState } from 'react';
import { 
  X, CheckCircle, AlertCircle, Award, RotateCcw, 
  ChevronRight, Timer, Sparkles, BookOpen, Target, Flame
} from 'lucide-react';

const SAMPLE_QUIZ_QUESTIONS = {
  'history': [
    {
      id: 1,
      question: 'हड़प्पा सभ्यता का सबसे बड़ा नगर कौन-सा था?',
      options: ['मोहनजोदड़ो', 'कालीबंगन', 'लोथल', 'राखीगढ़ी'],
      correctIndex: 0,
      explanation: 'मोहनजोदड़ो हड़प्पा सभ्यता का सबसे प्रमुख और विशाल सुनियोजित नगर था, जहाँ विशाल स्नानागार और अन्नागार मिले हैं।'
    },
    {
      id: 2,
      question: 'महाभारत की रचना किस भाषा में हुई थी?',
      options: ['प्राकृत', 'पालि', 'संस्कृत', 'हिन्दी'],
      correctIndex: 2,
      explanation: 'महाभारत की मूल रचना महर्षि वेदव्यास द्वारा संस्कृत भाषा में की गई थी।'
    },
    {
      id: 3,
      question: 'आईन-ए-अकबरी के लेखक कौन थे?',
      options: ['बदायूँनी', 'अकबर', 'अबुल फजल', 'फैजी'],
      correctIndex: 2,
      explanation: 'आईन-ए-अकबरी मुग़ल बादशाह अकबर के नवरत्नों में से एक अबुल फजल द्वारा फारसी में लिखी गई थी।'
    },
    {
      id: 4,
      question: '1857 के विद्रोह का तात्कालिक कारण क्या था?',
      options: ['डलहौजी की हड़प नीति', 'चर्बी वाले कारतूस', 'सती प्रथा का अंत', 'ईसाई धर्म का प्रचार'],
      correctIndex: 1,
      explanation: 'एनफील्ड राइफल में प्रयुक्त होने वाले चर्बी वाले कारतूस 1857 की क्रांति का मुख्य तात्कालिक कारण बने।'
    },
    {
      id: 5,
      question: 'विजयनगर साम्राज्य की स्थापना कब और किसने की थी?',
      options: ['1336 में हरिहर एवं बुक्का ने', '1347 में अलाउद्दीन ने', '1526 में बाबर ने', '1565 में रामराय ने'],
      correctIndex: 0,
      explanation: 'विजयनगर साम्राज्य की स्थापना 1336 ई. में हरिहर और बुक्का नामक दो भाइयों ने की थी।'
    }
  ],
  'polscience': [
    {
      id: 1,
      question: 'भारतीय संविधान की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?',
      options: ['डॉ. राजेंद्र प्रसाद', 'डॉ. भीमराव अंबेडकर', 'पंडित जवाहरलाल नेहरू', 'सरदार वल्लभभाई पटेल'],
      correctIndex: 1,
      explanation: 'संविधान की प्रारूप समिति के अध्यक्ष बाबा साहेब डॉ. भीमराव अंबेडकर थे।'
    },
    {
      id: 2,
      question: 'गुटनिरपेक्ष आंदोलन (NAM) का प्रथम शिखर सम्मेलन कहाँ हुआ था?',
      options: ['नई दिल्ली', 'काहिरा', 'बेलग्रेड', 'बांडुंग'],
      correctIndex: 2,
      explanation: 'गुटनिरपेक्ष आंदोलन का पहला शिखर सम्मेलन 1961 में बेलग्रेड (यूगोस्लाविया) में हुआ था।'
    },
    {
      id: 3,
      question: 'भारत में पहली बार आपातकाल (Emergency) किस वर्ष लगाया गया था?',
      options: ['1971', '1975', '1977', '1980'],
      correctIndex: 1,
      explanation: '25 जून 1975 को प्रधानमंत्री इंदिरा गांधी के समय आंतरिक अशांति के आधार पर राष्ट्रीय आपातकाल लागू हुआ।'
    }
  ],
  'geography': [
    {
      id: 1,
      question: 'मानव भूगोल का जनक किसे कहा जाता है?',
      options: ['फ्रेडरिक रैटजेल', 'विडाल डी ला ब्लाश', 'इरैटोस्थनीज', 'अलेक्जेंडर वॉन हम्बोल्ट'],
      correctIndex: 0,
      explanation: 'जर्मन भूगोलवेत्ता फ्रेडरिक रैटजेल (Friedrich Ratzel) को आधुनिक मानव भूगोल का पिता कहा जाता है।'
    },
    {
      id: 2,
      question: 'भारत का सबसे अधिक जनसंख्या घनत्व वाला राज्य कौन-सा है?',
      options: ['उत्तर प्रदेश', 'पश्चिम बंगाल', 'बिहार', 'केरल'],
      correctIndex: 2,
      explanation: '2011 की जनगणना के अनुसार 1106 व्यक्ति प्रति वर्ग किमी के साथ बिहार सबसे सघन राज्य है।'
    }
  ]
};

export function QuickQuizModal({ subjectId = 'history', subjectName = 'इतिहास (History)', onClose }) {
  const questions = SAMPLE_QUIZ_QUESTIONS[subjectId] || SAMPLE_QUIZ_QUESTIONS['history'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answersHistory, setAnswersHistory] = useState([]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return; // already answered this question
    setSelectedOption(index);
    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnswersHistory(prev => [...prev, {
      questionId: currentQ.id,
      selected: index,
      isCorrect
    }]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswersHistory([]);
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: 16
    }}>
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 20,
        width: '100%',
        maxWidth: 480,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'rgba(13, 148, 136, 0.25)',
              border: '1px solid rgba(45, 212, 191, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2DD4BF'
            }}>
              <Target size={18} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#2DD4BF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Bihar Board 2026 MCQ Marathon
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>
                {subjectName} Quiz
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        {!showResult ? (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                प्रश्न {currentIndex + 1} of {questions.length}
              </span>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--color-accent-teal)',
                background: 'var(--color-accent-teal-tint)',
                padding: '2px 8px',
                borderRadius: 9999
              }}>
                Current Score: {score}
              </span>
            </div>

            <div style={{ height: 6, background: 'var(--bg-surface-subtle)', borderRadius: 9999, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--color-accent-teal) 0%, #10B981 100%)',
                borderRadius: 9999,
                transition: 'width 0.3s ease'
              }} />
            </div>

            {/* Question Text */}
            <div style={{
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
              padding: '16px'
            }}>
              <p style={{
                fontSize: 15,
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.45,
                margin: 0
              }}>
                {currentQ.question}
              </p>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let bg = 'var(--bg-surface)';
                let border = '1px solid var(--border-subtle)';
                let color = 'var(--text-primary)';

                if (selectedOption !== null) {
                  if (isCorrect) {
                    bg = 'rgba(16, 185, 129, 0.12)';
                    border = '1.5px solid #10B981';
                    color = '#047857';
                  } else if (isSelected) {
                    bg = 'rgba(239, 68, 68, 0.12)';
                    border = '1.5px solid #EF4444';
                    color = '#B91C1C';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    style={{
                      background: bg,
                      border: border,
                      borderRadius: 12,
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: selectedOption === null ? 'pointer' : 'default',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: isSelected || (selectedOption !== null && isCorrect)
                          ? (isCorrect ? '#10B981' : '#EF4444')
                          : 'var(--bg-surface-subtle)',
                        color: isSelected || (selectedOption !== null && isCorrect) ? '#FFFFFF' : 'var(--text-secondary)',
                        fontSize: 11,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: color }}>
                        {option}
                      </span>
                    </div>

                    {selectedOption !== null && isCorrect && (
                      <CheckCircle size={18} color="#10B981" />
                    )}
                    {selectedOption !== null && isSelected && !isCorrect && (
                      <AlertCircle size={18} color="#EF4444" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {selectedOption !== null && (
              <div style={{
                background: 'rgba(13, 148, 136, 0.08)',
                border: '1px solid rgba(13, 148, 136, 0.25)',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 12,
                color: 'var(--text-secondary)',
                lineHeight: 1.4
              }}>
                <strong style={{ color: 'var(--color-accent-teal)' }}>स्पष्टीकरण: </strong>
                {currentQ.explanation}
              </div>
            )}

            {/* Action Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="btn-primary"
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  fontSize: 13,
                  opacity: selectedOption === null ? 0.5 : 1,
                  cursor: selectedOption === null ? 'not-allowed' : 'pointer'
                }}
              >
                <span>{currentIndex < questions.length - 1 ? 'अगला प्रश्न' : 'परिणाम देखें'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div style={{ padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: percentage >= 60 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
              border: `2px solid ${percentage >= 60 ? '#10B981' : '#F59E0B'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: percentage >= 60 ? '#10B981' : '#F59E0B'
            }}>
              <Award size={36} />
            </div>

            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
                {percentage >= 80 ? 'शानदार प्रदर्शन! 🌟' : percentage >= 60 ? 'बहुत अच्छा प्रयास! 👍' : 'और अभ्यास की आवश्यकता है 💪'}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                आपने {questions.length} में से {score} प्रश्न सही किए ({percentage}%)
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: 16,
              background: 'var(--bg-surface-subtle)',
              padding: '12px 24px',
              borderRadius: 14,
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10B981' }}>{score}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>सही उत्तर</div>
              </div>
              <div style={{ width: 1, background: 'var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#EF4444' }}>{questions.length - score}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>गलत उत्तर</div>
              </div>
              <div style={{ width: 1, background: 'var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-accent-teal)' }}>{percentage}%</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>सटीकता</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 8 }}>
              <button
                onClick={handleRestart}
                className="btn-secondary"
                style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: 13 }}
              >
                <RotateCcw size={14} />
                <span>पुनः प्रयास करें</span>
              </button>

              <button
                onClick={onClose}
                className="btn-primary"
                style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: 13 }}
              >
                <span>समाप्त</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
