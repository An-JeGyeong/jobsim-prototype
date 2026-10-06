import { directions, directionReasonExample } from '../data/stageData.js'

export default function DirectionPanel({ selected, onSelect, reason, onReason, onSubmit }) {
  return (
    <section className="card task">
      <span className="pill">수정 방향 선택</span>
      <h2>실시간 주문 확인, 어떻게 풀까요?</h2>
      <p className="lead">팀원들의 의견을 바탕으로 매장 주문 확인 방식의 방향을 정해보세요.</p>
      <div className="choices">
        {directions.map((d, i) => (
          <button key={d.id} className={`choice ${selected === d.id ? 'selected' : ''}`} onClick={() => onSelect(d.id)}>
            <span className="choice-no">0{i + 1}</span>
            <b>{d.title}</b>
            <span className="choice-desc">+ {d.pros}<br />- {d.cons}</span>
          </button>
        ))}
      </div>
      <div className="reason-head">
        <h4 className="card-title mt">선택 근거 입력</h4>
        <button className="link" onClick={() => onReason(directionReasonExample)}>예시 근거 넣기</button>
      </div>
      <textarea
        className="area"
        rows={3}
        value={reason}
        onChange={(e) => onReason(e.target.value)}
        placeholder="이 방향을 선택한 이유를 적어주세요."
      />
      <div className="task-actions">
        <button className="btn primary" disabled={!selected || !reason.trim()} onClick={onSubmit}>선택 제출</button>
      </div>
    </section>
  )
}
