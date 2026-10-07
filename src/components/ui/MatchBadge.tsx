interface MatchBadgeProps { pct: number }

export default function MatchBadge({ pct }: MatchBadgeProps) {
  const color = pct >= 85 ? '#10b981' : pct >= 70 ? '#4f46e5' : '#f59e0b'
  return (
    <div style={{
      background: `${color}15`, borderRadius: 10, padding: '3px 10px',
      display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
      <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {pct}% Match
      </span>
    </div>
  )
}
