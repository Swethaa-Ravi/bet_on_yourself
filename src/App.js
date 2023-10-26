import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutUsPage from "./pages/AboutUs";
import ProgressPage from "./pages/Progress";
import PrivateRoutes from "./utilis/privateRoutes";
import ProgSignUpPage from "./pages/ProgSignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/progSignUp" element={<ProgSignUpPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/progress" element={<ProgressPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
