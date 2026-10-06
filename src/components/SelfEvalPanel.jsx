import { likertOptions, selfQuestions } from '../data/stageData.js'

export default function SelfEvalPanel({ answers, onAnswer, note, onNote, onSubmit }) {
  const complete = answers.every((a) => a > 0)
  return (
    <section className="card selfeval">
      <h2>방금 수행한 업무, 어떠셨나요?</h2>
      <p className="lead">학습 과정에 대한 리뷰를 등록해주세요. 솔직한 응답일수록 정확한 직무 이해 리포트를 받을 수 있어요.</p>
      {selfQuestions.map((q, qi) => (
        <div key={q} className="q">
          <h4>{q}</h4>
          <div className="likert">
            {likertOptions.map((o, oi) => (
              <button key={o} className={answers[qi] === oi + 1 ? 'on' : ''} onClick={() => onAnswer(qi, oi + 1)}>{o}</button>
            ))}
          </div>
        </div>
      ))}
      <div className="q">
        <h4>업무 중 부담을 느낀 부분이 있었나요?</h4>
        <textarea
          className="area"
          rows={3}
          value={note}
          onChange={(e) => onNote(e.target.value)}
          placeholder="예) 기획자와 개발자의 용어 차이로 요구사항을 정확히 이해하기 어려웠어요."
        />
      </div>
      <div className="task-actions">
        <button className="btn primary" disabled={!complete} onClick={onSubmit}>제출하기</button>
      </div>
    </section>
  )
}
