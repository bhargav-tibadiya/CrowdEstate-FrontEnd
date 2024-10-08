// Importing hooks
import { useEffect, useState } from 'react'


// Importing Components and Styling
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Market.module.scss'
import { FaCaretRight } from '../../assets/icons'
import { fetchAllProperties } from '../../services/propertyApi'



const Market = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetchAllProperties();
        setData(response.properties);

      } catch (error) {

        console.error('Error fetching All properties: #FE010', error);

      }
    };

    fetchData();

  }, [])

  console.log('data', data)


  return (
    <div className={styles.market_container}>

      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>

      <div className={styles.market_content}>
        <div className={styles.property_container}>

          {
            data.map((item, index) => {
              return (
                <div key={index} className={styles.property}>
                  <div className={styles.image}>
                    <img src={item.image} alt="" />
                  </div>
                  <div className={styles.description}>
                    <div className={styles.info}>
                      <span className={styles.price}>{item.price}</span>
                      <span className={styles.name}>{item.name}, {item.city}</span>
                    </div>
                    <div onClick={() => { }} className={styles.button}>
                      <FaCaretRight />
                    </div>
                  </div>
                </div>
              )
            })
          }

          {/* //! Delete this */}

          <div className={styles.property}>
            <div className={styles.image}>
              <img src="https://res.cloudinary.com/bhargavspace/image/upload/v1728225132/CrowdEstate/ta9shqclrvj0zw59zrx4.jpg" alt="" />
            </div>
            <div className={styles.description}>
              <div className={styles.info}>
                <span className={styles.price}>12,000,000</span>
                <span className={styles.name}>Greenfield Colony, Bengaluru</span>
              </div>
              <div onClick={() => { }} className={styles.button}>
                <FaCaretRight />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Market