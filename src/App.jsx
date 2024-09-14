import { Route, Routes } from 'react-router-dom'
import { routes } from './config/routes'

import './App.scss'

import Wrapper from './layout/wrapper/wrapper'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import OTP from './components/otp/OTP'
import Signup from './pages/Signup/Signup'

function App() {
  return (
    <div className='app_container'>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path={routes.default} element={<Home />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.app} element={<Home />} />
          <Route path={routes.about} element={<Home />} />
          <Route path={routes.contact} element={<Home />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.test} element={<OTP />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
