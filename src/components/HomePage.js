import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';

function HomePage() {
  const headerLinks = [
    { url: '/', text: 'Home' },
    { url: '/dashboard', text: 'Dashboard' },
    { url: '/login', text: 'Login' },
    { url: '/about', text: 'About' },
    { url: '/contact', text: 'Contact' }
  ];

  return (
    <div className="home-page">

      <div className="home-upper">
        <Header links={headerLinks} />
        <h4 className="upper-sub">Take Control of Your Finances</h4>
        <h1 className="upper-main">Track, Manage, and Thrive</h1>
        <p className="upper-intro">
          Introducing Finance Tracker, your gateway to financial empowerment. Navigate the intricate world of personal finance with ease as you monitor expenditures, establish budgetary limits, and witness your savings flourish.
        </p>
        <Link className="upper-btn-container" to="/signup">
          <button className="btn btn-primary btn-lg upper-button">Sign Up</button>
        </Link>
      </div>

      <div className="home-middle">
        <div className="middle-container">
          <div className="row">
            <div className="col-6 middle-col">
              <div className="middle-box">
                <h1>Discover What Sets Us Apart</h1>
                <p>Our comprehensive toolkit is meticulously designed to address your financial needs with precision. Discover how we can elevate your financial experience and put you on the path to success.</p>
              </div>
            </div>
            <div className="col-6 middle-col">
              <div className="middle-box">
                <i className="fa-solid fa-magnifying-glass-chart middle-icon-expense"></i>
                <h2>Efficient Expense Monitoring</h2>
                <p>Easily track and categorize your expenses, helping you gain insights into where your money goes. Stay in control of your financial health by understanding your spending habits.</p>
              </div>
            </div>
            <div className="col-6 middle-col">
              <div className="middle-box">
                <i className="fa-solid fa-chart-pie  middle-icon-budget"></i>
                <h2>Smart Budget Creation</h2>
                <p>Create customized budgets tailored to your financial goals. Monitor your income and expenses effortlessly, ensuring you stay on track and never overspend.</p>
              </div>
            </div>
            <div className="col-6 middle-col">
              <div className="middle-box">
                <i className="fa-solid fa-diagram-project  middle-icon-invest"></i>
                <h2>Informed Investment Decisions</h2>
                <p>Gain access to comprehensive investment insights and analysis. Make informed decisions when it comes to your investments, helping you grow your wealth wisely.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-bottom">
        <div className="bottom-box">
          <h4 className="bottom-sub">Secure Your Financial Future</h4>
          <h1 className="bottom-main">Financial Insights for Peace of Mind</h1>
          <p className="bottom-intro">
            In today's fast-paced world, securing your financial future is paramount. Our app provides you with the insights and knowledge you need to navigate the complex landscape of personal finance. With a keen eye on your investments, expenditures, and goals, we help you make informed decisions that will lead to long-term financial security. Take control of your financial destiny, and find peace of mind with the comprehensive insights offered by our personal finance tracker.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
