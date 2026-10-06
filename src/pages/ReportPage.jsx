import { intro, nextSuggestions, defaultResult } from '../data/stageData.js'
import { directions } from '../data/stageData.js'

export default function ReportPage({ result, onHome, onStart }) {
  const r = result || defaultResult
  const dir = directions.find((d) => d.id === r.directionId)

  return (
    <main className="main-page report-page">
      <header className="topbar">
        <span className="brand">종합 리포트</span>
        <span className="profile" aria-label="프로필">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#222"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0z" /></svg>
        </span>
      </header>
      <p className="report-sub">내가 체험한 업무들과 직무 평가, 진행과정 및 다음 직무 탐색 제안을 한눈에 볼 수 있습니다.</p>
      {!result && <p className="demo-note">※ 아직 체험을 완료하지 않아 예시 데이터로 보여드리고 있어요.</p>}

      <div className="sum-grid">
        <section className="dcard">
          <h4>이번에 경험한 업무</h4>
          <div className="exp">
            <b>백엔드 개발자</b>
            <p>Campus Order · 요구사항 분석 및 API 설계{dir ? ` / ${dir.title}` : ''}</p>
          </div>
        </section>

        <section className="dcard">
          <h4>내 직무 이해 프로필</h4>
          <p className="muted">체험 중 나타난 판단 성향을 보여줍니다.</p>
          <div className="axes">
            {r.profile.map((a) => (
              <div key={a.label} className="axis">
                <div className="axis-labels"><span>{a.left}</span><b>{a.label}</b><span>{a.right}</span></div>
                <div className="axis-track"><i style={{ left: `${a.value}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="dcard">
          <h4>내 업무 행동</h4>
          <p className="muted">내 강점, 주의점, 놓친 업무 요소를 확인하세요.</p>
          <div className="quotes">
            {r.strengths.map((s) => <p key={s} className="q lime">{s}</p>)}
            <hr />
            {r.cautions.map((s) => <p key={s} className="q lime">{s}</p>)}
            <hr />
            {r.missed.map((s) => <p key={s} className="q lime">{s}</p>)}
          </div>
        </section>
      </div>

      <section className="dcard wide-card">
        <h4>내 업무 진행 과정</h4>
        <ol className="proc-flow">
          {intro.processes.map((p) => (
            <li key={p.no} className={p.state === 'soon' ? '' : 'on'}>{p.no}. {p.title}</li>
          ))}
        </ol>
      </section>

      <section className="section tight">
        <h4 className="sug-title">다음 탐색 제안</h4>
        <div className="sug-grid">
          {nextSuggestions.map((s) => (
            <button key={s} className="sug" title="준비 중" onClick={s === nextSuggestions[0] ? onStart : undefined}>
              <span>{s}</span><i>›</i>
            </button>
          ))}
        </div>
      </section>

      <div className="report-actions">
        <button className="btn ghost" onClick={onHome}>홈으로 가기</button>
      </div>
    </main>
  )
}
