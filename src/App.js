import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import AboutUsPage from "./pages/AboutUs";
import ProgSignUpPage from "./pages/ProgSignUp";
import ProgressPage from "./pages/Progress";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logIn" element={<LoginPage />} />
        <Route path="/progSignUp" element={<ProgSignUpPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
