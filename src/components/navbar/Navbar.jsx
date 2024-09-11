import { NavLink } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { routes } from "../../config/routes";
// import routes from "../../config/routes"

import styles from './Navbar.module.scss';
const navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.website_logo}>
        <span className={styles.circle_logo}>C</span>
        <span>CrowdEstate</span>
      </div>
      <div className={styles.website_section}>
        <nav>
          <ul>
            <li><NavLink to={routes.home}>Home</NavLink></li>
            <li><NavLink to={routes.app}>APP</NavLink></li>
            <li><NavLink to={routes.about}>About us</NavLink></li>
            <li><NavLink to={routes.contact}>Contact us</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className={styles.website_other_icon}>
        <div className={styles.search_icon}><FaSearch /></div>
        <button>Sign up</button>
      </div>
    </div>
  )
}

export default navbar