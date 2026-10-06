import { members } from '../data/dummyData.js'
import { review1, review2 } from '../data/stageData.js'

export default function ReviewPanel({ kind, onNext }) {
  if (kind === 'review1') {
    return (
      <section className="card task">
        <span className="pill">피드백</span>
        <h2>1차 피드백</h2>
        <p className="lead">제출한 명세서 초안에 대한 피드백이 도착했습니다.</p>
        <div className="fb-box warn">
          <div className="fb-who">
            <span className={`avatar ${review1.from}`}>{members[review1.from].name.slice(0, 1)}</span>
            <b>{members[review1.from].name}</b>
            <span className="muted">{members[review1.from].role}</span>
          </div>
          <p>{review1.note}</p>
          <span className="fb-tag">{review1.tag}</span>
        </div>
        <div className="task-actions">
          <button className="btn primary" onClick={onNext}>명세서 수정하러 가기</button>
        </div>
      </section>
    )
  }
  return (
    <section className="card task">
      <span className="pill">피드백</span>
      <h2>2차 피드백</h2>
      <p className="lead">수정안을 확인한 팀원들이 각자의 관점에서 의견을 남겼습니다.</p>
      <div className="fb-stack">
        {review2.map((r) => (
          <div key={r.from} className="fb-box warn">
            <div className="fb-who">
              <span className={`avatar ${r.from}`}>{members[r.from].name.slice(0, 1)}</span>
              <b>{members[r.from].name}</b>
              <span className="muted">{members[r.from].role}</span>
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <div className="task-actions">
        <button className="btn primary" onClick={onNext}>다음: 방향 선택</button>
      </div>
    </section>
  )
}
