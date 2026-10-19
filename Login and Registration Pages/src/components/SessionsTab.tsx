import { useState } from 'react'

const sessions = [
  { id: 1, partner: 'Rizky Pratama', avatar: 'RP', color: '#6C3DE8', skill: 'React Hooks & Context', date: 'Senin, 30 Sep 2026', time: '14:00 – 15:30', status: 'upcoming', type: 'learn', credit: 2 },
  { id: 2, partner: 'Clara Melinda', avatar: 'CM', color: '#F59E0B', skill: 'Public Speaking Dasar', date: 'Rabu, 2 Okt 2026', time: '16:00 – 17:00', status: 'upcoming', type: 'teach', credit: 1 },
  { id: 3, partner: 'Sinta Dewi', avatar: 'SD', color: '#EC4899', skill: 'Figma Auto Layout', date: 'Jum, 20 Sep 2026', time: '10:00 – 11:30', status: 'completed', type: 'learn', credit: 2, rating: 5 },
  { id: 4, partner: 'Budi Santoso', avatar: 'BS', color: '#10B981', skill: 'Python Data Analysis', date: 'Sel, 17 Sep 2026', time: '13:00 – 14:00', status: 'completed', type: 'learn', credit: 1, rating: 4 },
  { id: 5, partner: 'Erisa Putri', avatar: 'EP', color: '#06B6D4', skill: 'Bahasa Inggris Bisnis', date: 'Sen, 8 Sep 2026', time: '09:00 – 10:00', status: 'pending', type: 'learn', credit: 1 },
]

type Filter = 'semua' | 'upcoming' | 'completed' | 'pending'
const filters: { id: Filter; label: string }[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'upcoming', label: 'Mendatang' },
  { id: 'completed', label: 'Selesai' },
  { id: 'pending', label: 'Menunggu' },
]

export default function SessionsTab() {
  const [activeFilter, setActiveFilter] = useState<Filter>('semua')
  const filtered = sessions.filter(s => activeFilter === 'semua' || s.status === activeFilter)
  const upcomingCount = sessions.filter(s => s.status === 'upcoming').length

  const nextSession = sessions.find(s => s.status === 'upcoming')

  return (
    <div className="tab-page">
      {/* Sticky Header */}
      <div className="search-header">
        <h1 className="page-title" style={{ marginBottom: 14 }}>Sesi Belajar</h1>
        <div className="filter-row">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`filter-pill ${activeFilter === f.id ? 'filter-pill-active' : ''}`}
            >
              {f.label}
              {f.id === 'upcoming' && upcomingCount > 0 && (
                <span className={`filter-badge ${activeFilter === f.id ? 'filter-badge-active' : ''}`}>
                  {upcomingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="tab-body">
        {/* Next session highlight */}
        {activeFilter !== 'completed' && nextSession && (
          <div className="next-session-card">
            <div className="next-session-blob" />
            <p className="next-session-eyebrow">Sesi Berikutnya</p>
            <div className="next-session-info">
              <div className="avatar-square avatar-glass">{nextSession.avatar}</div>
              <div className="next-session-text">
                <h3 className="next-session-skill">{nextSession.skill}</h3>
                <p className="next-session-partner">dengan {nextSession.partner}</p>
              </div>
              <span className={`type-badge ${nextSession.type === 'learn' ? 'type-learn' : 'type-teach'}`}>
                {nextSession.type === 'learn' ? 'Belajar' : 'Mengajar'}
              </span>
            </div>
            <div className="next-session-meta">
              <span className="meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>
                </svg>
                {nextSession.date}
              </span>
              <span className="meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {nextSession.time}
              </span>
            </div>
          </div>
        )}

        {/* Sessions list */}
        <div className="card-list">
          {filtered.map(s => (
            <div key={s.id} className="session-card">
              <div className="session-card-top">
                <div className="avatar-square avatar-md" style={{ background: s.color }}>{s.avatar}</div>
                <div className="session-info">
                  <div className="session-name-row">
                    <h3 className="session-skill">{s.skill}</h3>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="session-meta">
                    {s.type === 'teach' ? '📖 Mengajar' : '🎯 Belajar'} · dengan {s.partner}
                  </p>
                  <div className="session-datetime">
                    <span>{s.date}</span>
                    <span>·</span>
                    <span>{s.time}</span>
                  </div>

                  {s.status === 'completed' && (s as any).rating && (
                    <div className="rating-row">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < (s as any).rating ? 'star-filled' : 'star-empty'}>★</span>
                        ))}
                      </div>
                      <span className="credit-earned">+{s.credit} Skill Credit</span>
                    </div>
                  )}

                  {s.status === 'upcoming' && (
                    <div className="session-actions">
                      <button className="action-btn action-btn-primary">Lihat Detail</button>
                      <button className="action-btn action-btn-secondary">Reschedule</button>
                    </div>
                  )}

                  {s.status === 'pending' && (
                    <div className="session-actions">
                      <button className="action-btn action-btn-accept">Terima</button>
                      <button className="action-btn action-btn-reject">Tolak</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    upcoming: { label: 'Mendatang', cls: 'badge-upcoming' },
    completed: { label: 'Selesai', cls: 'badge-done' },
    pending: { label: 'Menunggu', cls: 'badge-pending' },
  }
  const s = map[status]
  return <span className={`status-badge ${s.cls}`}>{s.label}</span>
}
