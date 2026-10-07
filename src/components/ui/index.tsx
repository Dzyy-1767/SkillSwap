import { useState } from 'react'

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name, size = 40, ring = false, online = false }: {
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

// ─── SkillTag ─────────────────────────────────────────────────────────────────
export function SkillTag({ label, variant = 'teach', onRemove }: {
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </span>
  )
}

// ─── MatchBadge ───────────────────────────────────────────────────────────────
export function MatchBadge({ pct }: { pct: number }) {
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

// ─── StarRating ───────────────────────────────────────────────────────────────
export function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif', marginLeft: 4 }}>{rating}</span>
    </div>
  )
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
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

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
      <span style={{ fontSize: 13, color: '#94a3b8', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
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

// ─── PasswordStrength ─────────────────────────────────────────────────────────
export function PasswordStrength({ password }: { password: string }) {
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

// ─── PrimaryBtn ───────────────────────────────────────────────────────────────
export function PrimaryBtn({ children, onClick, loading = false, disabled = false, fullWidth = true, small = false }: {
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

// ─── SecondaryBtn ─────────────────────────────────────────────────────────────
export function SecondaryBtn({ children, onClick, fullWidth = true, small = false }: {
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

// ─── TextInput ────────────────────────────────────────────────────────────────
export function TextInput({ label, type = 'text', value, onChange, placeholder, error }: {
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

// ─── PasswordInput ────────────────────────────────────────────────────────────
export function PasswordInput({ label, value, onChange, error, placeholder }: {
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
          {show
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          }
        </button>
      </div>
      {error && <span style={{ fontSize: 12, color: '#ef4444', fontFamily: 'Inter, sans-serif' }}>{error}</span>}
    </div>
  )
}
