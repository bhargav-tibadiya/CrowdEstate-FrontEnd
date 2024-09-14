import { useNavigate } from "react-router-dom"
import { FaSearch, FaAngleDown } from "react-icons/fa";
import styles from "./Navbar.module.scss"
import { routes } from "../../config/routes";
import { useState } from "react";

const Navbar = () => {

  const [selectedMenu, SetSelectedMenu] = useState(0)

  console.log('selectedMenu', selectedMenu)

  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>

      <div className={styles.website_logo}>
        <span className={styles.circle_logo}>C</span>
        <span>CrowdEstate</span>
      </div>

      <div className={styles.website_section}>
        <div className={`${styles.nav_items} ${selectedMenu == 0 ? styles.active : ""}`} onClick={() => { navigate(routes.home), SetSelectedMenu(0) }}>Home</div>
        <div className={`${styles.nav_items} ${selectedMenu == 1 ? styles.active : ""}`} onClick={() => { navigate(routes.app), SetSelectedMenu(1) }}> <span>App </span><FaAngleDown /></div>
        <div className={`${styles.nav_items} ${selectedMenu == 2 ? styles.active : ""}`} onClick={() => { navigate(routes.about), SetSelectedMenu(2) }}>About us</div>
        <div className={`${styles.nav_items} ${selectedMenu == 3 ? styles.active : ""}`} onClick={() => { navigate(routes.contact), SetSelectedMenu(3) }}>Contact us</div>
      </div>

      <div className={styles.website_other_icon}>
        <div className={styles.search_icon}><FaSearch /></div>
        <button onClick={() => navigate(routes.signup)}>Sign up</button>
      </div>
    </div>
  )
}

export default Navbar;