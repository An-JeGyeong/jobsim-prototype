// 우측 사이드: 업무 노트 + 업무 행동 기록
export function NotesCard({ notes }) {
  return (
    <section className="card">
      <h4 className="card-title">업무 노트</h4>
      <p className="muted small">현재까지 확인한 요구사항</p>
      <div className="notes">
        {notes.map((n) => (
          <span key={n.id} className={`note ${n.done ? 'done' : 'todo'}`}>
            {n.done ? '✓' : '?'} {n.label}
          </span>
        ))}
      </div>
    </section>
  )
}

export function ActivityLog({ items }) {
  return (
    <section className="card">
      <div className="log-head">
        <h4 className="card-title">업무 행동 기록</h4>
        <span className="analyzing"><i /> 분석 중</span>
      </div>
      <ul className="log">
        {items.map((a, i) => (
          <li key={a.time + a.text + i}>
            <span className="log-time">{a.time}</span>
            <span>{a.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
