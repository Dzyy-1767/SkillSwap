import Icons from './Icons'

export default function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size }}>
          <Icons.Star filled={i <= Math.round(rating)} />
        </span>
      ))}
      <span style={{ fontSize: size - 1, color: '#64748b', fontFamily: 'Inter, sans-serif', marginLeft: 4 }}>
        {rating}
      </span>
    </div>
  )
}
