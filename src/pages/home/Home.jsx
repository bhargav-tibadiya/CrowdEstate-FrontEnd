import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Home.module.scss'

const Home = () => {

  const navigate = useNavigate();

  // Temporarily Redirecting to add property page cuase there is no home page right now
  useEffect(() => {

    navigate('/addproperty')
  }, [])


  return (
    <div className={styles.home_container}>

      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>

      <div className={styles.home_content}>
        Home Page
      </div >
    </div >
  )
}

export default Home