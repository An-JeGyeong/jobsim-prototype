import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import MainPage from './pages/MainPage.jsx'
import SimulationPage from './pages/SimulationPage.jsx'
import ReportPage from './pages/ReportPage.jsx'

export default function App() {
  const [page, setPage] = useState('main')
  const [result, setResult] = useState(null) // 체험 완료 후 리포트 데이터

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <div className="app">
      <Sidebar page={page} onNavigate={setPage} />
      <div className="app-content" key={page}>
        {page === 'main' && <MainPage onStart={() => setPage('sim')} />}
        {page === 'sim' && (
          <SimulationPage
            onExit={() => setPage('main')}
            onFinish={setResult}
            onOpenSummary={() => setPage('report')}
          />
        )}
        {page === 'report' && (
          <ReportPage result={result} onHome={() => setPage('main')} onStart={() => setPage('sim')} />
        )}
      </div>
    </div>
  )
}
