const icons = {
  home: <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  report: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
}

const menus = [
  { id: 'home', label: '홈', icon: 'home', go: 'main' },
  { id: 'explore', label: '직무 탐색', icon: 'search' },
  { id: 'sim', label: '직무 체험', icon: 'work', go: 'sim' },
  { id: 'report', label: '리포트', icon: 'report' },
  { id: 'profile', label: '프로필', icon: 'user' },
]

export function Logo({ size = 36 }) {
  return (
    <div className="logo" style={{ width: size, height: size }} aria-label="JOB:IN">
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55}>
        <path d="M13 3v11a5 5 0 0 1-8 4" fill="none" stroke="#C8F59A" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="13" cy="19.5" r="0" />
      </svg>
    </div>
  )
}

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <Logo />
      <nav className="side-nav">
        {menus.map((m) => {
          const active = m.go === page
          return (
            <button
              key={m.id}
              className={`side-btn ${active ? 'active' : ''}`}
              onClick={() => m.go && onNavigate(m.go)}
              aria-label={m.label}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {icons[m.icon]}
              </svg>
              <span className="tooltip">{m.label}{m.go ? '' : ' (준비 중)'}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
