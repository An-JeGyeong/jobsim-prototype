import { useEffect, useRef, useState } from 'react'
import { members, quickQuestions } from '../data/dummyData.js'

export default function ChatPanel({ messages, typing, onSend }) {
  const [text, setText] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const submit = (value) => {
    onSend(value ?? text)
    setText('')
  }

  return (
    <section className="card chat">
      <h4 className="card-title">메신저</h4>
      <div className="chat-list" ref={listRef}>
        {messages.map((m) => (
          <div key={m.id} className={`msg ${m.from === 'me' ? 'mine' : ''}`}>
            {m.from !== 'me' && (
              <div className="msg-who">
                <span className={`avatar ${m.from}`}>{members[m.from].name.slice(0, 1)}</span>
                <b>{members[m.from].name}</b>
                <span className="muted">{members[m.from].role}</span>
              </div>
            )}
            <div className="bubble">{m.text}</div>
            <span className="msg-time">{m.time}</span>
          </div>
        ))}
        {typing && (
          <div className="msg">
            <div className="bubble typing"><i /><i /><i /></div>
          </div>
        )}
      </div>
      <div className="chips">
        {quickQuestions.map((q) => (
          <button key={q} className="chip" onClick={() => submit(q)}>{q}</button>
        ))}
      </div>
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="팀원에게 질문을 입력하세요." />
        <button type="submit" className="send" aria-label="전송">↑</button>
      </form>
    </section>
  )
}
