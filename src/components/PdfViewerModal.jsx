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
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          <div style={{ padding: '16px', color: '#1E293B' }}>
            <h5 style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>
              Chapter Notes & Reference Schematics
            </h5>
            <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
              Ideal Arts Classes official curriculum material. Designed for observational drawing practice, accurate proportions, and master artist value studies.
            </p>
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
