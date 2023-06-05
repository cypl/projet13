import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, UserProvider } from './utils/Context'
import SiteTitle from './components/SiteTitle'
import Router from './router/Router'
// import store from './store/store'
// import { Provider } from 'react-redux'

function App() {
  return (
    //<Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <SiteTitle />
              <Router/>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    //</Provider>
  )
}

export default App
