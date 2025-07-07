import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Logout from "./components/Logout";
import SignUp from "./components/SignUp";
import UserSignupData from "./components/UserSignupData";
import UserPreference from "./components/UserPreference";
import SearchProduct from "./components/SearchProduct";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-detail" element={<UserSignupData />} />
          <Route path="/set-preference" element={<UserPreference />} />
          <Route path="/search-product" element={<SearchProduct />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
