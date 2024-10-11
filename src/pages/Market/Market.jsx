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
  const [filteredProperties, setFilteredProperties] = useState([]);

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


 

  const handleFilterChange = (filters) => {
    const { location, priceRange, beds, sqft, category } = filters;

    // Handle empty or undefined priceRange and sqftRange
    const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];
    const [minSqft, maxSqft] = sqft ? sqft.split('-').map(Number) : [0, Infinity];

    const filtered = data.filter((property) => {

      const propertyLocation = `${property.location.city} ${property.location.state} ${property.location.country}`.toLowerCase();
      const propertyPrice = property.price;
      const propertySqft = property.size;
      const propertyBeds = property.bedrooms;
      const propertyCategory = property.category;

      return (
        (!location || propertyLocation.includes(location.toLowerCase())) &&
        (!priceRange || (propertyPrice >= (minPrice || 0) && propertyPrice <= (maxPrice || Infinity))) &&
        (!beds || propertyBeds == beds) &&
        (!sqft || (propertySqft >= (minSqft || 0) && propertySqft <= (maxSqft || Infinity))) &&
        (!category || propertyCategory == category)
      );
    });

    setFilteredProperties(filtered)
    // console.log(filteredProperties)
  };

  console.log('data', filteredProperties)


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
            
            (filteredProperties.length > 0 ? filteredProperties:data).map((item, index) => {
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