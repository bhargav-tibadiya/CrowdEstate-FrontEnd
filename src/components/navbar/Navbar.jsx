import {  NavLink, useNavigate } from "react-router-dom"
import { FaSearch ,FaAngleDown} from "react-icons/fa";
import styles from "./Navbar.module.scss"
import { routes } from "../../config/routes";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.website_logo}>
        <span className={styles.circle_logo}>C</span>
        <span>CrowdEstate</span>
      </div>
      <div className={styles.website_section}>
        
          <ul>
            <li><NavLink to={routes.home}>Home</NavLink></li>
            <li><NavLink to={routes.app}>App</NavLink><FaAngleDown/></li>
            <li><NavLink to={routes.about}>About us</NavLink></li>
            <li><NavLink to={routes.contact}>Contact us</NavLink></li>
          </ul> 
      
      </div>
      <div className={styles.website_other_icon}>
        <div className={styles.search_icon}><FaSearch/></div>
        <button onClick={()=>navigate(routes.login)}>Sign up</button>
      </div>
    </nav>
  )
}

export default Navbar