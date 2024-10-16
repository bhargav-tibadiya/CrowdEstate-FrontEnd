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

  const [transaction, setTransaction] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState('All');

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


  //transaction barchart 
  const monthlyData = aggregateTransactionsByMonth(transactionData);
  const YearlyData = aggregateTransactionsByYear(transactionData);
  const labels = Object.keys(transaction === "month" ? monthlyData : YearlyData);
  const amounts = Object.values(transaction === "month" ? monthlyData : YearlyData);

  //category piechart
  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    const monthNames = date.toLocaleString('default', { month: 'short' });;
    return monthNames;
  };


  // Filter data based on selected month
  const filteredData = selectedMonth === 'All'
    ? propertyData
    : propertyData.filter(item => getMonthName(item.listedAt) === selectedMonth);

  //all category
  const allcategory = [...new Set(propertyData.map((ele) => ele.category))]

  // Count properties by category for the selected month
  const categoryCounts = filteredData.reduce((ele, property) => {
    allcategory.forEach(category => {
      if (!ele[category]) {
        ele[category] = 0;
      }
    })
    ele[property.category] = (ele[property.category] || 0) + 1;
    return ele;
  }, {});

  const chartData = Object.values(categoryCounts);
  const chartLabels = Object.keys(categoryCounts);

  //totalIncome calculate
  const totalIncome = propertyData.reduce((acc, curr) => acc + curr.price, 0);

  //total recent transaction calculate
  const totalTransaction = transactionData.reduce((acc, curr) => acc + curr.amount, 0);


  const user_property = [
    {
      title: "Total Property",
      title_ans: propertyData.length,
      predication_value: ((propertyData.length / 15) * 100).toFixed(0),
      title_icon: <FaCity />
    },
    {
      title: "Total Income",
      title_ans: `₹ ${totalIncome}`,
      predication_value: (((totalIncome - totalIncome)/totalIncome)*100).toFixed(0),
      title_icon: <FaDollarSign />
    },
    {
      title: "Total Customer",
      title_ans: userData.length,
      predication_value: (((userData.length - userData.length)/ userData.length) * 100).toFixed(0),
      title_icon: <FaUser />
    },
    {
      title: "Recent Transaction",
      title_ans: `₹ ${totalTransaction}`,
      predication_value: ((totalIncome-totalTransaction)/totalIncome*100).toFixed(0),
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
                    <div className={styles.main_title_predication}><span className={value.predication_value > 0 ? (styles.negative) : ""}>{value.predication_value > 0 ? <FaArrowDown /> : <FaArrowUp />} {Math.abs(value.predication_value)}%</span> Vs last month</div>
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
                <select
                  name="date"
                  id="date"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Jan">January</option>
                  <option value="Feb">February</option>
                  <option value="Mar">March</option>
                  <option value="Apr">April</option>
                  <option value="May">May</option>
                  <option value="Jun">June</option>
                  <option value="July">July</option>
                  <option value="Aug">Aguest</option>
                  <option value="Sep">September</option>
                  <option value="Oct">Octomber</option>
                  <option value="Nov">November</option>
                  <option value="Dec">December</option>
                </select>
              </div>
            </div>
            <div className="graph_container">
              {chartData.length !== 0 ? <Piechart data={chartData} labels={chartLabels} /> : <p className={styles.no_records}>No Records</p>}
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

                  {
                    transactionData.map((ele, index) => {
                      const date = new Date(ele.createdAt);
                      return (
                        <tr key={index}>
                          <td>{ele.paymentId}</td>
                          <td>Rent</td>
                          <td>₹{ele.amount}</td>
                          <td>{date.toLocaleString('default', { month: 'long' })},{date.getFullYear()}</td>
                          <td>Success</td>
                        </tr>
                      )
                    })
                  }


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
