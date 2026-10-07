import { useState } from 'react'

// ─── Primary Button ───────────────────────────────────────────────────────────

interface PrimaryBtnProps {
  children: React.ReactNode
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  small?: boolean
}

export function PrimaryBtn({ children, onClick, loading = false, disabled = false, fullWidth = true, small = false }: PrimaryBtnProps) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      disabled={disabled || loading}
      style={{
        width: fullWidth ? '100%' : 'auto',
        background: disabled ? '#c7d2fe' : 'linear-gradient(135deg,#4f46e5,#6d28d9)',
        color: '#fff', border: 'none',
        borderRadius: small ? 10 : 14,
        padding: small ? '10px 18px' : '15px 24px',
        fontSize: small ? 13 : 16, fontWeight: 700,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        boxShadow: disabled ? 'none' : pressed ? 'none' : '0 4px 18px rgba(79,70,229,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}
    >
      {loading
        ? <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Loading...</>
        : children}
    </button>
  )
}

// ─── Secondary Button ─────────────────────────────────────────────────────────

interface SecondaryBtnProps {
  children: React.ReactNode
  onClick?: () => void
  fullWidth?: boolean
  small?: boolean
}

export function SecondaryBtn({ children, onClick, fullWidth = true, small = false }: SecondaryBtnProps) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        width: fullWidth ? '100%' : 'auto',
        background: pressed ? '#f1f5f9' : '#fff',
        color: '#1e1b4b', border: '1.5px solid #e2e8f0',
        borderRadius: small ? 10 : 14,
        padding: small ? '9px 16px' : '14px 24px',
        fontSize: small ? 13 : 16, fontWeight: 600,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        cursor: 'pointer', transition: 'all 0.15s ease',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}
    >
      {children}
    </button>
  )
}

// ─── Ghost Button ─────────────────────────────────────────────────────────────

interface GhostBtnProps {
  children: React.ReactNode
  onClick?: () => void
  color?: string
}

export function GhostBtn({ children, onClick, color = '#4f46e5' }: GhostBtnProps) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', color,
      fontSize: 13, fontWeight: 700, cursor: 'pointer',
      fontFamily: 'Plus Jakarta Sans, sans-serif', padding: 0,
    }}>
      {children}
    </button>
  )
}

// ─── Icon Button ──────────────────────────────────────────────────────────────

interface IconBtnProps {
  children: React.ReactNode
  onClick?: () => void
  size?: number
  bg?: string
  color?: string
  radius?: number
}

export function IconBtn({ children, onClick, size = 40, bg = '#f1f5f9', color = '#374151', radius = 12 }: IconBtnProps) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: radius,
      background: bg, border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, flexShrink: 0,
    }}>
      {children}
    </button>
  )
}
