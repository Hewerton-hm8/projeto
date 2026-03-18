import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const configured = Boolean(supabaseUrl && supabaseKey)

// Usa URL placeholder para não crashar quando as vars não estão definidas
export const supabase = createClient(
  supabaseUrl  || 'https://placeholder.supabase.co',
  supabaseKey  || 'placeholder-key'
)

export async function salvarDiagnostico({ nome, empresa, email, telefone, setor, mensagem }) {
  if (!configured) throw new Error('Supabase não configurado.')
  const { data, error } = await supabase
    .from('diagnosticos')
    .insert([{ nome, empresa, email, telefone, setor, mensagem }])
    .select('id')
    .single()
  if (error) throw error
  return data
}

export async function uploadFatura(file, diagnosticoId) {
  if (!configured) throw new Error('Supabase não configurado.')
  const ext = file.name.split('.').pop()
  const path = `${diagnosticoId}/${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('faturas').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('faturas').getPublicUrl(path)
  return data.publicUrl
}

export async function atualizarFaturaUrl(diagnosticoId, faturaUrl) {
  if (!configured) throw new Error('Supabase não configurado.')
  const { error } = await supabase
    .from('diagnosticos')
    .update({ fatura_url: faturaUrl })
    .eq('id', diagnosticoId)
  if (error) throw error
}

export async function salvarLead({ email, nome }) {
  if (!configured) throw new Error('Supabase não configurado.')
  const { error } = await supabase
    .from('leads')
    .upsert([{ email, nome }], { onConflict: 'email' })
  if (error) throw error
}
