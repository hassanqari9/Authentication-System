import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Logout from './components/Logout'

function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const [log, setLog] = useState(false)
  return <>
      {!token ? <>
         { log ? <Login setLog={setLog} setToken={setToken}/> : <Register setLog={setLog} /> }
      </> : <>
        <Profile />
        <Logout setLog={setLog} setToken={setToken} />
      </>}
  </>
}

export default App