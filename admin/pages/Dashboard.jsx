import { useEffect, useState } from 'react'
import { FileText, Users, TrendingUp, Clock } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { supabase } from '../../lib/supabase'

const STATUS_LABEL = {
  novo: 'Novos',
  em_contato: 'Em contato',
  proposta_enviada: 'Proposta enviada',
  fechado: 'Fechados',
  descartado: 'Descartados',
}

const STATUS_COLOR = {
  novo: '#0057FF',
  em_contato: '#d29922',
  proposta_enviada: '#9CFF00',
  fechado: '#3fb950',
  descartado: '#f85149',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentes, setRecentes] = useState([])
  const [statusCount, setStatusCount] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ count: total }, { count: leads }, { data: diag }, { data: todos }] = await Promise.all([
        supabase.from('diagnosticos').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('diagnosticos').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('diagnosticos').select('status'),
      ])

      setStats({ total: total ?? 0, leads: leads ?? 0 })
      setRecentes(diag ?? [])

      const counts = {}
      ;(todos ?? []).forEach(r => { counts[r.status] = (counts[r.status] ?? 0) + 1 })
      setStatusCount(Object.entries(counts).map(([status, count]) => ({ status, count })))
      setLoading(false)
    }
    load()
  }, [])

  const CARDS = [
    { label: 'Total de diagnósticos', value: stats?.total ?? '—', icon: FileText, color: '#0057FF' },
    { label: 'Leads captados', value: stats?.leads ?? '—', icon: Users, color: '#9CFF00' },
    { label: 'Novos (hoje)', value: recentes.filter(r => r.created_at?.startsWith(new Date().toISOString().slice(0,10))).length, icon: TrendingUp, color: '#d29922' },
    { label: 'Pendentes de contato', value: statusCount.find(s => s.status === 'novo')?.count ?? 0, icon: Clock, color: '#f85149' },
  ]

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Visão geral das solicitações de diagnóstico energético.</p>
      </div>

      {loading ? (
        <div className="admin-loading"><div className="admin-spinner" /></div>
      ) : (
        <>
          <div className="admin-cards">
            {CARDS.map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className="admin-card">
                  <div className="admin-card__icon" style={{ background: c.color + '22', color: c.color }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="admin-card__value">{c.value}</div>
                    <div className="admin-card__label">{c.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="admin-grid-2">
            {/* Últimos diagnósticos */}
            <div className="admin-panel">
              <h2 className="admin-panel__title">Últimas solicitações</h2>
              {recentes.length === 0 ? (
                <p className="admin-empty">Nenhuma solicitação ainda.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr><th>Nome</th><th>Empresa</th><th>Setor</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {recentes.map(r => (
                      <tr key={r.id}>
                        <td>{r.nome}</td>
                        <td>{r.empresa}</td>
                        <td>{r.setor || '—'}</td>
                        <td>
                          <span className="admin-status-badge" style={{ background: (STATUS_COLOR[r.status] ?? '#888') + '22', color: STATUS_COLOR[r.status] ?? '#888' }}>
                            {STATUS_LABEL[r.status] ?? r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Por status */}
            <div className="admin-panel">
              <h2 className="admin-panel__title">Por status</h2>
              {statusCount.length === 0 ? (
                <p className="admin-empty">Sem dados.</p>
              ) : (
                <div className="admin-status-list">
                  {statusCount.map(({ status, count }) => {
                    const pct = Math.round((count / (stats?.total || 1)) * 100)
                    return (
                      <div key={status} className="admin-status-row">
                        <div className="admin-status-row__top">
                          <span>{STATUS_LABEL[status] ?? status}</span>
                          <span style={{ color: STATUS_COLOR[status] }}>{count}</span>
                        </div>
                        <div className="admin-progress">
                          <div className="admin-progress__bar" style={{ width: pct + '%', background: STATUS_COLOR[status] }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
