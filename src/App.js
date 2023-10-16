import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import AboutUsPage from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logIn" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
