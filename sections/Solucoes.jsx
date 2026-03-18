import { Battery, Brain, Network, Car, BarChart3, Leaf, ArrowRight } from 'lucide-react'

const SOLUCOES = [
  {
    icon: Battery,
    titulo: 'BESS & Estratégia Energética',
    descricao:
      'Controle de ponta, peak shaving, backup e previsibilidade financeira. BESS não é bateria — é estratégia de custo e resiliência operacional.',
    href: '#bess',
    destaque: true,
  },
  {
    icon: Brain,
    titulo: 'IA & Monitoramento Inteligente',
    descricao:
      'Diagnóstico contínuo, alertas de anomalia, previsão de demanda e otimização em tempo real com inteligência artificial aplicada à energia.',
    href: '#ia',
  },
  {
    icon: Network,
    titulo: 'Microredes & Off-grid',
    descricao:
      'Autonomia energética completa com integração solar + BESS + lógica de controle. Para operações críticas que não podem depender da rede.',
    href: '#microredes',
  },
  {
    icon: Car,
    titulo: 'Mobilidade Elétrica & Hubs',
    descricao:
      'Estruturação de modelos de negócio para eletromobilidade. PPPs municipais, hubs corporativos e infraestrutura de frota com múltiplas receitas.',
    href: '#mobilidade',
  },
  {
    icon: BarChart3,
    titulo: 'Gestão Energética Corporativa',
    descricao:
      'Controle de demanda, reativos, harmônicos e qualidade de energia. Redução estrutural do custo médio do kWh com governança completa.',
    href: '#gestao',
  },
  {
    icon: Leaf,
    titulo: 'Descarbonização & Carbono',
    descricao:
      'Apuração de emissões, inteligência de carbono, relatórios executivos e estratégia ESG integrada à operação energética da empresa.',
    href: '#esg',
  },
]

export default function Solucoes() {
  return (
    <section className="solucoes" id="solucoes">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Soluções GoNova</div>
          <h2 className="section-title">Energia como vantagem estratégica</h2>
          <p className="section-subtitle">
            Um portfólio completo e integrado para transformar energia em resultado
            financeiro, operacional e ambiental.
          </p>
        </div>

        <div className="solucoes__grid">
          {SOLUCOES.map((s, i) => {
            const Icon = s.icon
            return (
              <a key={i} href={s.href} className={`solucoes__card ${s.destaque ? 'solucoes__card--destaque' : ''}`}>
                <div className="solucoes__card-icon">
                  <Icon size={24} />
                </div>
                <h3 className="solucoes__card-title">{s.titulo}</h3>
                <p className="solucoes__card-desc">{s.descricao}</p>
                <span className="solucoes__card-link">
                  Conhecer solução <ArrowRight size={14} />
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
