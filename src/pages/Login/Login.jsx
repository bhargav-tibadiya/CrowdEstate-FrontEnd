import { FaEye } from "react-icons/fa"
import styles from "./Login.module.scss"
import image1 from "../../images/login_image.png";
import Google from "../../images/google.png"

const Login = () => {
    return (
        <div className={styles.login_container}>
            <div className={styles.login_input_form}>
                <div className={styles.head_details}>
                    <h1>Welcome Back</h1>
                    <p>Discover your Future,</p>
                </div>
                <div className={styles.form_container}>
                    <form>
                        <div className={styles.input_fields}>
                            <label htmlFor="Email_address">Email Address</label><br />
                            <input type="text" name="Email_address" placeholder="Enter email address" />
                        </div>
                        <div className={styles.input_fields}>
                            <label htmlFor="Password">Password</label><br />
                            <input type="password" name="Password" placeholder="Enter Password" />
                            <span><FaEye size={18} color="grey" /></span>
                            <p className={styles.forgot_password}>Forgot Password</p>
                        </div>
                    </form>
                </div>
                <div className={styles.button_login}>
                    <button>Sign in</button><br />
                    <button><img src={Google} alt="loading" />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </div>
            <div className={styles.login_image}>
                <img src={image1} alt="loading...." className={styles.after_image} />
                <img src={image1} alt="loading...." className={styles.before_image} />
            </div>
        </div>
    )
}

export default Login