import { useState } from 'react'

interface Props { onLogout: () => void }

const reviews = [
  { name: 'Rizky P.', rating: 5, text: 'Andi sangat sabar mengajar, penjelasannya mudah dipahami!', skill: 'Flutter', avatar: 'RP', color: '#6C3DE8' },
  { name: 'Sinta D.', rating: 5, text: 'Sangat membantu, metode belajarnya menyenangkan.', skill: 'React', avatar: 'SD', color: '#EC4899' },
  { name: 'Budi S.', rating: 4, text: 'Penjelasan clear, tapi waktu sedikit kurang.', skill: 'TypeScript', avatar: 'BS', color: '#10B981' },
]

const mySkills = [
  { name: 'React', level: 90 },
  { name: 'Flutter', level: 75 },
  { name: 'TypeScript', level: 80 },
  { name: 'Node.js', level: 65 },
]

const wantSkills = ['Machine Learning', 'UI/UX', 'Figma', 'Data Science']

export default function ProfileTab({ onLogout }: Props) {
  const [section, setSection] = useState<'skills' | 'reviews'>('skills')
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="tab-page">
      {/* Profile header */}
      <div className="profile-header">
        <div className="profile-header-blob" />

        <div className="profile-header-actions">
          <h1 className="page-title-white">Profil Saya</h1>
          <div className="profile-action-btns">
            <button onClick={() => setEditMode(!editMode)} className="icon-btn-glass" title="Edit profil">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button onClick={onLogout} className="icon-btn-glass" title="Keluar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Avatar + name */}
        <div className="profile-identity">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">AF</div>
            {editMode && (
              <div className="avatar-edit-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            )}
          </div>
          <div className="profile-name-block">
            <h2 className="profile-name">Andi Firmansyah</h2>
            <p className="profile-major">Teknik Informatika · UI</p>
            <p className="profile-batch">Angkatan 2022</p>
          </div>
        </div>
      </div>

      {/* Stats card (floating) */}
      <div className="profile-stats-card">
        {[
          { label: 'Sesi', value: '8' },
          { label: 'Mengajar', value: '5' },
          { label: 'Rating', value: '4.8 ★' },
          { label: 'Kredit', value: '24 ⚡' },
        ].map((s, i, arr) => (
          <div key={s.label} className={`profile-stat ${i < arr.length - 1 ? 'profile-stat-border' : ''}`}>
            <p className="profile-stat-val">{s.value}</p>
            <p className="profile-stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="profile-section-card" style={{ margin: '12px 16px' }}>
        <h3 className="profile-section-title">Bio</h3>
        {editMode ? (
          <textarea
            defaultValue="Mahasiswa Informatika yang passionate di bidang web development dan mobile app. Senang berbagi ilmu dan belajar hal baru!"
            className="bio-textarea"
            rows={3}
          />
        ) : (
          <p className="bio-text">
            Mahasiswa Informatika yang passionate di bidang web development dan mobile app. Senang berbagi ilmu dan belajar hal baru!
          </p>
        )}
      </div>

      {/* Section switcher */}
      <div className="section-switcher">
        {(['skills', 'reviews'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`switcher-btn ${section === s ? 'switcher-active' : ''}`}
          >
            {s === 'skills' ? '🎓 Skills' : '⭐ Ulasan'}
          </button>
        ))}
      </div>

      {/* Skills */}
      {section === 'skills' && (
        <div className="profile-section-pad">
          <div className="profile-section-card" style={{ marginBottom: 12 }}>
            <h3 className="profile-section-title">Bisa Saya Ajarkan</h3>
            <div className="skill-bars">
              {mySkills.map(s => (
                <div key={s.name} className="skill-bar-row">
                  <div className="skill-bar-labels">
                    <span className="skill-bar-name">{s.name}</span>
                    <span className="skill-bar-pct">{s.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section-card">
            <h3 className="profile-section-title">Ingin Saya Pelajari</h3>
            <div className="skill-row" style={{ flexWrap: 'wrap' }}>
              {wantSkills.map(s => (
                <span key={s} className="skill-chip learn-chip">★ {s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {section === 'reviews' && (
        <div className="profile-section-pad">
          <div className="card-list">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <div className="avatar-circle" style={{ background: r.color }}>{r.avatar}</div>
                  <div className="review-meta">
                    <p className="review-name">{r.name}</p>
                    <p className="review-skill">{r.skill}</p>
                  </div>
                  <div className="stars">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={j < r.rating ? 'star-filled' : 'star-empty'}>★</span>
                    ))}
                  </div>
                </div>
                <p className="review-text">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
