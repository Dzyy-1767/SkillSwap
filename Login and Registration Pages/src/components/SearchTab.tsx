import { useState } from 'react'

const allUsers = [
  { id: 1, name: 'Rizky Pratama', university: 'ITB', major: 'Informatika', teaches: ['React', 'Flutter', 'TypeScript'], learns: ['UI/UX', 'Figma'], avatar: 'RP', color: '#6C3DE8', rating: 4.8, sessions: 12 },
  { id: 2, name: 'Sinta Dewi', university: 'UI', major: 'DKV', teaches: ['UI/UX', 'Figma', 'Photoshop'], learns: ['Python', 'ML'], avatar: 'SD', color: '#EC4899', rating: 4.9, sessions: 8 },
  { id: 3, name: 'Budi Santoso', university: 'UGM', major: 'Ilmu Komputer', teaches: ['Python', 'ML', 'Data Science'], learns: ['Public Speaking'], avatar: 'BS', color: '#10B981', rating: 4.7, sessions: 20 },
  { id: 4, name: 'Clara Melinda', university: 'Binus', major: 'Komunikasi', teaches: ['Public Speaking', 'Copywriting'], learns: ['Flutter', 'React'], avatar: 'CM', color: '#F59E0B', rating: 4.6, sessions: 6 },
  { id: 5, name: 'Dimas Aditya', university: 'ITS', major: 'Elektro', teaches: ['Arduino', '3D Modeling'], learns: ['Python', 'ML'], avatar: 'DA', color: '#EF4444', rating: 4.5, sessions: 15 },
  { id: 6, name: 'Erisa Putri', university: 'Unpad', major: 'Bisnis', teaches: ['Bahasa Inggris', 'Presentasi'], learns: ['Figma', 'UI/UX'], avatar: 'EP', color: '#06B6D4', rating: 4.9, sessions: 11 },
]

const categories = ['Semua', 'Tech', 'Desain', 'Bahasa', 'Bisnis', 'Seni']

export default function SearchTab() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')
  const [view, setView] = useState<'grid' | 'list'>('list')

  const filtered = allUsers.filter(u => {
    const q = query.toLowerCase()
    return (
      u.name.toLowerCase().includes(q) ||
      u.teaches.some(s => s.toLowerCase().includes(q)) ||
      u.university.toLowerCase().includes(q)
    )
  })

  return (
    <div className="tab-page">
      {/* Sticky Header */}
      <div className="search-header">
        <div className="search-header-top">
          <h1 className="page-title">Cari Skill</h1>
          <button
            onClick={() => setView(v => v === 'grid' ? 'list' : 'grid')}
            className="view-toggle-btn"
          >
            {view === 'list' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        <div className="search-bar-wrap">
          <span className="search-bar-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari skill atau nama mahasiswa..."
            className="search-input"
          />
        </div>

        <div className="cat-scroll">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`cat-pill ${category === c ? 'cat-pill-active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="tab-body">
        <p className="result-count">{filtered.length} mahasiswa ditemukan</p>

        {view === 'list' ? (
          <div className="card-list">
            {filtered.map(u => (
              <div key={u.id} className="user-card">
                <div className="user-card-main">
                  <div className="avatar-square" style={{ background: u.color }}>{u.avatar}</div>
                  <div className="user-info">
                    <h3 className="user-name">{u.name}</h3>
                    <p className="user-meta">{u.university} · {u.major}</p>
                    <div className="user-rating">
                      <span className="star-amber">★</span>
                      <span className="rating-val">{u.rating}</span>
                      <span className="rating-sep">·</span>
                      <span className="rating-val">{u.sessions} sesi</span>
                    </div>
                  </div>
                  <button className="contact-btn">Kontak</button>
                </div>
                <div className="skill-row" style={{ marginTop: 12 }}>
                  {u.teaches.map(s => <span key={s} className="skill-chip teach-chip">✦ {s}</span>)}
                  {u.learns.map(s => <span key={s} className="skill-chip learn-chip">★ {s}</span>)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="user-grid">
            {filtered.map(u => (
              <div key={u.id} className="user-grid-card">
                <div className="avatar-square avatar-sm" style={{ background: u.color, marginBottom: 8 }}>{u.avatar}</div>
                <h3 className="user-grid-name">{u.name}</h3>
                <p className="user-grid-univ">{u.university}</p>
                <div className="skill-row" style={{ marginTop: 8 }}>
                  {u.teaches.slice(0, 2).map(s => (
                    <span key={s} className="skill-chip teach-chip" style={{ fontSize: 10 }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
