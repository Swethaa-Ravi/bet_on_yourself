import { Link } from "react-router-dom";
import jeffToAdo from "../assests/images/jeffToAdo.png";
import adoHope from "../assests/images/adonis1.png";
import adoGreatness from "../assests/images/adonis.png";
import adoHand from "../assests/images/adonisHand.png";

function HomePage() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <h2>A No B.S Platform where you can turn your dreams into reality</h2>
      <h2>A Path to Greatness</h2>
      <img
        src={adoGreatness}
        alt="Adonis Greatness"
        style={{ width: "650px", height: "350px" }}
      />
      <h2>A Ray of Hope</h2>
      <img
        src={adoHope}
        alt="Adonis Hope"
        style={{ width: "650px", height: "350px" }}
      />
      <h2>Pick yourself up from the Lowest Point in Life to the Best Ever</h2>
      <img
        src={jeffToAdo}
        alt="Jeffrey To Adonis"
        style={{ width: "650px", height: "350px" }}
      />
      <h2>You are going to bet on yourself</h2>
      <h3>You're gonna pay money</h3>
      <h3>
        And you will only get back the money if you do the things you said you
        will
      </h3>
      <h3>Simple, Cultivate Routine and Get your Money Back</h3>
      <h2>How it works?</h2>
      <h4>1. Choose where you wanna level up</h4>
      <h4>2. Set your goals</h4>
      <h4>3. Pay money</h4>
      <h4>4. Work your way towards it and send us proof</h4>
      <h4>5. Acheive it and get your money back</h4>
      <h2>But Whatif you fail</h2>
      <h4>If you dont show up for more than 5 days, forget your money</h4>
      <h4>
        If you show up and not acheive the subtask, percentage of money will
        detected for every missed target
      </h4>
      <h3>So</h3>
      <img
        src={adoHand}
        alt="Adonis Challenge?"
        style={{ width: "650px", height: "350px" }}
      />
      <br></br>
      <Link to="/progSignUp">
        <button style={{ width: "100px", height: "50px" }}>
          Click here to Sign Up
        </button>
      </Link>
      <Link to="/aboutUs">
        <button>About Us</button>
      </Link>
    </div>
  );
}

export default HomePage;
