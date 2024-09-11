import {  NavLink } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import "./Navbar.scss"
import { routes } from "../../config/routes";
// import routes from "../../config/routes"

const navbar = () => {
  return (
    <div className="navbar">
      <div className="website-logo">
        <span className="circle-logo">C</span>
        <span>CrowdEstate</span>
      </div>
      <div className="website-section">
        <nav>
          <ul>
            <li><NavLink to={routes.home}>Home</NavLink></li>
            <li><NavLink to={routes.app}>APP</NavLink></li>
            <li><NavLink to={routes.about}>About us</NavLink></li>
            <li><NavLink to={routes.contact}>Contact us</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className="website-other-icon">
        <div className="search-icon"><FaSearch/></div>
        <button>Sign up</button>
      </div>
    </div>
  )
}

export default navbar