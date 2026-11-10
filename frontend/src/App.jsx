
import { useState } from 'react'
import './App.css'
import Projects from './pages/Projects'

function App() {
  const [activePage, setActivePage] = useState('Overview')

  return (
    <div className="app">

      <aside className="sidebar">
        <h2 className="logo">RelayIQ</h2>

        <nav>
          <p className="nav-label">WORKSPACE</p>

          {['Overview', 'Projects', 'Documents', 'Tasks', 'Decisions', 'AI Assistant'].map((item) => (
            <a
              key={item}
              href="#"
              className={activePage === item ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                setActivePage(item)
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <p>Workspace / {activePage}</p>
        </header>

        {activePage === 'Overview' && (
          <section className="page-content">
            <div className="page-heading">
              <h1>Overview</h1>
              <p>Manage your projects and team activities.</p>
            </div>

            <div className="overview-stats">
              <div>
                <span>Total Projects</span>
                <h2>0</h2>
              </div>

              <div>
                <span>Pending Tasks</span>
                <h2>0</h2>
              </div>

              <div>
                <span>Documents</span>
                <h2>0</h2>
              </div>
            </div>

            <div className="recent-projects">
              <h3>Recent Projects</h3>
              <p>No projects created yet.</p>
            </div>
          </section>
        )}

        {activePage === 'Projects' && <Projects />}

      </main>
    </div>
  )
}

export default App
