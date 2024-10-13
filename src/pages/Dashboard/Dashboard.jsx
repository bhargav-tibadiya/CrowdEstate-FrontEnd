import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

import { FaCity, FaDollarSign, FaUser, FaMoneyBillWave, FaArrowDown, FaArrowUp } from '../../assets/icons'
import { fetchAllProperties } from "../../services/propertyApi";
import { aggregateTransactionsByMonth, aggregateTransactionsByYear } from "../../services/Transaction";
import Piechart from "../../components/Graph/PieChart/PieChart";
import BarChart from "../../components/Graph/BarChart/Barchart";
import { fetchAllTransaction } from "../../services/purchaseApi";
import { getAllUser } from "../../services/authApi";

const Dashboard = () => {

  const [propertyData, setPropertyData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [userData, setUserData] = useState([]);
  
  const [transaction, setTransaction] = useState("month")

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetchAllProperties();
        setPropertyData(response.properties)

        const transactionResponse = await fetchAllTransaction()
        setTransactionData(transactionResponse.response)

        const userResponse = await getAllUser()
        setUserData(userResponse.user)


      } catch (error) {

        console.error('Error fetching All properties: #FE010', error);

      }
    };

    fetchData();

  }, [])

  console.log('propertyData', propertyData)
  console.log('transactionData', transactionData)
  console.log('userData', userData)



  const monthlyData = aggregateTransactionsByMonth(propertyData);
  const YearlyData = aggregateTransactionsByYear(propertyData);
  const labels = Object.keys(transaction === "month" ? monthlyData : YearlyData);
  const amounts = Object.values(transaction === "month" ? monthlyData : YearlyData);

  const categoryCounts = propertyData.reduce((ele, property) => {
    ele[property.category] = (ele[property.category] || 0) + 1;
    return ele;
  }, {});

  const chartData = Object.values(categoryCounts);
  const chartLabels = Object.keys(categoryCounts);

  const user_property = [
    {
      title: "Total Property",
      title_ans: "100",
      predication_status: "up",
      predication_value: 25,
      title_icon: <FaCity />
    },
    {
      title: "Total Income",
      title_ans: "$500",
      predication_status: "up",
      predication_value: 45,
      title_icon: <FaDollarSign />
    },
    {
      title: "Total User",
      title_ans: "15",
      predication_status: "down",
      predication_value: 15,
      title_icon: <FaUser />
    },
    {
      title: "Recent Transaction",
      title_ans: "$5800",
      predication_status: "down",
      predication_value: 25,
      title_icon: <FaMoneyBillWave />
    },

  ]

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.sidebar_content}>
        <Sidebar />
      </div>
      <div className={styles.dashboard_content}>
        <div className={styles.dashboard_main_section}>
          {
            user_property.map((value, index) => {
              return (
                <div className={styles.user_property} key={index}>
                  <div className={styles.add_title}>
                    <div className={styles.main_title}>
                      {value.title}
                    </div>
                    <div className={styles.main_title_ans}>{value.title_ans}</div>
                    <div className={styles.main_title_predication}><span className={value.predication_status !== "up" ? (styles.negative) : ""}>{value.predication_status !== "up" ? <FaArrowDown /> : <FaArrowUp />} {value.predication_value}%</span> Vs last month</div>
                  </div>
                  <div className={styles.add_icon}>
                    <div className={styles.icon}>{value.title_icon}</div>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className={styles.dashboard_graph_section}>
          <div className={styles.graph}>
            <div className={styles.main_listed_title}>
              <div className={styles.que}>Category Analytics</div>
              <div className={styles.ans}>
                <select name="date" id="date">
                  <option value="jan">January</option>
                  <option value="feb">February</option>
                  <option value="mar">March</option>
                  <option value="apr">April</option>
                  <option value="may">May</option>
                  <option value="jun">June</option>
                  <option value="july">July</option>
                  <option value="ayg">Aguest</option>
                  <option value="sep">September</option>
                  <option value="oct">Octomber</option>
                  <option value="nov">November</option>
                  <option value="dec">December</option>
                </select>
              </div>
            </div>
            <div className="graph_container">
              <Piechart data={chartData} labels={chartLabels} />
            </div>
          </div>
          <div className={styles.graph}>
            <div className={styles.main_listed_title}>
              <div className={styles.que}>Transaction statistics</div>
              <div className={styles.ans}>
                <select
                  name="date"
                  id="date"
                  value={transaction}
                  onChange={(e) => setTransaction(e.target.value)}
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
            </div>
            <div className="graph_container">
              <BarChart labels={labels} amounts={amounts} />
            </div>
          </div>
        </div>

        <div className={styles.dashboard_users_listed}>
          <div className={styles.user_listed}>
            <div className={styles.main_listed_title}>
              <div className={styles.que}>My Listed Property</div>
              <div className={styles.ans}>See all</div>
            </div>
            <div className={styles.listed_details}>
              <table>
                <thead>
                  <tr>
                    <th>Property Name</th>
                    <th>Size(sqft)</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    propertyData.map((ele, index) => {
                      return (
                        <tr className={styles.property_description} key={index}>
                          <td className={styles.property_details}>
                            <div className={styles.image}><img src={ele.image} alt={ele.name} /></div>
                            <div className={styles.property_name}>{ele.name}</div>
                          </td>
                          <td>{ele.size}</td>
                          <td>{ele.location.city}</td>
                          <td>₹{ele.price}</td>
                          <td>{ele.category}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.recent_transaction}>
            <div className={styles.main_transaction_title}>
              <div className={styles.que}>My Recent Transaction</div>
              <div className={styles.ans}>See all</div>
            </div>
            <div className={styles.listed_trasaction_details}>
              <table>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Property Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DB125896</td>
                    <td>Rent</td>
                    <td>$170k</td>
                    <td>10 September,2024</td>
                    <td>Success</td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
