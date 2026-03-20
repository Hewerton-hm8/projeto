import { Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const LINKS = {
  Soluções: ['BESS & Estratégia', 'IA & Monitoramento', 'Microredes Off-grid', 'Mobilidade Elétrica', 'Gestão Energética', 'Descarbonização'],
  Empresa: ['Sobre a GoNova', 'Casos de Sucesso', 'Blog & Insights', 'Parceiros', 'Carreiras'],
  Suporte: ['Diagnóstico Gratuito', 'Contato', 'Política de Privacidade', 'Termos de Uso'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="navbar__logo footer__logo">
              <div className="navbar__logo-mark">
                <img src="/logo-gonova.png" alt="GoNova" width="40" height="40" />
              </div>
              <span className="navbar__logo-text">Go<span>Nova</span></span>
            </a>
            <p className="footer__tagline">
              Transformando energia em vantagem estratégica para empresas no Brasil e no Paraguai.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="mailto:contato@gonova.com.br" aria-label="E-mail"><Mail size={20} /></a>
            </div>
          </div>

          {Object.entries(LINKS).map(([grupo, items]) => (
            <div key={grupo} className="footer__col">
              <h4 className="footer__col-title">{grupo}</h4>
              <ul>
                {items.map(item => (
                  <li key={item}><a href="#" className="footer__link">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col">
            <h4 className="footer__col-title">Contato</h4>
            <ul className="footer__contact">
              <li><Phone size={14} /> +55 (11) 4000-0000</li>
              <li><Mail size={14} /> contato@gonova.com.br</li>
              <li><MapPin size={14} /> São Paulo, SP — Brasil</li>
              <li><MapPin size={14} /> Assunção — Paraguai</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} GoNova Energia Estratégica. Todos os direitos reservados.</p>
          <p>BESS · IA · Microredes · Mobilidade Elétrica · ESG</p>
        </div>
      </div>
    </footer>
  )
}
