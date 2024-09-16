import { useState } from "react";
import styles from "./Signup.module.scss"

// --> Importing Packges <--
import { useFormik } from "formik"
import * as Yup from 'yup';

// --> Importing Assets <--
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import SignupImage from '/asset/images/property/img1.jpg';
import TextureImage from '/asset/images/bg_texture.png';
import OTP from "../../components/otp/OTP";
import { otpAPI, signupAPI } from "../../services/authApi";
import toast from "react-hot-toast";

//  --> Validation Schema for Signup Details <--
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),

  lastName: Yup.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),

  email: Yup.string()
    .trim()
    .email('Invalid email format')
    .required('Email is required'),

  contactNumber: Yup.string()
    .trim()
    .matches(/^[0-9]{10,15}$/, 'Contact number must be between 10-15 digits')
    .required('Contact number is required'),

  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be less than 20 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),

  otp: Yup.string()
    .trim()
    .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits'),
  // .required('OTP is required'),

  address: Yup.string()
    .trim()
    .min(10, 'Address must be at least 10 characters')
    .max(100, 'Address must be less than 100 characters')
    .required('Address is required'),

  state: Yup.string()
    .trim()
    .required('State is required'),

  country: Yup.string()
    .trim()
    .required('Country is required')
});


const Signup = () => {
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
      otp: '',
      address: '',
      state: '',
      country: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('Form values:', values);

      const payload = {
        username: values.firstName+'_'+values.lastName,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        contactNumber: values.contactNumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
        otp: values.otp,
        address: values.address,
        state: values.state,
        country: values.country,
      }

      const result = await toast.promise(signupAPI(payload), {
        loading: 'Registration in Progres',
        success: 'Registration Success',
        error: 'Registration Failed',
      })
      console.log("Signup API Result", result);

    }
  });

  const { values, handleChange, handleBlur, touched, errors, handleSubmit, isValid, dirty, validateForm } = formik

  const verifyDetails = async () => {
    if (isValid && dirty) {

      const payload = {
        email: values.email,
      }

      const result = await toast.promise(otpAPI(payload), {
        loading: 'Sending OTP...',
        success: 'OTP sent successfully!',
        error: 'Failed to send OTP',
      })
      console.log("Login API Result", result);

      setIsOtpModalOpen(true)

    } else {

      formik.setTouched({
        firstName: true,
        lastName: true,
        email: true,
        contactNumber: true,
        password: true,
        confirmPassword: true,
        address: true,
        state: true,
        country: true
      });

      validateForm()

    }
  }

  return (

    <div className={`${styles.signup_container} ${isOtpModalOpen ? styles.scrollDisable : ''}`}>


      <div className={styles.signup_input_form}>

        <div className={styles.head_details}>
          <h1>Join to Luxury Homes and Unmatched Real Estate Expertise</h1>
          <p>Find your place in the world.</p>
        </div>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            {
              isOtpModalOpen && <OTP formik={formik} setIsOtpModalOpen={setIsOtpModalOpen} />
            }

            <div className={styles.username}>

              <div className={styles.input_fields}>
                <div className={styles.fields}>
                  <label htmlFor="First_name">First Name <span className={styles.important}>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={styles.formik_error}>

                  {
                    (touched.firstName && errors.firstName) ? <><span><MdError /> </span><span> {errors.firstName}</span></> : ""
                  }
                </div>
              </div>

              <div className={styles.input_fields}>
                <div className={styles.fields}>
                  <label htmlFor="Last_name">Last Name <span className={styles.important}>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={styles.formik_error}>

                  {
                    (touched.lastName && errors.lastName) ? <><span><MdError /> </span><span> {errors.lastName}</span></> : ""
                  }
                </div>
              </div>

            </div>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="Email_address">Email Address <span className={styles.important}>*</span></label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
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

            <div className={`${styles.phone_number} ${styles.input_fields}`}>

              <div className={styles.fields}>
                <label htmlFor="Phone_Number">Phone Number <span className={styles.important}>*</span></label>
                <div className={styles.select_phone_number}>
                  <select name="Phone_Number" id="Phone_Number">
                    <option value="">+91</option>
                    <option value="">+92</option>
                    <option value="">+93</option>
                    <option value="">+94</option>
                  </select>
                  <input
                    type="text"
                    placeholder="12345 67890"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={styles.formik_error}>

                  {
                    (touched.contactNumber && errors.contactNumber) ? <><span><MdError /> </span><span> {errors.contactNumber}</span></> : ""
                  }
                </div>
              </div>

            </div>

            <div className={styles.password_section}>

              <div className={styles.input_fields}>
                <div className={styles.fields}>
                  <label htmlFor="password">Create Password <span className={styles.important}>*</span> </label>
                  <div className={styles.password_input}>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className={styles.password_Visibility} onClick={() => setisPasswordVisible((prev) => (!prev))}>
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
              </div>

              <div className={styles.input_fields}>
                <div className={styles.fields}>
                  <label htmlFor="confirmPassword">Confirm Password <span className={styles.important}>*</span></label>
                  <div className={styles.password_input}>
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className={styles.password_Visibility} onClick={() => setisConfirmPasswordVisible((prev) => (!prev))}>
                      {
                        isConfirmPasswordVisible ? <IoEyeOutline size={18} color="grey" /> : <IoEyeOffOutline size={18} color="grey" />
                      }
                    </span>
                  </div>
                </div>
                <div className={styles.formik_error}>

                  {
                    (touched.confirmPassword && errors.confirmPassword) ? <><span><MdError /> </span><span> {errors.confirmPassword}</span></> : ""
                  }
                </div>
              </div>

            </div>

            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <label htmlFor="Address">Address <span className={styles.important}>*</span></label>
                <input
                  type="text"
                  placeholder="EX. Block no., Street no., Society name, area"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className={styles.formik_error}>

                {
                  (touched.address && errors.address) ? <><span><MdError /> </span><span> {errors.address}</span></> : ""
                }
              </div>
            </div>

            <div className={styles.state_country_name}>

              <div className={styles.input_fields}>
                <div className={styles.fields}>
                  <label htmlFor="state">State <span className={styles.important}>*</span></label> <br />
                  <select
                    name="state"
                    id="state"
                    className={styles.fullWidth}
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Maharastra">Maharastra</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
                <div className={styles.formik_error}>

                  {
                    (touched.state && errors.state) ? <><span><MdError /> </span><span> {errors.state}</span></> : ""
                  }
                </div>
              </div>

              <div className={styles.input_fields}>
                <div className={styles.fields}>
                  <label htmlFor="country">Country <span className={styles.important}>*</span></label><br />
                  <select
                    name="country"
                    id="country"
                    className={styles.fullWidth}
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                <div className={styles.formik_error}>

                  {
                    (touched.country && errors.country) ? <><span><MdError /> </span><span> {errors.country}</span></> : ""
                  }
                </div>
              </div>

            </div>
          </form>

          <div className={styles.button_signup}>
            <button
              onClick={() => verifyDetails()}
            >
              Verify With OTP
            </button>
            <br />
          </div>

        </div>


      </div>

      <div className={styles.signup_image}>
        <img src={TextureImage} alt="loading...." className={styles.after_image} />
        <img src={SignupImage} alt="loading...." className={styles.before_image} />
      </div>

    </div>
  )
}

export default Signup