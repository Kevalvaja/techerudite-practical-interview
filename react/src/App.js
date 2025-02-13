import AdminRegistration from './view/Admin-registration';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Login from './view/Login';
import CustomerRegistration from './view/Customer-registration';
import UserDetails from './view/User-details';

function App() {
  const checkValue = ["", undefined, "undefined", null]
  const getAuthToken = sessionStorage.getItem("auth")
  return (
    <div>
      <Router>
        <div>
          <Routes>
            {checkValue?.includes(getAuthToken) ?
              <>
                <Route path="/" element={<Login />} />
                <Route path="/admin-registration" element={<AdminRegistration />} />
                <Route path="/customer-registration" element={<CustomerRegistration />} />
              </>
              :
              <Route path="/" element={<UserDetails />} />
            }
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
