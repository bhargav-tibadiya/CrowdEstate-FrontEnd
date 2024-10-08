// --> Importing Stylesheet <--
import styles from './Sidebar.module.scss'


// --> Importing Assets <--
import { TbLayoutDashboard, LiaUser, PiBuildings, IoSettingsOutline, HiOutlineBuildingOffice2, BsShop } from '../../assets/icons'

import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={`${styles.sidebar_container} sidebar_container_global`}>

      <div className={styles.pages_section}>

        <div onClick={() => navigate('/dashboard')} className={`${styles.sidebar_item} ${(location.pathname == '/dashboard') ? styles.active : null}`}>
          <TbLayoutDashboard />
          <span>Dashboard</span>
        </div>

        <div onClick={() => navigate('/profile')} className={`${styles.sidebar_item} ${(location.pathname == '/profile') ? styles.active : null}`}>
          <LiaUser />
          <span>My Profile</span>
        </div>

        <div onClick={() => navigate('/test')} className={`${styles.sidebar_item} ${(location.pathname == '/test') ? styles.active : null}`}>
          <LiaUser />
          <span>Test</span>
        </div>

      </div>

      <div className={styles.devider}></div>

      <div className={styles.market_section}>
        <div onClick={() => navigate('/marketplace')} className={`${styles.sidebar_item} ${(location.pathname == '/marketplace') ? styles.active : null}`}>
          <BsShop />
          <span>MarketPlace</span>
        </div>
      </div>

      <div className={styles.devider}></div>

      <div className={styles.property_section}>

        <div onClick={() => navigate('/addproperty')} className={`${styles.sidebar_item} ${(location.pathname == '/addproperty') ? styles.active : null}`}>
          <PiBuildings />
          <span>Add Property</span>
        </div>

        <div onClick={() => navigate('/properties')} className={`${styles.sidebar_item} ${(location.pathname == '/properties') ? styles.active : null}`}>
          <HiOutlineBuildingOffice2 />
          <span>Your Properties</span>
        </div>

      </div>

      <div className={styles.devider}></div>

      <div className={styles.user_controls}>

        <div onClick={() => navigate('/settings')} className={`${styles.sidebar_item} ${(location.pathname == '/settings')}`}>
          <IoSettingsOutline />
          <span>Settings</span>
        </div>

      </div>


    </div>
  )
}

export default Sidebar