import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import MainPage from './pages/MainPage.jsx'
import SimulationPage from './pages/SimulationPage.jsx'

export default function App() {
  const [page, setPage] = useState('main')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <div className="app">
      <Sidebar page={page} onNavigate={setPage} />
      <div className="app-content" key={page}>
        {page === 'main' ? (
          <MainPage onStart={() => setPage('sim')} />
        ) : (
          <SimulationPage onExit={() => setPage('main')} />
        )}
      </div>
    </div>
  )
}
