const transactions = [
  { id: 1, label: 'Sesi React dengan Rizky', type: 'earn', amount: 2, date: '20 Sep 2026', icon: '⚡' },
  { id: 2, label: 'Sesi Figma dengan Sinta', type: 'earn', amount: 2, date: '17 Sep 2026', icon: '⚡' },
  { id: 3, label: 'Request sesi Python', type: 'spend', amount: 1, date: '14 Sep 2026', icon: '🔄' },
  { id: 4, label: 'Bonus bergabung', type: 'bonus', amount: 10, date: '1 Sep 2026', icon: '🎁' },
  { id: 5, label: 'Sesi Public Speaking', type: 'spend', amount: 1, date: '28 Agt 2026', icon: '🔄' },
  { id: 6, label: 'Rating sempurna', type: 'bonus', amount: 3, date: '20 Agt 2026', icon: '★' },
]

const howToEarn = [
  { icon: '📖', title: 'Ajarkan Skill', desc: 'Dapatkan 1–3 kredit setiap sesi mengajar' },
  { icon: '⭐', title: 'Rating Tinggi', desc: 'Bonus kredit untuk rating ≥ 4.5' },
  { icon: '🎯', title: 'Sesi Pertama', desc: 'Bonus 3 kredit sesi pertama sebagai mentor' },
]

const chartData = [3, 1, 4, 2, 5, 3]

export default function CreditsTab() {
  const balance = 24

  return (
    <div className="tab-page">
      {/* Credits header */}
      <div className="credits-header">
        <div className="credits-blob credits-blob1" />
        <div className="credits-blob credits-blob2" />

        <h1 className="credits-title">Skill Credit</h1>

        {/* Balance card */}
        <div className="balance-card">
          <p className="balance-eyebrow">Saldo Kredit Kamu</p>
          <div className="balance-row">
            <span className="balance-num">{balance}</span>
            <span className="balance-unit">kredit</span>
          </div>
          <div className="balance-stats">
            {[
              { label: 'Diperoleh', val: '32' },
              { label: 'Digunakan', val: '8' },
              { label: 'Sesi Total', val: '8' },
            ].map(s => (
              <div key={s.label} className="balance-stat-item">
                <p className="balance-stat-val">{s.val}</p>
                <p className="balance-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mini bar chart */}
        <p className="chart-label">Aktivitas 6 Minggu</p>
        <div className="chart-bars">
          {chartData.map((v, i) => (
            <div
              key={i}
              className="chart-bar"
              style={{ height: `${(v / Math.max(...chartData)) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="tab-body">
        <h2 className="section-title" style={{ marginBottom: 12 }}>Cara Dapat Kredit</h2>
        <div className="earn-grid">
          {howToEarn.map(h => (
            <div key={h.title} className="earn-card">
              <div className="earn-icon">{h.icon}</div>
              <p className="earn-title">{h.title}</p>
              <p className="earn-desc">{h.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title" style={{ marginBottom: 12, marginTop: 20 }}>Riwayat Transaksi</h2>
        <div className="txn-list">
          {transactions.map((t, i) => (
            <div key={t.id} className={`txn-row ${i < transactions.length - 1 ? 'txn-border' : ''}`}>
              <div className={`txn-icon ${t.type === 'earn' ? 'txn-earn' : t.type === 'bonus' ? 'txn-bonus' : 'txn-spend'}`}>
                {t.icon}
              </div>
              <div className="txn-text">
                <p className="txn-label">{t.label}</p>
                <p className="txn-date">{t.date}</p>
              </div>
              <span className={`txn-amount ${t.type === 'spend' ? 'amount-spend' : t.type === 'bonus' ? 'amount-bonus' : 'amount-earn'}`}>
                {t.type === 'spend' ? '-' : '+'}{t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
