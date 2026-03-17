import { useState, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const DEMO_STATS = [
  { key: 'saves', value: '178+', label: 'Save Products', icon: 'heart', color: 'blue' },
  { key: 'stock', value: '20+', label: 'Stock Products', icon: 'game', color: 'yellow' },
  { key: 'sales', value: '190+', label: 'Sales Products', icon: 'bag', color: 'orange' },
  { key: 'jobs', value: '12+', label: 'Job Application', icon: 'work', color: 'purple' },
]
const DEMO_ORDERS = [
  { tracking_no: '#876364', product_name: 'Camera Lens', price: 178, total_order: 325, total_amount: 146660, emoji: '📷' },
  { tracking_no: '#876368', product_name: 'Black Sleep Dress', price: 14, total_order: 53, total_amount: 46660, emoji: '👗' },
  { tracking_no: '#876412', product_name: 'Argan Oil', price: 21, total_order: 78, total_amount: 346676, emoji: '🧴' },
  { tracking_no: '#876621', product_name: 'EAU DE Parfum', price: 32, total_order: 98, total_amount: 346981, emoji: '🌸' },
]
const DEMO_PRODUCTS = [
  { id: 1, name: 'NIKE Shoes Black Pattern', price: 87, rating: 3.5, emoji: '👟' },
  { id: 2, name: 'iPhone 12', price: 987, rating: 4.0, emoji: '📱' },
]
const DEMO_SALES = [
  { hour: '10am', sales: 40, distribute: 60, return_val: 20 },
  { hour: '11am', sales: 65, distribute: 45, return_val: 35 },
  { hour: '12am', sales: 35, distribute: 55, return_val: 25 },
  { hour: '01am', sales: 80, distribute: 70, return_val: 40 },
  { hour: '02am', sales: 55, distribute: 40, return_val: 30 },
  { hour: '03am', sales: 90, distribute: 85, return_val: 50 },
  { hour: '04am', sales: 60, distribute: 65, return_val: 35 },
  { hour: '05am', sales: 75, distribute: 55, return_val: 45 },
  { hour: '06am', sales: 50, distribute: 70, return_val: 30 },
  { hour: '07am', sales: 85, distribute: 60, return_val: 55 },
]

const SQL_SCHEMA = `-- Rode no SQL Editor do Supabase
create table dashboard_stats (
  id serial primary key,
  key text, value text,
  label text, icon text, color text
);
insert into dashboard_stats (key,value,label,icon,color) values
('saves','178+','Save Products','heart','blue'),
('stock','20+','Stock Products','game','yellow'),
('sales','190+','Sales Products','bag','orange'),
('jobs','12+','Job Application','work','purple');

create table orders (
  id serial primary key,
  tracking_no text, product_name text,
  price numeric, total_order int,
  total_amount numeric, emoji text,
  created_at timestamp default now()
);
insert into orders
  (tracking_no,product_name,price,total_order,total_amount,emoji)
values
  ('#876364','Camera Lens',178,325,146660,'📷'),
  ('#876368','Black Sleep Dress',14,53,46660,'👗'),
  ('#876412','Argan Oil',21,78,346676,'🧴'),
  ('#876621','EAU DE Parfum',32,98,346981,'🌸');

create table products (
  id serial primary key,
  name text, price numeric,
  rating numeric default 4.0, emoji text
);
insert into products (name,price,rating,emoji) values
  ('NIKE Shoes Black Pattern',87,3.5,'👟'),
  ('iPhone 12',987,4.0,'📱');

create table sales_data (
  id serial primary key,
  hour text, sales int,
  distribute int, return_val int
);
insert into sales_data (hour,sales,distribute,return_val) values
  ('10am',40,60,20),('11am',65,45,35),
  ('12am',35,55,25),('01am',80,70,40),
  ('02am',55,40,30),('03am',90,85,50),
  ('04am',60,65,35),('05am',75,55,45),
  ('06am',50,70,30),('07am',85,60,55);`

// ─── ICONS ────────────────────────────────────────────────────────────────────
function IconHeart() { return <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> }
function IconBag() { return <svg viewBox="0 0 24 24"><path d="M19 7h-1V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zm-7-3a2 2 0 0 1 2 2v1h-4V6a2 2 0 0 1 2-2zm6 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/></svg> }
function IconWork() { return <svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.51 15.49 0 12.36 0c-1.73 0-3.36.93-4.36 2.35C7 .93 5.37 0 3.64 0 .51 0-2 2.51-2 5.65c0 .47.11.91.18 1.35H-4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg> }
function IconGame() { return <svg viewBox="0 0 24 24"><path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg> }
function IconLogo() { return <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="currentColor" fill="none"/></svg> }
function IconChart() { return <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg> }
function IconDoc() { return <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> }
function IconCalendar() { return <svg viewBox="0 0 24 24"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg> }
function IconBell() { return <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg> }
function IconSettings() { return <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg> }
function IconMsg() { return <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg> }
function IconTicket() { return <svg viewBox="0 0 24 24"><path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z"/></svg> }
function IconLogout() { return <svg viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg> }
function IconChevron() { return <svg viewBox="0 0 24 24" width="12" height="12"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg> }

const NAV_ITEMS = [
  { name: 'Dashboard', icon: () => <svg viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11z"/><circle cx="17.5" cy="17.5" r="4.5"/><rect x="3" y="13" width="8" height="8"/></svg> },
  { name: 'Analytics', icon: IconChart },
  { name: 'Invoice', icon: IconTicket },
  { name: 'Schedule', icon: IconDoc },
  { name: 'Calendar', icon: IconCalendar },
  { name: 'Messages', icon: IconMsg, badge: 49 },
  { name: 'Notification', icon: IconBell },
  { name: 'Settings', icon: IconSettings },
]
const STAT_ICONS = { heart: IconHeart, bag: IconBag, game: IconGame, work: IconWork }

function fmtMoney(n) {
  if (n >= 100000) return '$' + (n / 100000).toFixed(1).replace('.0', '') + 'L'
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'K'
  return '$' + n
}

function Stars({ rating }) {
  return (
    <div className="product-rating">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.floor(rating) ? 'star' : i - 0.5 <= rating ? 'star' : 'star empty'}>★</span>
      ))}
    </div>
  )
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#605BFF', color: 'white', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 4px 20px rgba(96,91,255,0.3)' }}>
      <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '2px' }}>Sales</div>
      <div style={{ fontSize: '16px', fontWeight: 800 }}>{payload[0]?.value?.toLocaleString()}</div>
    </div>
  )
}

