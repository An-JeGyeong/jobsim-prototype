import { useState } from 'react'
import { apiDesign } from '../data/dummyData.js'
import { review1, specTabs, specFields } from '../data/stageData.js'

// mode: 'design'(초안 작성) | 'revise'(수정)
export default function SpecPanel({
  mode, spec, onChange, rationale, onRationale, onFill, onSubmit,
  complete, attached, onAttach, loading,
}) {
  const [tab, setTab] = useState('create')
  const t = specTabs.find((x) => x.id === tab)
  const revise = mode === 'revise'

  return (
    <section className="card task">
      <span className="pill">{revise ? 'NEXT · 명세서 수정' : 'NEXT · API 설계'}</span>
      <h2>{revise ? 'API 명세서 수정' : 'API 명세서 초안 작성'}</h2>
      <p className="lead">
        {revise ? '피드백을 반영해 명세서를 수정하고 수정안을 제출하세요.' : apiDesign.title}
      </p>

      {revise && (
        <div className="fb-box warn">
          <b>1차 피드백</b>
          <p>{review1.note}</p>
        </div>
      )}

      <div className="spec-head">
        <div className="tabs">
          {specTabs.map((x) => (
            <button key={x.id} className={`tab ${tab === x.id ? 'on' : ''}`} onClick={() => setTab(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
        <button className="link" onClick={onFill}>{revise ? '수정 예시 반영' : '예시 채우기'}</button>
      </div>

      <div className="spec-endpoint"><code>{t.endpoint}</code></div>
      <div className="spec-rows">
        {specFields.map((f) => (
          <label key={f.id} className="spec-row">
            <span>{f.label}</span>
            <input
              value={spec[tab][f.id]}
              placeholder={f.placeholder}
              onChange={(e) => onChange(tab, f.id, e.target.value)}
            />
          </label>
        ))}
        {revise && (
          <div className="spec-row">
            <span>첨부 파일</span>
            {attached ? (
              <span className="file-chip">📄 Campus_Order_API_Spec_v2.pdf</span>
            ) : (
              <button className="link plus" onClick={onAttach}>+ 파일 첨부</button>
            )}
          </div>
        )}
      </div>

      {!revise && (
        <>
          <h4 className="card-title mt">설계 근거 입력</h4>
          <textarea
            className="area"
            rows={3}
            value={rationale}
            onChange={(e) => onRationale(e.target.value)}
            placeholder="이렇게 설계한 이유를 적어주세요."
          />
        </>
      )}

      <div className="task-actions">
        <button className="btn primary" disabled={!complete || loading} onClick={onSubmit}>
          {loading ? '로딩 중…' : revise ? '수정안 제출' : '초안 제출'}
        </button>
      </div>
    </section>
  )
}
