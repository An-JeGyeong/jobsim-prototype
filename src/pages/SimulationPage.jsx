import { useRef, useState } from 'react'
import ProgressStep from '../components/ProgressStep.jsx'
import ChatPanel from '../components/ChatPanel.jsx'
import TaskPanel from '../components/TaskPanel.jsx'
import IntroPanel from '../components/IntroPanel.jsx'
import SpecPanel from '../components/SpecPanel.jsx'
import ReviewPanel from '../components/ReviewPanel.jsx'
import DirectionPanel from '../components/DirectionPanel.jsx'
import VendorPanel, { emptyVendors } from '../components/VendorPanel.jsx'
import SelfEvalPanel from '../components/SelfEvalPanel.jsx'
import JobReport from '../components/JobReport.jsx'
import { NotesCard, ActivityLog } from '../components/FeedbackCard.jsx'
import {
  steps, project, initialMessages, cannedReplies, initialNotes,
  choices, feedbacks, initialActivity,
} from '../data/dummyData.js'
import {
  emptySpec, specExample, rationaleExample, applyReviseExample, directions, buildResult,
} from '../data/stageData.js'

const pad = (n) => String(n).padStart(2, '0')

// stage → 상단 진행 단계 index
const stepOf = { intro: 0, req: 1, design: 2, review1: 3, revise: 3, review2: 3, direction: 3, vendor: 4, selfeval: 5, report: 6 }
const taskLabel = {
  req: project.task, design: 'API 명세서 작성', review1: '명세서 피드백 확인', revise: '명세서 수정',
  review2: '2차 피드백 확인', direction: '수정 방향 선택', vendor: '결제 대행사(PG) 탐색',
}

