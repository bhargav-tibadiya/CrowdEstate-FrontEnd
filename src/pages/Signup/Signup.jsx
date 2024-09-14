import { useState } from "react";
import styles from "./Signup.module.scss"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import SignupImage from '/asset/images/property/img1.jpg';
import TextureImage from '/asset/images/bg_texture.png';

const Signup = () => {
    const [isPasswordVisible, setisPasswordVisible] = useState(false);;

    return (

        <div className={styles.signup_container}>

            <div className={styles.signup_input_form}>

                <div className={styles.head_details}>
                    <h1>Join to Luxury Homes and Unmatched Real Estate Expertise</h1>
                    <p>Find your place in the world.</p>
                </div>

                <div className={styles.form_container}>
                    <form>

                        <div className={styles.username}>
                            <div className={styles.input_fields}>
                                <label htmlFor="First_name">First Name</label>
                                <input type="text" name="First_name" placeholder="Enter first name" />
                            </div>
                            <div className={styles.input_fields}>
                                <label htmlFor="Last_name">Last Name</label>
                                <input type="text" name="Last_name" placeholder="Enter last name" />
                            </div>
                        </div>
                        <div className={styles.input_fields}>
                            <label htmlFor="Email_address">Email Address</label>
                            <input type="text" name="Email_address" placeholder="Enter email address" />
                        </div>


                        <div className={`${styles.phone_number} ${styles.input_fields}`}>
                            <label htmlFor="Phone_Number">Phone Number</label>
                            <div className={styles.select_phone_number}>
                                <select name="Phone_Number" id="Phone_Number">
                                    <option value="">+91</option>
                                    <option value="">+92</option>
                                    <option value="">+93</option>
                                    <option value="">+94</option>
                                </select>
                                <input type="number" name="Phone_Number" placeholder="12345 67890" />
                            </div>



                        </div>

                        <div className={styles.input_fields}>
                            <label htmlFor="Password">Password</label>
                            <div>
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

                <div className={styles.button_signup}>
                    <button>Sign in</button><br />
                    {/* <button className={styles.google_login_btn}>
              <div className={styles.google_img}>
                <img src={Google} alt="loading" />
              </div>
              <span>Sign in with Google</span>
            </button> */}
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