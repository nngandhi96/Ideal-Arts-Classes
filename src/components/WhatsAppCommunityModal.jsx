import React, { useState } from 'react';
import { 
  X, MessageCircle, PhoneCall, Users, Send, ExternalLink, 
  Check, Sparkles, ShieldCheck, HeartHandshake, PhoneForwarded
} from 'lucide-react';

export function WhatsAppCommunityModal({ isOpen, onClose, language = 'hi', selectedClass = '12th', currentUser }) {
  if (!isOpen) return null;

  const [messageText, setMessageText] = useState(
    language === 'hi' 
      ? 'नमस्ते सर, मैं आइडियल आर्ट्स क्लासेज का छात्र हूँ। मुझे 12वीं बोर्ड परीक्षा मार्गदर्शन चाहिए।' 
      : 'Hello Sir, I am an Ideal Arts Classes student. I need guidance regarding board exams.'
  );

  const studentName = currentUser?.user_metadata?.full_name || 
    (currentUser?.email ? currentUser.email.split('@')[0] : 'Nandan');

  const officialGroups = [
    {
      id: 'grp-12',
      name: language === 'hi' ? '12वीं आर्ट्स टॉपर WhatsApp ग्रुप (Official)' : '12th Arts Topper Official Group',
      members: '2,480+ छात्र जुड़े हैं',
      link: 'https://chat.whatsapp.com/sample-ideal-arts-12th',
      badge: 'BSEB 2026 Batch',
      isPrimary: true
    },
    {
      id: 'grp-11',
      name: language === 'hi' ? '11वीं आर्ट्स फाउंडेशन बैच ग्रुप' : '11th Arts Foundation Batch',
      members: '1,820+ छात्र जुड़े हैं',
      link: 'https://chat.whatsapp.com/sample-ideal-arts-11th',
      badge: 'Foundation',
      isPrimary: false
    },
    {
      id: 'grp-tg',
      name: language === 'hi' ? 'टेलीग्राम चैनल (फ्री PDF नोट्स & क्विज़)' : 'Telegram Channel (Free PDF Notes)',
      members: '5,200+ सब्सक्राइबर्स',
      link: 'https://t.me/sample_ideal_arts_official',
      badge: 'Daily PDFs',
      isPrimary: false
    }
  ];

  const handleOpenDirectorChat = () => {
    const encoded = encodeURIComponent(`${messageText} - (Student: ${studentName}, Class: ${selectedClass})`);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
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
        maxWidth: '480px',
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
          background: 'linear-gradient(135deg, #065F46 0%, #064E3B 100%)',
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
              background: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.4)'
            }}>
              <MessageCircle size={20} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                {language === 'hi' ? 'WhatsApp कम्युनिटी & हेल्पडेस्क' : 'Official WhatsApp Community'}
              </h3>
              <span style={{ fontSize: 11, color: '#A7F3D0' }}>
                आदर्श आर्ट्स क्लासेज • 24x7 शिक्षक सहायता
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

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Quick Notice */}
          <div style={{
            background: 'rgba(37, 211, 102, 0.1)',
            border: '1px solid rgba(37, 211, 102, 0.3)',
            borderRadius: 14,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10
          }}>
            <HeartHandshake size={20} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: '#059669' }}>
                {language === 'hi' ? 'सीधे शिक्षकों से जुड़ें:' : 'Connect with Faculty:'}
              </strong>{' '}
              {language === 'hi' 
                ? 'ग्रुप में प्रतिदिन लाइव क्लास लिंक, हस्तलिखित नोट्स, और बोर्ड परीक्षा के महत्वपूर्ण नोटिस शेयर किए जाते हैं।'
                : 'Join official batch groups for daily live class links, handwritten PDFs, and board exam notices.'}
            </div>
          </div>

          {/* Official WhatsApp Groups List */}
          <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 0' }}>
            {language === 'hi' ? 'आधिकारिक बैच ग्रुप से जुड़ें:' : 'Join Official Batch Groups:'}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {officialGroups.map(grp => (
              <a
                key={grp.id}
                href={grp.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--bg-surface)',
                  border: grp.isPrimary ? '1.5px solid #25D366' : '1.5px solid var(--border-subtle)',
                  borderRadius: 16,
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  boxShadow: grp.isPrimary ? '0 4px 14px rgba(37, 211, 102, 0.15)' : 'none',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: grp.isPrimary ? 'rgba(37, 211, 102, 0.15)' : 'var(--bg-app)',
                    color: grp.isPrimary ? '#059669' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                        {grp.name}
                      </h4>
                    </div>
                    <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>
                      ● {grp.members}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '7px 12px',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <span>{language === 'hi' ? 'जुड़ें' : 'Join'}</span>
                  <ExternalLink size={12} />
                </div>
              </a>
            ))}
          </div>

          {/* Direct 1-on-1 Faculty Chat */}
          <div style={{
            background: 'var(--bg-app)',
            borderRadius: 16,
            padding: '16px',
            border: '1.5px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PhoneForwarded size={16} color="var(--color-accent-teal)" />
              <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {language === 'hi' ? 'निदेशक / शिक्षक से सीधा संवाद:' : 'Direct Chat with Director:'}
              </h4>
            </div>

            <textarea
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type message for faculty..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 12,
                border: '1.5px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: 12,
                lineHeight: 1.5,
                outline: 'none',
                resize: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={handleOpenDirectorChat}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 12,
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={16} />
                <span>{language === 'hi' ? 'व्हाट्सएप पर भेजें' : 'Send on WhatsApp'}</span>
              </button>

              <a
                href="tel:9876543210"
                style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <PhoneCall size={16} color="#0D9488" />
                <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
