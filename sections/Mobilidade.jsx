import { ArrowRight } from 'lucide-react'

const MODELOS = [
  {
    titulo: 'Hub Municipal PPP',
    descricao: 'Parceria público-privada para implantação de infraestrutura de recarga em cidades. Receita compartilhada, custo zero para o município.',
    badge: 'Governo',
  },
  {
    titulo: 'Hub Corporativo',
    descricao: 'Estações de recarga inteligentes para frotas e colaboradores com gestão de acesso, faturamento e relatórios de uso por centro de custo.',
    badge: 'Empresas',
  },
  {
    titulo: 'Frota Elétrica Integrada',
    descricao: 'Conversão e eletrificação de frotas com gestão de energia integrada ao BESS. Redução de custo operacional de 40–60% vs. frota a combustão.',
    badge: 'Logística',
  },
]

export default function Mobilidade() {
  return (
    <section className="mobilidade" id="mobilidade">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Mobilidade Elétrica</div>
          <h2 className="section-title">
            Eletromobilidade como<br />
            <em>modelo de negócio.</em>
          </h2>
          <p className="section-subtitle">
            A GoNova não instala carregadores. Estrutura modelos de receita,
            financia, opera e otimiza a infraestrutura de ponta a ponta.
          </p>
        </div>

        <div className="mobilidade__grid">
          {MODELOS.map((m, i) => (
            <div key={i} className="mobilidade__card">
              <span className="mobilidade__badge">{m.badge}</span>
              <h3 className="mobilidade__card-title">{m.titulo}</h3>
              <p className="mobilidade__card-desc">{m.descricao}</p>
              <a href="#contato" className="mobilidade__card-link">
                Saiba mais <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>

        <div className="mobilidade__cta">
          <p>Pronto para eletrificar sua operação?</p>
          <a href="#contato" className="btn btn--primary">
            Solicitar proposta <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
