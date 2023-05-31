import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, UserProvider } from './utils/Context'
import SiteTitle from './components/SiteTitle'
import Router from './router/Router'

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <SiteTitle />
            <Router/>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