// ─── SETUP SCREEN ─────────────────────────────────────────────────────────────
function SetupScreen({ onConnect, onDemo }) {
  const [url, setUrl] = useState('')
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSql, setShowSql] = useState(false)

  async function handleConnect() {
    if (!url || !key) { setError('Preencha a URL e a Anon Key do Supabase.'); return }
    setLoading(true); setError('')
    try {
      const r = await fetch(`${url.replace(/\/$/, '')}/rest/v1/dashboard_stats?limit=1`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` }
      })
      if (!r.ok) throw new Error('Verifique suas credenciais ou crie as tabelas com o SQL abaixo.')
      onConnect(url.replace(/\/$/, ''), key)
    } catch (e) {
      setError(e.message || 'Erro ao conectar.')
    } finally { setLoading(false) }
  }

  return (
    <div className="setup-screen">
      <div className="setup-card">
        <div className="setup-logo">
          <div className="setup-logo-icon"><IconLogo /></div>
          <span className="setup-logo-text">Base</span>
        </div>
        <h2 className="setup-title">Conectar ao Supabase</h2>
        <p className="setup-subtitle">Informe as credenciais do seu projeto Supabase para carregar os dados reais.</p>

        {error && <div className="setup-error">{error}</div>}

        <label className="setup-label">Project URL</label>
        <input className="setup-input" type="text" placeholder="https://xxxx.supabase.co" value={url} onChange={e => setUrl(e.target.value)} />

        <label className="setup-label">Anon Key</label>
        <input className="setup-input" type="password" placeholder="eyJhbGciOiJIUzI1..." value={key} onChange={e => setKey(e.target.value)} />

        <button className="sql-toggle" onClick={() => setShowSql(v => !v)}>
          <IconDoc /> {showSql ? '▲ Ocultar SQL' : '▼ Ver SQL para criar as tabelas'}
        </button>

        {showSql && <pre className="sql-box">{SQL_SCHEMA}</pre>}

        <button className="btn-primary" onClick={handleConnect} disabled={loading}>
          {loading ? 'Conectando...' : '🔗 Conectar ao Supabase'}
        </button>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">OU</span>
          <div className="divider-line" />
        </div>

        <button className="btn-demo" onClick={onDemo}>🎭 Usar dados demo (sem Supabase)</button>
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardView({ supabaseUrl, supabaseKey, isDemo, onDisconnect }) {
  const [stats, setStats] = useState(DEMO_STATS)
  const [orders, setOrders] = useState(DEMO_ORDERS)
  const [products, setProducts] = useState(DEMO_PRODUCTS)
  const [salesData, setSalesData] = useState(DEMO_SALES)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [dataLoading, setDataLoading] = useState(!isDemo)

  const donut = [
    { name: 'Sale', value: 60 },
    { name: 'Distribute', value: 25 },
    { name: 'Return', value: 15 },
  ]
  const donutColors = ['#5B93FF', '#FFD66B', '#FF8F6B']

  async function sbFetch(table, params = '') {
    const r = await fetch(`${supabaseUrl}/rest/v1/${table}${params}`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }
    })
    if (!r.ok) throw new Error(`Erro ao buscar ${table}`)
    return r.json()
  }

  useEffect(() => {
    if (isDemo) return
    async function load() {
      setDataLoading(true)
      try {
        const [s, o, p, sd] = await Promise.all([
          sbFetch('dashboard_stats', '?order=id.asc'),
          sbFetch('orders', '?order=id.asc&limit=10'),
          sbFetch('products', '?order=id.asc&limit=5'),
          sbFetch('sales_data', '?order=id.asc&limit=20'),
        ])
        if (s?.length) setStats(s)
        if (o?.length) setOrders(o)
        if (p?.length) setProducts(p)
        if (sd?.length) setSalesData(sd)
      } catch (e) {
        console.error('Supabase error:', e)
      } finally { setDataLoading(false) }
    }
    load()
  }, [supabaseUrl, supabaseKey, isDemo])

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon"><IconLogo /></div>
          <span className="logo-text">Base</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <div key={item.name} className={`nav-item ${activeNav === item.name ? 'active' : ''}`} onClick={() => setActiveNav(item.name)}>
              <span className="nav-icon"><item.icon /></span>
              {item.name}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-upgrade">
          <div className="upgrade-illustration"><IconLogo /></div>
          <p className="upgrade-text">Desbloqueie todos os recursos com o plano Pro.</p>
          <button className="btn-upgrade">Upgrade Now</button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">E</div>
          <div className="user-info">
            <div className="user-name">Easin Arafat</div>
            <div className="user-plan">{isDemo ? '🎭 Demo Mode' : '✓ Supabase'}</div>
          </div>
          <div className="user-logout" onClick={onDisconnect} title="Desconectar">
            <IconLogout />
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="main-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="main-title">Dashboard</h1>
            {isDemo
              ? <span className="demo-badge">🎭 Demo</span>
              : <span className="conn-badge"><span className="conn-dot" />Supabase conectado</span>}
          </div>
          <div className="date-range">
            <div className="date-pill">10-06-2021 <IconChevron /></div>
            <div className="date-pill">10-10-2021 <IconChevron /></div>
          </div>
        </header>

        <div className="content">
          {/* STATS */}
          <div className="stats-row">
            {stats.map((s, i) => {
              const IconComp = STAT_ICONS[s.icon] || IconBag
              return (
                <div key={i} className="stat-card">
                  <div className={`stat-icon ${s.color || 'blue'}`}><IconComp /></div>
                  <div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CHARTS */}
          <div className="charts-row">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Reports</span>
                <span className="card-menu">⋯</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={salesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSale" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5B93FF" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#5B93FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gDist" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#605BFF" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="#605BFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f6" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'rgba(3,2,41,0.4)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'rgba(3,2,41,0.4)' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="sales" stroke="#5B93FF" strokeWidth={2.5} fill="url(#gSale)" dot={{ fill: '#5B93FF', r: 3, strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 5 }} />
                  <Area type="monotone" dataKey="distribute" stroke="#605BFF" strokeWidth={2} fill="url(#gDist)" strokeDasharray="4 3" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">Analytics</span>
                <span className="card-menu">⋯</span>
              </div>
              <div className="analytics-content">
                <div className="donut-center">
                  <PieChart width={200} height={200}>
                    <Pie data={donut} cx={100} cy={100} innerRadius={60} outerRadius={90} startAngle={90} endAngle={-270} paddingAngle={3} dataKey="value">
                      {donut.map((_, i) => <Cell key={i} fill={donutColors[i]} />)}
                    </Pie>
                  </PieChart>
                  <div className="donut-label">
                    <div className="donut-pct">80%</div>
                    <div className="donut-sub">Transactions</div>
                  </div>
                </div>
                <div className="analytics-legend">
                  {[['Sale', '#5B93FF'], ['Distribute', '#FFD66B'], ['Return', '#FF8F6B']].map(([n, c]) => (
                    <div key={n} className="legend-item">
                      <div className="legend-dot" style={{ background: c }} />
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="bottom-row">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Recent Orders</span>
                <span className="card-menu">⋯</span>
              </div>
              {dataLoading
                ? [1, 2, 3, 4].map(i => <div key={i} className="skeleton skel-row" style={{ width: `${70 + i * 7}%` }} />)
                : (
                  <table className="orders-table">
                    <thead>
                      <tr>
                        {['Tracking no', 'Product Name', 'Price', 'Total Order', 'Total Amount'].map(h => (
                          <th key={h}>{h}<span className="sort-arrow">▾</span></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o, i) => (
                        <tr key={i}>
                          <td>{o.tracking_no}</td>
                          <td>
                            <div className="order-product">
                              <div className="order-thumb">{o.emoji || '📦'}</div>
                              {o.product_name}
                            </div>
                          </td>
                          <td>${o.price}</td>
                          <td><span className="order-qty">{o.total_order}</span></td>
                          <td className="order-total">{fmtMoney(o.total_amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">Top Selling Products</span>
                <span className="card-menu">⋯</span>
              </div>
              {dataLoading
                ? [1, 2].map(i => <div key={i} className="skeleton skel-row" style={{ height: '70px', marginBottom: '12px' }} />)
                : products.map((p, i) => (
                  <div key={i} className="product-item">
                    <div className="product-thumb">{p.emoji || '📦'}</div>
                    <div>
                      <div className="product-name">{p.name}</div>
                      <Stars rating={p.rating || 4} />
                      <div className="product-price">${p.price}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('setup')
  const [sbUrl, setSbUrl] = useState('')
  const [sbKey, setSbKey] = useState('')
  const [isDemo, setIsDemo] = useState(false)

  function handleConnect(url, key) { setSbUrl(url); setSbKey(key); setIsDemo(false); setScreen('dashboard') }
  function handleDemo() { setIsDemo(true); setScreen('dashboard') }
  function handleDisconnect() { setSbUrl(''); setSbKey(''); setIsDemo(false); setScreen('setup') }

  if (screen === 'setup') return <SetupScreen onConnect={handleConnect} onDemo={handleDemo} />
  return <DashboardView supabaseUrl={sbUrl} supabaseKey={sbKey} isDemo={isDemo} onDisconnect={handleDisconnect} />
}
