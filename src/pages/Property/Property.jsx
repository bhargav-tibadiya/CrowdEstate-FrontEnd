import Sidebar from "../../components/sidebar/Sidebar"
import styles from "./Property.module.scss"
import image1 from "../../../public/asset/images/property/img1.jpg"
import { FaAngleRight, FaBed, FaFan, FaHeart, FaHouseUser, FaParking, FaShare, FaSignal, FaSink, FaSoap, FaSquarespace, FaWifi } from "react-icons/fa"

import { FaCheckCircle, FaCaretRight, FaCrown, FaDollarSign, FaClock, FaHammer, FaCouch, FaDog, FaSchool, FaSubway, FaLock, FaLeaf, FaMobileAlt, FaWater, FaMountain, FaCity, FaTree, FaSwimmingPool } from '../../assets/icons'

const Property = () => {
  const allAmenities = {
    "Luxury": <FaCrown />,
    "Affordable": <FaDollarSign />,
    "New": <FaClock />,
    "Under Construction": <FaHammer />,
    "Fully Furnished": <FaCouch />,
    "Pet Friendly": <FaDog />,
    "Near School": <FaSchool />,
    "Near Metro": <FaSubway />,
    "Gated Community": <FaLock />,
    "Eco-Friendly": <FaLeaf />,
    "Smart Home": <FaMobileAlt />,
    "Waterfront": <FaWater />,
    "Mountain View": <FaMountain />,
    "City Center": <FaCity />,
    "Garden": <FaTree />,
    "Swimming Pool": <FaSwimmingPool />
  };

  const apiTags = ['Waterfront', 'Garden', 'Near Metro', 'Swimming Pool']

  return (
    <div className={styles.property_container}>

      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>

      <div className={styles.propertices_content}>

        <div className={styles.first_part}>
          <div className={styles.propertices_image}><img src={image1} alt="image" /></div>
          <div className={styles.propertices_details}>
            <div className={styles.propertices_name}>Modern 5 BHK Apartment </div>

            <div className={styles.devider}></div>

            <div className={styles.propertices_price}>
              <div className={styles.que}>Price</div>
              <div className={styles.ans}>INR 4,55,000,000</div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.propertices_price}>
              <div className={styles.que}>Rent</div>
              <div className={styles.ans}>INR 1,25,000<span>/Month</span></div>
            </div>


            <div className={styles.devider}></div>

            <div className={styles.propertices_Owner}>
              <div className={styles.que}>Owner</div>
              <div className={styles.ans}>
                <div className={styles.owner_image}></div>
                <div className={styles.owner_details}>
                  <div className={styles.owner_name}>Priyank Bhalala</div>
                  <div className={styles.owner_investor_type}>Individual Invester</div>
                </div>
                <div className={styles.Right_arrow_button}><FaAngleRight size={17} color="#161D29" /></div>
              </div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.properties_extra_details}>
              <div className={styles.que}>Are You Interested?</div>
              <div className={styles.ans}>Just leave your proposal and Priyank will connect you if they are interested in you offer</div>
            </div>

            <div className={styles.properties_leave_button}>
              <button>Leave A Proposal</button>
            </div>
          </div>
        </div>

        <div className={styles.second_part}>
          <div className={styles.general_information}>
            <div className={styles.main_title}>
              <div className={styles.que}>General Information</div>
            </div>

            <div className={styles.properties_extra_features}>
              <div className={styles.properties_things}>
                <div className={styles.icons}><FaSquarespace size={20} color="#161D29" /></div>
                <div className={styles.que}>Status / Category</div>
              </div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.details_of_properties}>
              <div className={styles.que}>Details Of Apartment</div>
              <div className={styles.ans}>

                <div className={styles.properties_things}>
                  <div className={styles.queOfThings}>Bedroom</div>
                  <div className={styles.ansOfThings}>5</div>
                </div>
                <div className={styles.properties_things}>
                  <div className={styles.queOfThings}>Bathroom</div>
                  <div className={styles.ansOfThings}>3</div>
                </div>
                <div className={styles.properties_things}>
                  <div className={styles.queOfThings}>Sqft</div>
                  <div className={styles.ansOfThings}>1500</div>
                </div>

              </div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.propertise_amenities}>
              <div className={styles.que}>Amenities</div>
              <div className={styles.ans}>

                {
                  Object.keys(allAmenities)
                    .filter(key => apiTags.includes(key))
                    .map((key, index) => (
                      <div className={styles.properties_things} key={index}>
                        <div className={styles.icons}>{allAmenities[key]}</div>
                        <div className={styles.propertise_que}>{key}</div>
                      </div>
                    ))
                }

              </div>
            </div>

          </div>

          <div className={styles.properties_address}>
            <div className={styles.properties_address_que}>Properties Address</div>

            <div className={styles.devider}></div>

            <div className={styles.property_add_box}>
              <div className={styles.properties_address1}>
                <div className={styles.que}>Address Line 1</div>
                <div className={styles.ans}>Block no-2 12, Balaji Society </div>
              </div>
            </div>


            <div className={styles.devider}></div>

            <div className={styles.property_add_box}>
              <div className={styles.properties_address1}>
                <div className={styles.que}>City</div>
                <div className={styles.ans}>Surat</div>
              </div>
              <div className={styles.properties_address1}>
                <div className={styles.que}>State</div>
                <div className={styles.ans}>Gujarat</div>
              </div>
              <div className={styles.properties_address1}>
                <div className={styles.que}>Country</div>
                <div className={styles.ans}>India</div>
              </div>
            </div>

            <div className={styles.properties_address_button}>
              <button>View on Google Map</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Property