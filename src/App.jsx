import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Wrapper from './layout/wrapper/wrapper'
import { routes } from './config/routes'
import Home from './pages/home/Home'

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
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
