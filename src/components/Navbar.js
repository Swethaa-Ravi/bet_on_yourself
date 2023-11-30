import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState, useEffect } from "react";

import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { getToken, updateToken } from "../api/tempAuth";
import { getName, updateName, updateId } from "../api/loginDetails";
import { updateProgramStart, getProgramStart } from "../utilis/variables";

Modal.setAppElement("#root");

const Navbar = () => {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [logInVisible, setLogInVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(getToken());

  const [isProgramStart, setProgramStart] = useState(getProgramStart());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAndSetToken = () => {
    setIsLoggedIn(getToken());
  };

  useEffect(() => {
    getAndSetToken();
  }, [getAndSetToken]);

  useEffect(() => {
    const getAndSetToken = () => {
      const newProgramStart = getProgramStart();

      setProgramStart(newProgramStart);
    };

    getAndSetToken();

    const intervalId = setInterval(() => {
      getAndSetToken();
    }, 100);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reverseSignUpVisible = () => {
    if (signUpVisible) {
      setSignUpVisible(false);
    } else {
      setSignUpVisible(true);
    }
  };

  const reverseLogInVisible = () => {
    if (logInVisible) {
      setLogInVisible(false);
    } else {
      setLogInVisible(true);
    }
  };

  const handleSignOut = () => {
    updateToken(false);
    setIsLoggedIn(false);
    updateId(null);
    updateName(null);
    updateProgramStart(false);
  };

  return (
    <nav>
      {isProgramStart ? (
        <div>
          <Link to="/progress">
            <button style={{ width: "280px", height: "30px" }}>
              Click here to Proceed to Progress Page
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/progSignUp">
            <button style={{ width: "200px", height: "25px" }}>
              Start off your Program Now!
            </button>
          </Link>
        </div>
      )}

      {/* <Link to="/aboutUs">
        <button>About Us</button>
      </Link> */}

      {isLoggedIn ? (
        <div>
          <h4>Hi {getName()} !</h4>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={reverseSignUpVisible}>Sign Up</button>
          <button onClick={reverseLogInVisible}>Log In</button>
        </div>
      )}

      <Modal isOpen={signUpVisible}>
        <button onClick={() => reverseSignUpVisible()}>X</button>

        <SignUp reverseSignUpVisible={reverseSignUpVisible} />
      </Modal>

      <Modal isOpen={logInVisible}>
        <button onClick={() => reverseLogInVisible()}>X</button>
        <LogIn reverseLogInVisible={reverseLogInVisible} />
      </Modal>
    </nav>
  );
};

export default Navbar;
