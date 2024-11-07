import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import UserList from './components/UserList';
import AddEditUser from './components/AddEditUser';
import LoanList from './components/LoanList';
import AddEditLoan from './components/AddEditLoan';
import NotFound from './components/NotFound';
import Simulation from './components/Simulation';
import TotalCost from './components/TotalCost';

function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/user/list" element={<UserList/>} />
              <Route path="/user/add" element={<AddEditUser/>} />
              <Route path="/user/edit/:id" element={<AddEditUser/>} />
              <Route path="/loan/list" element={<LoanList/>} />
              <Route path="/loan/add" element={<AddEditLoan/>} />
              <Route path="/loan/edit/:id" element={<AddEditLoan/>} />
              <Route path="/simulation" element={<Simulation/>} />
              <Route path="/totalCost" element={<TotalCost/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}

export default App
