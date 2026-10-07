interface LogoProps { size?: 'sm' | 'md' | 'lg'; light?: boolean }

export default function Logo({ size = 'md', light = false }: LogoProps) {
  const s = { sm: { icon: 30, text: 18 }, md: { icon: 38, text: 22 }, lg: { icon: 48, text: 28 } }[size]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: s.icon, height: s.icon, borderRadius: s.icon * 0.28,
        background: light ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg,#4f46e5,#7c3aed)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: light ? 'none' : '0 4px 14px rgba(79,70,229,0.35)',
        border: light ? '1.5px solid rgba(255,255,255,0.3)' : 'none',
        backdropFilter: light ? 'blur(8px)' : 'none',
      }}>
        <span style={{ fontSize: s.icon * 0.52 }}>⇄</span>
      </div>
      <span style={{ fontSize: s.text, fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif', color: light ? '#fff' : '#1e1b4b' }}>
        Skill<span style={{ color: light ? '#a5b4fc' : '#4f46e5' }}>Swap</span>
      </span>
    </div>
  )
}
