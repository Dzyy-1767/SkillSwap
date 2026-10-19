import { useState } from 'react'

interface Props {
  onLogin: () => void
  onRegister: () => void
}

export default function LoginPage({ onLogin, onRegister }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 1200)
  }

  return (
    <div className="login-root">
      {/* Animated background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Top hero section */}
      <div className="login-hero">
        {/* Logo mark */}
        <div className="logo-ring">
          <div className="logo-inner">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7l9 5 9-5-9-5z" fill="white" fillOpacity="0.95"/>
              <path d="M3 17l9 5 9-5M3 12l9 5 9-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="hero-brand">SkillSwap</h1>
        <p className="hero-tagline">Platform belajar & berbagi skill<br />antar mahasiswa Indonesia 🇮🇩</p>

        {/* Floating stat badges */}
        <div className="stat-badges">
          <div className="stat-badge">
            <span className="stat-num">12K+</span>
            <span className="stat-label">Mahasiswa</span>
          </div>
          <div className="stat-badge">
            <span className="stat-num">200+</span>
            <span className="stat-label">Kampus</span>
          </div>
          <div className="stat-badge">
            <span className="stat-num">5K+</span>
            <span className="stat-label">Skill Swap</span>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="login-card">
        {/* Card handle */}
        <div className="card-handle" />

        <div className="card-header">
          <h2 className="card-title">Selamat Datang! 👋</h2>
          <p className="card-subtitle">Masuk ke akun SkillSwap kamu</p>
        </div>

        {/* Email field */}
        <div className={`input-group ${focusedField === 'email' ? 'focused' : ''}`}>
          <label className="input-label">Email Kampus</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="nama@university.ac.id"
              className="text-input"
            />
          </div>
        </div>

        {/* Password field */}
        <div className={`input-group ${focusedField === 'password' ? 'focused' : ''}`}>
          <label className="input-label">Password</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </span>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="••••••••"
              className="text-input"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="eye-btn"
              type="button"
            >
              {showPass ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="forgot-row">
          <button className="forgot-btn">Lupa password?</button>
        </div>

        {/* Main CTA */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`cta-btn ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <span className="btn-loading">
              <svg className="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Masuk...
            </span>
          ) : (
            <span className="btn-content">
              Masuk
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="divider">
          <span className="divider-text">atau lanjut dengan</span>
        </div>

        {/* Google button */}
        <button className="google-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        {/* Register link */}
        <p className="register-link">
          Belum punya akun?{' '}
          <button onClick={onRegister} className="link-btn">
            Daftar Sekarang ✨
          </button>
        </p>
      </div>
    </div>
  )
}
