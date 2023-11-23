import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import SetExpense from './components/SetExpense';
import ExpenseLog from './components/ExpenseLog';
import SetIncome from './components/SetIncome';
import IncomeLog from './components/IncomeLog';
import Budget from './components/Budget';
import About from './components/About';
import Contact from './components/Contact';


function App() {
  return (
    <Router>
      <div className="app-main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/setExpense" component={SetExpense} />
          <Route path="/expenseLog" component={ExpenseLog} />
          <Route path="/setIncome" component={SetIncome} />
          <Route path="/incomeLog" component={IncomeLog} />
          <Route path="/budget" component={Budget} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
