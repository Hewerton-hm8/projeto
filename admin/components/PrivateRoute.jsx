import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function PrivateRoute({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    )
  }

  return session ? children : <Navigate to="/admin/login" replace />
}
