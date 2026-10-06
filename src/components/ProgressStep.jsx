export default function ProgressStep({ steps, current }) {
  const pct = (current / (steps.length - 1)) * 100
  return (
    <div className="progress">
      <div className="progress-head">
        <span className="step-count">STEP {current + 1} / {steps.length}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <ol className="progress-steps">
        {steps.map((s, i) => (
          <li key={s} className={i === current ? 'now' : i < current ? 'done' : ''}>
            <span className="dot" />
            {s}
          </li>
        ))}
      </ol>
    </div>
  )
}
