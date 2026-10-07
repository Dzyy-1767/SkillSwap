interface SkillTagProps {
  label: string
  variant?: 'teach' | 'learn' | 'neutral'
  onRemove?: () => void
  onClick?: () => void
}

export default function SkillTag({ label, variant = 'teach', onRemove, onClick }: SkillTagProps) {
  const styles = {
    teach:   { bg: '#e0e7ff', color: '#4338ca' },
    learn:   { bg: '#fef3c7', color: '#92400e' },
    neutral: { bg: '#f1f5f9', color: '#475569' },
  }[variant]

  return (
    <span
      onClick={onClick}
      style={{
        background: styles.bg, color: styles.color,
        fontSize: 12, fontWeight: 600,
        padding: onRemove ? '4px 8px 4px 10px' : '4px 12px',
        borderRadius: 20,
        display: 'inline-flex', alignItems: 'center', gap: 4,
        whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {label}
      {onRemove && (
        <button onClick={e => { e.stopPropagation(); onRemove() }} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: styles.color, padding: 0, display: 'flex', opacity: 0.7,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </span>
  )
}
