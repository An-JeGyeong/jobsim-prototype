export default function JobCard({ job, highlight, onStart }) {
  return (
    <div className={`job-card ${job.active ? 'active' : 'disabled'} ${highlight ? 'highlight' : ''}`}>
      <div className="job-card-top">
        <span className="job-icon">{job.title.slice(0, 1)}</span>
        {!job.active && <span className="badge soon">준비 중</span>}
        {job.active && <span className="badge live">체험 가능</span>}
      </div>
      <h3>{job.title}</h3>
      <p>{job.desc}</p>
      <div className="tags">
        {job.tags.map((t) => (
          <span key={t} className="tag">#{t}</span>
        ))}
      </div>
      {job.active ? (
        <button className="btn primary" onClick={onStart}>체험 시작 →</button>
      ) : (
        <button className="btn ghost" disabled>체험 시작</button>
      )}
    </div>
  )
}
