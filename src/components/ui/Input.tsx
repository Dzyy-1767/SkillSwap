import { useState } from 'react'
import Icons from './Icons'

// ─── Text Input ───────────────────────────────────────────────────────────────

interface TextInputProps {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
}

export function TextInput({ label, type = 'text', value, onChange, placeholder, error }: TextInputProps) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {label}
      </label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '13px 14px', borderRadius: 12,
          border: `1.5px solid ${error ? '#f87171' : focused ? '#4f46e5' : '#e2e8f0'}`,
          background: '#fff', fontSize: 15, fontFamily: 'Inter, sans-serif',
          color: '#111827', outline: 'none', transition: 'border-color 0.15s',
          boxSizing: 'border-box',
          boxShadow: focused ? '0 0 0 3px rgba(79,70,229,0.08)' : 'none',
        }}
      />
      {error && <span style={{ fontSize: 12, color: '#ef4444', fontFamily: 'Inter, sans-serif' }}>{error}</span>}
    </div>
  )
}

// ─── Password Input ───────────────────────────────────────────────────────────

interface PasswordInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
}

export function PasswordInput({ label, value, onChange, error, placeholder }: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'} value={value}
          placeholder={placeholder || '••••••••'}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: '13px 46px 13px 14px', borderRadius: 12,
            border: `1.5px solid ${error ? '#f87171' : focused ? '#4f46e5' : '#e2e8f0'}`,
            background: '#fff', fontSize: 15, fontFamily: 'Inter, sans-serif',
            color: '#111827', outline: 'none', transition: 'border-color 0.15s',
            boxSizing: 'border-box',
            boxShadow: focused ? '0 0 0 3px rgba(79,70,229,0.08)' : 'none',
          }}
        />
        <button type="button" onClick={() => setShow(!show)} style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8',
          display: 'flex', padding: 4,
        }}>
          <Icons.Eye open={show} />
        </button>
      </div>
      {error && <span style={{ fontSize: 12, color: '#ef4444', fontFamily: 'Inter, sans-serif' }}>{error}</span>}
    </div>
  )
}

// ─── Password Strength ────────────────────────────────────────────────────────

export function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const strength = checks.filter(Boolean).length
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['#e2e8f0', '#ef4444', '#f59e0b', '#3b82f6', '#10b981']
  if (!password) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= strength ? colors[strength] : '#e2e8f0',
            transition: 'background 0.2s',
          }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: colors[strength], fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
        {labels[strength]} password
      </span>
    </div>
  )
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
        <Icons.Search />
      </div>
      <input
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '12px 14px 12px 42px',
          background: '#f8fafc', border: '1.5px solid #e2e8f0',
          borderRadius: 12, fontSize: 14, fontFamily: 'Inter, sans-serif',
          color: '#111827', outline: 'none', boxSizing: 'border-box',
        }}
      />
    </div>
  )
}
