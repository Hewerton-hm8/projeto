const SETORES = [
  { emoji: '🏭', nome: 'Indústria', desc: 'Controle de demanda, backup e qualidade de energia para linhas de produção de alta criticidade.' },
  { emoji: '🏥', nome: 'Hospitais', desc: 'Autonomia energética 100% garantida, conformidade com normas ABNT e custo operacional reduzido.' },
  { emoji: '🏢', nome: 'Shoppings & Varejo', desc: 'Peak shaving, iluminação inteligente e carregadores de VE como atração e receita adicional.' },
  { emoji: '🖥️', nome: 'Data Centers', desc: 'BESS de missão crítica, UPS integrado e eliminação de DMLC com economia estrutural.' },
  { emoji: '🌾', nome: 'Agronegócio', desc: 'Microredes off-grid para silos, armazenamento e irrigação com energia solar + BESS.' },
  { emoji: '🚢', nome: 'Portos & Logística', desc: 'Eletromobilidade de pátio, gestão de demanda portuária e descarbonização de operações.' },
]

export default function Setores() {
  return (
    <section className="setores" id="setores">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Setores Atendidos</div>
          <h2 className="section-title">Solução para cada setor,<br /><em>resultado para cada negócio.</em></h2>
        </div>

        <div className="setores__grid">
          {SETORES.map((s, i) => (
            <div key={i} className="setores__card">
              <div className="setores__emoji">{s.emoji}</div>
              <h3 className="setores__nome">{s.nome}</h3>
              <p className="setores__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
