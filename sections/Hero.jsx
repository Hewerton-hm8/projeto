import { ArrowRight, FileText } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-glow hero__bg-glow--blue" />
      <div className="hero__bg-glow hero__bg-glow--green" />

      <div className="hero__content">
        <div className="hero__tag">Plataforma Estratégica de Energia</div>

        <h1 className="hero__title">
          Energia que gera{' '}
          <em>margem,</em>
          <br />
          previsibilidade e controle.
        </h1>

        <p className="hero__subtitle">
          A GoNova transforma energia em estratégia financeira e operacional.
          BESS, IA, microredes e mobilidade elétrica integrados em uma
          arquitetura de alto desempenho.
        </p>

        <div className="hero__actions">
          <a href="#contato" className="btn btn--primary">
            Agendar diagnóstico <ArrowRight size={18} />
          </a>
          <a href="#contato" className="btn btn--ghost">
            <FileText size={18} /> Enviar conta de energia
          </a>
        </div>

        <div className="hero__partners">
          <span className="hero__partners-label">Tecnologia certificada por</span>
          <div className="hero__partners-logos">
            {['INMETRO', 'ANEEL', 'ISO 9001', 'ABB', 'BYD'].map(p => (
              <span key={p} className="hero__partner-badge">{p}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__dashboard-card">
          <div className="hero__card-header">
            <span className="hero__card-dot hero__card-dot--green" />
            <span className="hero__card-dot hero__card-dot--yellow" />
            <span className="hero__card-dot hero__card-dot--red" />
            <span className="hero__card-title">Painel de Energia em Tempo Real</span>
          </div>
          <div className="hero__metrics">
            <div className="hero__metric">
              <span className="hero__metric-label">Consumo atual</span>
              <span className="hero__metric-value hero__metric-value--green">247 kW</span>
              <span className="hero__metric-delta hero__metric-delta--down">↓ 18% vs. ontem</span>
            </div>
            <div className="hero__metric">
              <span className="hero__metric-label">BESS Estado</span>
              <span className="hero__metric-value">84%</span>
              <span className="hero__metric-delta hero__metric-delta--neutral">Carregando</span>
            </div>
            <div className="hero__metric">
              <span className="hero__metric-label">Economia mensal</span>
              <span className="hero__metric-value hero__metric-value--blue">R$ 47k</span>
              <span className="hero__metric-delta hero__metric-delta--up">↑ 12%</span>
            </div>
          </div>

          <div className="hero__chart-bars">
            {[40, 65, 45, 80, 55, 90, 60, 75, 50, 85, 70, 95].map((h, i) => (
              <div
                key={i}
                className="hero__bar"
                style={{ height: `${h}%`, opacity: i === 11 ? 1 : 0.4 + (i / 11) * 0.4 }}
              />
            ))}
          </div>

          <div className="hero__card-footer">
            <span className="hero__status-dot" />
            <span className="hero__status-text">IA monitorando 24/7 • Última atualização: agora</span>
          </div>
        </div>
      </div>
    </section>
  )
}
