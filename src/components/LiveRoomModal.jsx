import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Hand, MessageSquare, Image, Settings, 
  Volume2, VolumeX, Maximize2, Users, Radio, Sparkles, 
  Download, Check, Mic, MicOff, AlertCircle, Bookmark 
} from 'lucide-react';

export function LiveRoomModal({ onClose }) {
  const [activeDrawer, setActiveDrawer] = useState('chat'); // 'chat' | 'notes' | 'settings'
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isHandApproved, setIsHandApproved] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [streamQuality, setStreamQuality] = useState('1080p HD');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Prof. Ramesh Kulkarni', role: 'Instructor', text: 'Welcome everyone! Today we are focusing on multi-point vanishing guides for interior rooms.', isTeacher: true, time: '10:02 AM' },
    { id: 2, sender: 'Pooja Verma', role: 'Student', text: 'Sir, should we use 2B or 4B pencil for initial layout lines?', isTeacher: false, time: '10:05 AM' },
    { id: 3, sender: 'Prof. Ramesh Kulkarni', role: 'Instructor', text: 'Always use 2H or 2B with very light pressure for layout so it is easily erasable.', isTeacher: true, time: '10:06 AM' },
    { id: 4, sender: 'Rohan Deshmukh', role: 'Student', text: 'The perspective grid on whiteboard is super clear now!', isTeacher: false, time: '10:12 AM' }
  ]);

  const whiteboardSnapshots = [
    {
      id: 'snap-1',
      title: 'Perspective Grid & Eye-Level Horizon',
      timestamp: '10:14 AM • Step 1',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      description: 'Horizon line marking at 30% canvas height with 2 distinct vanishing points.'
    },
    {
      id: 'snap-2',
      title: 'Isometric Angle Construction of Furniture',
      timestamp: '10:25 AM • Step 2',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
      description: 'Cross-hatching tone values under directional light source from top-left.'
    }
  ];

  // Animated canvas drawing simulation for live art stream
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background canvas tint
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid / Easel drawing lines
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.4)';
      ctx.lineWidth = 1.5;

      // Horizon Line
      ctx.beginPath();
      ctx.moveTo(20, 110);
      ctx.lineTo(380, 110);
      ctx.stroke();

      // Vanishing Points
      const vp1 = { x: 50, y: 110 };
      const vp2 = { x: 350, y: 110 };

      // Perspective Rays
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(vp1.x, vp1.y);
        ctx.lineTo(380, 40 + i * 40);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(vp2.x, vp2.y);
        ctx.lineTo(20, 40 + i * 40);
        ctx.stroke();
      }

      // Animated pencil drawing a 3D building block
      const progress = (Math.sin(step * 0.03) + 1) / 2;
      ctx.strokeStyle = '#0D9488';
      ctx.lineWidth = 3;

      // Front vertical pillar
      ctx.beginPath();
      ctx.moveTo(200, 70);
      ctx.lineTo(200, 180 * progress);
      ctx.stroke();

      // Perspective faces
      ctx.beginPath();
      ctx.moveTo(200, 70);
      ctx.lineTo(130 * progress + 70, 95);
      ctx.lineTo(130 * progress + 70, 160);
      ctx.lineTo(200, 180 * progress);
      ctx.stroke();

      // Animated drawing tip pointer
      ctx.fillStyle = '#FF6B4A';
      ctx.beginPath();
      ctx.arc(130 * progress + 70, 95, 4, 0, Math.PI * 2);
      ctx.fill();

      step += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Aarav Sharma (You)',
      role: 'Student',
      text: chatMessage.trim(),
      isTeacher: false,
      time: 'Just now'
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatMessage('');

    // Teacher simulated quick response after 2 seconds
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'Prof. Ramesh Kulkarni',
          role: 'Instructor',
          text: 'Great observation Aarav! Make sure to align the bottom contour with the lower guide.',
          isTeacher: true,
          time: 'Just now'
        }
      ]);
    }, 2200);
  };

  const handleRaiseHand = () => {
    if (!isHandRaised) {
      setIsHandRaised(true);
      setTimeout(() => {
        setIsHandApproved(true);
      }, 2500);
    } else {
      setIsHandRaised(false);
      setIsHandApproved(false);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      background: 'var(--color-primary-navy-dark)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      
      {/* Top Bar inside Live Room */}
      <div style={{
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#EF4444',
            padding: '3px 8px',
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 800
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF' }} />
            LIVE
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 190 }}>
              Perspective Drawing
            </h4>
            <span style={{ fontSize: 10, color: '#94A3B8' }}>
              Prof. Ramesh Kulkarni
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 11,
            color: '#2DD4BF',
            background: 'rgba(45, 212, 191, 0.15)',
            padding: '3px 8px',
            borderRadius: 9999
          }}>
            <Users size={12} />
            <span>142</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close Live Room"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* 16:9 Stream Player Video Canvas */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 225,
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <canvas 
          ref={canvasRef} 
          width={412} 
          height={225} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Live Easel Camera Watermark */}
        <div style={{
          position: 'absolute',
          top: 10,
          left: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          padding: '2px 8px',
          borderRadius: 6,
          fontSize: 10,
          color: '#E2E8F0'
        }}>
          <span>CAM 1: Overhead Easel View</span>
        </div>

        {/* Teacher PiP Video in top right */}
        <div style={{
          position: 'absolute',
          top: 10,
          right: 12,
          width: 76,
          height: 96,
          borderRadius: 10,
          overflow: 'hidden',
          border: '2px solid var(--color-accent-teal)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          background: '#1E293B'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80" 
            alt="Instructor"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            insetInline: 0,
            background: 'rgba(0,0,0,0.7)',
            fontSize: 8,
            color: '#FFFFFF',
            textAlign: 'center',
            padding: '1px 0'
          }}>
            Prof. Ramesh
          </div>
        </div>

        {/* Player Controls Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          insetInline: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span style={{ fontSize: 11, color: '#CBD5E1' }}>00:25:40 / 01:30:00</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
            {/* Resolution Selector */}
            <button
              onClick={() => setShowQualityMenu(!showQualityMenu)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#FFFFFF',
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {streamQuality}
            </button>

            {showQualityMenu && (
              <div style={{
                position: 'absolute',
                bottom: 30,
                right: 0,
                background: '#1E293B',
                borderRadius: 8,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                zIndex: 60
              }}>
                {['1080p HD', '720p', '480p', 'Auto'].map(q => (
                  <button
                    key={q}
                    onClick={() => { setStreamQuality(q); setShowQualityMenu(false); }}
                    style={{
                      background: streamQuality === q ? 'var(--color-accent-teal)' : 'transparent',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '5px 12px',
                      borderRadius: 6,
                      fontSize: 11,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <button style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}>
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Raised Hand Banner notification */}
      {isHandRaised && (
        <div style={{
          background: isHandApproved ? 'linear-gradient(90deg, #0D9488 0%, #14B8A6 100%)' : '#D97706',
          color: '#FFFFFF',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 12,
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease-in'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isHandApproved ? <Mic size={16} /> : <Hand size={16} />}
            <span>
              {isHandApproved 
                ? 'Teacher granted microphone! You can now speak.' 
                : 'Hand Raised (#2 in queue) • Waiting for teacher...'}
            </span>
          </div>
          <button
            onClick={handleRaiseHand}
            style={{
              background: 'rgba(0, 0, 0, 0.25)',
              border: 'none',
              color: '#FFFFFF',
              padding: '2px 8px',
              borderRadius: 6,
              fontSize: 10,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Lower Hand
          </button>
        </div>
      )}

      {/* Drawer Mode Tabs (Chat vs Whiteboard Snapshots) */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: '#131B2E'
      }}>
        <button
          onClick={() => setActiveDrawer('chat')}
          style={{
            flex: 1,
            padding: '10px 0',
            background: activeDrawer === 'chat' ? 'rgba(13, 148, 136, 0.15)' : 'transparent',
            border: 'none',
            borderBottom: activeDrawer === 'chat' ? '2px solid var(--color-accent-teal)' : '2px solid transparent',
            color: activeDrawer === 'chat' ? '#2DD4BF' : '#94A3B8',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <MessageSquare size={14} />
          <span>Live Chat & Q&A</span>
        </button>

        <button
          onClick={() => setActiveDrawer('notes')}
          style={{
            flex: 1,
            padding: '10px 0',
            background: activeDrawer === 'notes' ? 'rgba(13, 148, 136, 0.15)' : 'transparent',
            border: 'none',
            borderBottom: activeDrawer === 'notes' ? '2px solid var(--color-accent-teal)' : '2px solid transparent',
            color: activeDrawer === 'notes' ? '#2DD4BF' : '#94A3B8',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <Image size={14} />
          <span>Whiteboard Snaps (2)</span>
        </button>
      </div>

      {/* Drawer 1: Live Chat Feed */}
      {activeDrawer === 'chat' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#0B0F19' }}>
          {/* Chat scrolling list */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}>
            {/* Pinned Instructor Tip */}
            <div style={{
              background: 'rgba(13, 148, 136, 0.15)',
              border: '1px solid rgba(45, 212, 191, 0.3)',
              borderRadius: 10,
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8
            }}>
              <Sparkles size={16} color="#2DD4BF" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#2DD4BF', textTransform: 'uppercase' }}>
                  Pinned by Instructor
                </span>
                <p style={{ fontSize: 11, color: '#F1F5F9', marginTop: 2 }}>
                  Download the perspective reference sheet from Whiteboard tab for today's assignment.
                </p>
              </div>
            </div>

            {chatMessages.map(msg => (
              <div 
                key={msg.id}
                style={{
                  background: msg.isTeacher ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.04)',
                  border: msg.isTeacher ? '1px solid rgba(13, 148, 136, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 10,
                  padding: '8px 10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: msg.isTeacher ? '#2DD4BF' : '#CBD5E1'
                    }}>
                      {msg.sender}
                    </span>
                    {msg.isTeacher && (
                      <span style={{
                        fontSize: 9,
                        fontWeight: 800,
                        background: 'var(--color-accent-teal)',
                        color: '#FFFFFF',
                        padding: '1px 5px',
                        borderRadius: 4
                      }}>
                        TUTOR
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 9, color: '#64748B' }}>{msg.time}</span>
                </div>
                <p style={{ fontSize: 12, color: '#F8FAFC', lineHeight: 1.4 }}>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Chat Input Bar with Raise Hand Integration */}
          <div style={{
            padding: '10px 12px',
            background: '#131B2E',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <button
              onClick={handleRaiseHand}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                border: 'none',
                background: isHandRaised ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
              title={isHandRaised ? "Lower Hand" : "Raise Hand to Speak"}
            >
              <Hand size={18} />
            </button>

            <form onSubmit={handleSendMessage} style={{ flex: 1, display: 'flex', gap: 6 }}>
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask teacher a question..."
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 10,
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: 12,
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: 'none',
                  background: 'var(--color-accent-teal)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Drawer 2: Whiteboard Snapshots & Teacher Notes */}
      {activeDrawer === 'notes' && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          background: '#0B0F19',
          display: 'flex',
          flexDirection: 'column',
          gap: 14
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>
              Live Teacher Easel Snapshots
            </span>
            <span style={{ fontSize: 11, color: '#2DD4BF', fontWeight: 700 }}>
              Auto-saved
            </span>
          </div>

          {whiteboardSnapshots.map(snap => (
            <div
              key={snap.id}
              style={{
                background: '#131B2E',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 12,
                overflow: 'hidden'
              }}
            >
              <img 
                src={snap.image} 
                alt={snap.title}
                style={{ width: '100%', height: 110, objectFit: 'cover' }}
              />
              <div style={{ padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <h5 style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
                    {snap.title}
                  </h5>
                  <span style={{ fontSize: 10, color: '#64748B' }}>{snap.timestamp}</span>
                </div>
                <p style={{ fontSize: 11, color: '#CBD5E1', marginBottom: 10 }}>
                  {snap.description}
                </p>

                <button
                  style={{
                    width: '100%',
                    background: 'rgba(13, 148, 136, 0.2)',
                    border: '1px solid rgba(45, 212, 191, 0.3)',
                    color: '#2DD4BF',
                    padding: '6px 0',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <Download size={13} />
                  <span>Download High-Res Sketch (PNG)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
