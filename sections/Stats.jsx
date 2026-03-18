const STATS = [
  { value: '30%', label: 'Redução média no custo de energia', detail: 'nos primeiros 12 meses' },
  { value: '100%', label: 'Autonomia em operações críticas', detail: 'com BESS + microrede' },
  { value: '24/7', label: 'Monitoramento inteligente com IA', detail: 'alertas em tempo real' },
  { value: 'BR+PY', label: 'Presença regional consolidada', detail: 'Brasil e Paraguai' },
]

export default function Stats() {
  return (
    <section className="stats">
      {STATS.map((s, i) => (
        <div key={i} className="stats__item">
          <div className="stats__value">{s.value}</div>
          <div className="stats__label">{s.label}</div>
          <div className="stats__detail">{s.detail}</div>
        </div>
      ))}
    </section>
  )
}
