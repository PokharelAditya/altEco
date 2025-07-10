import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from './components/Login'
import { AuthContextProvider } from './context/AuthContext'
import Home from './components/Home'
import Logout from './components/Logout'
import SignUp from './components/SignUp'
import UserSignupData from "./components/UserSignupData"
import UserPreference from "./components/UserPreference"
import EditProfile from "./components/EditProfile"
import LandingPage from "./components/LandingPage";
import SearchProduct from "./components/SearchProduct";
import AboutUsBlog from "./components/AboutUs"
import ProductsPage from "./components/ProductsPage"
import ProductCard from "./components/ProductCard"

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<LandingPage/>} />
          <Route path ="/login" element={<Login/>}/>
          <Route path ="/home" element={<Home/>}/>
          <Route path = "/logout" element={<Logout/>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path = "/aboutus" element = {<AboutUsBlog/>}/>
          <Route path="/signup-detail" element={<UserSignupData/>}/>
          <Route path="/preferences" element={<UserPreference/>}/>
          <Route path="/search-product" element={<SearchProduct />} />
          <Route path="/edit-profile" element={<EditProfile/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
