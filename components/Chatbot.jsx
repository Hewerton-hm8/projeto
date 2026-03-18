import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader, Bot, User, Paperclip, FileText, Image } from 'lucide-react'

const N8N_WEBHOOK_URL = 'https://n8n.damaral.ia.br/webhook/c449b664-a748-49ba-9a59-961d00d68ab0'

function getSessionId() {
  let id = sessionStorage.getItem('chatbot_session_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('chatbot_session_id', id)
  }
  return id
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Olá! Sou a IA da GoNova 🤖\nPosso te ajudar com dúvidas sobre BESS, contas de energia, peak shaving e nossas soluções. Como posso ajudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const fileRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function handleFileChange(e) {
    const selected = e.target.files?.[0]
    if (!selected) return
    const maxSize = 10 * 1024 * 1024
    if (selected.size > maxSize) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'O arquivo excede o limite de 10 MB.' }])
      return
    }
    setFile(selected)
  }

  function removeFile() {
    setFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if ((!text && !file) || loading) return

    const userMsg = { role: 'user', text: text || '', file: file ? file.name : null }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    const currentFile = file
    setFile(null)
    if (fileRef.current) fileRef.current.value = ''
    setLoading(true)

    try {
      let res
      const sessionId = getSessionId()
      if (currentFile) {
        const formData = new FormData()
        formData.append('chatInput', text)
        formData.append('sessionId', sessionId)
        formData.append('data', currentFile)
        res = await fetch(N8N_WEBHOOK_URL, { method: 'POST', body: formData })
      } else {
        res = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatInput: text, sessionId }),
        })
      }

      if (!res.ok) throw new Error('Erro na resposta')

      const data = await res.json()
      const reply = data.output || data.text || data.message || 'Desculpe, não consegui processar sua pergunta.'

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Ops, ocorreu um erro ao se conectar. Tente novamente em instantes.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        className={`chatbot__fab ${open ? 'chatbot__fab--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Fechar chat' : 'Abrir chat'}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Janela do chat */}
      {open && (
        <div className="chatbot">
          <div className="chatbot__header">
            <div className="chatbot__header-info">
              <div className="chatbot__avatar">
                <Bot size={18} />
              </div>
              <div>
                <div className="chatbot__header-title">GoNova IA</div>
                <div className="chatbot__header-status">
                  <span className="chatbot__status-dot" />
                  Online
                </div>
              </div>
            </div>
            <button className="chatbot__close" onClick={() => setOpen(false)} aria-label="Fechar chat">
              <X size={18} />
            </button>
          </div>

          <div className="chatbot__messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot__msg chatbot__msg--${msg.role}`}>
                <div className="chatbot__msg-icon">
                  {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="chatbot__msg-bubble">
                  {msg.file && (
                    <div className="chatbot__msg-file">
                      <FileText size={13} />
                      <span>{msg.file}</span>
                    </div>
                  )}
                  {msg.text && msg.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chatbot__msg chatbot__msg--assistant">
                <div className="chatbot__msg-icon">
                  <Bot size={14} />
                </div>
                <div className="chatbot__msg-bubble chatbot__msg-bubble--typing">
                  <span className="chatbot__typing-dot" />
                  <span className="chatbot__typing-dot" />
                  <span className="chatbot__typing-dot" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {file && (
            <div className="chatbot__file-preview">
              <div className="chatbot__file-info">
                <FileText size={14} />
                <span className="chatbot__file-name">{file.name}</span>
              </div>
              <button className="chatbot__file-remove" onClick={removeFile} aria-label="Remover arquivo" type="button">
                <X size={14} />
              </button>
            </div>
          )}

          <form className="chatbot__input-bar" onSubmit={handleSend}>
            <input
              ref={fileRef}
              type="file"
              className="chatbot__file-input"
              onChange={handleFileChange}
              accept=".pdf,.csv,.json,.txt,.png,.jpg,.jpeg,.xlsx,.xls,.doc,.docx"
              disabled={loading}
            />
            <button
              className="chatbot__attach"
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={loading}
              aria-label="Anexar arquivo"
            >
              <Paperclip size={18} />
            </button>
            <input
              ref={inputRef}
              className="chatbot__input"
              type="text"
              placeholder="Digite sua dúvida..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button className="chatbot__send" type="submit" disabled={loading || (!input.trim() && !file)} aria-label="Enviar">
              {loading ? <Loader size={18} className="spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
