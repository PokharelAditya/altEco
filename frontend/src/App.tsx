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
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path ="/login" element={<Login/>}/>
          <Route path = "/logout" element={<Logout/>}/>
          <Route path = "/signup" element={<SignUp/>}/>
          <Route path="/signup-detail" element={<UserSignupData/>}/>
          <Route path="/preferences" element={<UserPreference/>}/>
          <Route path="/edit-profile" element={<EditProfile/>}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
