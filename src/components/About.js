import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './About.css';
import './Dashboard.css';

function About() {

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
                    <h1 className='about-main-head'>Personal Finance Tracker</h1>
                    <main>
                        <section id="introduction">
                            <h2>About</h2>
                            <p>
                                Take control of your financial journey with the Personal Finance Tracker. Our comprehensive and user-friendly expense tracking system is designed to empower you in achieving your financial goals.
                                Whether you're a budgeting beginner or a seasoned finance guru, our app provides you with the tools you need to understand, plan, and optimize your finances.
                                Start by effortlessly logging your daily expenses, categorizing them with ease, and gaining valuable insights into your spending patterns. Visualize your financial landscape through our intuitive reports and charts, enabling you to make informed decisions and set realistic budget goals.
                                Personal Finance Tracker offers flexibility with multiple tracking methods. You can manually enter your transactions, seamlessly integrate with your bank accounts for real-time updates, or even use our advanced receipt scanning feature for an efficient and paperless experience.
                                We prioritize the security of your financial data. Our app employs industry-standard encryption and authentication methods to ensure the utmost protection of your sensitive information.
                                Join the countless users who have transformed their financial well-being. Whether you're saving for a dream vacation, planning for retirement, or simply looking to build better spending habits, Personal Finance Tracker is your trusted companion on the path to financial success.
                            </p>
                        </section>

                        <section id="features">
                            <h2>Key Features</h2>
                            <ul>
                                <li>Intuitive expense entry</li>
                                <li>Real-time spending insights</li>
                                <li>Budget goal setting</li>
                                <li>Customizable categories</li>
                                <li>Secure and private</li>
                                <li>Expense history and trends analysis</li>
                                <li>Automated bill reminders</li>
                                <li>Exportable reports for tax and financial planning</li>
                            </ul>
                        </section>

                        <section id="benefits">
                            <h2>Benefits of Using Personal Finance Tracker</h2>
                            <ul>
                                <li>Efficiently monitor and categorize your spending</li>
                                <li>Set realistic budgets and financial goals</li>
                                <li>Understand your financial patterns with insightful reports</li>
                                <li>Enhanced security measures to protect your financial data</li>
                                <li>Save time with automated expense tracking methods</li>
                                <li>Improve your financial well-being and savings</li>
                                <li>Access your financial information anytime, anywhere</li>
                            </ul>
                        </section>
                    </main>
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default About;
