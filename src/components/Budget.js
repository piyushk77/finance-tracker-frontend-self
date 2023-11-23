import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Dashboard.css';
import './Budget.css';

function Budget() {
  const [formData, setFormData] = useState({
    budget_type: "",
    amount: 0,
    percentage_alert: 0,
    description: "",
  });

  const headerLinks = [
    { url: '/dashboard', text: 'Dashboard' },
    { url: '/logout', text: 'Log out' },
    { url: '/about', text: 'About' },
    { url: '/contact', text: 'Contact' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the JWT token from local storage
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        // Make the API request with the authorization header
        const response = await axios.post(
          'https://finance-tracker-production.up.railway.app/api/user/setBudget',
          formData,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        if (response.status === 201) {
          // Expense added successfully
          console.log('Expense added successfully');
          setFormData({
            budget_type: "",
            amount: 0,
            percentage_alert: 0,
            description: "",
          });
          alert("Budget added successfully");
          // Redirect to the dashboard or another page if needed
        } else {
          // Handle the API response status other than 201
          console.error('Failed to add budget');
        }
      } else {
        // Handle the case where the authToken is not available
        console.error('Auth token not available');
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error adding budget', error);
    }
  };


  return (
    <div className="setBudget-page">
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
          <h1 className='budget-main-head'>Set Budget</h1>
          <div className="budget-box">
            <form id="budget-form" className="budget-form" onSubmit={handleExpenseSubmit}>
              <label>Type of Budget:</label>
              <select
                name="budget_type"
                value={formData.budget_type}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select category</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                {/* Add more options as needed */}
              </select>
              <br />

              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Alert Percentage:</label>
              <input
                type="number"
                name="percentage_alert"
                value={formData.percentage_alert}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
              <br />
              <div className='form-button-container'>
                <button type="submit" className='btn btn-primary form-button'>Add</button>
              </div>
            </form>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Budget;