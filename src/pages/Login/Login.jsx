import { useState } from "react";
import styles from "./Login.module.scss"


// --> Importing Packges <--
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { useFormik } from "formik"
import { useGoogleLogin } from "@react-oauth/google";

// --> Importing Services <--
import { loginAPI } from "../../services/authApi";

// --> Importing Assets <--
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import LoginImage from '/asset/images/property/img1.jpg';
import TextureImage from '/asset/images/bg_texture.png';
import Google from "../../images/google.png"
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .trim()
    .required('Password is required'),
})


const Login = () => {

  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      handleLogin(values.email, values.password);
    }
  });

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

  const handleLogin = async (email, password) => {
    try {

      const payload = {
        email: email,
        password: password
      }
      const result = await loginAPI(payload)
      console.log("Login API Result", result);

      if (result.success === true) {

        toast.success('Login Successful')
        navigate('/home')

      } else {
        toast.error(result.message)
      }

    } catch (error) {

      console.log('Error While Login\n Check Login.jsx #FE002', error);
      console.log('Reason :', error?.response?.data?.message)
      throw error

    }
  }

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } = formik

  return (

    <div className={styles.login_container}>

      <div className={styles.login_input_form}>

        <div className={styles.head_details}>
          <h1>Welcome Back</h1>
          <p>Discover your Future</p>
        </div>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="Email_address">Email Address</label>
                <input
                  type="text"
                  placeholder="Enter email address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className={styles.formik_error}>
                {
                  (touched.email && errors.email) ? <><span><MdError /> </span><span> {errors.email}</span></> : ""
                }
              </div>
            </div>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="Password">Password</label>
                <div className={styles.input_fields_input}>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span onClick={() => setisPasswordVisible((prev) => (!prev))}>
                    {
                      isPasswordVisible ? <IoEyeOutline size={18} color="grey" /> : <IoEyeOffOutline size={18} color="grey" />
                    }
                  </span>
                </div>
              </div>
              <div className={styles.formik_error}>

                {
                  (touched.password && errors.password) ? <><span><MdError /> </span><span> {errors.password}</span></> : ""
                }
              </div>
              <p className={styles.forgot_password}>Forgot Password</p>
            </div>

          </form>
        </div>

        <div className={styles.button_login}>
          <button type='button' onClick={() => formik.handleSubmit()}>Sign in</button><br />
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