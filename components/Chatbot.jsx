import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader, Bot, User } from 'lucide-react'

const N8N_WEBHOOK_URL = 'https://n8n.gonova.com.br/webhook/c449b664-a748-49ba-9a59-961d00d68ab0'

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
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: text }),
      })

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
                  {msg.text.split('\n').map((line, j) => (
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

          <form className="chatbot__input-bar" onSubmit={handleSend}>
            <input
              ref={inputRef}
              className="chatbot__input"
              type="text"
              placeholder="Digite sua dúvida..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button className="chatbot__send" type="submit" disabled={loading || !input.trim()} aria-label="Enviar">
              {loading ? <Loader size={18} className="spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
