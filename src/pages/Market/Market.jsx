// Importing hooks
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


// Importing Components and Styling
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './Market.module.scss'
import { FaCaretRight } from '../../assets/icons'
import { fetchAllProperties } from '../../services/propertyApi'
import Filter from '../../components/Filter/Filter'


const Market = () => {

  const navigate = useNavigate()

  const [data, setData] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetchAllProperties();
        setData(response.properties);
        setFilteredProperties(response.properties)

      } catch (error) {

        console.error('Error fetching All properties: #FE010', error);

      }
    };

    fetchData();

  }, [])




  const handleFilterChange = (filters) => {
    const { location, tags, priceRange, beds, sqft, category } = filters;
    console.log(tags)

    // Handle empty or undefined priceRange and sqftRange
    const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];
    const [minSqft, maxSqft] = sqft ? sqft.split('-').map(Number) : [0, Infinity];

    const filtered = data.filter((property) => {

      const hasTags = tags.every((tag) => property.tags.includes(tag));
      console.log(hasTags)
      const propertyLocation = `${property.location.city} ${property.location.state} ${property.location.country}`.toLowerCase();
      const propertyPrice = property.price;
      const propertySqft = property.size;
      const propertyBeds = property.bedrooms;
      const propertyCategory = property.category;



      return (
        (!location || propertyLocation.includes(location.toLowerCase())) &&
        (!tags.length || hasTags) &&
        (!priceRange || (propertyPrice >= (minPrice || 0) && propertyPrice <= (maxPrice || Infinity) && propertyPrice > 3000)) &&
        (!beds || (beds == 5 ? propertyBeds >= 5 : propertyBeds == beds)) &&
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
        {
          filteredProperties.length === 0 && (<div className={styles.not_property}>No Properties found</div>)
        }

        <div className={styles.property_container}>
          {
            filteredProperties.length > 0 && (filteredProperties.map((item, index) => {
              return (
                <div key={index} className={styles.property}>
                  <div className={styles.image}>
                    <img src={item?.image} alt="" />
                  </div>
                  <div className={styles.description}>
                    <div className={styles.info}>
                      <span className={styles.price}>{item?.price}</span>
                      <span className={styles.name}>{item?.name}, {item?.location?.city}</span>
                    </div>
                    <div onClick={() => { navigate(`/property/${item?._id}`) }} className={styles.button}>
                      <FaCaretRight />
                    </div>
                  </div>
                </div>
              )
            }))
          }
        </div>
      </div>
    </div>
  )
}


export default Market