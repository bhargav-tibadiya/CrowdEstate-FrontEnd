import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const LSWrapper = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {

    // Get the JWT token from cookies
    const token = Cookies.get('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if the token has expired
        if (decoded.exp * 1000 < Date.now()) {

          // Token expired
          setIsAuthenticated(false);

          // Remove the expired token
          Cookies.remove('token');
          console.log("Invalid Token LS");

        } else if (!decoded) {

          console.log("Token not found LS");

        } else {

          setIsAuthenticated(true);
          console.log("Token Verified LS");
          navigate('/');

        }
      } catch (error) {

        setIsAuthenticated(false);
        Cookies.remove('token');
        console.log(error);

      }
    } else {

      setIsAuthenticated(false);
      console.log("Token not found LS");

    }
  }, [navigate]);

  return !isAuthenticated && <Outlet/> ;
};

export default LSWrapper;