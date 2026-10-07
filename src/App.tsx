import { useState, useEffect, useRef, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Screen =
  | 'splash'
  | 'login'
  | 'register'
  | 'profile-setup'
  | 'home'
  | 'discover'
  | 'view-profile'
  | 'swap-request'
  | 'matches'
  | 'sessions'
  | 'chat'
  | 'profile'

type NavTab = 'home' | 'discover' | 'matches' | 'sessions' | 'profile'

interface Student {
  id: string
  name: string
  program: string
  university: string
  year: string
  bio: string
  match: number
  canTeach: string[]
  wantsToLearn: string[]
  rating: number
  swapsDone: number
  responseTime: string
  online?: boolean
}

interface Message {
  id: string
  from: 'me' | 'them'
  text: string
  time: string
  read: boolean
}

interface ChatThread {
  partnerId: string
  messages: Message[]
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const STUDENTS: Student[] = [
  {
    id: 's1', name: 'Azizi Adhira', program: 'Informatics', university: 'Universitas Gadjah Mada',
    year: 'Year 3', bio: 'Passionate backend engineer who loves building scalable APIs. Looking to grow my design thinking skills.',
    match: 92, canTeach: ['Node.js', 'Backend', 'PostgreSQL'], wantsToLearn: ['UI/UX', 'Figma'],
    rating: 4.9, swapsDone: 14, responseTime: '< 1 hr', online: true,
  },
  {
    id: 's2', name: 'Reza Pratama', program: 'Computer Science', university: 'Institut Teknologi Bandung',
    year: 'Year 4', bio: 'Data science enthusiast and Python nerd. I can teach data analysis & machine learning concepts.',
    match: 87, canTeach: ['Python', 'Data Science', 'ML Basics'], wantsToLearn: ['Figma', 'Product Design'],
    rating: 4.7, swapsDone: 9, responseTime: '~2 hrs',
  },
  {
    id: 's3', name: 'Laila Nusantara', program: 'Digital Business', university: 'Universitas Indonesia',
    year: 'Year 2', bio: 'Marketing & business student exploring the tech world. I can teach growth hacking and brand strategy!',
    match: 79, canTeach: ['Marketing', 'Business Strategy', 'Copywriting'], wantsToLearn: ['HTML', 'CSS', 'React'],
    rating: 4.8, swapsDone: 6, responseTime: '~4 hrs', online: true,
  },
  {
    id: 's4', name: 'Bima Santoso', program: 'Software Engineering', university: 'Univ. Brawijaya',
    year: 'Year 3', bio: 'Frontend enthusiast building cool web experiences with React. Photography is my creative escape!',
    match: 74, canTeach: ['React', 'TypeScript', 'CSS Animation'], wantsToLearn: ['Photography', 'Video Editing'],
    rating: 4.6, swapsDone: 11, responseTime: '< 3 hrs',
  },
  {
    id: 's5', name: 'Nadia Kusuma', program: 'Visual Communication', university: 'Universitas Trisakti',
    year: 'Year 4', bio: 'Designer with a love for branding and illustration. Helping students level up their visual game.',
    match: 88, canTeach: ['Illustration', 'Brand Design', 'Adobe XD'], wantsToLearn: ['JavaScript', 'Webflow'],
    rating: 4.9, swapsDone: 18, responseTime: '< 1 hr', online: true,
  },
  {
    id: 's6', name: 'Dimas Firdaus', program: 'Statistics', university: 'IPB University',
    year: 'Year 3', bio: 'Statistics and R language expert. Can help with data visualization and research methodology.',
    match: 71, canTeach: ['R Language', 'Statistics', 'Data Viz'], wantsToLearn: ['SQL', 'Python'],
    rating: 4.5, swapsDone: 7, responseTime: '~6 hrs',
  },
]

const INITIAL_CHATS: Record<string, ChatThread> = {
  s1: {
    partnerId: 's1',
    messages: [
      { id: 'm1', from: 'them', text: 'Hey! I saw your swap request, sounds great! 😊', time: '10:32 AM', read: true },
      { id: 'm2', from: 'me', text: 'Awesome! I can teach you Figma basics on Saturday?', time: '10:35 AM', read: true },
      { id: 'm3', from: 'them', text: 'Perfect! And I\'ll walk you through Node.js REST APIs after that 🔥', time: '10:36 AM', read: true },
      { id: 'm4', from: 'me', text: 'Deal! Looking forward to it 🙌', time: '10:38 AM', read: true },
    ],
  },
  s3: {
    partnerId: 's3',
    messages: [
      { id: 'm1', from: 'them', text: 'Hi Sinta! Are you still looking to learn HTML?', time: 'Yesterday', read: true },
      { id: 'm2', from: 'me', text: 'Yes! Would love to do a swap 💜', time: 'Yesterday', read: true },
      { id: 'm3', from: 'them', text: 'Let\'s do it! I need CSS help too 😅', time: 'Yesterday', read: false },
    ],
  },
}

const CATEGORIES = ['Programming', 'Design', 'Data', 'Business', 'Languages', 'Marketing', 'Photography', 'Music']

const CATEGORY_ICONS: Record<string, string> = {
  Programming: '💻', Design: '🎨', Data: '📊', Business: '💼',
  Languages: '🌍', Marketing: '📢', Photography: '📸', Music: '🎵',
}

const SKILL_SUGGESTIONS = ['React', 'Python', 'Figma', 'Node.js', 'UI/UX', 'Photography', 'Video Editing',
  'Data Science', 'Marketing', 'Copywriting', 'ML Basics', 'Adobe XD', 'Business Strategy']

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

const Icon = {
  Eye: ({ open }: { open: boolean }) => open
    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,

  Google: () => <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>,

  Bell: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,

  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,

  Home: ({ active }: { active: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#4f46e5' : 'none'} stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,

  Compass: ({ active }: { active: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={active ? '#4f46e5' : 'none'}/></svg>,

  Users: ({ active }: { active: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4" fill={active ? '#e0e7ff' : 'none'}/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,

  Calendar: ({ active }: { active: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill={active ? '#e0e7ff' : 'none'}/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,

  User: ({ active }: { active: boolean }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4" fill={active ? '#e0e7ff' : 'none'}/></svg>,

  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,

  Back: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,

  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 12 4 16"/></svg>,

  Edit: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,

  Star: ({ filled }: { filled: boolean }) => <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,

  Send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,

  Chat: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,

  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,

  X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,

  Filter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,

  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function Avatar({ name, size = 40, ring = false, online = false }: {
  name: string; size?: number; ring?: boolean; online?: boolean
}) {
  const palette = ['#4f46e5', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626', '#db2777']
  const color = palette[name.charCodeAt(0) % palette.length]
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: size, height: size }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: `${color}22`,
        border: ring ? `2.5px solid ${color}` : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <span style={{ fontSize: size * 0.36, fontWeight: 700, color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {initials}
        </span>
      </div>
      {online && (
        <div style={{
          position: 'absolute', bottom: 1, right: 1,
          width: size * 0.26, height: size * 0.26,
          borderRadius: '50%', background: '#10b981',
          border: '2px solid #fff',
        }} />
      )}
    </div>
  )
}

function SkillTag({ label, variant = 'teach', onRemove }: {
  label: string; variant?: 'teach' | 'learn' | 'neutral'; onRemove?: () => void
}) {
  const v = {
    teach:   { bg: '#e0e7ff', color: '#4338ca' },
    learn:   { bg: '#fef3c7', color: '#92400e' },
    neutral: { bg: '#f1f5f9', color: '#475569' },
  }[variant]
  return (
    <span style={{
      background: v.bg, color: v.color, fontSize: 12, fontWeight: 600,
      padding: onRemove ? '4px 8px 4px 10px' : '4px 12px',
      borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 4,
      whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif',
    }}>
      {label}
      {onRemove && (
        <button onClick={onRemove} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: v.color, padding: 0, display: 'flex', opacity: 0.7,
        }}>
          <Icon.X />
        </button>
      )}
    </span>
  )
}

function MatchBadge({ pct }: { pct: number }) {
  const color = pct >= 85 ? '#10b981' : pct >= 70 ? '#4f46e5' : '#f59e0b'
  return (
    <div style={{
      background: `${color}15`, borderRadius: 10, padding: '3px 10px',
      display: 'flex', alignItems: 'center', gap: 4,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
      <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {pct}% Match
      </span>
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => <Icon.Star key={i} filled={i <= Math.round(rating)} />)}
      <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif', marginLeft: 4 }}>{rating}</span>
    </div>
  )
}

function PrimaryBtn({ children, onClick, loading = false, disabled = false, fullWidth = true, small = false }: {
  children: React.ReactNode; onClick?: () => void; loading?: boolean;
  disabled?: boolean; fullWidth?: boolean; small?: boolean
}) {
  const [p, setP] = useState(false)
  return (
    <button onClick={onClick} onMouseDown={() => setP(true)} onMouseUp={() => setP(false)}
      onTouchStart={() => setP(true)} onTouchEnd={() => setP(false)}
      disabled={disabled || loading}
      style={{
        width: fullWidth ? '100%' : 'auto',
        background: disabled ? '#c7d2fe' : 'linear-gradient(135deg, #4f46e5, #6d28d9)',
        color: '#fff', border: 'none',
        borderRadius: small ? 10 : 14,
        padding: small ? '10px 18px' : '15px 24px',
        fontSize: small ? 13 : 16, fontWeight: 700,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        transform: p && !disabled ? 'scale(0.97)' : 'scale(1)',
        boxShadow: disabled ? 'none' : p ? 'none' : '0 4px 18px rgba(79,70,229,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
      {loading
        ? <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Loading...</>
        : children}
    </button>
  )
}

function SecondaryBtn({ children, onClick, fullWidth = true, small = false }: {
  children: React.ReactNode; onClick?: () => void; fullWidth?: boolean; small?: boolean
}) {
  const [p, setP] = useState(false)
  return (
    <button onClick={onClick} onMouseDown={() => setP(true)} onMouseUp={() => setP(false)}
      onTouchStart={() => setP(true)} onTouchEnd={() => setP(false)}
      style={{
        width: fullWidth ? '100%' : 'auto',
        background: p ? '#f1f5f9' : '#fff', color: '#1e1b4b',
        border: '1.5px solid #e2e8f0',
        borderRadius: small ? 10 : 14,
        padding: small ? '9px 16px' : '14px 24px',
        fontSize: small ? 13 : 16, fontWeight: 600,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        cursor: 'pointer', transition: 'all 0.15s ease',
        transform: p ? 'scale(0.97)' : 'scale(1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
      {children}
    </button>
  )
}

function TextInput({ label, type = 'text', value, onChange, placeholder, error }: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {label}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '13px 14px', borderRadius: 12,
          border: `1.5px solid ${error ? '#f87171' : focused ? '#4f46e5' : '#e2e8f0'}`,
          background: '#fff', fontSize: 15, fontFamily: 'Inter, sans-serif',
          color: '#111827', outline: 'none', transition: 'border-color 0.15s ease',
          boxSizing: 'border-box',
          boxShadow: focused ? '0 0 0 3px rgba(79,70,229,0.08)' : 'none',
        }}
      />
      {error && <span style={{ fontSize: 12, color: '#ef4444', fontFamily: 'Inter, sans-serif' }}>{error}</span>}
    </div>
  )
}

function PasswordInput({ label, value, onChange, error, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string
}) {
  const [show, setShow] = useState(false)
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder || '••••••••'}
          style={{
            width: '100%', padding: '13px 46px 13px 14px', borderRadius: 12,
            border: `1.5px solid ${error ? '#f87171' : focused ? '#4f46e5' : '#e2e8f0'}`,
            background: '#fff', fontSize: 15, fontFamily: 'Inter, sans-serif',
            color: '#111827', outline: 'none', transition: 'border-color 0.15s ease',
            boxSizing: 'border-box',
            boxShadow: focused ? '0 0 0 3px rgba(79,70,229,0.08)' : 'none',
          }}
        />
        <button type="button" onClick={() => setShow(!show)} style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 4,
        }}>
          <Icon.Eye open={show} />
        </button>
      </div>
      {error && <span style={{ fontSize: 12, color: '#ef4444', fontFamily: 'Inter, sans-serif' }}>{error}</span>}
    </div>
  )
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)]
  const strength = checks.filter(Boolean).length
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['#e2e8f0', '#ef4444', '#f59e0b', '#3b82f6', '#10b981']
  if (!password) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, transition: 'background 0.2s', background: i <= strength ? colors[strength] : '#e2e8f0' }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: colors[strength], fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
        {labels[strength]} password
      </span>
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
      <span style={{ fontSize: 13, color: '#94a3b8', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
    </div>
  )
}

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div style={{
      position: 'fixed', bottom: 110, left: '50%', transform: 'translateX(-50%)',
      background: type === 'success' ? '#111827' : '#ef4444',
      color: '#fff', padding: '12px 20px', borderRadius: 14,
      fontSize: 14, fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif',
      zIndex: 9999, whiteSpace: 'nowrap', animation: 'fadeInUp 0.3s ease',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    }}>
      {message}
    </div>
  )
}

function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: { icon: 30, text: 18 }, md: { icon: 38, text: 22 }, lg: { icon: 48, text: 28 } }[size]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: s.icon, height: s.icon, borderRadius: s.icon * 0.28,
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
      }}>
        <span style={{ fontSize: s.icon * 0.52 }}>⇄</span>
      </div>
      <span style={{ fontSize: s.text, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        Skill<span style={{ color: '#4f46e5' }}>Swap</span>
      </span>
    </div>
  )
}

function BottomNav({ active, onSelect }: { active: NavTab; onSelect: (t: NavTab) => void }) {
  const tabs: { key: NavTab; label: string; icon: (a: boolean) => React.ReactNode }[] = [
    { key: 'home',     label: 'Home',     icon: a => <Icon.Home active={a} /> },
    { key: 'discover', label: 'Discover', icon: a => <Icon.Compass active={a} /> },
    { key: 'matches',  label: 'Matches',  icon: a => <Icon.Users active={a} /> },
    { key: 'sessions', label: 'Sessions', icon: a => <Icon.Calendar active={a} /> },
    { key: 'profile',  label: 'Profile',  icon: a => <Icon.User active={a} /> },
  ]
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)',
      borderTop: '1px solid #f1f5f9',
      display: 'flex', padding: '8px 0 24px', zIndex: 100,
    }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => onSelect(t.key)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', position: 'relative',
        }}>
          {t.icon(active === t.key)}
          <span style={{
            fontSize: 10, fontWeight: active === t.key ? 700 : 500,
            color: active === t.key ? '#4f46e5' : '#94a3b8',
            fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'color 0.15s',
          }}>
            {t.label}
          </span>
          {active === t.key && (
            <div style={{
              position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)',
              width: 20, height: 3, borderRadius: 2, background: '#4f46e5',
            }} />
          )}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SPLASH SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #312e81 0%, #4f46e5 55%, #7c3aed 100%)',
    }}>
      <div style={{ animation: 'slideInUp 0.5s ease both' }}>
        <div style={{
          width: 88, height: 88, borderRadius: 26,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20, margin: '0 auto 20px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
        }}>
          <span style={{ fontSize: 44 }}>⇄</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Skill<span style={{ color: '#a5b4fc' }}>Swap</span>
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8, fontFamily: 'Inter, sans-serif' }}>
            Share. Learn. Grow.
          </div>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 60,
        display: 'flex', gap: 6,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: i === 1 ? 20 : 6, height: 6, borderRadius: 3,
            background: i === 1 ? '#fff' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passErr, setPassErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const validate = () => {
    let ok = true
    if (!email.includes('@') || !email.includes('.')) { setEmailErr('Enter a valid email address'); ok = false } else setEmailErr('')
    if (password.length < 6) { setPassErr('Password must be at least 6 characters'); ok = false } else setPassErr('')
    return ok
  }

  const handleLogin = async () => {
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    onLogin()
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '0 24px 40px', background: '#fff' }}>
      {/* Top decoration */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 200, height: 200, borderRadius: '50%',
        background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: -30, right: 40,
        width: 100, height: 100, borderRadius: '50%',
        background: 'linear-gradient(135deg, #ddd6fe, #ede9fe)',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ paddingTop: 64, paddingBottom: 36 }}>
          <Logo size="md" />
        </div>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e1b4b', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.2 }}>
            Welcome back 👋
          </h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '10px 0 0', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
            Continue learning & sharing with your peers.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 12 }}>
          <TextInput label="Student Email" type="email" value={email} onChange={setEmail} placeholder="you@university.edu" error={emailErr} />
          <div>
            <PasswordInput label="Password" value={password} onChange={setPassword} error={passErr} />
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button onClick={() => { setToast('Reset link sent! Check your email 📧'); setTimeout(() => setToast(null), 2500) }} style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Forgot password?
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <PrimaryBtn onClick={handleLogin} loading={loading} disabled={!email || !password}>
            Log In
          </PrimaryBtn>
          <Divider label="or continue with" />
          <SecondaryBtn onClick={() => { setToast('Google sign-in coming soon!'); setTimeout(() => setToast(null), 2000) }}>
            <Icon.Google /> Continue with Google
          </SecondaryBtn>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 14, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            Don't have an account?{' '}
            <button onClick={onRegister} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Create account
            </button>
          </span>
        </div>
      </div>

      {toast && <Toast message={toast} type="success" />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function RegisterScreen({ onRegister, onLogin }: { onRegister: () => void; onLogin: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', university: '', program: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.includes('@')) e.email = 'Enter a valid student email'
    if (!form.university.trim()) e.university = 'University is required'
    if (!form.program.trim()) e.program = 'Study program is required'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleRegister = async () => {
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1600))
    setLoading(false)
    setToast({ msg: 'Account created! 🎉', type: 'success' })
    await new Promise(r => setTimeout(r, 900))
    onRegister()
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '0 24px 40px', background: '#fff' }}>
      <div style={{ paddingTop: 64, paddingBottom: 28 }}>
        <Logo size="md" />
      </div>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1e1b4b', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.2 }}>
          Start your SkillSwap<br />journey 🚀
        </h1>
        <p style={{ fontSize: 14, color: '#64748b', margin: '10px 0 0', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
          Share what you know. Learn what you need.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
        <TextInput label="Full Name" value={form.name} onChange={v => upd('name', v)} placeholder="Sinta Maharani" error={errors.name} />
        <TextInput label="Student Email" type="email" value={form.email} onChange={v => upd('email', v)} placeholder="you@university.edu" error={errors.email} />
        <TextInput label="University" value={form.university} onChange={v => upd('university', v)} placeholder="Universitas Indonesia" error={errors.university} />
        <TextInput label="Study Program" value={form.program} onChange={v => upd('program', v)} placeholder="Informatics Engineering" error={errors.program} />
        <div>
          <PasswordInput label="Password" value={form.password} onChange={v => upd('password', v)} error={errors.password} />
          <div style={{ marginTop: 8 }}><PasswordStrength password={form.password} /></div>
        </div>
        <PasswordInput label="Confirm Password" value={form.confirm} onChange={v => upd('confirm', v)} error={errors.confirm} placeholder="Re-enter your password" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <PrimaryBtn onClick={handleRegister} loading={loading} disabled={!form.name || !form.email || !form.password}>
          Create Account
        </PrimaryBtn>
        <Divider label="or continue with" />
        <SecondaryBtn><Icon.Google /> Continue with Google</SecondaryBtn>
      </div>

      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: 14, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
          Already have an account?{' '}
          <button onClick={onLogin} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Log in
          </button>
        </span>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SETUP SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function ProfileSetupScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [bio, setBio] = useState('')
  const [year, setYear] = useState('')
  const [teach, setTeach] = useState<string[]>([])
  const [learn, setLearn] = useState<string[]>([])
  const [customTeach, setCustomTeach] = useState('')
  const [customLearn, setCustomLearn] = useState('')
  const [loading, setLoading] = useState(false)

  const teachSuggestions = ['UI/UX', 'Figma', 'HTML', 'CSS', 'JavaScript', 'Photography', 'Video Editing', 'Copywriting', 'Marketing']
  const learnSuggestions = ['React', 'Python', 'Node.js', 'Data Science', 'ML Basics', 'Business Strategy', 'Adobe XD', 'R Language']

  const toggleSkill = (list: string[], setList: (v: string[]) => void, skill: string) => {
    setList(list.includes(skill) ? list.filter(s => s !== skill) : [...list, skill])
  }

  const addCustom = (input: string, list: string[], setList: (v: string[]) => void, setInput: (v: string) => void) => {
    const s = input.trim()
    if (s && !list.includes(s)) setList([...list, s])
    setInput('')
  }

  const handleFinish = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    onDone()
  }

  const steps = [
    {
      title: 'About You ✨',
      subtitle: 'Tell the community who you are',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Year of Study</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduate'].map(y => (
                <button key={y} onClick={() => setYear(y)} style={{
                  padding: '8px 16px', borderRadius: 20, border: `1.5px solid ${year === y ? '#4f46e5' : '#e2e8f0'}`,
                  background: year === y ? '#eef2ff' : '#fff', color: year === y ? '#4f46e5' : '#64748b',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                  transition: 'all 0.15s',
                }}>
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell others about yourself, your interests, and what you're looking to gain from SkillSwap..."
              rows={4}
              style={{
                width: '100%', padding: '13px 14px', borderRadius: 12, border: '1.5px solid #e2e8f0',
                background: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', color: '#111827',
                outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6,
              }}
            />
            <span style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>{bio.length}/200</span>
          </div>
        </div>
      ),
      canNext: !!year,
    },
    {
      title: 'What can you teach? 🎓',
      subtitle: 'Select skills you\'re confident sharing',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {teachSuggestions.map(s => (
              <button key={s} onClick={() => toggleSkill(teach, setTeach, s)} style={{
                padding: '8px 14px', borderRadius: 20,
                border: `1.5px solid ${teach.includes(s) ? '#4f46e5' : '#e2e8f0'}`,
                background: teach.includes(s) ? '#eef2ff' : '#fff',
                color: teach.includes(s) ? '#4f46e5' : '#64748b',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 4,
              }}>
                {teach.includes(s) && <span>✓</span>} {s}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={customTeach} onChange={e => setCustomTeach(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCustom(customTeach, teach, setTeach, setCustomTeach)}
              placeholder="Add another skill..."
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', background: '#fff' }}
            />
            <button onClick={() => addCustom(customTeach, teach, setTeach, setCustomTeach)} style={{
              padding: '10px 14px', borderRadius: 10, background: '#4f46e5', color: '#fff',
              border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>Add</button>
          </div>
          {teach.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {teach.map(s => <SkillTag key={s} label={s} variant="teach" onRemove={() => setTeach(teach.filter(x => x !== s))} />)}
            </div>
          )}
        </div>
      ),
      canNext: teach.length > 0,
    },
    {
      title: 'What do you want to learn? 📚',
      subtitle: 'Pick skills you\'d like to acquire',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {learnSuggestions.map(s => (
              <button key={s} onClick={() => toggleSkill(learn, setLearn, s)} style={{
                padding: '8px 14px', borderRadius: 20,
                border: `1.5px solid ${learn.includes(s) ? '#d97706' : '#e2e8f0'}`,
                background: learn.includes(s) ? '#fef3c7' : '#fff',
                color: learn.includes(s) ? '#92400e' : '#64748b',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 4,
              }}>
                {learn.includes(s) && <span>✓</span>} {s}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={customLearn} onChange={e => setCustomLearn(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCustom(customLearn, learn, setLearn, setCustomLearn)}
              placeholder="Add another skill..."
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', background: '#fff' }}
            />
            <button onClick={() => addCustom(customLearn, learn, setLearn, setCustomLearn)} style={{
              padding: '10px 14px', borderRadius: 10, background: '#d97706', color: '#fff',
              border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>Add</button>
          </div>
          {learn.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {learn.map(s => <SkillTag key={s} label={s} variant="learn" onRemove={() => setLearn(learn.filter(x => x !== s))} />)}
            </div>
          )}
        </div>
      ),
      canNext: learn.length > 0,
    },
  ]

  const current = steps[step]

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: '#fff', display: 'flex', flexDirection: 'column', padding: '0 24px 40px' }}>
      <div style={{ paddingTop: 56, paddingBottom: 28 }}>
        <Logo size="md" />
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= step ? '#4f46e5' : '#e2e8f0',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 6 }}>
            {current.title}
          </div>
          <div style={{ fontSize: 14, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            {current.subtitle}
          </div>
        </div>

        {current.content}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        {step > 0 && (
          <SecondaryBtn onClick={() => setStep(step - 1)} fullWidth={false}>
            <Icon.Back /> Back
          </SecondaryBtn>
        )}
        {step < steps.length - 1 ? (
          <PrimaryBtn onClick={() => setStep(step + 1)} disabled={!current.canNext}>
            Continue <Icon.Arrow />
          </PrimaryBtn>
        ) : (
          <PrimaryBtn onClick={handleFinish} loading={loading} disabled={!current.canNext}>
            Let's Go! 🚀
          </PrimaryBtn>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function HomeScreen({ onNav, onViewProfile }: { onNav: (t: NavTab) => void; onViewProfile: (s: Student) => void }) {
  const [activeCategory, setActiveCategory] = useState<string | null>('Programming')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = STUDENTS.filter(s => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return s.name.toLowerCase().includes(q) || [...s.canTeach, ...s.wantsToLearn].some(sk => sk.toLowerCase().includes(q))
  }).sort((a, b) => b.match - a.match)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '52px 20px 16px',
        background: 'linear-gradient(180deg, #fff 0%, #fafbff 100%)',
        borderBottom: '1px solid #f1f5f9',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Hi, Sinta 👋
            </div>
            <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'Inter, sans-serif', marginTop: 3 }}>
              What do you want to learn today?
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button style={{
              background: '#f1f5f9', border: 'none', borderRadius: 12,
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative',
            }}>
              <Icon.Bell />
              <div style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: '#ef4444', border: '1.5px solid #fff' }} />
            </button>
            <Avatar name="Sinta Maharani" size={40} ring />
          </div>
        </div>

        <div style={{ marginTop: 16, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
            <Icon.Search />
          </div>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search skills or students..."
            style={{
              width: '100%', padding: '12px 14px 12px 42px', background: '#f8fafc',
              border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14,
              fontFamily: 'Inter, sans-serif', color: '#111827', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Scrollable Body */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 88 }}>

        {/* Stats banner */}
        <div style={{ margin: '16px 20px 0' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            borderRadius: 18, padding: '16px 20px',
            display: 'flex', justifyContent: 'space-between',
            boxShadow: '0 6px 24px rgba(79,70,229,0.28)',
          }}>
            {[{ label: 'Matches', value: '12' }, { label: 'Sessions', value: '3' }, { label: 'Swaps', value: '2' }].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
              </div>
            ))}
            <button onClick={() => onNav('matches')} style={{
              background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 12,
              color: '#fff', padding: '10px 14px', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              Find a Match <Icon.Arrow />
            </button>
          </div>
        </div>

        {/* Your Skills */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1e1b4b', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Your Skills
            </h2>
            <button onClick={() => onNav('profile')} style={{
              background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '5px 10px',
              fontSize: 12, fontWeight: 600, color: '#64748b', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              <Icon.Edit /> Edit
            </button>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', marginBottom: 6, fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Can Teach
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['UI/UX', 'Figma', 'HTML'].map(s => <SkillTag key={s} label={s} variant="teach" />)}
              </div>
            </div>
            <div style={{ height: 1, background: '#f1f5f9', marginBottom: 12 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#d97706', marginBottom: 6, fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Want to Learn
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Backend', 'Node.js', 'Python'].map(s => <SkillTag key={s} label={s} variant="learn" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Potential Matches */}
        <div style={{ padding: '24px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 14 }}>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1e1b4b', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Potential Matches
              </h2>
              <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0', fontFamily: 'Inter, sans-serif' }}>
                Students aligned with your goals
              </p>
            </div>
            <button onClick={() => onNav('matches')} style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              See all
            </button>
          </div>

          <div style={{ display: 'flex', gap: 12, paddingLeft: 20, overflowX: 'auto', paddingBottom: 4 }}>
            {filtered.slice(0, 4).map(s => (
              <div key={s.id} onClick={() => onViewProfile(s)} style={{
                background: '#fff', borderRadius: 20, padding: '18px 16px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)', width: 220, flexShrink: 0,
                cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <Avatar name={s.name} size={42} online={s.online} />
                  <MatchBadge pct={s.match} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{s.program}</div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', marginBottom: 4, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Teaches</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {s.canTeach.slice(0, 2).map(sk => <SkillTag key={sk} label={sk} variant="teach" />)}
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#d97706', marginBottom: 4, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Wants to Learn</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {s.wantsToLearn.slice(0, 2).map(sk => <SkillTag key={sk} label={sk} variant="learn" />)}
                  </div>
                </div>
                <button style={{
                  width: '100%', background: '#eef2ff', color: '#4f46e5', border: 'none',
                  borderRadius: 10, padding: '9px 0', fontSize: 13, fontWeight: 700,
                  fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  View Profile <Icon.Arrow />
                </button>
              </div>
            ))}
            <div style={{ width: 20, flexShrink: 0 }} />
          </div>
        </div>

        {/* Explore Categories */}
        <div style={{ padding: '24px 20px 0' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1e1b4b', margin: '0 0 14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Explore Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {CATEGORIES.map(cat => (
              <div key={cat} onClick={() => { setActiveCategory(cat === activeCategory ? null : cat); onNav('discover') }}
                style={{
                  background: activeCategory === cat ? '#4f46e5' : '#fff',
                  borderRadius: 14, padding: '12px 8px',
                  display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.06)', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>
                <span style={{ fontSize: 22 }}>{CATEGORY_ICONS[cat] || '✨'}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: activeCategory === cat ? '#fff' : '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'center' }}>
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Session */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1e1b4b', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Upcoming Session
            </h2>
            <button onClick={() => onNav('sessions')} style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              See all
            </button>
          </div>
          <div style={{
            background: '#fff', borderRadius: 18, padding: 16,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name="Azizi Adhira" size={40} online />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Azizi Adhira</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>Node.js Fundamentals</div>
                </div>
              </div>
              <span style={{ background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Confirmed
              </span>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>📅 Oct 4, 2026</span>
              <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>⏰ 10:00 AM</span>
              <button onClick={() => onNav('sessions')} style={{
                marginLeft: 'auto', background: '#eef2ff', color: '#4f46e5', border: 'none', borderRadius: 8,
                padding: '6px 12px', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer',
              }}>
                View
              </button>
            </div>
          </div>
        </div>

      </div>

      <BottomNav active="home" onSelect={onNav} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DISCOVER SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function DiscoverScreen({ onNav, onViewProfile }: { onNav: (t: NavTab) => void; onViewProfile: (s: Student) => void }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'swaps'>('match')

  const filtered = STUDENTS.filter(s => {
    const q = search.toLowerCase()
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || [...s.canTeach, ...s.wantsToLearn].some(sk => sk.toLowerCase().includes(q))
    const matchesCat = !activeCategory || [...s.canTeach, ...s.wantsToLearn].some(sk => sk.toLowerCase().includes(activeCategory.toLowerCase()))
    return matchesSearch && matchesCat
  }).sort((a, b) => {
    if (sortBy === 'match') return b.match - a.match
    if (sortBy === 'rating') return b.rating - a.rating
    return b.swapsDone - a.swapsDone
  })

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '52px 20px 16px', background: '#fff', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 4 }}>
          Discover 🔍
        </div>
        <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'Inter, sans-serif', marginBottom: 14 }}>
          Find your perfect skill exchange partner
        </div>
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
            <Icon.Search />
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills or names..."
            style={{
              width: '100%', padding: '11px 14px 11px 42px', background: '#f8fafc',
              border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14,
              fontFamily: 'Inter, sans-serif', color: '#111827', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {['All', ...CATEGORIES.slice(0, 6)].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat === 'All' ? null : cat)} style={{
              padding: '6px 14px', borderRadius: 20, flexShrink: 0,
              border: `1.5px solid ${(cat === 'All' && !activeCategory) || activeCategory === cat ? '#4f46e5' : '#e2e8f0'}`,
              background: (cat === 'All' && !activeCategory) || activeCategory === cat ? '#4f46e5' : '#fff',
              color: (cat === 'All' && !activeCategory) || activeCategory === cat ? '#fff' : '#64748b',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'all 0.15s',
            }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
        background: '#fafbff', borderBottom: '1px solid #f1f5f9', flexShrink: 0,
      }}>
        <Icon.Filter />
        <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>Sort:</span>
        {(['match', 'rating', 'swaps'] as const).map(opt => (
          <button key={opt} onClick={() => setSortBy(opt)} style={{
            padding: '4px 12px', borderRadius: 20,
            background: sortBy === opt ? '#4f46e5' : 'transparent',
            color: sortBy === opt ? '#fff' : '#64748b',
            border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
          }}>
            {opt === 'match' ? 'Best Match' : opt === 'rating' ? 'Rating' : 'Most Active'}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
          {filtered.length} found
        </span>
      </div>

      {/* Student List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 96px' }}>
        {filtered.map(s => (
          <div key={s.id} onClick={() => onViewProfile(s)} style={{
            background: '#fff', borderRadius: 18, padding: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: 12,
            cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <Avatar name={s.name} size={50} online={s.online} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{s.program} · {s.university}</div>
                  </div>
                  <MatchBadge pct={s.match} />
                </div>
                <div style={{ marginTop: 10, display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', marginBottom: 4, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Teaches</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {s.canTeach.slice(0, 2).map(sk => <SkillTag key={sk} label={sk} variant="teach" />)}
                      {s.canTeach.length > 2 && <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter, sans-serif', alignSelf: 'center' }}>+{s.canTeach.length - 2}</span>}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#d97706', marginBottom: 4, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Wants</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {s.wantsToLearn.slice(0, 2).map(sk => <SkillTag key={sk} label={sk} variant="learn" />)}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <StarRating rating={s.rating} />
                  <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>·</span>
                  <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{s.swapsDone} swaps</span>
                  <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>·</span>
                  <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>Responds {s.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No results found</div>
            <div style={{ fontSize: 13 }}>Try a different skill or clear filters</div>
          </div>
        )}
      </div>

      <BottomNav active="discover" onSelect={onNav} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// VIEW PROFILE SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function ViewProfileScreen({ student, onBack, onSendRequest, onChat }: {
  student: Student; onBack: () => void; onSendRequest: () => void; onChat: () => void
}) {
  const [tab, setTab] = useState<'about' | 'skills' | 'reviews'>('about')

  const reviews = [
    { name: 'Maya Rahman', rating: 5, comment: 'Super helpful and patient! I learned so much from our swap session.', time: '2 weeks ago' },
    { name: 'Riko Ardianto', rating: 5, comment: 'Very knowledgeable. Explains complex concepts in simple terms. 10/10!', time: '1 month ago' },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8faff' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #312e81 0%, #4f46e5 100%)',
        padding: '52px 20px 80px', position: 'relative', flexShrink: 0,
      }}>
        <button onClick={onBack} style={{
          position: 'absolute', top: 52, left: 16,
          background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10,
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff', backdropFilter: 'blur(8px)',
        }}>
          <Icon.Back />
        </button>

        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <Avatar name={student.name} size={76} ring online={student.online} />
          <div style={{ marginTop: 12, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{student.name}</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>{student.program} · {student.university}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{student.year}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
            <MatchBadge pct={student.match} />
            {student.online && (
              <div style={{ background: 'rgba(16,185,129,0.2)', borderRadius: 10, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Online now</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{
        margin: '0 16px', marginTop: -36, background: '#fff',
        borderRadius: 18, padding: '16px 20px', flexShrink: 0,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        display: 'flex', justifyContent: 'space-around',
      }}>
        {[
          { label: 'Swaps Done', value: student.swapsDone },
          { label: 'Rating', value: student.rating },
          { label: 'Response', value: student.responseTime },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', margin: '16px 16px 0', background: '#f1f5f9', borderRadius: 12, padding: 4, flexShrink: 0 }}>
        {(['about', 'skills', 'reviews'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
            background: tab === t ? '#fff' : 'transparent',
            color: tab === t ? '#1e1b4b' : '#94a3b8',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
            transition: 'all 0.15s',
            boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 120px' }}>
        {tab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#4f46e5', marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>About</div>
              <p style={{ fontSize: 14, color: '#374151', fontFamily: 'Inter, sans-serif', lineHeight: 1.7, margin: 0 }}>{student.bio}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 12, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Details</div>
              {[
                { icon: '🎓', label: 'Program', value: student.program },
                { icon: '🏛️', label: 'University', value: student.university },
                { icon: '📅', label: 'Year', value: student.year },
                { icon: '⏱️', label: 'Response Time', value: student.responseTime },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{row.label}</div>
                    <div style={{ fontSize: 14, color: '#111827', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#6366f1', marginBottom: 10, fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Can Teach You
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {student.canTeach.map(s => <SkillTag key={s} label={s} variant="teach" />)}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706', marginBottom: 10, fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Wants to Learn
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {student.wantsToLearn.map(s => <SkillTag key={s} label={s} variant="learn" />)}
              </div>
            </div>
          </div>
        )}

        {tab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{student.rating}</div>
                <StarRating rating={student.rating} />
                <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter, sans-serif', marginTop: 4 }}>{student.swapsDone} reviews</div>
              </div>
            </div>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar name={r.name} size={32} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{r.name}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{r.time}</span>
                </div>
                <StarRating rating={r.rating} />
                <p style={{ fontSize: 13, color: '#374151', fontFamily: 'Inter, sans-serif', margin: '8px 0 0', lineHeight: 1.6 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 16px 32px',
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)',
        borderTop: '1px solid #f1f5f9',
        display: 'flex', gap: 10,
      }}>
        <button onClick={onChat} style={{
          width: 48, height: 48, borderRadius: 12, background: '#f1f5f9',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#4f46e5', flexShrink: 0,
        }}>
          <Icon.Chat />
        </button>
        <PrimaryBtn onClick={onSendRequest}>
          Send Swap Request ⇄
        </PrimaryBtn>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SWAP REQUEST SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function SwapRequestScreen({ student, onBack, onSend }: {
  student: Student; onBack: () => void; onSend: () => void
}) {
  const [teachSkill, setTeachSkill] = useState('')
  const [learnSkill, setLearnSkill] = useState('')
  const [message, setMessage] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [format, setFormat] = useState<'video' | 'text' | 'inperson'>('video')
  const [loading, setLoading] = useState(false)

  const myTeach = ['UI/UX', 'Figma', 'HTML']

  const handleSend = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    onSend()
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '52px 20px 16px', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} style={{
            background: '#f1f5f9', border: 'none', borderRadius: 10, width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon.Back />
          </button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Send Swap Request
            </div>
            <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Propose a skill exchange with {student.name}
            </div>
          </div>
        </div>

        {/* Partner Card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, background: '#f8faff',
          borderRadius: 14, padding: '12px 14px', border: '1.5px solid #e0e7ff',
        }}>
          <Avatar name={student.name} size={44} online={student.online} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{student.name}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{student.program}</div>
          </div>
          <MatchBadge pct={student.match} />
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 120px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Skill Exchange */}
          <div style={{ background: '#f8faff', borderRadius: 16, padding: 16, border: '1.5px solid #e0e7ff' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 14 }}>
              Skill Exchange Details ⇄
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'block', marginBottom: 8 }}>
                  I will teach
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {myTeach.map(s => (
                    <button key={s} onClick={() => setTeachSkill(s)} style={{
                      padding: '7px 14px', borderRadius: 20,
                      border: `1.5px solid ${teachSkill === s ? '#4f46e5' : '#e2e8f0'}`,
                      background: teachSkill === s ? '#eef2ff' : '#fff',
                      color: teachSkill === s ? '#4f46e5' : '#64748b',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                      transition: 'all 0.15s',
                    }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                <span style={{ fontSize: 18 }}>⇄</span>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#d97706', fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'block', marginBottom: 8 }}>
                  I want to learn
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {student.canTeach.map(s => (
                    <button key={s} onClick={() => setLearnSkill(s)} style={{
                      padding: '7px 14px', borderRadius: 20,
                      border: `1.5px solid ${learnSkill === s ? '#d97706' : '#e2e8f0'}`,
                      background: learnSkill === s ? '#fef3c7' : '#fff',
                      color: learnSkill === s ? '#92400e' : '#64748b',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                      transition: 'all 0.15s',
                    }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Format */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 10 }}>
              Session Format
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {([
                { key: 'video', icon: '🎥', label: 'Video Call' },
                { key: 'text', icon: '💬', label: 'Text Chat' },
                { key: 'inperson', icon: '🤝', label: 'In-Person' },
              ] as const).map(f => (
                <button key={f.key} onClick={() => setFormat(f.key)} style={{
                  flex: 1, padding: '10px 8px', borderRadius: 12,
                  border: `1.5px solid ${format === f.key ? '#4f46e5' : '#e2e8f0'}`,
                  background: format === f.key ? '#eef2ff' : '#fff',
                  cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: format === f.key ? '#4f46e5' : '#64748b', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'block', marginBottom: 6 }}>Preferred Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{
                width: '100%', padding: '11px 12px', borderRadius: 12, border: '1.5px solid #e2e8f0',
                fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box', color: '#111827',
              }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'block', marginBottom: 6 }}>Preferred Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{
                width: '100%', padding: '11px 12px', borderRadius: 12, border: '1.5px solid #e2e8f0',
                fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box', color: '#111827',
              }} />
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'block', marginBottom: 6 }}>
              Personal Message (optional)
            </label>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
              placeholder={`Hey ${student.name}! I'd love to swap skills with you. I can teach you ${student.wantsToLearn[0] || 'a skill'} and would love to learn ${student.canTeach[0] || 'from you'}...`}
              rows={4}
              style={{
                width: '100%', padding: '13px 14px', borderRadius: 12, border: '1.5px solid #e2e8f0',
                background: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', color: '#111827',
                outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 20px 32px',
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)',
        borderTop: '1px solid #f1f5f9',
      }}>
        <PrimaryBtn onClick={handleSend} loading={loading} disabled={!teachSkill || !learnSkill}>
          Send Request ⇄
        </PrimaryBtn>
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
          {student.name} will be notified and can accept or suggest changes
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MATCHES SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function MatchesScreen({ onNav, onViewProfile }: { onNav: (t: NavTab) => void; onViewProfile: (s: Student) => void }) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted'>('all')
  const accepted = STUDENTS.slice(0, 2)
  const pending = STUDENTS.slice(2, 4)

  const shown = filter === 'accepted' ? accepted : filter === 'pending' ? pending : [...accepted, ...pending]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '52px 20px 16px', background: '#fff', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 4 }}>
          My Matches 🤝
        </div>
        <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'Inter, sans-serif', marginBottom: 16 }}>
          {STUDENTS.length} students match your skill profile
        </div>

        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 12, padding: 4, gap: 4 }}>
          {([['all', 'All'], ['accepted', '✓ Accepted'], ['pending', '⏳ Pending']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
              background: filter === key ? '#fff' : 'transparent',
              color: filter === key ? '#1e1b4b' : '#94a3b8',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'all 0.15s', boxShadow: filter === key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 96px' }}>
        {shown.map((s, i) => {
          const isAccepted = accepted.includes(s)
          return (
            <div key={s.id} onClick={() => onViewProfile(s)} style={{
              background: '#fff', borderRadius: 18, padding: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: 12,
              cursor: 'pointer', borderLeft: `4px solid ${isAccepted ? '#10b981' : '#f59e0b'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={s.name} size={48} online={s.online} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.name}</div>
                    <span style={{
                      background: isAccepted ? '#d1fae5' : '#fef3c7',
                      color: isAccepted ? '#065f46' : '#92400e',
                      fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}>
                      {isAccepted ? '✓ Accepted' : '⏳ Pending'}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
                    {s.program} · {s.university}
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {s.canTeach.slice(0, 1).map(sk => <SkillTag key={sk} label={sk} variant="teach" />)}
                    {s.wantsToLearn.slice(0, 1).map(sk => <SkillTag key={sk} label={sk} variant="learn" />)}
                    <MatchBadge pct={s.match} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <BottomNav active="matches" onSelect={onNav} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SESSIONS SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function SessionsScreen({ onNav }: { onNav: (t: NavTab) => void }) {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  const upcoming = [
    { partner: 'Azizi Adhira', skill: 'Node.js Fundamentals', date: 'Oct 4, 2026', time: '10:00 AM', status: 'confirmed', type: 'teaching' },
    { partner: 'Laila Nusantara', skill: 'HTML & CSS Basics', date: 'Oct 7, 2026', time: '2:00 PM', status: 'pending', type: 'learning' },
  ]

  const past = [
    { partner: 'Nadia Kusuma', skill: 'Brand Design Workshop', date: 'Sep 28, 2026', time: '11:00 AM', status: 'completed', type: 'learning', rating: 5 },
    { partner: 'Reza Pratama', skill: 'Python Basics', date: 'Sep 21, 2026', time: '3:00 PM', status: 'completed', type: 'learning', rating: 5 },
  ]

  const shown = tab === 'upcoming' ? upcoming : past

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '52px 20px 16px', background: '#fff', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: 4 }}>
          Sessions 📅
        </div>
        <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'Inter, sans-serif', marginBottom: 16 }}>
          Track your skill exchange sessions
        </div>
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 12, padding: 4 }}>
          {([['upcoming', '⏰ Upcoming'], ['past', '✓ Completed']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
              background: tab === key ? '#fff' : 'transparent',
              color: tab === key ? '#1e1b4b' : '#94a3b8',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'all 0.15s', boxShadow: tab === key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 96px' }}>
        {shown.map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 18, padding: 16,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={s.partner} size={44} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.partner}</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{s.skill}</div>
                  <div style={{ marginTop: 4 }}>
                    <SkillTag label={s.type === 'teaching' ? 'Teaching' : 'Learning'} variant={s.type === 'teaching' ? 'teach' : 'learn'} />
                  </div>
                </div>
              </div>
              <span style={{
                background: s.status === 'confirmed' ? '#d1fae5' : s.status === 'pending' ? '#fef3c7' : '#f0fdf4',
                color: s.status === 'confirmed' ? '#065f46' : s.status === 'pending' ? '#92400e' : '#16a34a',
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
                {s.status === 'confirmed' ? '✓ Confirmed' : s.status === 'pending' ? '⏳ Pending' : '✓ Completed'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>📅 {s.date}</span>
                <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>⏰ {s.time}</span>
              </div>
              {tab === 'upcoming' ? (
                <button style={{
                  background: '#eef2ff', color: '#4f46e5', border: 'none', borderRadius: 8,
                  padding: '6px 12px', fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer',
                }}>
                  Join
                </button>
              ) : (
                <div>{'rating' in s && <StarRating rating={s.rating as number} />}</div>
              )}
            </div>
          </div>
        ))}

        {shown.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>No sessions yet</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Find a match and start your first swap!</div>
          </div>
        )}
      </div>

      <BottomNav active="sessions" onSelect={onNav} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAT SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function ChatScreen({ student, onBack }: { student: Student; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_CHATS[student.id]?.messages || [])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 50)
  }, [])

  useEffect(() => scroll(), [messages, scroll])

  const handleSend = async () => {
    const text = input.trim()
    if (!text) return
    const newMsg: Message = {
      id: `m${Date.now()}`, from: 'me', text, time: 'Just now', read: false,
    }
    setMessages(prev => [...prev, newMsg])
    setInput('')

    // Simulate reply
    setTyping(true)
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000))
    setTyping(false)
    const replies = [
      'That sounds great! 😊', 'Sure, let me check my schedule!', 'Awesome idea! Let\'s do it 🔥',
      'I\'ll get back to you on that shortly 👍', 'Looking forward to it! 🙌',
    ]
    setMessages(prev => [...prev, {
      id: `r${Date.now()}`, from: 'them', text: replies[Math.floor(Math.random() * replies.length)], time: 'Just now', read: false,
    }])
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8faff' }}>
      {/* Chat Header */}
      <div style={{
        padding: '52px 16px 14px', background: '#fff',
        borderBottom: '1px solid #f1f5f9', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{
            background: '#f1f5f9', border: 'none', borderRadius: 10,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon.Back />
          </button>
          <Avatar name={student.name} size={40} online={student.online} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{student.name}</div>
            <div style={{ fontSize: 12, color: student.online ? '#10b981' : '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
              {student.online ? 'Online now' : 'Last seen recently'}
            </div>
          </div>
          <button style={{
            background: '#4f46e5', border: 'none', borderRadius: 10, width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0,
          }}>
            📹
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 16px' }}>
        {/* Swap context banner */}
        <div style={{
          background: '#eef2ff', borderRadius: 14, padding: '10px 14px', marginBottom: 16,
          textAlign: 'center', border: '1px solid #c7d2fe',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#4f46e5', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Swap Session — Figma ⇄ {student.canTeach[0]}
          </div>
          <div style={{ fontSize: 11, color: '#6366f1', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
            Session scheduled for Oct 4, 2026 · 10:00 AM
          </div>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start',
            marginBottom: 8, animation: 'slideInUp 0.2s ease both',
          }}>
            {msg.from === 'them' && (
              <div style={{ marginRight: 6, marginTop: 'auto' }}>
                <Avatar name={student.name} size={28} />
              </div>
            )}
            <div style={{
              maxWidth: '72%', padding: '10px 14px', borderRadius: msg.from === 'me' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
              background: msg.from === 'me' ? 'linear-gradient(135deg, #4f46e5, #6d28d9)' : '#fff',
              color: msg.from === 'me' ? '#fff' : '#111827',
              fontSize: 14, fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
              boxShadow: msg.from === 'me' ? '0 2px 8px rgba(79,70,229,0.3)' : '0 1px 6px rgba(0,0,0,0.06)',
            }}>
              {msg.text}
              <div style={{ fontSize: 10, marginTop: 4, opacity: 0.6, textAlign: 'right' }}>{msg.time}</div>
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 8 }}>
            <Avatar name={student.name} size={28} />
            <div style={{
              background: '#fff', borderRadius: '4px 16px 16px 16px',
              padding: '12px 16px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              display: 'flex', gap: 4, alignItems: 'center',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#94a3b8',
                  animation: `pulse-dot 1.2s ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px 32px', background: '#fff',
        borderTop: '1px solid #f1f5f9', flexShrink: 0,
        display: 'flex', gap: 10, alignItems: 'flex-end',
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 22,
              border: '1.5px solid #e2e8f0', background: '#f8fafc',
              fontSize: 14, fontFamily: 'Inter, sans-serif', color: '#111827',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <button onClick={handleSend} disabled={!input.trim()} style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: input.trim() ? 'linear-gradient(135deg, #4f46e5, #6d28d9)' : '#e2e8f0',
          border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: input.trim() ? '#fff' : '#94a3b8',
          transition: 'all 0.15s',
          boxShadow: input.trim() ? '0 4px 12px rgba(79,70,229,0.35)' : 'none',
        }}>
          <Icon.Send />
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function ProfileScreen({ onNav, onLogout }: { onNav: (t: NavTab) => void; onLogout: () => void }) {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #312e81 0%, #4f46e5 100%)',
        padding: '52px 20px 32px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            My Profile
          </div>
          <button onClick={() => showToast('Settings coming soon!')} style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          }}>
            <Icon.Settings />
          </button>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar name="Sinta Maharani" size={64} ring />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Sinta Maharani
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
              Visual Communication Design · Year 3
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
              Universitas Indonesia
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {['UI/UX', 'Figma', 'Design'].map(s => <SkillTag key={s} label={s} variant="teach" />)}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        margin: '0 16px', marginTop: -20, background: '#fff',
        borderRadius: 18, padding: '16px 20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        display: 'flex', justifyContent: 'space-around',
        flexShrink: 0, position: 'relative', zIndex: 1,
      }}>
        {[
          { label: 'Swaps', value: '2', icon: '⇄' },
          { label: 'Matches', value: '12', icon: '🤝' },
          { label: 'Rating', value: '4.9', icon: '⭐' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, marginBottom: 2 }}>{stat.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 96px' }}>

        {/* Skills Section */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.04)', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1e1b4b', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>My Skills</div>
            <button onClick={() => showToast('Edit skills — coming soon!')} style={{
              background: '#eef2ff', border: 'none', borderRadius: 8, padding: '5px 10px',
              fontSize: 12, fontWeight: 600, color: '#4f46e5', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              <Icon.Edit /> Edit
            </button>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', marginBottom: 6, fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Can Teach</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['UI/UX', 'Figma', 'HTML', 'CSS'].map(s => <SkillTag key={s} label={s} variant="teach" />)}
              <button onClick={() => showToast('Add skill — coming soon!')} style={{
                padding: '4px 10px', borderRadius: 20, border: '1.5px dashed #c7d2fe',
                background: 'transparent', color: '#6366f1', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
                <Icon.Plus /> Add
              </button>
            </div>
          </div>
          <div style={{ height: 1, background: '#f1f5f9', marginBottom: 12 }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#d97706', marginBottom: 6, fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Want to Learn</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Backend', 'Node.js', 'Python'].map(s => <SkillTag key={s} label={s} variant="learn" />)}
              <button onClick={() => showToast('Add skill — coming soon!')} style={{
                padding: '4px 10px', borderRadius: 20, border: '1.5px dashed #fcd34d',
                background: 'transparent', color: '#d97706', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
                <Icon.Plus /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '4px 0', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', marginBottom: 12 }}>
          {[
            { icon: '📋', label: 'Edit Profile', action: () => showToast('Edit profile — coming soon!') },
            { icon: '🔔', label: 'Notifications', action: () => showToast('Notification settings — coming soon!') },
            { icon: '🛡️', label: 'Privacy & Safety', action: () => showToast('Privacy settings — coming soon!') },
            { icon: '💬', label: 'Help & Support', action: () => showToast('Help center — coming soon!') },
          ].map((item, i) => (
            <button key={i} onClick={item.action} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', background: 'none', border: 'none',
              borderBottom: i < 3 ? '1px solid #f8fafc' : 'none',
              cursor: 'pointer', textAlign: 'left',
            }}>
              <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item.label}</span>
              <Icon.Arrow />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button onClick={onLogout} style={{
          width: '100%', background: '#fff', border: '1.5px solid #fee2e2',
          borderRadius: 16, padding: '14px 0', fontSize: 15, fontWeight: 700,
          color: '#ef4444', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          Log Out
        </button>
      </div>

      <BottomNav active="profile" onSelect={onNav} />
      {toast && <Toast message={toast} type="success" />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [activeNav, setActiveNav] = useState<NavTab>('home')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [prevScreen, setPrevScreen] = useState<Screen>('home')

  const go = (s: Screen) => {
    setPrevScreen(screen)
    setScreen(s)
  }

  const goBack = () => go(prevScreen)

  const handleNav = (tab: NavTab) => {
    setActiveNav(tab)
    const map: Record<NavTab, Screen> = {
      home: 'home', discover: 'discover', matches: 'matches',
      sessions: 'sessions', profile: 'profile',
    }
    go(map[tab])
  }

  const handleViewProfile = (s: Student) => {
    setSelectedStudent(s)
    go('view-profile')
  }

  const handleSendRequest = () => {
    go('swap-request')
  }

  const handleOpenChat = (s?: Student) => {
    if (s) setSelectedStudent(s)
    go('chat')
  }

  const handleRequestSent = () => {
    setToast('Swap request sent! 🎉 Waiting for response...')
    setTimeout(() => setToast(null), 3000)
    go('matches')
  }

  const handleLogout = () => {
    go('login')
  }

  return (
    <>
      <style>{`
        @keyframes slideInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInUp { from { opacity:0; transform:translate(-50%,16px); } to { opacity:1; transform:translate(-50%,0); } }
        @keyframes pulse-dot { 0%,100%{ opacity:1; } 50%{ opacity:0.4; } }
        @keyframes spin { from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
      `}</style>

      {/* Desktop wrapper — mobile shell */}
      <div style={{
        minHeight: '100vh', background: 'linear-gradient(160deg,#312e81 0%,#4f46e5 40%,#818cf8 100%)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '0',
      }}>
        <div style={{
          width: '100%', maxWidth: 430, minHeight: '100vh',
          background: '#f4f5ff', position: 'relative', overflow: 'hidden',
          boxShadow: '0 0 80px rgba(0,0,0,0.25)',
        }}>
          {/* Screen Navigator (dev tool) */}
          <div style={{
            position: 'fixed', top: 10, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 4, background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)', borderRadius: 20, padding: 4,
            boxShadow: '0 2px 20px rgba(0,0,0,0.15)', zIndex: 9000,
            maxWidth: 420, overflowX: 'auto',
          }}>
            {((['login','register','profile-setup','home','discover','matches','sessions','profile'] as Screen[])).map(s => (
              <button key={s} onClick={() => setScreen(s)} style={{
                background: screen === s ? '#4f46e5' : 'transparent',
                color: screen === s ? '#fff' : '#64748b',
                border: 'none', borderRadius: 14, padding: '4px 10px',
                fontSize: 10, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
              }}>
                {s}
              </button>
            ))}
          </div>

          {/* Screens */}
          {screen === 'splash' && <SplashScreen onDone={() => go('login')} />}
          {screen === 'login' && <LoginScreen onLogin={() => go('profile-setup')} onRegister={() => go('register')} />}
          {screen === 'register' && <RegisterScreen onRegister={() => go('profile-setup')} onLogin={() => go('login')} />}
          {screen === 'profile-setup' && <ProfileSetupScreen onDone={() => go('home')} />}
          {screen === 'home' && <HomeScreen onNav={handleNav} onViewProfile={handleViewProfile} />}
          {screen === 'discover' && <DiscoverScreen onNav={handleNav} onViewProfile={handleViewProfile} />}
          {screen === 'matches' && <MatchesScreen onNav={handleNav} onViewProfile={handleViewProfile} />}
          {screen === 'sessions' && <SessionsScreen onNav={handleNav} />}
          {screen === 'profile' && <ProfileScreen onNav={handleNav} onLogout={handleLogout} />}
          {screen === 'view-profile' && selectedStudent && (
            <ViewProfileScreen
              student={selectedStudent}
              onBack={goBack}
              onSendRequest={handleSendRequest}
              onChat={() => handleOpenChat(selectedStudent)}
            />
          )}
          {screen === 'swap-request' && selectedStudent && (
            <SwapRequestScreen student={selectedStudent} onBack={goBack} onSend={handleRequestSent} />
          )}
          {screen === 'chat' && selectedStudent && (
            <ChatScreen student={selectedStudent} onBack={goBack} />
          )}
        </div>
      </div>

      {toast && <Toast message={toast} type="success" />}
    </>
  )
}
