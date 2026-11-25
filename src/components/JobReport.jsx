import { burdenChips, directions } from '../data/stageData.js'
import { choices } from '../data/dummyData.js'

function DotGrid({ pct }) {
  const total = 200
  const filled = Math.round((pct / 100) * total)
  return (
    <div className="dots">
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={i >= total - filled ? 'on' : ''} />
      ))}
    </div>
  )
}

export default function JobReport({ result, choiceId, directionId, onHome, onSummary }) {
  const choice = choices.find((c) => c.id === choiceId)
  const dir = directions.find((d) => d.id === directionId)
  const timeline = [
    { t: '1차 협업', d: choice ? choice.title : '요구사항 확인' },
    { t: '2차 협업', d: '요구사항 문서 수정 · 주문 상태/취소 처리 보완' },
    { t: '3차 협업', d: dir ? `${dir.title} 선택` : '방향 선택' },
  ]

  return (
    <div className="report-grid">
      <div className="col">
        <section className="card">
          <span className="tagline">체험한 업무</span>
          <h4 className="rep-title">불명확한 요구사항을 확인하고 문서로 정리</h4>
          <p className="muted dark">팀장 지시 → 질문 → 문서 작성 → 피드백 반영 → 충돌 조정까지 한 사이클을 체험했습니다.</p>
        </section>
        <section className="card">
          <span className="tagline">업무 의미</span>
          <h4 className="rep-title">요구사항 분석 단계</h4>
          <p className="muted dark">개발 전에 기획·프론트·운영 관점의 요구를 확인하고 모호한 조건을 정리하는 과정입니다. 이번 세션에서는 직접 요구사항 문서를 쓰고 피드백으로 고쳐봤습니다.</p>
        </section>
        <section className="card">
          <span className="tagline">업무 진행 과정</span>
          <ol className="timeline">
            {timeline.map((x) => (
              <li key={x.t}><small>{x.t}</small><span>{x.d}</span></li>
            ))}
          </ol>
        </section>
      </div>

      <div className="col">
        <section className="card">
          <div className="rep-head">
            <span className="tagline">나의 업무 행동 분석</span>
            <b>{result.hasty ? '실행력이 돋보이는 백엔드 DNA가 보여요' : '꼼꼼한 설계형 백엔드 DNA가 흐르고 있어요'}</b>
          </div>
          <div className="analysis">
            <div className="an-row"><span>강점</span><p>{result.strengths.map((s) => <span key={s}>{s}<br /></span>)}</p></div>
            <div className="an-row lime"><span>주의점</span><p>{result.cautions.map((s) => <span key={s}>{s}<br /></span>)}</p></div>
            <div className="an-row lime2"><span>놓친 업무 요소</span><p>{result.missed.map((s) => <span key={s}>{s}<br /></span>)}</p></div>
          </div>
        </section>
        <div className="dot-row">
          <section className="card">
            <div className="dot-head"><b>흥미도</b><em>{result.interest}%</em></div>
            <DotGrid pct={result.interest} />
          </section>
          <section className="card">
            <div className="dot-head"><b>이해도</b><em>{result.understanding}%</em></div>
            <DotGrid pct={result.understanding} />
          </section>
        </div>
      </div>

      <div className="col">
        <section className="card">
          <span className="tagline">부담 기록</span>
          {Object.entries(burdenChips).map(([k, chips]) => (
            <div key={k} className="burden">
              <small>{k}</small>
              <div className="notes">{chips.map((c) => <span key={c} className="note neutral">{c}</span>)}</div>
            </div>
          ))}
          {result.selfNote && (
            <div className="burden">
              <small>내가 남긴 메모</small>
              <p className="memo">{result.selfNote}</p>
            </div>
          )}
        </section>
        <button className="btn ghost dark wide" onClick={onHome}>홈으로 가기</button>
        <button className="btn primary wide" onClick={onSummary}>종합 리포트 보기</button>
      </div>
    </div>
  )
}
