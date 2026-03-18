import { Zap, Bell, TrendingUp, Shield } from 'lucide-react'

const FEATURES = [
  {
    icon: TrendingUp,
    titulo: 'Previsão de Demanda',
    descricao: 'Modelos preditivos treinados com seu histórico de consumo para antecipar picos e oportunidades de economia.',
  },
  {
    icon: Bell,
    titulo: 'Alertas de Anomalia',
    descricao: 'Detecção automática de padrões fora do normal: equipamentos falhando, perdas, picos não programados.',
  },
  {
    icon: Zap,
    titulo: 'Otimização em Tempo Real',
    descricao: 'A IA ajusta automaticamente a carga, ativa o BESS e redistribui demanda para minimizar o custo do kWh.',
  },
  {
    icon: Shield,
    titulo: 'Relatórios Executivos',
    descricao: 'Dashboards automáticos com KPIs energéticos, análise de custo e recomendações de ação para a diretoria.',
  },
]

export default function IA() {
  return (
    <section className="ia" id="ia">
      <div className="container">
        <div className="ia__inner">
          <div className="ia__visual">
            <div className="ia__terminal">
              <div className="ia__terminal-header">
                <div className="ia__terminal-dots">
                  <span /><span /><span />
                </div>
                <span className="ia__terminal-title">GoNova AI Engine</span>
              </div>
              <div className="ia__terminal-body">
                <div className="ia__log ia__log--info">▶ Modelo carregado: demand_forecast_v3.2</div>
                <div className="ia__log ia__log--ok">✓ Dados de 72h processados</div>
                <div className="ia__log ia__log--warn">⚠ Pico previsto: Terça 14h–16h (+34 kW)</div>
                <div className="ia__log ia__log--ok">✓ BESS ativado para compensação</div>
                <div className="ia__log ia__log--info">▶ Economia estimada: R$ 4.280 esta semana</div>
                <div className="ia__log ia__log--ok">✓ Relatório gerado para diretoria</div>
                <div className="ia__log ia__log--cursor">█</div>
              </div>
            </div>
          </div>

          <div className="ia__content">
            <div className="section-tag">IA & Monitoramento Inteligente</div>
            <h2 className="section-title">
              Sua planta produtiva,<br />
              vista de <em>forma inteligente.</em>
            </h2>
            <p className="ia__desc">
              A plataforma GoNova coleta dados de toda sua infraestrutura energética
              e aplica inteligência artificial para transformar números em decisões
              de alto impacto financeiro.
            </p>

            <div className="ia__features">
              {FEATURES.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="ia__feature">
                    <div className="ia__feature-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="ia__feature-title">{f.titulo}</h4>
                      <p className="ia__feature-desc">{f.descricao}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
