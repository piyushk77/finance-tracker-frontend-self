import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import Header from './Header';
import Footer from './Footer';
import './Dashboard.css';


function Dashboard() {
  const history = useHistory(); // Use useHistory hook
  const [userMetrics, setUserMetrics] = useState(null);

  useEffect(() => {
    // Fetch user metrics when the component mounts
    const fetchData = async () => {
      try {
        // Retrieve the JWT token from local storage
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
          // Make the API request with the authorization header
          const response = await axios.get('https://finance-tracker-production.up.railway.app/api/user/getMetrics', {
            headers: {
              Authorization: authToken,
            },
          });

          if (response.status === 200) {
            // Set the user metrics in state
            setUserMetrics(response.data)
          }
          else if (response.status === 205) {
            alert("You are not authorized to access this route. Please login");
            history.push('/login');
          }
          else if (response.status === 206) {
            alert("Your token has expired. Please login again.");
            history.push('/login');
          }
          else {
            // Handle the API response status other than 200
            console.error('Failed to fetch user metrics');
          }
        } else {
          // Handle the case where the authToken is not available
          console.error('Auth token not available');
        }
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching user metrics', error);
      }
    };

    fetchData();
  }, [history]); // Empty dependency array ensures this effect runs once when the component mounts


  if (!userMetrics) {
    // Loading state or handle other conditions
    return <div>Loading...</div>;
  }

  const headerLinks = [
    { url: '/dashboard', text: 'Dashboard' },
    { url: '/logout', text: 'Log out' },
    { url: '/about', text: 'About' },
    { url: '/contact', text: 'Contact' },
  ];

  let overviewIncomeData = [
    { name: 'This Week', value: userMetrics.income.this_week },
    { name: 'This Month', value: userMetrics.income.this_month },
    { name: 'This Year', value: userMetrics.income.this_year },
    { name: 'Total', value: userMetrics.income.total },
  ]

  let weeklyIncomeData = [
    { name: 'First Week', value: userMetrics.income.weekly.firstWeek },
    { name: 'Second Week', value: userMetrics.income.weekly.secondWeek },
    { name: 'Third Week', value: userMetrics.income.weekly.thirdWeek },
    { name: 'Fourth Week', value: userMetrics.income.weekly.fourthWeek },
    { name: 'Fifth Week', value: userMetrics.income.weekly.fifthWeek },
  ]

  let yearlyIncomeData = [
    { name: 'January', value: userMetrics.income.monthly.january },
    { name: 'Second Week', value: userMetrics.income.monthly.february },
    { name: 'Third Week', value: userMetrics.income.monthly.march },
    { name: 'Fourth Week', value: userMetrics.income.monthly.april },
    { name: 'Fifth Week', value: userMetrics.income.monthly.may },
    { name: 'Fifth ', value: userMetrics.income.monthly.june },
    { name: 'FifWeek', value: userMetrics.income.monthly.july },
    { name: 'Fifth WWeek', value: userMetrics.income.monthly.august },
    { name: 'Fifth gueek', value: userMetrics.income.monthly.september },
    { name: 'Fifthgu Week', value: userMetrics.income.monthly.october },
    { name: 'Fiftht Week', value: userMetrics.income.monthly.november },
    { name: 'Fiftht Week', value: userMetrics.income.monthly.december },
  ]


  let overviewExpenseData = [
    { name: 'This Week', value: userMetrics.expense.this_week },
    { name: 'This Month', value: userMetrics.expense.this_month },
    { name: 'This Year', value: userMetrics.expense.this_year },
    { name: 'Total', value: userMetrics.expense.total },
  ]

  let weeklyExpenseData = [
    { name: 'First Week', value: userMetrics.expense.weekly.firstWeek },
    { name: 'Second Week', value: userMetrics.expense.weekly.secondWeek },
    { name: 'Third Week', value: userMetrics.expense.weekly.thirdWeek },
    { name: 'Fourth Week', value: userMetrics.expense.weekly.fourthWeek },
    { name: 'Fifth Week', value: userMetrics.expense.weekly.fifthWeek },
  ]

  let yearlyExpenseData = [
    { name: 'January', value: userMetrics.expense.monthly.january },
    { name: 'Second Week', value: userMetrics.expense.monthly.february },
    { name: 'Third Week', value: userMetrics.expense.monthly.march },
    { name: 'Fourth Week', value: userMetrics.expense.monthly.april },
    { name: 'Fifth Week', value: userMetrics.expense.monthly.may },
    { name: 'Fifth ', value: userMetrics.expense.monthly.june },
    { name: 'FifWeek', value: userMetrics.expense.monthly.july },
    { name: 'Fifth WWeek', value: userMetrics.expense.monthly.august },
    { name: 'Fifth gueek', value: userMetrics.expense.monthly.september },
    { name: 'Fifthgu Week', value: userMetrics.expense.monthly.october },
    { name: 'Fiftht Week', value: userMetrics.expense.monthly.november },
    { name: 'Fiftht Week', value: userMetrics.expense.monthly.december },
  ]

  let overviewSavingsData = [
    { name: 'This Week', value: userMetrics.savings.this_week },
    { name: 'This Month', value: userMetrics.savings.this_month },
    { name: 'This Year', value: userMetrics.savings.this_year },
    { name: 'Total', value: userMetrics.savings.total },
  ]

  let weeklySavingsData = [
    { name: 'First Week', value: userMetrics.savings.weekly.firstWeek },
    { name: 'Second Week', value: userMetrics.savings.weekly.secondWeek },
    { name: 'Third Week', value: userMetrics.savings.weekly.thirdWeek },
    { name: 'Fourth Week', value: userMetrics.savings.weekly.fourthWeek },
    { name: 'Fifth Week', value: userMetrics.savings.weekly.fifthWeek },
  ]

  let yearlySavingsData = [
    { name: 'January', value: userMetrics.savings.monthly.january },
    { name: 'Second Week', value: userMetrics.savings.monthly.february },
    { name: 'Third Week', value: userMetrics.savings.monthly.march },
    { name: 'Fourth Week', value: userMetrics.savings.monthly.april },
    { name: 'Fifth Week', value: userMetrics.savings.monthly.may },
    { name: 'Fifth ', value: userMetrics.savings.monthly.june },
    { name: 'FifWeek', value: userMetrics.savings.monthly.july },
    { name: 'Fifth WWeek', value: userMetrics.savings.monthly.august },
    { name: 'Fifth gueek', value: userMetrics.savings.monthly.september },
    { name: 'Fifthgu Week', value: userMetrics.savings.monthly.october },
    { name: 'Fiftht Week', value: userMetrics.savings.monthly.november },
    { name: 'Fiftht Week', value: userMetrics.savings.monthly.december },
  ]





  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="dashboard-page">
      <Header links={headerLinks} />

      <div className="dashboard-content">

        <div className="left-panel card p-3 mb-4">
          <div className='panel-content'>
            {/* Add your links or navigation components here */}
            <h4 className="mb-3">Main</h4>
            <ul className="list-unstyled panel-list">
              <li>
                <Link to="/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
              </li>
            </ul>

            <hr />

            <h4 className="mb-3">Expense</h4>
            <ul className="list-unstyled panel-list">
              <li>
                <Link to="/setExpense" className="text-decoration-none text-dark">Set Expense</Link>
              </li>
              <li>
                <Link to="/expenseLog" className="text-decoration-none text-dark">Show Expense Log</Link>
              </li>
            </ul>

            <hr />

            <h4 className="mt-4 mb-3">Income</h4>
            <ul className="list-unstyled  panel-list">
              <li>
                <Link to="/setIncome" className="text-decoration-none text-dark">Set Income</Link>
              </li>
              <li>
                <Link to="/incomeLog" className="text-decoration-none text-dark">Show Income Log</Link>
              </li>
            </ul>

            <hr />

            <h4 className="mt-4 mb-3">Budgeting</h4>
            <ul className="list-unstyled  panel-list">
              <li>
                <Link to="/budget" className="text-decoration-none text-dark">Set Financial Goals</Link>
              </li>
            </ul>
          </div>
        </div>


        <div className="right-content">
          {userMetrics ? (
            <div className="row">
              <h2 className=" dashboard-welcome">Welcome, {userMetrics.username}!</h2>



              <h3 className=" dashboard-subheadings">Income</h3>
              <div className='col-6'>
                <div className="dashboard-card">
                  <h3>Overview</h3>
                  <PieChart width={400} height={300}>
                    <Pie
                      data={overviewIncomeData}
                      dataKey="value"
                      cx={200}
                      cy={150}
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {overviewIncomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>

                </div>
              </div>

              <div className='col-6'>
                <div className="dashboard-card">
                  <h3>Weekly</h3>

                  <PieChart width={400} height={300}>
                    <Pie
                      data={weeklyIncomeData}
                      dataKey="value"
                      cx={200}
                      cy={150}
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {weeklyIncomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>

                </div>
              </div>

              <div className='col-12'>
                <div className="dashboard-card">
                  <h3>Yearly</h3>

                  <BarChart width={400} height={300} data={yearlyIncomeData}>
                    <Bar dataKey="value" fill="#8884d8" />
                    <Legend />
                    <Tooltip />
                  </BarChart>

                </div>
              </div>

              <h3 className=" dashboard-subheadings">Expense</h3>
              <div className='col-6'>
                <div className="dashboard-card">
                  <h3>Overview</h3>

                  <PieChart width={400} height={300}>
                    <Pie
                      data={overviewExpenseData}
                      dataKey="value"
                      cx={200}
                      cy={150}
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {overviewExpenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>

                </div>
              </div>

              <div className='col-6'>
                <div className="dashboard-card">
                  <h3>Weekly</h3>

                  <PieChart width={400} height={300}>
                    <Pie
                      data={weeklyIncomeData}
                      dataKey="value"
                      cx={200}
                      cy={150}
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {weeklyExpenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>

                </div>
              </div>

              <div className='col-12'>
                <div className="dashboard-card">
                  <h3>Yearly</h3>

                  <BarChart width={400} height={300} data={yearlyExpenseData}>
                    <Bar dataKey="value" fill="#8884d8" />
                    <Legend />
                    <Tooltip />
                  </BarChart>

                </div>
              </div>

              <h3 className=" dashboard-subheadings">Savings</h3>
              <div className='col-6'>
                <div className="dashboard-card">
                  <h3>Overview</h3>

                  <PieChart width={400} height={300}>
                    <Pie
                      data={overviewSavingsData}
                      dataKey="value"
                      cx={200}
                      cy={150}
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {overviewSavingsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>

                </div>
              </div>

              <div className='col-6'>
                <div className="dashboard-card">
                  <h3>Weekly</h3>

                  <PieChart width={400} height={300}>
                    <Pie
                      data={weeklySavingsData}
                      dataKey="value"
                      cx={200}
                      cy={150}
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {weeklySavingsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>

                </div>
              </div>

              <div className='col-12'>
                <div className="dashboard-card">
                  <h3>Yearly</h3>

                  <BarChart width={400} height={300} data={yearlySavingsData}>
                    <Bar dataKey="value" fill="#8884d8" />
                    <Legend />
                    <Tooltip />
                  </BarChart>

                </div>
              </div>

            </div>
          ) : (
            <p>Loading user metrics...</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
