import { useState } from "react";
import styles from "./Signup.module.scss"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import SignupImage from '/asset/images/property/img1.jpg';
import TextureImage from '/asset/images/bg_texture.png';

const Signup = () => {
    const [isPasswordVisible, setisPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setisConfirmPasswordVisible] = useState(false);

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
                                <label htmlFor="First_name">First Name <span className={styles.important}>*</span></label>
                                <input type="text" name="First_name" placeholder="Enter first name" />
                            </div>
                            <div className={styles.input_fields}>
                                <label htmlFor="Last_name">Last Name <span className={styles.important}>*</span></label>
                                <input type="text" name="Last_name" placeholder="Enter last name" />
                            </div>
                        </div>
                        <div className={styles.input_fields}>
                            <label htmlFor="Email_address">Email Address <span className={styles.important}>*</span></label>
                            <input type="text" name="Email_address" placeholder="Enter email address" />
                        </div>


                        <div className={`${styles.phone_number} ${styles.input_fields}`}>
                            <label htmlFor="Phone_Number">Phone Number <span className={styles.important}>*</span></label>
                            <div className={styles.select_phone_number}>
                                <select name="Phone_Number" id="Phone_Number">
                                    <option value="">+91</option>
                                    <option value="">+92</option>
                                    <option value="">+93</option>
                                    <option value="">+94</option>
                                </select>
                                <input type="text" name="Phone_Number" placeholder="12345 67890" />
                            </div>



                        </div>

                        <div className={styles.password_section}>
                            <div className={styles.input_fields}>
                                <label htmlFor="Password">Create Password <span className={styles.important}>*</span> </label>
                                <div>
                                    <input type={isPasswordVisible ? "text" : "password"} name="Password" placeholder="Enter Password" />
                                    <span className={styles.password_Visibility} onClick={() => setisPasswordVisible((prev) => (!prev))}>
                                        {
                                            isPasswordVisible ? <IoEyeOutline size={18} color="grey" /> : <IoEyeOffOutline size={18} color="grey" />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className={styles.input_fields}>
                                <label htmlFor="Password">Confirm Password <span className={styles.important}>*</span></label>
                                <div>
                                    <input type={isConfirmPasswordVisible ? "text" : "password"} name="Password" placeholder="Enter Password" />
                                    <span className={styles.password_Visibility} onClick={() => setisConfirmPasswordVisible((prev) => (!prev))}>
                                        {
                                            isConfirmPasswordVisible ? <IoEyeOutline size={18} color="grey" /> : <IoEyeOffOutline size={18} color="grey" />
                                        }
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div className={styles.input_fields}>
                            <label htmlFor="Address">Address <span className={styles.important}>*</span></label>
                            <input type="text" name="Address" placeholder="EX. Block no., Street no., Society name, area" />
                        </div>

                        <div className={styles.state_country_name}>
                            <div className={styles.input_fields}>
                                <label htmlFor="State">State <span className={styles.important}>*</span></label>
                                <select name="State" id="State">
                                    <option value="">Gujarat</option>
                                    <option value="">Rajasthan</option>
                                    <option value="">Maharastra</option>
                                    <option value="">Delhi</option>
                                </select>
                            </div>
                            <div className={styles.input_fields}>
                                <label htmlFor="Country">Country <span className={styles.important}>*</span></label>
                                <select name="Country" id="Country">
                                    <option value="">India</option>
                                    <option value="">Canada</option>
                                    <option value="">United Kingdom</option>
                                    <option value="">Australia</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={styles.button_signup}>
                    <button>Create Account</button><br />
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