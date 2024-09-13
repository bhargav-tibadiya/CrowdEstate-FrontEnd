import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"

const Wrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Wrapper