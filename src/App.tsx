import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Sidebar } from './components/Sidebar/Sidebar'
import './styles/index.css'
import './styles/App.css'
import { Card } from './components/Card'

function App() {
  

  return (
    <>
      <Header />
      <main className="main">
        <div className="content">
          <h2 className="content-title">Welcome to My CRM</h2>
          <p className="content-description">This is a simple CRM application built with React.</p>
          <div className="content-body">
            <div className="content-main">
              <p className="content-text">Here you can manage your customers, view reports, and configure settings.</p>
              <div>
                <Card />
              </div>
            </div>
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
