import Sidebar from "../../components/sidebar/Sidebar"
import styles from "./Property.module.scss"
import image1 from "../../../public/asset/images/property/img1.jpg"
import { FaAngleRight, FaBed, FaFan, FaHeart, FaHouseUser, FaParking, FaShare, FaSignal, FaSink, FaSoap, FaSquarespace, FaTree, FaWater, FaWifi } from "react-icons/fa"

const Property = () => {
  const Amenities = [
    {
      icons: FaWifi,
      things: "Wifi"
    },
    {
      icons: FaHouseUser,
      things: "Workspace"
    },
    {
      icons: FaParking,
      things: "Car Parking"
    },
    {
      icons: FaTree,
      things: "Backyard"
    },
    {
      icons: FaBed,
      things: "Refrigenerator"
    },
    {
      icons: FaSoap,
      things: "Washer"
    },
    {
      icons: FaFan,
      things: "Air Conditioner"
    },
    {
      icons: FaWater,
      things: "Swimmingpool"
    },
    {
      icons: FaSignal,
      things: "Others"
    },

  ]

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
              <div className={styles.extra_icons_button}>
                <button><FaHeart size={16} /> Save</button>
                <button><FaShare size={16} /> Share</button>
              </div>
            </div>

            <div className={styles.main_title_ans}>
              <p>This web platform includes features like property search,
                an interactive map, virtual tours, agent communication,
                booking viewings, mortgage calculators, and property listings.
                <br />
                The color palette is a neutral black and white scheme,
                providing a clean backdrop that highlights property photos.
                This minimalist approach ensures the focus remains on the listed options.</p>
            </div>

            <div className={styles.properties_extra_features}>
              <div className={styles.properties_things}>
                <div className={styles.icons}><FaBed size={20} color="#161D29" /></div>
                <div className={styles.que}>Bedroom</div>
              </div>
              <div className={styles.properties_things}>
                <div className={styles.icons}><FaSink size={20} color="#161D29" /></div>
                <div className={styles.que}>Bathroom</div>
              </div>
              <div className={styles.properties_things}>
                <div className={styles.icons}><FaSquarespace size={20} color="#161D29" /></div>
                <div className={styles.que}>Sqft</div>
              </div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.details_of_properties}>
              <div className={styles.que}>Details Of Apartment</div>
              <div className={styles.ans}>

                <div className={styles.properties_things}>
                  <div className={styles.ansOfThings}>5</div>
                  <div className={styles.queOfThings}>Bedroom</div>
                </div>
                <div className={styles.properties_things}>
                  <div className={styles.ansOfThings}>3</div>
                  <div className={styles.queOfThings}>Bathroom</div>
                </div>
                <div className={styles.properties_things}>
                  <div className={styles.ansOfThings}>1500</div>
                  <div className={styles.queOfThings}>Sqft</div>
                </div>

              </div>
            </div>

            <div className={styles.propertise_amenities}>
              <div className={styles.que}>Amenities</div>
              <div className={styles.ans}>

                {
                  Amenities.map((ele, index) => {
                    return (
                      <div className={styles.properties_things} key={index}>
                        <div className={styles.icons}><ele.icons size={20} color="#161D29" /></div>
                        <div className={styles.propertise_que}>{ele.things}</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>

          <div className={styles.properties_address}>
            <div className={styles.properties_address_que}>Properties Address</div>

            <div className={styles.devider}></div>

            <div className={styles.properties_address1}>
              <div className={styles.que}>Address Line 1</div>
              <div className={styles.ans}>Block no-2 12, Balaji Society </div>
            </div>

            <div className={styles.properties_address1}>
              <div className={styles.que}>Address Line 2</div>
              <div className={styles.ans}>kathodara gam, kamrej</div>
            </div>


            <div className={styles.devider}></div>

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

            <div className={styles.devider}></div>

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