import React, { useState } from 'react';
import { 
  Search, BookOpen, Video, FileText, Download, 
  Bookmark, Check, Play, Filter, Clock, Eye, Sparkles 
} from 'lucide-react';

export function LibrarySection({ onOpenPdfPreview }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set(['lib-1', 'lib-4']));
  const [downloadedIds, setDownloadedIds] = useState(new Set(['lib-2', 'lib-3']));
  const [resourceType, setResourceType] = useState('all'); // 'all' | 'video' | 'pdf'

  const categories = [
    'All',
    'Sketching & Anatomy',
    'Watercolor & Gouache',
    'Oil & Acrylic',
    'Art History & Theory',
    'Assignments Bank'
  ];

  const resources = [
    {
      id: 'lib-1',
      title: 'Human Skull & Facial Planes Master Guide',
      category: 'Sketching & Anatomy',
      type: 'pdf',
      pages: '28 Pages PDF',
      fileSize: '14.2 MB',
      author: 'Prof. Ramesh Kulkarni',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      tag: 'Core Syllabus'
    },
    {
      id: 'lib-2',
      title: 'Wet-on-Wet Atmospheric Landscape Tutorial',
      category: 'Watercolor & Gouache',
      type: 'video',
      duration: '42 mins',
      difficulty: 'Intermediate',
      author: 'Smt. Ananya Sen',
      thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      tag: 'HD Video'
    },
    {
      id: 'lib-3',
      title: 'Classical Color Theory & Pigment Chemistry',
      category: 'Art History & Theory',
      type: 'pdf',
      pages: '46 Pages eBook',
      fileSize: '22.8 MB',
      author: 'Dr. Meera Chitrakar',
      thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
      tag: 'Theory Guide'
    },
    {
      id: 'lib-4',
      title: 'Impasto Knife Strokes & Canvas Prep',
      category: 'Oil & Acrylic',
      type: 'video',
      duration: '55 mins',
      difficulty: 'Advanced',
      author: 'Vikramaditya Rao',
      thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
      tag: 'Masterclass'
    },
    {
      id: 'lib-5',
      title: 'Indian Temple Architecture & Ajanta Murals',
      category: 'Art History & Theory',
      type: 'pdf',
      pages: '64 Pages Reference',
      fileSize: '31.5 MB',
      author: 'IAC Research Faculty',
      thumbnail: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&auto=format&fit=crop&q=80',
      tag: 'Heritage Series'
    },
    {
      id: 'lib-6',
      title: 'Still Life Drapery & Light Shading Dynamics',
      category: 'Sketching & Anatomy',
      type: 'video',
      duration: '38 mins',
      difficulty: 'Beginner',
      author: 'Prof. Ramesh Kulkarni',
      thumbnail: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&auto=format&fit=crop&q=80',
      tag: 'Foundation'
    }
  ];

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleDownload = (id, e) => {
    e.stopPropagation();
    setDownloadedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredResources = resources.filter(res => {
    const matchesTab = activeTab === 'All' || res.category === activeTab;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = resourceType === 'all' || res.type === resourceType;
    return matchesTab && matchesSearch && matchesType;
  });

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      
      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span className="devanagari-tagline" style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
            कला ज्ञानं जीवनम्
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
            {resources.length} Curated Modules
          </span>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
          Study & Course Library
        </h2>
      </div>

      {/* Search & Resource Type Filter Bar */}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--bg-surface)',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: 12,
          padding: '8px 12px',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <Search size={16} color="var(--text-tertiary)" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lectures, anatomy sheets, notes..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 12,
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* Filter Pill Toggle (Video / PDF) */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-surface-subtle)',
          borderRadius: 12,
          padding: 3,
          border: '1px solid var(--border-subtle)'
        }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'pdf', label: 'PDFs' },
            { id: 'video', label: 'Videos' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setResourceType(t.id)}
              style={{
                border: 'none',
                background: resourceType === t.id ? 'var(--bg-surface)' : 'transparent',
                color: resourceType === t.id ? 'var(--color-accent-teal)' : 'var(--text-secondary)',
                fontWeight: resourceType === t.id ? 700 : 500,
                fontSize: 11,
                padding: '4px 8px',
                borderRadius: 8,
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 4,
        scrollbarWidth: 'none'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              whiteSpace: 'nowrap',
              padding: '6px 12px',
              borderRadius: 9999,
              border: '1px solid',
              borderColor: activeTab === cat ? 'var(--color-accent-teal)' : 'var(--border-subtle)',
              background: activeTab === cat ? 'var(--color-accent-teal)' : 'var(--bg-surface)',
              color: activeTab === cat ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {filteredResources.map(item => {
          const isBookmarked = bookmarkedIds.has(item.id);
          const isDownloaded = downloadedIds.has(item.id);

          return (
            <div
              key={item.id}
              onClick={() => onOpenPdfPreview(item)}
              className="art-card"
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Thumbnail */}
              <div style={{ position: 'relative', height: 105, width: '100%', background: '#0F172A' }}>
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Type Badge */}
                <div style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  padding: '2px 6px',
                  borderRadius: 6,
                  fontSize: 9,
                  fontWeight: 700
                }}>
                  {item.type === 'video' ? <Video size={10} color="#2DD4BF" /> : <FileText size={10} color="#FF6B4A" />}
                  <span>{item.tag}</span>
                </div>

                {/* Bookmark Action */}
                <button
                  onClick={(e) => toggleBookmark(item.id, e)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.65)',
                    border: 'none',
                    color: isBookmarked ? '#2DD4BF' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Bookmark"
                >
                  <Bookmark size={12} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>

                {/* Video Play Overlay */}
                {item.type === 'video' && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(13, 148, 136, 0.9)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                    }}>
                      <Play size={14} fill="currentColor" style={{ marginLeft: 2 }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Resource Meta Details */}
              <div style={{ padding: '10px 10px 8px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: 1.35,
                    marginBottom: 4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                    {item.author}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 8,
                  paddingTop: 6,
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>
                    {item.type === 'video' ? item.duration : item.fileSize}
                  </span>

                  {/* Offline Download Status Indicator */}
                  <button
                    onClick={(e) => toggleDownload(item.id, e)}
                    style={{
                      background: isDownloaded ? 'var(--color-accent-teal-tint)' : 'transparent',
                      border: isDownloaded ? '1px solid var(--color-accent-teal)' : 'none',
                      color: isDownloaded ? 'var(--color-accent-teal)' : 'var(--text-tertiary)',
                      borderRadius: 6,
                      padding: '2px 6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 10,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    title={isDownloaded ? "Downloaded offline" : "Download offline"}
                  >
                    {isDownloaded ? (
                      <>
                        <Check size={11} />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Download size={11} />
                        <span>Get</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
