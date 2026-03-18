import { useState } from 'react'
import { ArrowRight, Upload, CheckCircle2 } from 'lucide-react'

export default function CTA() {
  const [form, setForm] = useState({ nome: '', empresa: '', email: '', telefone: '', setor: '', mensagem: '' })
  const [enviado, setEnviado] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <section className="cta-section" id="contato">
      <div className="container">
        <div className="cta-section__inner">
          <div className="cta-section__content">
            <div className="section-tag">Diagnóstico Energético</div>
            <h2 className="section-title">
              Descubra quanto você<br />
              pode <em>economizar agora.</em>
            </h2>
            <p className="cta-section__desc">
              Nossa equipe faz um diagnóstico completo da sua operação energética
              e apresenta um plano de ação com retorno projetado, sem custo e
              sem compromisso.
            </p>

            <ul className="cta-section__lista">
              {[
                'Análise do perfil de consumo e demanda',
                'Simulação de economia com BESS e IA',
                'Modelagem financeira com payback projetado',
                'Recomendação personalizada por setor',
              ].map((item, i) => (
                <li key={i} className="cta-section__lista-item">
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cta-section__form-wrap">
            {enviado ? (
              <div className="cta-section__success">
                <CheckCircle2 size={48} className="cta-section__success-icon" />
                <h3>Solicitação enviada!</h3>
                <p>Nossa equipe entrará em contato em até 24 horas úteis.</p>
              </div>
            ) : (
              <form className="cta-section__form" onSubmit={handleSubmit}>
                <h3 className="cta-section__form-title">Solicitar diagnóstico gratuito</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nome completo *</label>
                    <input type="text" name="nome" required value={form.nome} onChange={handleChange} placeholder="João Silva" />
                  </div>
                  <div className="form-group">
                    <label>Empresa *</label>
                    <input type="text" name="empresa" required value={form.empresa} onChange={handleChange} placeholder="Empresa S.A." />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>E-mail *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="joao@empresa.com" />
                  </div>
                  <div className="form-group">
                    <label>Telefone</label>
                    <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Setor de atuação</label>
                  <select name="setor" value={form.setor} onChange={handleChange}>
                    <option value="">Selecione...</option>
                    <option>Indústria</option>
                    <option>Hospital / Saúde</option>
                    <option>Shopping / Varejo</option>
                    <option>Data Center</option>
                    <option>Agronegócio</option>
                    <option>Porto / Logística</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Mensagem</label>
                  <textarea name="mensagem" rows={3} value={form.mensagem} onChange={handleChange} placeholder="Conte um pouco sobre sua operação e principais desafios energéticos..." />
                </div>

                <div className="form-group">
                  <label className="form-upload">
                    <Upload size={16} />
                    <span>Anexar conta de energia (opcional)</span>
                    <input type="file" accept=".pdf,.jpg,.png" style={{ display: 'none' }} />
                  </label>
                </div>

                <button type="submit" className="btn btn--primary btn--full">
                  Solicitar diagnóstico gratuito <ArrowRight size={18} />
                </button>

                <p className="form-disclaimer">
                  Ao enviar, você concorda com nossa política de privacidade.
                  Não compartilhamos seus dados.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
