import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './utils/Context'
import SiteTitle from './components/SiteTitle'
import Router from './components/Router'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SiteTitle />
          <Router/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
