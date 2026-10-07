import { useState } from 'react'

interface Props {
  onRegister: () => void
  onLogin: () => void
}

const skillOptions = [
  'React', 'Python', 'Desain UI/UX', 'Fotografi', 'Video Editing',
  'Machine Learning', 'Data Science', 'Public Speaking', 'Copywriting',
  'Flutter', 'Figma', 'Arduino', '3D Modeling', 'Musik', 'Bahasa Inggris',
]

const stepMeta = [
  { label: 'Info Akun', emoji: '🔐', subtitle: 'Buat akun untuk mulai berswap skill' },
  { label: 'Profil Kampus', emoji: '🏫', subtitle: 'Biar teman kampusmu bisa menemukanmu' },
  { label: 'Skill Kamu', emoji: '🚀', subtitle: 'Pilih skill yang bisa kamu ajarkan & pelajari' },
]

export default function RegisterPage({ onRegister, onLogin }: Props) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [university, setUniversity] = useState('')
  const [major, setMajor] = useState('')
  const [batch, setBatch] = useState('2024')
  const [canTeach, setCanTeach] = useState<string[]>([])
  const [wantLearn, setWantLearn] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const toggleSkill = (skill: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(skill) ? list.filter(s => s !== skill) : [...list, skill])
  }

  const handleFinish = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onRegister()
    }, 1200)
  }

  const strengthLevel = password.length === 0 ? 0 : password.length < 5 ? 1 : password.length < 8 ? 2 : password.length < 12 ? 3 : 4
  const strengthLabels = ['', 'Terlalu pendek', 'Lemah', 'Cukup kuat', 'Sangat kuat']
  const strengthColors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981']

  return (
    <div className="register-root">
      {/* Animated gradient header */}
      <div className="reg-header">
        <div className="blob blob-reg-1" />
        <div className="blob blob-reg-2" />

        <button onClick={onLogin} className="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>

        {/* Brand */}
        <div className="reg-brand">
          <div className="reg-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7l9 5 9-5-9-5z" fill="white" fillOpacity="0.9"/>
              <path d="M3 17l9 5 9-5M3 12l9 5 9-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="reg-brand-name">Buat Akun</span>
        </div>

        {/* Step tracker */}
        <div className="step-tracker">
          {[1, 2, 3].map(s => (
            <div key={s} className="step-item">
              <div className={`step-dot ${step > s ? 'done' : step === s ? 'active' : ''}`}>
                {step > s ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : s}
              </div>
              {s < 3 && <div className={`step-line ${step > s ? 'done' : ''}`} />}
            </div>
          ))}
          <span className="step-label-text">{stepMeta[step - 1].label}</span>
        </div>
      </div>

      {/* Form body */}
      <div className="reg-body">
        {/* Step 1 */}
        {step === 1 && (
          <div className="step-section">
            <div className="step-intro">
              <span className="step-emoji">{stepMeta[0].emoji}</span>
              <div>
                <h3 className="step-title">{stepMeta[0].label}</h3>
                <p className="step-desc">{stepMeta[0].subtitle}</p>
              </div>
            </div>

            <RegField
              label="Nama Lengkap"
              focused={focusedField === 'name'}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              }
            >
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Andi Firmansyah"
                className="reg-input"
              />
            </RegField>

            <RegField
              label="Email Kampus"
              focused={focusedField === 'email'}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              }
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="andi@university.ac.id"
                className="reg-input"
              />
            </RegField>

            <RegField
              label="Password"
              focused={focusedField === 'pass'}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              }
            >
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField('pass')}
                onBlur={() => setFocusedField(null)}
                placeholder="Min. 8 karakter"
                className="reg-input"
              />
            </RegField>

            {/* Password strength */}
            {password && (
              <div className="strength-wrap">
                <div className="strength-bars">
                  {[1,2,3,4].map(i => (
                    <div
                      key={i}
                      className="strength-bar"
                      style={{ background: strengthLevel >= i ? strengthColors[strengthLevel] : '#E5E7EB' }}
                    />
                  ))}
                </div>
                <span className="strength-text" style={{ color: strengthColors[strengthLevel] }}>
                  {strengthLabels[strengthLevel]}
                </span>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!name || !email || password.length < 6}
              className="step-next-btn"
            >
              Lanjut
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="step-section">
            <div className="step-intro">
              <span className="step-emoji">{stepMeta[1].emoji}</span>
              <div>
                <h3 className="step-title">{stepMeta[1].label}</h3>
                <p className="step-desc">{stepMeta[1].subtitle}</p>
              </div>
            </div>

            <RegField
              label="Universitas"
              focused={focusedField === 'univ'}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              }
            >
              <input
                type="text"
                value={university}
                onChange={e => setUniversity(e.target.value)}
                onFocus={() => setFocusedField('univ')}
                onBlur={() => setFocusedField(null)}
                placeholder="Universitas Indonesia"
                className="reg-input"
              />
            </RegField>

            <RegField
              label="Jurusan"
              focused={focusedField === 'major'}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              }
            >
              <input
                type="text"
                value={major}
                onChange={e => setMajor(e.target.value)}
                onFocus={() => setFocusedField('major')}
                onBlur={() => setFocusedField(null)}
                placeholder="Teknik Informatika"
                className="reg-input"
              />
            </RegField>

            <RegField
              label="Angkatan"
              focused={false}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              }
            >
              <select
                value={batch}
                onChange={e => setBatch(e.target.value)}
                className="reg-input reg-select"
              >
                {[2025, 2024, 2023, 2022, 2021, 2020].map(y => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </RegField>

            <div className="step-nav">
              <button onClick={() => setStep(1)} className="step-back-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!university || !major}
                className="step-next-btn flex-1"
              >
                Lanjut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="step-section">
            <div className="step-intro">
              <span className="step-emoji">{stepMeta[2].emoji}</span>
              <div>
                <h3 className="step-title">{stepMeta[2].label}</h3>
                <p className="step-desc">{stepMeta[2].subtitle}</p>
              </div>
            </div>

            {/* Can teach */}
            <div className="skill-section">
              <div className="skill-section-header teach">
                <span className="skill-section-icon">✨</span>
                <span>Bisa Saya Ajarkan</span>
                {canTeach.length > 0 && <span className="skill-count">{canTeach.length}</span>}
              </div>
              <div className="skill-grid">
                {skillOptions.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s, canTeach, setCanTeach)}
                    className={`skill-tag ${canTeach.includes(s) ? 'skill-teach-active' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Want to learn */}
            <div className="skill-section">
              <div className="skill-section-header learn">
                <span className="skill-section-icon">🎯</span>
                <span>Ingin Saya Pelajari</span>
                {wantLearn.length > 0 && <span className="skill-count learn-count">{wantLearn.length}</span>}
              </div>
              <div className="skill-grid">
                {skillOptions.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s, wantLearn, setWantLearn)}
                    className={`skill-tag ${wantLearn.includes(s) ? 'skill-learn-active' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="step-nav">
              <button onClick={() => setStep(2)} className="step-back-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Kembali
              </button>
              <button
                onClick={handleFinish}
                disabled={loading || canTeach.length === 0 || wantLearn.length === 0}
                className={`step-next-btn flex-1 ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Mendaftar...
                  </>
                ) : (
                  <>
                    Mulai Swap! 🎉
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function RegField({
  label,
  icon,
  focused,
  children,
}: {
  label: string
  icon: React.ReactNode
  focused: boolean
  children: React.ReactNode
}) {
  return (
    <div className={`reg-field ${focused ? 'reg-field-focused' : ''}`}>
      <label className="reg-label">{label}</label>
      <div className="reg-input-wrap">
        <span className="reg-icon">{icon}</span>
        {children}
      </div>
    </div>
  )
}
