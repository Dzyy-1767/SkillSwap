export default function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div style={{
      position: 'fixed', bottom: 110, left: '50%', transform: 'translateX(-50%)',
      background: type === 'success' ? '#111827' : '#ef4444',
      color: '#fff', padding: '12px 20px', borderRadius: 14,
      fontSize: 14, fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif',
      zIndex: 9999, whiteSpace: 'nowrap',
      animation: 'fadeInUp 0.3s ease',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    }}>
      {message}
    </div>
  )
}
