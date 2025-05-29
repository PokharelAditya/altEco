import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar isLoggedIn={true} />
      <Routes>
        <Route path="/" element={<h2 className="text-2xl text-blue-500">Hello World</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
