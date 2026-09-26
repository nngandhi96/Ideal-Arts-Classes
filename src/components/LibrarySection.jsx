import React, { useState } from 'react';
import { 
  Search, BookOpen, Video, FileText, Download, 
  Bookmark, Check, Play, Filter, Clock, Eye, Sparkles,
  Target, PenTool, CheckCircle2, ChevronRight, Layers
} from 'lucide-react';
import { CLASSES_CONFIG, SUBJECTS_BY_CLASS, STUDY_MATERIALS } from '../data/curriculumData';

export function LibrarySection({ 
  selectedClass = '12th', 
  onSelectClass, 
  selectedMode = 'all', 
  onSelectMode, 
  onOpenPdfPreview 
}) {
  const [activeSubject, setActiveSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set(['mat-12-hist-obj', 'mat-12-pol-subj']));
  const [downloadedIds, setDownloadedIds] = useState(new Set(['mat-12-hin-obj']));

  const currentClassInfo = CLASSES_CONFIG.find(c => c.id === selectedClass) || CLASSES_CONFIG[0];
  const classSubjects = SUBJECTS_BY_CLASS[selectedClass] || [];

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

  // Filter materials based on:
  // 1. Class ID
  // 2. Subject ID
  // 3. Format type (Objective vs Subjective) if 11th or 12th
  // 4. Search query
  const filteredMaterials = STUDY_MATERIALS.filter(item => {
    const matchesClass = item.classId === selectedClass;
    const matchesSubject = activeSubject === 'All' || item.subjectId === activeSubject;
    
    let matchesMode = true;
    if (currentClassInfo.hasObjectiveSubjectiveSplit && selectedMode !== 'all') {
      matchesMode = item.formatType === selectedMode || item.formatType === 'all';
    }

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.title.toLowerCase().includes(query) || 
      item.subjectName.toLowerCase().includes(query) || 
      item.author.toLowerCase().includes(query);

    return matchesClass && matchesSubject && matchesMode && matchesSearch;
  });

  return (
    <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      
      {/* 1. Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <span className="devanagari-tagline" style={{ fontSize: 11, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
            कला ज्ञानं जीवनम्
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
            {filteredMaterials.length} Study Notes Found
          </span>
        </div>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
          Study & Notes Library
        </h2>
        <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
          {currentClassInfo.hindiName} ({currentClassInfo.stream}) • सम्पूर्ण पाठ्यक्रम
        </p>
      </div>

      {/* 2. Class Selector Strip */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 2,
        scrollbarWidth: 'none'
      }}>
        {CLASSES_CONFIG.map(cls => (
          <button
            key={cls.id}
            onClick={() => {
              if (onSelectClass) onSelectClass(cls.id);
              setActiveSubject('All');
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 10,
              border: selectedClass === cls.id 
                ? '1.5px solid var(--color-accent-teal)' 
                : '1px solid var(--border-subtle)',
              background: selectedClass === cls.id 
                ? 'var(--color-accent-teal)' 
                : 'var(--bg-surface)',
              color: selectedClass === cls.id ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {cls.name}
          </button>
        ))}
      </div>

      {/* 3. DEDICATED OBJECTIVE / SUBJECTIVE TABS (For 11th & 12th) */}
      {currentClassInfo.hasObjectiveSubjectiveSplit && (
        <div style={{
          display: 'flex',
          background: 'var(--bg-surface-subtle)',
          borderRadius: 12,
          padding: 3,
          border: '1px solid var(--border-subtle)'
        }}>
          {[
            { id: 'all', label: 'All Materials (सभी)', icon: Layers },
            { id: 'objective', label: '🎯 Objective (वस्तुनिष्ठ)', icon: Target },
            { id: 'subjective', label: '📝 Subjective (विषयनिष्ठ)', icon: PenTool }
          ].map(tab => {
            const isSelected = selectedMode === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectMode && onSelectMode(tab.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  padding: '7px 4px',
                  borderRadius: 9,
                  border: 'none',
                  background: isSelected ? 'var(--bg-surface)' : 'transparent',
                  color: isSelected 
                    ? tab.id === 'objective' ? '#059669' : tab.id === 'subjective' ? '#2563EB' : 'var(--color-accent-teal)' 
                    : 'var(--text-secondary)',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: 10,
                  cursor: 'pointer',
                  boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={12} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Search Bar */}
      <div style={{
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
          placeholder={`Search ${currentClassInfo.name} subjects, topics, or MCQs...`}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 12,
            color: 'var(--text-primary)'
          }}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ border: 'none', background: 'transparent', fontSize: 11, color: 'var(--text-tertiary)', cursor: 'pointer' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* 5. Subject Filter Chips */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 4,
        scrollbarWidth: 'none'
      }}>
        <button
          onClick={() => setActiveSubject('All')}
          style={{
            whiteSpace: 'nowrap',
            padding: '5px 12px',
            borderRadius: 9999,
            border: activeSubject === 'All' ? '1.5px solid var(--color-accent-teal)' : '1px solid var(--border-subtle)',
            background: activeSubject === 'All' ? 'var(--color-accent-teal-tint)' : 'var(--bg-surface)',
            color: activeSubject === 'All' ? 'var(--color-accent-teal)' : 'var(--text-secondary)',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          All Subjects ({classSubjects.length})
        </button>

        {classSubjects.map(sub => (
          <button
            key={sub.id}
            onClick={() => setActiveSubject(sub.id)}
            style={{
              whiteSpace: 'nowrap',
              padding: '5px 12px',
              borderRadius: 9999,
              border: activeSubject === sub.id ? `1.5px solid ${sub.color}` : '1px solid var(--border-subtle)',
              background: activeSubject === sub.id ? sub.bgLight : 'var(--bg-surface)',
              color: activeSubject === sub.id ? sub.color : 'var(--text-secondary)',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span>{sub.name}</span>
            <span style={{ fontSize: 10, opacity: 0.8 }}>({sub.hindiName})</span>
          </button>
        ))}
      </div>

      {/* 6. Materials List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredMaterials.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '36px 16px',
            background: 'var(--bg-surface)',
            borderRadius: 14,
            border: '1px dashed var(--border-subtle)'
          }}>
            <BookOpen size={36} color="var(--text-tertiary)" style={{ margin: '0 auto 8px' }} />
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              कोई सामग्री नहीं मिली
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
              Try selecting "All Subjects" or change the Objective / Subjective filter.
            </p>
          </div>
        ) : (
          filteredMaterials.map(item => {
            const isBookmarked = bookmarkedIds.has(item.id);
            const isDownloaded = downloadedIds.has(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onOpenPdfPreview(item)}
                className="art-card"
                style={{
                  padding: '14px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  borderLeft: `4px solid ${item.badgeColor || '#0D9488'}`
                }}
              >
                {/* Top Badge & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: item.badgeColor || 'var(--color-accent-teal)',
                      background: 'var(--bg-surface-subtle)',
                      padding: '2px 8px',
                      borderRadius: 6,
                      border: `1px solid ${item.badgeColor || 'var(--color-accent-teal)'}`
                    }}>
                      {item.badge}
                    </span>

                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>
                      {item.subjectName}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button
                      onClick={(e) => toggleBookmark(item.id, e)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: isBookmarked ? 'var(--color-accent-teal)' : 'var(--text-tertiary)'
                      }}
                      title="Bookmark"
                    >
                      <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>

                    <button
                      onClick={(e) => toggleDownload(item.id, e)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: isDownloaded ? '#10B981' : 'var(--text-tertiary)'
                      }}
                      title="Offline Download"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h4 style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                    marginBottom: 4
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    लेखक / शिक्षक: <strong style={{ color: 'var(--text-primary)' }}>{item.author}</strong>
                  </p>
                </div>

                {/* Footer Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 8,
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: 11,
                  color: 'var(--text-tertiary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <FileText size={12} />
                      {item.pages}
                    </span>
                    <span>• {item.fileSize}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-accent-teal)', fontWeight: 700 }}>
                    <span>PDF पढ़ें</span>
                    <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
