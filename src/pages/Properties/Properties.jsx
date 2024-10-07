// Importing hooks
import { useEffect, useState } from 'react'


// Importing Components and Styling
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Properties.module.scss'


// Other Utility
import { FaCheckCircle, MdError } from '../../assets/icons'
import Cookies from 'js-cookie';
import { showAllPropertiesOfUser } from '../../services/propertyApi';


const Properties = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const userId = Cookies.get('user');
        const response = await showAllPropertiesOfUser({ userId });
        setData(response.properties);

      } catch (error) {

        console.error('Error fetching properties:', error);

      }
    };

    fetchData();

  }, [])

  return (
    <div className={styles.properties_container}>

      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>

      <div className={styles.properties_content}>

        <div className={styles.properties_list}>
          <div className={styles.list_head}>
            <span className={styles.left}>Properties</span>
            <span className={styles.right}>Information</span>
          </div>

          <div className={styles.list_items}>
            {
              data.map((item, index) => {
                return (
                  <div key={index} className={styles.list_item}>
                    <div className={styles.left}>
                      <div className={styles.image}>
                        <img src={item.image} alt="" />
                      </div>
                      <div className={styles.info}>
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.desc}>{item.description}</div>
                        <div className={styles.date}>{item.listedAt}</div>
                        <div className={styles.status}>
                          {
                            (item.propertyStatus == "Available") ?
                              <FaCheckCircle />
                              :
                              <MdError />
                          }
                          <span>{item.propertyStatus}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.parta}>
                        <div className={styles.info_item}>
                          <div className={styles.que}>City</div>
                          <div className={styles.ans}>{item.location.city}</div>
                        </div>
                        <div className={styles.info_item}>
                          <div className={styles.que}>State</div>
                          <div className={styles.ans}>{item.location.state}</div>
                        </div>
                        <div className={styles.info_item}>
                          <div className={styles.que}>Country</div>
                          <div className={styles.ans}>{item.location.country}</div>
                        </div>
                        <div className={styles.info_item}>
                          <div className={styles.que}>Size</div>
                          <div className={styles.ans}>{item.size}</div>
                        </div>
                      </div>
                      <div className={styles.partb}>
                        <div className={styles.info_item}>
                          <div className={styles.que}>BedRoom</div>
                          <div className={styles.ans}>{item.bedrooms}</div>
                        </div>
                        <div className={styles.info_item}>
                          <div className={styles.que}>Bathroom</div>
                          <div className={styles.ans}>{item.bathrooms}</div>
                        </div>
                        <div className={styles.info_item}>
                          <div className={styles.que}>Year</div>
                          <div className={styles.ans}>{item.yearBuilt}</div>
                        </div>
                        <div className={styles.info_item}>
                          <div className={styles.que}>Category</div>
                          <div className={styles.ans}>{item.category}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>

        </div>

      </div >
    </div >
  )
}

export default Properties