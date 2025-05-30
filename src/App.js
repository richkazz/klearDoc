import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VerificationPage from "./features/verification/VerificationPage";
import ResultPage from "./pages/ResultPage";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import VerificationStatus from "./pages/VerificationStatus";
import TokenResult from "./pages/TokenResult";
import IdentityChallengePage from "./features/identityChallenge/IdentityChallengePage";
import LandingPage from "./pages/LandingPage"; // Import LandingPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />{" "}
        {/* Landing Page as root */}
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/status" element={<VerificationStatus />} />
        <Route path="/token" element={<TokenResult />} />
        <Route path="/challenge/:kdid" element={<IdentityChallengePage />} />
      </Routes>
    </Router>
  );
}

export default App;
