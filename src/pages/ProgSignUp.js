import { Link } from "react-router-dom";

function ProgSignUpPage() {
  return (
    <div>
      <div>
        <h1>Welcome to Program SignUp</h1>
      </div>
      <div>
        <h2>Enter Details to Sign Up</h2>
        <h4>First Name</h4>
        <input></input>
        <h4>Last Name</h4>
        <input></input>
        <h4>email Id</h4>
        <input></input>
        <h4>Set up Password</h4>
        <input></input>
        <br></br>
        <button>Create Account</button>
      </div>
      <div>
        <h2>We need to know little more about you</h2>
        <h4>Where do you live</h4>
        <input></input>
        <h4>Age</h4>
        <input></input>
        <h4>What do you do for living</h4>
        <input></input>
        <button>Continue</button>
      </div>
      <div>
        <h2>Where do you want to level up</h2>
        <label>
          <input type="checkbox" /> Sleep
        </label>
        <br />
        <label>
          <input type="checkbox" /> Cardio
        </label>
        <br />
        <label>
          <input type="checkbox" /> Gym
        </label>
        <br />
        <label>
          <input type="checkbox" /> Yoga
        </label>
        <br />
        <label>
          <input type="checkbox" /> Morning Routine
        </label>
        <br />
        <label>
          <input type="checkbox" /> Night Routine
        </label>
        <br />
        <label>
          <input type="checkbox" /> Journaling
        </label>
        <br />
        <label>
          <input type="checkbox" /> Dopamine Detox
        </label>
        <br />
        <button>Continue</button>
      </div>

      <div>
        <h2>Payments</h2>
        <h3>final step of this Program Sign Up</h3>
        <h3>Preferred payment method</h3>
        <h4>Credit Card/Debit Card</h4>
        <h4>UPI</h4>
        <h4>Wallets</h4>
        <h4>EMI/Paylater</h4>
        <div>
          <h4>Click to Start-off your jouney to Greatness</h4>
          <Link to="/progress">
            <button style={{ width: "100px", height: "50px" }}>
              -----⚡-----
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProgSignUpPage;
