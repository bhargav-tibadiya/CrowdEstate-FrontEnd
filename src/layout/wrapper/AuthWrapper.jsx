import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const AuthWrapper = () => {
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
          console.log('Cookies Removed')
          Cookies.remove('token');
          console.log("Invalid Token ");
          navigate('/login')

        } else if (!decoded) {

          console.log("Token not found");
          navigate('/login')

        } else {

          setIsAuthenticated(true);
          console.log("Token Verified");

          if (location.pathname === '/login' || location.pathname === '/signup') {
            navigate('/');
          }
        }
      } catch (error) {

        setIsAuthenticated(false);
        Cookies.remove('token');
        console.log('Cookies Removed')
        console.log(error);

      }
    } else {

      setIsAuthenticated(false);
      console.log("Token not found");
      navigate('/login')

    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default AuthWrapper;