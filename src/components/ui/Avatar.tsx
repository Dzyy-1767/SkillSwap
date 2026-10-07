const PALETTE = ['#4f46e5', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626', '#db2777']

interface AvatarProps {
  name: string
  size?: number
  ring?: boolean
  online?: boolean
}

export default function Avatar({ name, size = 40, ring = false, online = false }: AvatarProps) {
  const color = PALETTE[name.charCodeAt(0) % PALETTE.length]
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ position: 'relative', flexShrink: 0, width: size, height: size }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: `${color}1e`,
        border: ring ? `2.5px solid ${color}` : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontSize: size * 0.36, fontWeight: 700, color,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          {initials}
        </span>
      </div>
      {online && (
        <div style={{
          position: 'absolute', bottom: 1, right: 1,
          width: size * 0.26, height: size * 0.26, borderRadius: '50%',
          background: '#10b981', border: '2px solid #fff',
        }} />
      )}
    </div>
  )
}
