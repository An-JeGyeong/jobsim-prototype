import { useRef, useState } from 'react'
import ProgressStep from '../components/ProgressStep.jsx'
import ChatPanel from '../components/ChatPanel.jsx'
import TaskPanel from '../components/TaskPanel.jsx'
import { NotesCard, ActivityLog } from '../components/FeedbackCard.jsx'
import {
  steps, project, initialMessages, cannedReplies, initialNotes,
  choices, feedbacks, initialActivity,
} from '../data/dummyData.js'

const pad = (n) => String(n).padStart(2, '0')

export default function SimulationPage({ onExit }) {
  const [phase, setPhase] = useState('analysis') // analysis | feedback | design
  const [messages, setMessages] = useState(initialMessages)
  const [typing, setTyping] = useState(false)
  const [notes, setNotes] = useState(initialNotes)
  const [activity, setActivity] = useState(initialActivity)
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const replyIdx = useRef(0)
  const clock = useRef(40) // 09:40부터 로그 시간 증가

  const addLog = (text) => {
    const time = `09:${pad(clock.current)}`
    clock.current += 2
    setActivity((a) => [...a, { time, text }])
  }

  const handleSend = (text) => {
    const t = text.trim()
    if (!t || typing) return
    const now = `09:${pad(clock.current)}`
    setMessages((m) => [...m, { id: Date.now(), from: 'me', text: t, time: now }])
    addLog(`팀원에게 질문: ${t.length > 14 ? t.slice(0, 14) + '…' : t}`)
    setTyping(true)
    setTimeout(() => {
      const reply = cannedReplies[replyIdx.current % cannedReplies.length]
      replyIdx.current += 1
      setMessages((m) => [...m, { id: Date.now() + 1, ...reply, time: `09:${pad(clock.current)}` }])
      setTyping(false)
    }, 900)
  }

  const handleSubmit = () => {
    const c = choices.find((x) => x.id === selected)
    if (!c) return
    setNotes((ns) => ns.map((n) => (c.resolves.includes(n.id) ? { ...n, done: true } : n)))
    addLog(c.log)
    setFeedback(c.id === 3 ? feedbacks.hasty : feedbacks.good)
    setPhase('feedback')
  }

  const handleNext = () => {
    addLog('다음 업무 진입: API 설계')
    setPhase('design')
  }

  const current = phase === 'design' ? 2 : 1

  return (
    <main className="sim-page">
      <div className="sim-frame">
        <ProgressStep steps={steps} current={current} />

        <div className="sim-grid">
          <div className="col">
            <section className="card project">
              <div className="project-head">
                <span className="pill">PROJECT</span>
                <button className="link" onClick={onExit}>← 메인</button>
              </div>
              <h3>{project.name}</h3>
              <p className="muted">{project.desc}</p>
              <dl>
                <dt>나의 역할</dt>
                <dd>{project.role}</dd>
                <dt>현재 업무</dt>
                <dd>{phase === 'design' ? '주문 API 설계' : project.task}</dd>
              </dl>
              <p className="situation">{project.situation}</p>
            </section>
            <ChatPanel messages={messages} typing={typing} onSend={handleSend} />
          </div>

          <div className="col center">
            <TaskPanel
              phase={phase}
              selected={selected}
              onSelect={setSelected}
              onSubmit={handleSubmit}
              onNext={handleNext}
              onExit={onExit}
              feedback={feedback}
            />
          </div>

          <div className="col">
            <NotesCard notes={notes} />
            <ActivityLog items={activity} />
          </div>
        </div>
      </div>
    </main>
  )
}
