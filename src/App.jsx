import './index.css'
import { BrowserRouter } from 'react-router-dom'
import SiteTitle from './components/SiteTitle'
import Router from './router/Router'

function App() {
  return (
    <BrowserRouter>
      <SiteTitle />
      <Router/>
    </BrowserRouter>
  )
}

export default App
