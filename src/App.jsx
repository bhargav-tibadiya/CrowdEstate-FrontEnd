import { Route, Routes } from 'react-router-dom'
import { routes } from './config/routes'

import './App.scss'

import Wrapper from './layout/wrapper/wrapper'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { Toaster } from 'react-hot-toast'
import AuthWrapper from './layout/wrapper/AuthWrapper'
import LSWrapper from './layout/wrapper/LSWrapper'
import AddProperty from './pages/AddProperty/AddProperty'
import Properties from './pages/Properties/Properties'
import IndivisualProperty from './pages/IndivisualProperty/IndivisualProperty'

import Market from './pages/Market/Market'
import Property from './pages/Property/Property'


function App() {

  return (
    <div className='app_container'>
      <Toaster toastOptions={{
        style: {
          fontWeight: '600',
        }
      }} />
      <Routes>
        <Route element={<Wrapper />}>

          <Route path={routes.test} element={<Home />} />

          {/* It Will Check if Token is available and Valid to Bypass Auth */}
          <Route element={<LSWrapper />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signup} element={<Signup />} />
          </Route>

          <Route element={<AuthWrapper />}>

            {/* Normal Paths */}
            <Route path={routes.default} element={<Home />} />
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.app} element={<Home />} />
            <Route path={routes.about} element={<Home />} />
            <Route path={routes.contact} element={<Home />} />

            {/* Sidebar Menu Paths */}
            <Route path={routes.addproperty} element={<AddProperty />} />
            <Route path={routes.properties} element={<Properties />} />
            <Route path={routes.indivisual} element={<IndivisualProperty />} />

            <Route path={routes.property} element={<Property />} />
            <Route path={routes.market} element={<Market />} />

            {/* Not Found Path */}
            <Route path='*' element={<Home />} />
          </Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App
