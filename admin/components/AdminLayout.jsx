import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, LogOut, Zap } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const NAV = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/diagnosticos', icon: FileText, label: 'Diagnósticos' },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <Zap size={20} />
          <span>GoNova <em>Admin</em></span>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? 'admin-nav-item--active' : ''}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={16} />
          Sair
        </button>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
