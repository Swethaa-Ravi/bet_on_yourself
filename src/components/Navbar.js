import { Link } from "react-router-dom";
// import LoginSignupForm from "./LoginSignUpForm";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const Navbar = () => {
  return (
    <nav>
      <h1>Bet On Self</h1>
      <Link to="/aboutUs">
        <button>About Us</button>
      </Link>

      <SignUp />
      <LogIn />
    </nav>
  );
};

export default Navbar;
