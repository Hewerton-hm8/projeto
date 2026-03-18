import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase env vars ausentes. Formulário funcionará em modo demo.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Salva solicitação de diagnóstico energético
 */
export async function salvarDiagnostico({ nome, empresa, email, telefone, setor, mensagem }) {
  const { data, error } = await supabase
    .from('diagnosticos')
    .insert([{ nome, empresa, email, telefone, setor, mensagem }])
    .select('id')
    .single()

  if (error) throw error
  return data
}

/**
 * Salva lead de newsletter
 */
export async function salvarLead({ email, nome }) {
  const { error } = await supabase
    .from('leads')
    .upsert([{ email, nome }], { onConflict: 'email' })

  if (error) throw error
}
