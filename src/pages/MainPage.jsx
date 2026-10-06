import { useRef, useState } from 'react'
import JobCard from '../components/JobCard.jsx'
import { jobs, flow } from '../data/dummyData.js'

export default function MainPage({ onStart }) {
  const jobsRef = useRef(null)
  const [highlight, setHighlight] = useState(false)

  const focusBackend = () => {
    jobsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setHighlight(true)
    setTimeout(() => setHighlight(false), 2400)
  }

  return (
    <main className="main-page">
      <header className="topbar">
        <span className="brand">JOB:IN</span>
        <span className="profile" aria-label="프로필">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#222"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0z" /></svg>
        </span>
      </header>

      <section className="hero">
        <span className="pill">AI 직무 시뮬레이션</span>
        <h1>
          직무를 읽지 말고,<br />
          <em>직접 경험</em>해보세요.
        </h1>
        <p>
          실제 업무 상황을 기반으로 한 AI 직무 시뮬레이션을 통해<br />
          내가 어떤 방식으로 일하는지 경험해보세요.
        </p>
        <button className="btn primary big" onClick={focusBackend}>직무 체험 시작하기</button>
      </section>

      <section className="section" ref={jobsRef}>
        <div className="section-head">
          <h2>직무 체험</h2>
          <p>체험하고 싶은 직무를 선택하세요.</p>
        </div>
        <div className="job-grid">
          {jobs.map((j) => (
            <JobCard key={j.id} job={j} highlight={j.active && highlight} onStart={onStart} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>이렇게 진행돼요</h2>
          <p>결과만 보는 테스트가 아니라, 일하는 과정을 함께 기록합니다.</p>
        </div>
        <ol className="flow">
          {flow.map((f) => (
            <li key={f.no} className="flow-item">
              <span className="flow-no">{f.no}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="footer">JOB:IN · 졸업작품 프로토타입 (더미 데이터 기반)</footer>
    </main>
  )
}
