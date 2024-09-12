<<<<<<< HEAD
import {  NavLink, useNavigate } from "react-router-dom"
import { FaSearch ,FaAngleDown} from "react-icons/fa";
import styles from "./Navbar.module.scss"
=======
import { NavLink } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
>>>>>>> 5957211cc2298b85af0f323c58c0234511f43124
import { routes } from "../../config/routes";

<<<<<<< HEAD
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
=======
import styles from './Navbar.module.scss';
const navbar = () => {
  return (
    <div className={styles.navbar}>
>>>>>>> 5957211cc2298b85af0f323c58c0234511f43124
      <div className={styles.website_logo}>
        <span className={styles.circle_logo}>C</span>
        <span>CrowdEstate</span>
      </div>
      <div className={styles.website_section}>
<<<<<<< HEAD
        
=======
        <nav>
>>>>>>> 5957211cc2298b85af0f323c58c0234511f43124
          <ul>
            <li><NavLink to={routes.home}>Home</NavLink></li>
            <li><NavLink to={routes.app}>App</NavLink><FaAngleDown/></li>
            <li><NavLink to={routes.about}>About us</NavLink></li>
            <li><NavLink to={routes.contact}>Contact us</NavLink></li>
          </ul> 
      
      </div>
      <div className={styles.website_other_icon}>
<<<<<<< HEAD
        <div className={styles.search_icon}><FaSearch/></div>
        <button onClick={()=>navigate(routes.login)}>Sign up</button>
=======
        <div className={styles.search_icon}><FaSearch /></div>
        <button>Sign up</button>
>>>>>>> 5957211cc2298b85af0f323c58c0234511f43124
      </div>
    </nav>
  )
}

export default Navbar