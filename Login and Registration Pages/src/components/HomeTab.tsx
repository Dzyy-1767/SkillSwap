import { useState } from 'react'

const matches = [
  { id: 1, name: 'Rizky Pratama', university: 'ITB', teaches: ['React', 'Flutter'], learns: ['Desain UI/UX', 'Figma'], avatar: 'RP', color: '#6C3DE8', rating: 4.8, sessions: 12, matchScore: 97 },
  { id: 2, name: 'Sinta Dewi', university: 'UI', teaches: ['Desain UI/UX', 'Figma'], learns: ['Python', 'Machine Learning'], avatar: 'SD', color: '#EC4899', rating: 4.9, sessions: 8, matchScore: 93 },
  { id: 3, name: 'Budi Santoso', university: 'UGM', teaches: ['Machine Learning', 'Python'], learns: ['Public Speaking', 'Copywriting'], avatar: 'BS', color: '#10B981', rating: 4.7, sessions: 20, matchScore: 88 },
]

const activities = [
  { text: 'Sinta menerima request sesi kamu', time: '2 jam lalu', type: 'accept' },
  { text: 'Kamu mendapat 2 Skill Credit dari sesi React', time: '1 hari lalu', type: 'credit' },
  { text: 'Budi memberi ulasan ⭐⭐⭐⭐⭐', time: '2 hari lalu', type: 'review' },
]

export default function HomeTab() {
  const [saved, setSaved] = useState<number[]>([])
  const toggle = (id: number) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  return (
    <div className="tab-page">
      {/* Hero Header */}
      <div className="home-header">
        <div className="home-header-blob home-header-blob1" />
        <div className="home-header-blob home-header-blob2" />

        <div className="home-header-top">
          <div>
            <p className="home-greeting">Selamat pagi,</p>
            <h1 className="home-name">Andi Firmansyah 👋</h1>
          </div>
          <button className="notif-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span className="notif-dot" />
          </button>
        </div>

        {/* Stats */}
        <div className="home-stats">
          {[
            { label: 'Skill Credit', value: '24', icon: '⚡' },
            { label: 'Sesi Selesai', value: '8', icon: '✓' },
            { label: 'Rating', value: '4.8', icon: '★' },
          ].map(s => (
            <div key={s.label} className="home-stat-card">
              <div className="home-stat-val">{s.icon} {s.value}</div>
              <div className="home-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="tab-body">
        {/* Match section */}
        <div className="section-header">
          <h2 className="section-title">Match Terbaik</h2>
          <button className="section-link">Lihat semua</button>
        </div>

        <div className="card-list">
          {matches.map(m => (
            <div key={m.id} className="match-card">
              <div className="match-card-top">
                <div className="avatar-square" style={{ background: m.color }}>
                  {m.avatar}
                </div>
                <div className="match-info">
                  <div className="match-name-row">
                    <h3 className="match-name">{m.name}</h3>
                    <button onClick={() => toggle(m.id)} className="save-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={saved.includes(m.id) ? '#6C3DE8' : 'none'} stroke={saved.includes(m.id) ? '#6C3DE8' : '#D1D5DB'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                      </svg>
                    </button>
                  </div>
                  <p className="match-meta">{m.university} · ⭐ {m.rating} · {m.sessions} sesi</p>
                  <div className="skill-row">
                    {m.teaches.map(s => <span key={s} className="skill-chip teach-chip">✦ {s}</span>)}
                  </div>
                  <div className="skill-row">
                    {m.learns.map(s => <span key={s} className="skill-chip learn-chip">★ {s}</span>)}
                  </div>
                </div>
              </div>

              <div className="match-card-footer">
                <div className="match-score">
                  <div className="match-bar-bg">
                    <div className="match-bar-fill" style={{ width: `${m.matchScore}%` }} />
                  </div>
                  <span className="match-pct">{m.matchScore}% match</span>
                </div>
                <button className="request-btn">Request Sesi</button>
              </div>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="section-header" style={{ marginTop: 8 }}>
          <h2 className="section-title">Aktivitas Terbaru</h2>
        </div>
        <div className="activity-list">
          {activities.map((a, i) => (
            <div key={i} className={`activity-row ${i < activities.length - 1 ? 'activity-row-border' : ''}`}>
              <div className={`activity-icon ${a.type === 'accept' ? 'ai-green' : a.type === 'credit' ? 'ai-amber' : 'ai-purple'}`}>
                {a.type === 'accept' ? '✓' : a.type === 'credit' ? '⚡' : '★'}
              </div>
              <div className="activity-text">
                <p className="activity-main">{a.text}</p>
                <p className="activity-time">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
