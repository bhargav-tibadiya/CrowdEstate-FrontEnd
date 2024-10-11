// Importing hooks
import { useEffect, useState } from 'react'


// Importing Components and Styling
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Market.module.scss'
import { FaCaretRight } from '../../assets/icons'
import { fetchAllProperties } from '../../services/propertyApi'
import Filter from '../../components/Filter/Filter'



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

  const [filteredProperties, setFilteredProperties] = useState(data);

  const handleFilterChange = (filters) => {
    const { location, estateType, priceRange, beds, sqftRange, extraFeatures } = filters;

    // Handle empty or undefined priceRange and sqftRange
    const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];
    const [minSqft, maxSqft] = sqftRange ? sqftRange.split('-').map(Number) : [0, Infinity];

    const filtered = data.filter((property) => {
      // Check if the property has all selected extra features
      const hasFeatures = extraFeatures.every((feature) =>
        property.features.includes(feature)
      );

      return (
        (!location || property.location.toLowerCase().includes(location.toLowerCase())) &&
        (!estateType || property.estateType === estateType) &&
        (!priceRange || (property.price >= (minPrice || 0) && property.price <= (maxPrice || Infinity))) &&
        (!beds || property.beds >= beds) &&
        (!sqftRange || (property.sqft >= (minSqft || 0) && property.sqft <= (maxSqft || Infinity))) &&
        (!extraFeatures.length || hasFeatures) // Only apply feature filter if features are selected
      );
    });

    setFilteredProperties(filtered);
  };

  console.log(filteredProperties)

  console.log('data', data)


  return (
    <div className={styles.market_container}>

      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>

      <div className={styles.market_content}>

        <div className={styles.filter_container}>
          <Filter onFilterChange={handleFilterChange} />
        </div>

        <div className={styles.property_container}>

          {
            filteredProperties.map((item, index) => {
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