import { CheckCircle2, ArrowRight } from 'lucide-react'

const BENEFICIOS = [
  'Redução de até 40% na demanda contratada',
  'Backup automático em menos de 20ms',
  'Peak shaving com retorno em 18–36 meses',
  'Integração com solar fotovoltaico e microrede',
  'Monitoramento remoto via plataforma GoNova',
  'Dimensionamento por IA baseado no seu perfil de carga',
]

const CASOS = [
  { setor: 'Data Center', economia: 'R$ 2,1M/ano', descricao: 'Eliminação de DMLC + backup de missão crítica' },
  { setor: 'Frigorífico', economia: 'R$ 890K/ano', descricao: 'Peak shaving noturno + estabilização de carga' },
  { setor: 'Shopping', economia: 'R$ 1,4M/ano', descricao: 'Controle de demanda + energia de ponta' },
]

export default function Bess() {
  return (
    <section className="bess" id="bess">
      <div className="container">
        <div className="bess__inner">
          <div className="bess__content">
            <div className="section-tag">BESS — Battery Energy Storage System</div>
            <h2 className="section-title">
              Não é só uma bateria.<br />
              É <em>estratégia financeira.</em>
            </h2>
            <p className="bess__desc">
              O BESS GoNova armazena energia nos momentos mais baratos e a entrega
              nos picos de custo. O resultado: demanda controlada, conta previsível
              e operação resiliente — mesmo com queda de rede.
            </p>

            <ul className="bess__beneficios">
              {BENEFICIOS.map((b, i) => (
                <li key={i} className="bess__beneficio">
                  <CheckCircle2 size={18} className="bess__check" />
                  {b}
                </li>
              ))}
            </ul>

            <a href="#contato" className="btn btn--primary">
              Dimensionar meu BESS <ArrowRight size={18} />
            </a>
          </div>

          <div className="bess__visual">
            <div className="bess__casos">
              <h4 className="bess__casos-title">Casos de sucesso</h4>
              {CASOS.map((c, i) => (
                <div key={i} className="bess__caso">
                  <div className="bess__caso-header">
                    <span className="bess__caso-setor">{c.setor}</span>
                    <span className="bess__caso-economia">{c.economia}</span>
                  </div>
                  <p className="bess__caso-desc">{c.descricao}</p>
                </div>
              ))}
            </div>

            <div className="bess__diagram">
              <div className="bess__node bess__node--solar">
                <span className="bess__node-icon">☀️</span>
                <span>Solar</span>
              </div>
              <div className="bess__node bess__node--bess">
                <span className="bess__node-icon">⚡</span>
                <span>BESS</span>
              </div>
              <div className="bess__node bess__node--rede">
                <span className="bess__node-icon">🔌</span>
                <span>Rede</span>
              </div>
              <div className="bess__node bess__node--load">
                <span className="bess__node-icon">🏭</span>
                <span>Carga</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
