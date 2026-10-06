import { vendorRef, vendorInputRows, vendorExample } from '../data/stageData.js'

export const emptyVendors = { names: ['', '', ''], values: [0, 1, 2].map(() => ({ days: '', fee: '', settle: '' })) }

export default function VendorPanel({ vendors, onChange, checked, onCheck, onNext }) {
  const setName = (i, v) => onChange({ ...vendors, names: vendors.names.map((n, k) => (k === i ? v : n)) })
  const setVal = (i, id, v) =>
    onChange({ ...vendors, values: vendors.values.map((o, k) => (k === i ? { ...o, [id]: v } : o)) })

  const complete =
    vendors.names.every((n) => n.trim()) && vendors.values.every((o) => Object.values(o).every((x) => x !== ''))

  // 비교 결과: 입력값 기준 최소값 업체
  const best = (id) => {
    const nums = vendors.values.map((o) => Number(o[id]))
    return vendors.names[nums.indexOf(Math.min(...nums))]
  }

  return (
    <section className="card task">
      <span className="pill">기술 선택</span>
      <h2>결제 대행사(PG) 탐색</h2>
      <p className="lead">결제 연동에 쓸 후보 업체를 참고 자료에서 찾아 아래 항목에 맞게 정리하세요.</p>

      <h4 className="card-title">업체 정보 참고자료</h4>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>업체 항목</th>{vendorRef.names.map((n) => <th key={n}>{n}</th>)}</tr>
          </thead>
          <tbody>
            {vendorRef.rows.map((r) => (
              <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i}>{c}</th> : <td key={i}>{c}</td>))}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reason-head">
        <h4 className="card-title mt">결제 대행사 리스트</h4>
        <button className="link" onClick={() => onChange(vendorExample)}>예시 채우기</button>
      </div>
      <div className="table-wrap">
        <table className="table input">
          <thead>
            <tr>
              <th>업체 항목</th>
              {vendors.names.map((n, i) => (
                <th key={i}><input value={n} placeholder={`업체 ${i + 1} 이름`} onChange={(e) => setName(i, e.target.value)} /></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendorInputRows.map((r) => (
              <tr key={r.id}>
                <th>{r.label}</th>
                {vendors.values.map((o, i) => (
                  <td key={i}>
                    <div className="num">
                      <input type="number" min="0" step="any" value={o[r.id]} onChange={(e) => setVal(i, r.id, e.target.value)} />
                      <span>{r.unit}</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {checked && (
        <div className="feedback">
          <div className="feedback-head"><span className="ai-badge">비교 결과</span></div>
          <p>
            수수료가 가장 낮은 곳은 <b>{best('fee')}</b>, 연동이 가장 빠른 곳은 <b>{best('days')}</b>, 정산이 가장 빠른 곳은 <b>{best('settle')}</b>입니다.
            <br />정답은 없어요. 거래 규모가 작고 개발 인력이 적은 캠퍼스 카페라면 수수료뿐 아니라 연동 난이도와 장애 지원 범위도 함께 봐야 합니다.
          </p>
          <button className="btn primary" onClick={onNext}>자기 평가로 이동 →</button>
        </div>
      )}

      {!checked && (
        <div className="task-actions">
          <button className="btn primary" disabled={!complete} onClick={onCheck}>비교 결과 확인하기</button>
        </div>
      )}
    </section>
  )
}
