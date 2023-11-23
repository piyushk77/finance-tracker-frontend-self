import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './SetIncome.css';
import './Dashboard.css';

function SetIncome() {
  const [formData, setFormData] = useState({
    category: '',
    date: '',
    amount: 0,
    payment_method: '',
    currency: '',
    description: '',
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

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();

    if (!formData.payment_method) {
      alert('Please select a payment method');
      return;
    }

    try {
      // Retrieve the JWT token from local storage
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        // Make the API request with the authorization header
        const response = await axios.post(
          'https://finance-tracker-production.up.railway.app/api/user/setIncome',
          formData,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        if (response.status === 201) {
          // Income added successfully
          console.log('Income added successfully');
          setFormData({
            category: '',
            date: '',
            amount: 0,
            payment_method: '',
            currency: '',
            description: '',
          });
          alert("Income added successfully");
          // Redirect to the dashboard or another page if needed
        } else {
          // Handle the API response status other than 201
          console.error('Failed to add income');
        }
      } else {
        // Handle the case where the authToken is not available
        console.error('Auth token not available');
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error adding income', error);
    }
  };


  return (
    <div className="setIncome-page">
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
          <h1 className='income-main-head'>Add Income</h1>
          <div className="income-box">
            <form id="income-form" className="income-form" onSubmit={handleIncomeSubmit}>
              <label>Category of Income:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select category</option>
                <option value="housing">Housing</option>
                <option value="transportation">Transportation</option>
                <option value="food">Food</option>
                <option value="utilities">Utilities</option>
                <option value="insurance">Insurance</option>
                <option value="debt">Debt Payments</option>
                <option value="personal-care">Personal Care</option>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
                <option value="savings">Savings</option>
                <option value="gifts-donations">Gifts/Donations</option>
                <option value="taxes">Taxes</option>
                <option value="miscellaneous">Miscellaneous</option>
                {/* Add more options as needed */}
              </select>
              <br />

              <label>Date of Income:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
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

              <label>Currency Used:</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select currency</option>
                <option value="inr">INR</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                {/* Add more options as needed */}
              </select>
              <br />

              <label>Payment Method Used:</label>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment_method"
                  value="cash"
                  onChange={handleInputChange}
                />
                <label>Cash Payment</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment_method"
                  value="bank_transfer"
                  onChange={handleInputChange}
                />
                <label>Bank Transfer</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment_method"
                  value="online_payment"
                  onChange={handleInputChange}
                />
                <label>Online Payment/UPI</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment_method"
                  value="cheque"
                  onChange={handleInputChange}
                />
                <label>Cheque</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment_method"
                  value="none"
                  onChange={handleInputChange}
                />
                <label>None</label>
              </div>

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

export default SetIncome;
