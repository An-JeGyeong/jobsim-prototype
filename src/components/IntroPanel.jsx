import { useState } from 'react'
import { intro } from '../data/stageData.js'

export default function IntroPanel({ onStart, onExit }) {
  const [picked, setPicked] = useState(null)

  return (
    <div className="intro">
      <section className="intro-main">
        <button className="link light" onClick={onExit}>← 메인으로</button>
        <h2>{intro.title}</h2>
        <p className="intro-sub">{intro.subtitle}</p>
        <p className="intro-desc">{intro.desc}</p>
        <svg className="intro-art" viewBox="0 0 360 200" aria-hidden="true">
          <rect x="30" y="20" width="300" height="160" rx="14" fill="#2f2f2f" />
          <rect x="30" y="20" width="300" height="26" rx="14" fill="#3a3a3a" />
          <circle cx="50" cy="33" r="4" fill="#ff6b5e" /><circle cx="64" cy="33" r="4" fill="#f5c04a" /><circle cx="78" cy="33" r="4" fill="#6ed05c" />
          <rect x="52" y="64" width="90" height="8" rx="4" fill="#C8F59A" />
          <rect x="64" y="84" width="150" height="8" rx="4" fill="#555" />
          <rect x="64" y="104" width="120" height="8" rx="4" fill="#555" />
          <rect x="64" y="124" width="170" height="8" rx="4" fill="#555" />
          <rect x="52" y="146" width="60" height="8" rx="4" fill="#C8F59A" />
          <rect x="236" y="70" width="76" height="40" rx="10" fill="#C8F59A" />
          <text x="274" y="95" textAnchor="middle" fontSize="14" fontWeight="800" fill="#20300e">/orders</text>
        </svg>
      </section>

      <aside className="intro-side">
        <h4>업무 프로세스</h4>
        <p className="muted">체험할 업무 세션을 선택하세요</p>
        <ul>
          {intro.processes.map((p) => {
            const open = p.state === 'open'
            return (
              <li key={p.no}>
                <button
                  disabled={!open}
                  className={`proc ${picked === p.no ? 'picked' : ''} ${p.state}`}
                  onClick={() => setPicked(p.no)}
                >
                  <span>{p.no}. {p.title}</span>
                  {p.state === 'soon' && <em className="mini">준비 중</em>}
                  {p.state === 'included' && <em className="mini inc">2번에 포함</em>}
                </button>
              </li>
            )
          })}
        </ul>
        <button className="btn primary wide" disabled={!picked} onClick={onStart}>업무 시작하기</button>
      </aside>
    </div>
  )
}