export default function SimulationPage({ onExit, onFinish, onOpenSummary }) {
  const [stage, setStage] = useState('intro')
  const [messages, setMessages] = useState(initialMessages)
  const [typing, setTyping] = useState(false)
  const [notes, setNotes] = useState(initialNotes)
  const [activity, setActivity] = useState(initialActivity)

  const [selected, setSelected] = useState(null) // 요구사항 선택지
  const [reqDone, setReqDone] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const [spec, setSpec] = useState(emptySpec)
  const [rationale, setRationale] = useState('')
  const [draft, setDraft] = useState(null)
  const [attached, setAttached] = useState(false)
  const [loading, setLoading] = useState(false)

  const [dirId, setDirId] = useState(null)
  const [dirReason, setDirReason] = useState('')
  const [vendors, setVendors] = useState(emptyVendors)
  const [vendorChecked, setVendorChecked] = useState(false)
  const [answers, setAnswers] = useState([0, 0, 0])
  const [selfNote, setSelfNote] = useState('')
  const [result, setResult] = useState(null)

  const replyIdx = useRef(0)
  const clock = useRef(40) // 09:40부터 로그 시간 증가
  const msgId = useRef(100)
  const sent = useRef(0)

  const now = () => `09:${pad(clock.current)}`
  const addLog = (text) => {
    const time = now()
    clock.current += 2
    setActivity((a) => [...a, { time, text }])
  }
  const say = (from, text) => setMessages((m) => [...m, { id: ++msgId.current, from, text, time: now() }])
  const addNote = (id, label) => setNotes((ns) => [...ns, { id, label, done: true }])

  const handleSend = (text) => {
    const t = text.trim()
    if (!t || typing) return
    sent.current += 1
    say('me', t)
    addLog(`팀원에게 질문: ${t.length > 14 ? t.slice(0, 14) + '…' : t}`)
    setTyping(true)
    setTimeout(() => {
      const reply = cannedReplies[replyIdx.current % cannedReplies.length]
      replyIdx.current += 1
      say(reply.from, reply.text)
      setTyping(false)
    }, 900)
  }

  // ----- 1. 요구사항 분석 -----
  const submitReq = () => {
    const c = choices.find((x) => x.id === selected)
    if (!c) return
    setNotes((ns) => ns.map((n) => (c.resolves.includes(n.id) ? { ...n, done: true } : n)))
    addLog(c.log)
    setFeedback(c.id === 3 ? feedbacks.hasty : feedbacks.good)
    setReqDone(true)
  }
  const toDesign = () => {
    addLog('다음 업무 진입: API 설계')
    say('junho', '좋아요. 확인한 내용을 바탕으로 API 명세서 초안을 작성해보세요. 설계 근거도 꼭 적어주세요.')
    setStage('design')
  }

  // ----- 2. 명세서 초안 -----
  const editSpec = (tab, field, value) => setSpec((s) => ({ ...s, [tab]: { ...s[tab], [field]: value } }))
  const specFilled = Object.values(spec).every((t) => Object.values(t).every((v) => v.trim()))
  const submitDraft = () => {
    setDraft(JSON.stringify(spec))
    addLog('API 명세서 초안 제출')
    say('junho', '초안 잘 받았어요. 검토하고 피드백 남겼습니다.')
    setStage('review1')
  }
  const fillDraft = () => {
    setSpec(specExample)
    setRationale(rationaleExample)
  }

  // ----- 3. 피드백 수정 -----
  const toRevise = () => {
    addLog('1차 피드백 확인')
    setStage('revise')
  }
  const submitRevision = () => {
    setLoading(true)
    addLog('수정된 명세서 제출')
    setTimeout(() => {
      setLoading(false)
      addNote('status2', '주문 상태(status) 값 정의')
      say('seoyeon', '수정안 봤어요! 프론트 입장에서 궁금한 점이 있어서 피드백 남길게요.')
      say('minsu', '운영 쪽에서도 확인할 게 있어서 의견 남겼습니다.')
      setStage('review2')
    }, 1200)
  }
  const toDirection = () => {
    addLog('2차 피드백 확인')
    setStage('direction')
  }
  const submitDirection = () => {
    const d = directions.find((x) => x.id === dirId)
    addLog(`방향 선택: ${d.title}`)
    addNote('realtime', '실시간 주문 확인 방식 결정')
    say('junho', '방향은 정해졌네요. 이제 결제 연동에 쓸 PG사를 비교해서 골라볼까요?')
    setStage('vendor')
  }

  // ----- 4. 기술 선택 -----
  const checkVendors = () => {
    addLog('결제 대행사(PG) 비교 확인')
    addNote('pg', '결제 대행사 비교 완료')
    setVendorChecked(true)
  }

  // ----- 5. 자기 평가 -----
  const submitSelfEval = () => {
    addLog('자기 평가 제출')
    const r = buildResult({
      choiceId: selected, directionId: dirId, sent: sent.current, answers, selfNote: selfNote.trim(), notes,
    })
    setResult(r)
    onFinish(r)
    setStage('report')
  }

  const setAnswer = (i, v) => setAnswers((a) => a.map((x, k) => (k === i ? v : x)))
  const changedSinceDraft = draft !== null && JSON.stringify(spec) !== draft

  const grid = ['req', 'design', 'review1', 'revise', 'review2', 'direction', 'vendor'].includes(stage)
  const dark = stage === 'intro'

  return (
    <main className="sim-page">
      <div className={`sim-frame ${dark ? 'dark' : ''}`}>
        {!dark && <ProgressStep steps={steps} current={stepOf[stage]} />}

        {stage === 'intro' && <IntroPanel onStart={() => setStage('req')} onExit={onExit} />}

        {grid && (
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
                  <dd>{taskLabel[stage]}</dd>
                </dl>
                <p className="situation">{project.situation}</p>
              </section>
              <ChatPanel messages={messages} typing={typing} onSend={handleSend} />
            </div>

            <div className="col center">
              {stage === 'req' && (
                <TaskPanel
                  phase={reqDone ? 'feedback' : 'analysis'}
                  selected={selected}
                  onSelect={setSelected}
                  onSubmit={submitReq}
                  onNext={toDesign}
                  feedback={feedback}
                />
              )}
              {(stage === 'design' || stage === 'revise') && (
                <SpecPanel
                  mode={stage}
                  spec={spec}
                  onChange={editSpec}
                  rationale={rationale}
                  onRationale={setRationale}
                  onFill={stage === 'design' ? fillDraft : () => setSpec(applyReviseExample(spec))}
                  onSubmit={stage === 'design' ? submitDraft : submitRevision}
                  complete={stage === 'design' ? specFilled && rationale.trim().length > 0 : changedSinceDraft}
                  attached={attached}
                  onAttach={() => setAttached(true)}
                  loading={loading}
                />
              )}
              {(stage === 'review1' || stage === 'review2') && (
                <ReviewPanel kind={stage} onNext={stage === 'review1' ? toRevise : toDirection} />
              )}
              {stage === 'direction' && (
                <DirectionPanel
                  selected={dirId}
                  onSelect={setDirId}
                  reason={dirReason}
                  onReason={setDirReason}
                  onSubmit={submitDirection}
                />
              )}
              {stage === 'vendor' && (
                <VendorPanel
                  vendors={vendors}
                  onChange={setVendors}
                  checked={vendorChecked}
                  onCheck={checkVendors}
                  onNext={() => setStage('selfeval')}
                />
              )}
            </div>

            <div className="col">
              <NotesCard notes={notes} />
              <ActivityLog items={activity} />
            </div>
          </div>
        )}

        {stage === 'selfeval' && (
          <SelfEvalPanel
            answers={answers}
            onAnswer={setAnswer}
            note={selfNote}
            onNote={setSelfNote}
            onSubmit={submitSelfEval}
          />
        )}

        {stage === 'report' && result && (
          <JobReport
            result={result}
            choiceId={selected}
            directionId={dirId}
            onHome={onExit}
            onSummary={onOpenSummary}
          />
        )}
      </div>
    </main>
  )
}
