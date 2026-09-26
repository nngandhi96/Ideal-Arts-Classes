import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, Share2, Check, Bookmark } from 'lucide-react';

export function PdfViewerModal({ resource, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSaved, setIsSaved] = useState(false);

  if (!resource) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 95,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Top Bar */}
      <div style={{
        padding: '12px 16px',
        background: '#1E293B',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ minWidth: 0, flex: 1, marginRight: 10 }}>
          <h4 style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {resource.title}
          </h4>
          <span style={{ fontSize: 10, color: '#94A3B8' }}>
            {resource.pages || resource.duration} • By {resource.author}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setIsSaved(!isSaved)}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              color: isSaved ? '#2DD4BF' : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Save for offline"
          >
            {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              color: '#FFFFFF',
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

      {/* Reader Body */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        background: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
      }}>
        <div style={{
          width: '100%',
          maxWidth: 380,
          background: '#FFFFFF',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          transform: `scale(${zoomLevel / 100})`,
          transition: 'transform 0.2s ease'
        }}>
          {resource.thumbnail ? (
            <img 
              src={resource.thumbnail} 
              alt={resource.title}
              style={{ width: '100%', height: 'auto', maxHeight: 200, objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              color: '#FFFFFF',
              padding: '20px 16px',
              borderBottom: '3px solid var(--color-accent-teal)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-accent-teal)', textTransform: 'uppercase' }}>
                  Ideal Arts Classes • Official Material
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  background: resource.badgeColor || '#059669',
                  color: '#FFF',
                  padding: '2px 8px',
                  borderRadius: 4
                }}>
                  {resource.badge || 'Study Guide'}
                </span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.4 }}>
                {resource.title}
              </h3>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                विषय: <strong style={{ color: '#E2E8F0' }}>{resource.subjectName}</strong> • {resource.pages}
              </p>
            </div>
          )}

          <div style={{ padding: '16px', color: '#1E293B' }}>
            {resource.formatType === 'objective' ? (
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: '#ECFDF5',
                  color: '#059669',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  marginBottom: 10
                }}>
                  <span>🎯 वस्तुनिष्ठ बहुविकल्पीय प्रश्न (Sample Preview)</span>
                </div>
                <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: 8, border: '1px solid #E2E8F0', marginBottom: 10 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                    Q1. हड़प्पा सभ्यता की खोज किस वर्ष हुई थी?
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 11, color: '#334155' }}>
                    <span>(A) 1920 ई.</span>
                    <span style={{ color: '#059669', fontWeight: 700 }}>(B) 1921 ई. ✓</span>
                    <span>(C) 1922 ई.</span>
                    <span>(D) 1925 ई.</span>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: '#64748B' }}>
                  पूर्ण OMR उत्तर-पुस्तिका एवं 100+ प्रश्नों का विस्तृत संकलन इस PDF में सम्मिलित है।
                </p>
              </div>
            ) : (
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: '#EFF6FF',
                  color: '#2563EB',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  marginBottom: 10
                }}>
                  <span>📝 विषयनिष्ठ (Subjective) मॉडल उत्तर</span>
                </div>
                <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: 8, border: '1px solid #E2E8F0', marginBottom: 10 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                    प्रश्न: शीत युद्ध से आप क्या समझते हैं? इसके प्रमुख कारणों पर प्रकाश डालें। [5 अंक]
                  </p>
                  <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.5 }}>
                    <strong>मुख्य बिंदु:</strong> द्वितीय विश्वयुद्ध के पश्चात अमेरिका और सोवियत संघ के बीच वैचारिक, सामरिक एवं राजनयिक तनाव की स्थिति...
                  </p>
                </div>
                <p style={{ fontSize: 11, color: '#64748B' }}>
                  हस्तलिखित नोट्स एवं परीक्षा में अंक प्राप्त करने हेतु सटीक हेडिंग शैली दी गई है।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Tool Bar */}
      <div style={{
        padding: '10px 16px',
        background: '#1E293B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#CBD5E1'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))}
            style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer' }}
          >
            <ZoomOut size={16} />
          </button>
          <span style={{ fontSize: 11, fontWeight: 600 }}>{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(130, prev + 15))}
            style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer' }}
          >
            <ZoomIn size={16} />
          </button>
        </div>

        <button
          onClick={() => {
            setIsSaved(true);
            alert('Study material downloaded to offline storage!');
          }}
          className="btn-primary"
          style={{ padding: '6px 14px', fontSize: 11, borderRadius: 8 }}
        >
          <Download size={13} />
          <span>Save PDF</span>
        </button>
      </div>
    </div>
  );
}
