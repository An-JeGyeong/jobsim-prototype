import { choices, apiDesign } from '../data/dummyData.js'

export default function TaskPanel({ phase, selected, onSelect, onSubmit, onNext, onExit, feedback }) {
  if (phase === 'design') {
    return (
      <section className="card task">
        <span className="pill">NEXT · API 설계</span>
        <h2>현재 업무</h2>
        <p className="lead">{apiDesign.title}</p>
        <ul className="api-list">
          {apiDesign.endpoints.map((e) => (
            <li key={e.path + e.method}>
              <span className={`method ${e.method}`}>{e.method}</span>
              <code>{e.path}</code>
              <span className="api-desc">{e.desc}</span>
            </li>
          ))}
        </ul>
        <h4 className="card-title">설계 전에 생각해볼 점</h4>
        <ul className="hints">
          {apiDesign.hints.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="task-actions">
          <button className="btn ghost dark" onClick={onExit}>메인으로 돌아가기</button>
          <button className="btn primary" disabled>다음 업무 진행 (준비 중)</button>
        </div>
      </section>
    )
  }

  const done = phase === 'feedback'
  return (
    <section className="card task">
      <span className="pill">현재 업무</span>
      <h2>요구사항 확인</h2>
      <p className="lead">
        기획자의 요구사항을 확인했습니다. API 설계를 시작하기 전에 추가로 확인해야 할 내용을 선택하세요.
      </p>

      <div className="choices">
        {choices.map((c, i) => (
          <button
            key={c.id}
            disabled={done}
            className={`choice ${selected === c.id ? 'selected' : ''}`}
            onClick={() => onSelect(c.id)}
          >
            <span className="choice-no">0{i + 1}</span>
            <b>{c.title}</b>
            <span className="choice-desc">{c.desc}</span>
          </button>
        ))}
      </div>

      {!done && (
        <div className="task-actions">
          <button className="btn primary" disabled={!selected} onClick={onSubmit}>
            선택 완료
          </button>
        </div>
      )}

      {done && feedback && (
        <div className="feedback">
          <div className="feedback-head">
            <span className="ai-badge">AI 피드백</span>
            <span className="muted">행동 분석 완료</span>
          </div>
          <h3>{feedback.title}</h3>
          <p>{feedback.body}</p>
          <div className="behaviors">
            <span className="muted">분석된 행동</span>
            {feedback.behaviors.map((b) => (
              <span key={b} className="behavior">+ {b}</span>
            ))}
          </div>
          <button className="btn primary" onClick={onNext}>다음 업무로 이동 →</button>
        </div>
      )}
    </section>
  )
}
