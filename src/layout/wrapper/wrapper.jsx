import { Outlet } from "react-router-dom"

const Wrapper = () => {
  return (
    <>
      {/* //TODO Remove this comment once navbar is done */}
      {/* <Navbar /> */}
      <Outlet />
    </>
  )
}

export default Wrapper