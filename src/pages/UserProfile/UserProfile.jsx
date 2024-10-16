import Sidebar from "../../components/sidebar/Sidebar"
import styles from "./UserProfile.module.scss"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { getAllUser } from "../../services/authApi";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        // Get the token from cookies
        const token = Cookies.get('token');

        if (token) {
            try {
                // Decode the token to get user data
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        const fetchData = async () => {
            try {

                const userResponse = await getAllUser()
                setUserData(userResponse.user)


            } catch (error) {

                console.error('Error fetching All properties: #FE010', error);

            }
        };

        fetchData();
    }, []);

    const data = userData.filter((ele) => ele._id === user.id)

    return (
        <div className={styles.profile_container}>
            <div className={styles.sidebar_content}>
                <Sidebar />
            </div>
            {
                data.map((ele, index) => {
                    return (
                        <div className={styles.profile_content} key={index}>
                            <div className={styles.user_details}>
                                <div className={styles.image}><img src={ele?.profileImage} width={100} height={100} alt={ele.username} /></div>
                                <div className={styles.user_name_others}>
                                    <div className={styles.name}>{ele.firstName} {ele.lastName}</div>
                                    <div className={styles.address}>Surat, Gujarat, India</div>
                                </div>
                            </div>
                            <div className={styles.user_personal_information}>
                                <div className={styles.main_title}>Personal Information</div>
                                <div className={styles.user_data}>
                                    <div className={styles.data}>
                                        <div className={styles.que}>First Name</div>
                                        <div className={styles.ans}>{ele.firstName}</div>
                                    </div>
                                    <div className={styles.data}>
                                        <div className={styles.que}>Last Name</div>
                                        <div className={styles.ans}>{ele.lastName}</div>
                                    </div>
                                </div>
                                <div className={styles.user_data}>
                                    <div className={styles.data}>
                                        <div className={styles.que}>Username</div>
                                        <div className={styles.ans}>{ele.username}</div>
                                    </div>
                                    <div className={styles.data}>
                                        <div className={styles.que}>Email Address</div>
                                        <div className={styles.ans}>{ele.email}</div>
                                    </div>
                                    <div className={styles.data}>
                                        <div className={styles.que}>Phone Number</div>
                                        <div className={styles.ans}>+91 {ele.phone}</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                })
            }
        </div>
    )
}

export default UserProfile
