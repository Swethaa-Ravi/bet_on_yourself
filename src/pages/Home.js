import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <h2>A No B.S Platform where you can turn your dreams into reality</h2>
      <Link to="/logIn">
        <button>Login</button>
      </Link>
      <Link to="/signUp">
        <button>SignUp</button>
      </Link>
      <Link to="/aboutUs">
        <button>About Us</button>
      </Link>
    </div>
  );
}

export default HomePage;
