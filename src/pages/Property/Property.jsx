import Sidebar from "../../components/sidebar/Sidebar"
import styles from "./Property.module.scss"


import { FaAngleRight, FaSquarespace } from "react-icons/fa"
import { FaCrown, FaDollarSign, FaClock, FaHammer, FaCouch, FaDog, FaSchool, FaSubway, FaLock, FaLeaf, FaMobileAlt, FaWater, FaMountain, FaCity, FaTree, FaSwimmingPool } from '../../assets/icons'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getProperty } from "../../services/propertyApi"
import { findUser } from "../../services/authApi"
import { addTransaction, buyPropertyAPI } from '../../services/purchaseApi';

import { toast } from 'react-hot-toast';


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

let apiTags = ['Waterfront', 'Garden', 'Near Metro', 'Swimming Pool']

const Property = () => {

  const [data, setData] = useState();
  const [userData, setUserData] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      try {

        const response = await getProperty(id);
        setData(response.property[0]);

        apiTags = data.tags;

      } catch (error) {

        console.error('Error fetching All properties: #FE010', error);

      }
    };

    fetchData(id);
  }, [])

  useEffect(() => {

    const fetchUser = async (id) => {
      try {

        const response = await findUser({ id: id });
        console.log('response', response)
        setUserData(response.user[0]);

      } catch (error) {

        console.error('Error fetching All properties: #FE010', error);

      }
    }

    if (data) {
      fetchUser(data.listedBy)
    }

  }, [data])

  console.log('data', data)
  console.log('userData', userData)

  const handlePurchase = async (amount) => {
    try {

      const response = await buyPropertyAPI({ amount: amount });

      const { id: order_id, currency, amount: order_amount } = response.response;

      const options = {
        key: import.meta.env.VITE_RZP_KEY_ID,
        amount: order_amount,
        currency: currency,
        name: "Crowd Estate",
        description: "Property Purchase",
        order_id: order_id,
        handler: async function (response) {

          const payload = { ...response, amount: amount, userId: userData._id, propertyId: data._id }
          const response2 = await addTransaction(payload)

          toast.success('Payment Successful! 🎉');

        },
        prefill: {
          name: "Crowd Estate",
          email: "buyer@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Step 4: Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Error during purchase:', error);
      toast.error('Payment Failed. Please try again.');
    }
  };


  return (
    <div className={styles.property_container}>

      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>

      <div className={styles.propertices_content}>

        <div className={styles.first_part}>
          <div className={styles.propertices_image}><img src={data?.image} alt="image" /></div>
          <div className={styles.propertices_details}>
            <div className={styles.propertices_name}>{data?.name}</div>

            <div className={styles.devider}></div>

            <div className={styles.propertices_price}>
              <div className={styles.que}>Price</div>
              <div className={styles.ans}>INR {data?.price}</div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.propertices_price}>
              <div className={styles.que}>Rent</div>
              <div className={styles.ans}>INR {data?.price * 0.01}<span>/Month</span></div>
            </div>


            <div className={styles.devider}></div>

            <div className={styles.propertices_Owner}>
              <div className={styles.que}>Owner</div>
              <div className={styles.ans}>
                <div className={styles.owner_image}>
                  <img src={userData?.profileImage} width={60} height={60} alt="" />
                </div>
                <div className={styles.owner_details}>
                  <div className={styles.owner_name}>{userData?.firstName + " " + userData?.lastName}</div>
                  <div className={styles.owner_investor_type}>Individual Invester</div>
                </div>
                <div className={styles.Right_arrow_button}><FaAngleRight size={17} color="#161D29" /></div>
              </div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.properties_extra_details}>
              <div className={styles.que}>Are You Interested?</div>
              <div className={styles.ans}>Just leave your proposal and owner will connect you if they are interested in you offer</div>
            </div>

            <div className={styles.properties_leave_button}>
              <button onClick={() => handlePurchase(data?.price)}>Buy Now</button>
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
                <div className={styles.que}>{data?.category}</div>
              </div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.details_of_properties}>
              <div className={styles.que}>Details Of Apartment</div>
              <div className={styles.ans}>

                <div className={styles.properties_things}>
                  <div className={styles.queOfThings}>Bedroom</div>
                  <div className={styles.ansOfThings}>{data?.bedrooms}</div>
                </div>
                <div className={styles.properties_things}>
                  <div className={styles.queOfThings}>Bathroom</div>
                  <div className={styles.ansOfThings}>{data?.bathrooms}</div>
                </div>
                <div className={styles.properties_things}>
                  <div className={styles.queOfThings}>Sqft</div>
                  <div className={styles.ansOfThings}>{data?.size}</div>
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
                <div className={styles.que}>Address</div>
                <div className={styles.ans}>{data?.location?.address}</div>
              </div>
            </div>


            <div className={styles.devider}></div>

            <div className={styles.property_add_box}>
              <div className={styles.properties_address1}>
                <div className={styles.que}>City</div>
                <div className={styles.ans}>{data?.location?.city}</div>
              </div>
              <div className={styles.properties_address1}>
                <div className={styles.que}>State</div>
                <div className={styles.ans}>{data?.location?.state}</div>
              </div>
              <div className={styles.properties_address1}>
                <div className={styles.que}>Country</div>
                <div className={styles.ans}>{data?.location?.country}</div>
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