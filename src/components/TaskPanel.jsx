import { choices } from '../data/dummyData.js'

export default function TaskPanel({ phase, selected, onSelect, onSubmit, onNext, feedback }) {
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
