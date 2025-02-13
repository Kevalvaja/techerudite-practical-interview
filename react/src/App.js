import logo from './logo.svg';
import './App.css';
import AdminRegistration from './view/Admin-registration';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './view/Login';
import CustomerRegistration from './view/Customer-registration';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin-registration" element={<AdminRegistration />} />
            <Route path="/customer-registration" element={<CustomerRegistration />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
