import { useEffect, useState } from 'react'
import { Search, Filter, ChevronDown, X, Loader2 } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { supabase } from '../../lib/supabase'

const STATUSES = ['novo', 'em_contato', 'proposta_enviada', 'fechado', 'descartado']
const STATUS_LABEL = {
  novo: 'Novo',
  em_contato: 'Em contato',
  proposta_enviada: 'Proposta enviada',
  fechado: 'Fechado',
  descartado: 'Descartado',
}
const STATUS_COLOR = {
  novo: '#0057FF',
  em_contato: '#d29922',
  proposta_enviada: '#9CFF00',
  fechado: '#3fb950',
  descartado: '#f85149',
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminDiagnosticos() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  async function load() {
    setLoading(true)
    let q = supabase.from('diagnosticos').select('*').order('created_at', { ascending: false })
    if (filtroStatus) q = q.eq('status', filtroStatus)
    const { data } = await q
    setRows(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [filtroStatus])

  async function updateStatus(id, status) {
    setUpdatingId(id)
    await supabase.from('diagnosticos').update({ status }).eq('id', id)
    setRows(r => r.map(x => x.id === id ? { ...x, status } : x))
    if (selected?.id === id) setSelected(s => ({ ...s, status }))
    setUpdatingId(null)
  }

  const filtered = rows.filter(r =>
    !busca || [r.nome, r.empresa, r.email, r.setor].some(v => v?.toLowerCase().includes(busca.toLowerCase()))
  )

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1>Diagnósticos</h1>
        <p>Todas as solicitações recebidas pelo site.</p>
      </div>

      {/* Filtros */}
      <div className="admin-filters">
        <div className="admin-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar por nome, empresa, e-mail..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
        <div className="admin-filter-select">
          <Filter size={14} />
          <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
            <option value="">Todos os status</option>
            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
          <ChevronDown size={14} />
        </div>
        <span className="admin-count">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Tabela */}
      {loading ? (
        <div className="admin-loading"><div className="admin-spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <p>Nenhuma solicitação encontrada.</p>
        </div>
      ) : (
        <div className="admin-panel">
          <table className="admin-table admin-table--clickable">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Empresa</th>
                <th>E-mail</th>
                <th>Setor</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} onClick={() => setSelected(r)}>
                  <td className="td-bold">{r.nome}</td>
                  <td>{r.empresa}</td>
                  <td className="td-muted">{r.email}</td>
                  <td>{r.setor || '—'}</td>
                  <td>
                    <span
                      className="admin-status-badge"
                      style={{ background: (STATUS_COLOR[r.status] ?? '#888') + '22', color: STATUS_COLOR[r.status] ?? '#888' }}
                    >
                      {STATUS_LABEL[r.status] ?? r.status}
                    </span>
                  </td>
                  <td className="td-muted">{fmtDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer detalhe */}
      {selected && (
        <div className="admin-drawer-overlay" onClick={() => setSelected(null)}>
          <div className="admin-drawer" onClick={e => e.stopPropagation()}>
            <div className="admin-drawer__header">
              <div>
                <h2>{selected.nome}</h2>
                <p>{selected.empresa}</p>
              </div>
              <button className="admin-drawer__close" onClick={() => setSelected(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="admin-drawer__body">
              <div className="admin-detail-grid">
                <div className="admin-detail-item">
                  <span className="admin-detail-label">E-mail</span>
                  <a href={`mailto:${selected.email}`} className="admin-detail-value admin-detail-link">{selected.email}</a>
                </div>
                <div className="admin-detail-item">
                  <span className="admin-detail-label">Telefone</span>
                  <span className="admin-detail-value">{selected.telefone || '—'}</span>
                </div>
                <div className="admin-detail-item">
                  <span className="admin-detail-label">Setor</span>
                  <span className="admin-detail-value">{selected.setor || '—'}</span>
                </div>
                <div className="admin-detail-item">
                  <span className="admin-detail-label">Recebido em</span>
                  <span className="admin-detail-value">{fmtDate(selected.created_at)}</span>
                </div>
              </div>

              {selected.mensagem && (
                <div className="admin-detail-msg">
                  <span className="admin-detail-label">Mensagem</span>
                  <p>{selected.mensagem}</p>
                </div>
              )}

              <div className="admin-detail-status">
                <span className="admin-detail-label">Atualizar status</span>
                <div className="admin-status-btns">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      className={`admin-status-btn ${selected.status === s ? 'active' : ''}`}
                      style={selected.status === s ? { background: STATUS_COLOR[s] + '33', borderColor: STATUS_COLOR[s], color: STATUS_COLOR[s] } : {}}
                      onClick={() => updateStatus(selected.id, s)}
                      disabled={updatingId === selected.id}
                    >
                      {updatingId === selected.id && selected.status !== s ? <Loader2 size={12} className="spin" /> : null}
                      {STATUS_LABEL[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
