import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.home_container}>

      <div className={styles.sidebar_content}>
        <Sidebar/>
      </div>

      <div className={styles.home_content}>
        home_content
      </div>
    </div>
  )
}

export default Home