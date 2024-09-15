import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import LoginImage from '/asset/images/property/img1.jpg';
import TextureImage from '/asset/images/bg_texture.png';
import Google from "../../images/google.png"

import styles from "./Login.module.scss"
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {

  const [isPasswordVisible, setisPasswordVisible] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login Success: ', tokenResponse);
      // Now use the token to fetch user info if needed
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
        .then(response => response.json())
        .then(data => console.log('User Info:', data))
        .catch(error => console.error('Error fetching user info:', error));
    },
    onError: (errorResponse) => {
      console.log('Login Failed:', errorResponse);
    },
    scope: 'openid profile email',
    flow: 'implicit',
  });

  return (

    <div className={styles.login_container}>

      <div className={styles.login_input_form}>

        <div className={styles.head_details}>
          <h1>Welcome Back</h1>
          <p>Discover your Future</p>
        </div>

        <div className={styles.form_container}>
          <form>

            <div className={styles.input_fields}>
              <label htmlFor="Email_address">Email Address</label>
              <input type="text" name="Email_address" placeholder="Enter email address" />
            </div>

            <div className={styles.input_fields}>
              <label htmlFor="Password">Password</label>
              <div className={styles.input_fields_input}>
                <input type={isPasswordVisible ? "text" : "password"} name="Password" placeholder="Enter Password" />
                <span onClick={() => setisPasswordVisible((prev) => (!prev))}>
                  {
                    isPasswordVisible ? <IoEyeOutline size={18} color="grey" /> : <IoEyeOffOutline size={18} color="grey" />
                  }
                </span>
              </div>
              <p className={styles.forgot_password}>Forgot Password</p>
            </div>

          </form>
        </div>

        <div className={styles.button_login}>
          <button>Sign in</button><br />
          <button className={styles.google_login_btn} onClick={() => loginWithGoogle()}>
            <div className={styles.google_img}>
              <img src={Google} alt="loading" />
            </div>
            <span>Sign in with Google</span>
          </button>
        </div>

      </div>

      <div className={styles.login_image}>
        <img src={TextureImage} alt="loading...." className={styles.after_image} />
        <img src={LoginImage} alt="loading...." className={styles.before_image} />
      </div>

    </div>
  )
}

export default Login