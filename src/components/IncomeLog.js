import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './IncomeLog.css';
import './Dashboard.css';

function IncomeLog() {
  const [incomeData, setIncomeData] = useState(null);

  // State for the selected transaction and modified details
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifiedDetails, setModifiedDetails] = useState({
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

  useEffect(() => {
    // Fetch expense data on component mount
    const fetchIncomeData = async () => {
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

          // Set the expense data in the state
          setIncomeData(response.data.income);
        } else {
          // Handle the case where the authToken is not available
          console.error('Auth token not available');
        }
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching income data', error);
      }
    };

    fetchIncomeData();
  }, [forceUpdateKey]); // Empty dependency array ensures that this effect runs once on mount

  const handleDeleteTransaction = async (transactionId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this transaction?');

    // If user confirms, proceed with the deletion
    if (!isConfirmed) {
      return;
    }

    try {
      // Retrieve the JWT token from local storage
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        // Make the API request with the authorization header
        const response = await axios.delete(
          'https://finance-tracker-production.up.railway.app/api/user/deleteIncome',
          {
            headers: {
              Authorization: authToken,
            },
            data: {
              transactionId: transactionId,
            },
          }
        );

        if (response.status === 200) {
          // Transaction deleted successfully, update the state
          setIncomeData((prevData) => {
            const updatedTransactions = prevData.transactions.filter(
              (transaction) => transaction._id !== transactionId
            );
            return { ...prevData, transactions: updatedTransactions };
          });
        } else {
          // Handle the API response status other than 200
          console.error('Failed to delete transaction');
        }
      } else {
        // Handle the case where the authToken is not available
        console.error('Auth token not available');
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error deleting transaction', error);
    }
  };

  const handleEditTransaction = (transactionId) => {
    // Open a modal or form to allow the user to input modified details
    setIsModalOpen(true);
    // Set the selected transaction for editing
    setSelectedTransactionId(transactionId);
  };

  const handleEditProcess = async () => {
    try {
      // Retrieve the JWT token from local storage
      const authToken = localStorage.getItem('authToken');

      console.log(modifiedDetails);

      if (authToken && selectedTransactionId) {
        // Make the PUT or PATCH API request with the authorization header and modified details
        const response = await axios.put(
          `https://finance-tracker-production.up.railway.app/api/user/editIncome`,
          modifiedDetails,
          {
            headers: {
              Authorization: authToken,
              TransactionId: selectedTransactionId,
            },
          }
        );

        if (response.status === 200) {
          // Transaction edited successfully, update the state
          // Reload the transaction data or update the specific transaction in your state
          // Close the modal or form after processing
          setIsModalOpen(false);
          // Reset the modified details state for the next edit
          setModifiedDetails({
            category: '',
            date: '',
            amount: 0,
            payment_method: '',
            currency: '',
            description: '',
          });
          // Reset the selected transaction ID
          setSelectedTransactionId(null);
          setForceUpdateKey((prevKey) => prevKey + 1);
        } else {
          // Handle the API response status other than 200
          console.error('Failed to edit transaction');
        }
      } else {
        // Handle the case where the authToken or selectedTransactionId is not available
        console.error('Auth token or selected transaction ID not available');
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error editing transaction', error);
    }
  };

  return (
    <div className="income-log-page">
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
          <div className='income-logs' >
            <h1 className='income-log-main-head'>Expense Log</h1>
            {incomeData ? (
              <div className="transaction-logs">
                {incomeData.transactions.map((transaction) => (
                  <div key={transaction._id} className="transaction">
                    {/* Display transaction details */}
                    <p>Category: {transaction.category}</p>
                    <p>Date: {transaction.date}</p>
                    <p>Amount: {transaction.amount}</p>
                    <p>Payment Method: {transaction.payment_method}</p>
                    <p>Currency: {transaction.currency}</p>
                    <p>Description: {transaction.description}</p>

                    {/* Buttons for edit and delete */}
                    <button onClick={() => handleEditTransaction(transaction._id)}>
                      Edit
                    </button>

                    <button onClick={() => handleDeleteTransaction(transaction._id)}>
                      Delete
                    </button>
                  </div>
                ))}

                {/* Modal for editing */}
                {isModalOpen && (
                  <div className='mod-container'>
                    {/* Form for editing */}
                    <form className='mod-form'>
                      {/* Your form inputs for modified details */}
                      <label>Category of Income:</label>
                      <select
                        name="category"
                        value={modifiedDetails.category}
                        onChange={(e) =>
                          setModifiedDetails({
                            ...modifiedDetails,
                            category: e.target.value,
                          })
                        }
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
                        value={modifiedDetails.date}
                        onChange={(e) =>
                          setModifiedDetails({
                            ...modifiedDetails,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                      <br />

                      <label>Amount:</label>
                      <input
                        type="number"
                        name="amount"
                        value={modifiedDetails.amount}
                        onChange={(e) =>
                          setModifiedDetails({
                            ...modifiedDetails,
                            amount: e.target.value,
                          })
                        }
                        required
                      />
                      <br />

                      <label>Currency Used:</label>
                      <select
                        name="currency"
                        value={modifiedDetails.currency}
                        onChange={(e) =>
                          setModifiedDetails({
                            ...modifiedDetails,
                            currency: e.target.value,
                          })
                        }
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
                          onChange={(e) =>
                            setModifiedDetails({
                              ...modifiedDetails,
                              payment_method: e.target.value,
                            })
                          }
                        />
                        <label>Cash Payment</label>
                      </div>
                      <div className="payment-option">
                        <input
                          type="radio"
                          name="payment_method"
                          value="bank_transfer"
                          onChange={(e) =>
                            setModifiedDetails({
                              ...modifiedDetails,
                              payment_method: e.target.value,
                            })
                          }
                        />
                        <label>Bank Transfer</label>
                      </div>
                      <div className="payment-option">
                        <input
                          type="radio"
                          name="payment_method"
                          value="online_payment"
                          onChange={(e) =>
                            setModifiedDetails({
                              ...modifiedDetails,
                              payment_method: e.target.value,
                            })
                          }
                        />
                        <label>Online Payment/UPI</label>
                      </div>
                      <div className="payment-option">
                        <input
                          type="radio"
                          name="payment_method"
                          value="cheque"
                          onChange={(e) =>
                            setModifiedDetails({
                              ...modifiedDetails,
                              payment_method: e.target.value,
                            })
                          }
                        />
                        <label>Cheque</label>
                      </div>
                      <div className="payment-option">
                        <input
                          type="radio"
                          name="payment_method"
                          value="none"
                          onChange={(e) =>
                            setModifiedDetails({
                              ...modifiedDetails,
                              payment_method: e.target.value,
                            })
                          }
                        />
                        <label>None</label>
                      </div>

                      <label>Description:</label>
                      <textarea
                        name="description"
                        value={modifiedDetails.description}
                        onChange={(e) =>
                          setModifiedDetails({
                            ...modifiedDetails,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                      <br />

                      <button type="button" onClick={handleEditProcess}>
                        Save Changes
                      </button>
                      <button type="button" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </button>
                    </form>
                  </div>
                )}

                {isModalOpen && (
                  <div className='mod-space'>
                  </div>
                )}

              </div>
            ) : (
              <p>Loading income data...</p>
            )}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default IncomeLog;