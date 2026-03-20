import { Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const LINKS = {
  Soluções: ['BESS & Estratégia', 'IA & Monitoramento', 'Microredes Off-grid', 'Mobilidade Elétrica', 'Gestão Energética', 'Descarbonização'],
  Empresa: ['Sobre a GoNova', 'Casos de Sucesso', 'Blog & Insights', 'Parceiros', 'Carreiras'],
  Suporte: [
    { label: 'Diagnóstico Gratuito', href: '#contato' },
    { label: 'Contato', href: '#contato' },
    { label: 'Política de Privacidade', href: 'https://docs.google.com/document/d/1gqPPmyCuze_7tS6leL7ZLKj15DNfnImvKLsGJmCR75w/edit?usp=sharing' },
    { label: 'Termos de Uso', href: 'https://docs.google.com/document/d/16J8Zxo8lafMY8mueOeD3S8B7lWAMMctziIBcO9W669s/edit?usp=sharing' },
  ],
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
                {items.map(item => {
                  const isObj = typeof item === 'object'
                  const label = isObj ? item.label : item
                  const href = isObj ? item.href : '#'
                  const external = isObj && item.href.startsWith('http')
                  return (
                    <li key={label}>
                      <a href={href} className="footer__link" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          <div className="footer__col">
            <h4 className="footer__col-title">Contato</h4>
            <ul className="footer__contact">
              <li><Phone size={14} /> <a href="tel:+5567999233615">+55 67 9923-3615</a></li>
              <li><Mail size={14} /> <a href="mailto:contato@gonova.com.br">contato@gonova.com.br</a></li>
              <li><MapPin size={14} /> Campo Grande, MS — Brasil</li>
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
