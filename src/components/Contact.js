import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './Contact.css';
import './Dashboard.css';

function Contact() {

    const headerLinks = [
        { url: '/dashboard', text: 'Dashboard' },
        { url: '/logout', text: 'Log out' },
        { url: '/about', text: 'About' },
        { url: '/contact', text: 'Contact' },
    ];


    return (
        <div className="setExpense-page">
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
                    <main className='contact-main'>
                        <form className='contact-form'>
                            <h2 className='contact-main-head'>Contact us</h2>
                            <label for="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" required />

                            <label for="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" required />

                            <label for="email">Email ID:</label>
                            <input type="email" id="email" name="email" required />

                            <label for="query">My Query:</label>
                            <textarea id="query" name="query" required></textarea>

                            <button type="submit">Submit</button>
                            <button type="reset">Reset</button>
                        </form>
                    </main>
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default Contact;