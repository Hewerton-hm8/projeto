import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Loader2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setErro('E-mail ou senha inválidos.')
    } else {
      navigate('/admin')
    }
    setLoading(false)
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <Zap size={28} />
        </div>
        <h1 className="admin-login__title">GoNova Admin</h1>
        <p className="admin-login__subtitle">Entre com suas credenciais para acessar o painel.</p>

        {erro && <div className="admin-error">{erro}</div>}

        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-form-group">
            <label>E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@gonova.com.br"
              autoFocus
            />
          </div>

          <div className="admin-form-group">
            <label>Senha</label>
            <div className="admin-input-wrap">
              <input
                type={showPwd ? 'text' : 'password'}
                required
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="••••••••"
              />
              <button type="button" className="admin-eye" onClick={() => setShowPwd(v => !v)}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? <><Loader2 size={16} className="spin" /> Entrando...</> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
