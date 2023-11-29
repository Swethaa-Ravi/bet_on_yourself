import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Modal from "react-modal";

import SignUp from "../components/SignUp";
import PaymentPortal from "../components/Payment";
import AddnData from "../components/AddnData";
import Category from "../components/Category";
import NoOfDays from "../components/NoOfDays";
import programStart from "../components/ProgramStart";

import { getToken } from "../api/tempAuth";
import { getName } from "../api/loginDetails";
import {
  getAddnDone,
  getCategoryDone,
  getPaymentDone,
  getNoOfDaysDone,
  getProgramStart,
} from "../utilis/variables";
import { getNoOfDaysEntered } from "../utilis/variables";
import LogIn from "../components/LogIn";

function ProgSignUpPage() {
  const programStarted = getProgramStart();
  const [isLoggedIn, setIsLoggedIn] = useState(getToken());
  const [isAddnDataEnter, setAddnDataEnter] = useState(getAddnDone());
  const [isCategoryEnter, setCategoryEnter] = useState(getCategoryDone());
  const [isNoOfDaysEnter, setNoOfDays] = useState(getNoOfDaysDone());
  const [isPaymentDone, setPaymentDone] = useState(getPaymentDone());
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [logInVisible, setLogInVisible] = useState(false);

  const [isPrgCnfVisible, setPrgCnfVisible] = useState(false);
  const [isRedirectBtnVisible, setRedirectBtnVisible] = useState(false);

  if (programStarted) {
    return <Navigate to="/progress" />;
  }

  const getDoneRegistry = () => {
    return getAddnDone() && getCategoryDone() && getPaymentDone() && getToken();
  };

  const updateVal = () => {
    programStart(getNoOfDaysEntered(), new Date());
    setRedirectBtnVisible(true);
  };

  const reverseProgCnfVisible = () => {
    if (isPrgCnfVisible) {
      setPrgCnfVisible(false);
    } else {
      setPrgCnfVisible(true);
    }
  };

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

  return (
    <div>
      <div>
        <h1>Welcome to Program SignUp</h1>
      </div>
      <div>
        <h2>Step 1</h2>
        {isLoggedIn ? (
          <div>
            <h3>Hi {getName()}, You have Successfully Logged in!</h3>
            <h3>1 out of 5 steps done!</h3>
          </div>
        ) : (
          <div>
            <h3>Login To Continue</h3>
            <button onClick={reverseSignUpVisible}>Sign Up</button>
            <button onClick={reverseLogInVisible}>Log In</button>
            <Modal isOpen={signUpVisible}>
              <button onClick={() => reverseSignUpVisible()}>X</button>

              <SignUp reverseSignUpVisible={reverseSignUpVisible} />
            </Modal>

            <Modal isOpen={logInVisible}>
              <button onClick={() => reverseLogInVisible()}>X</button>
              <LogIn
                reverseLogInVisible={reverseLogInVisible}
                onLoginSuccess={() => {
                  setIsLoggedIn(true);
                  setAddnDataEnter(getAddnDone());
                  setCategoryEnter(getCategoryDone());
                  setNoOfDays(getNoOfDaysDone());
                  setPaymentDone(getPaymentDone());
                }}
              />
            </Modal>

            {/* <SignUp />
            <LogIn /> */}
          </div>
        )}
      </div>
      <h2>Step 2</h2>

      {isAddnDataEnter ? (
        <div>
          <div>
            <h3>You have Successfully entered the Additional Details</h3>
            <h3>2 out of 5 steps done!</h3>
          </div>
        </div>
      ) : (
        <div>
          <AddnData
            onDataEnterSuccess={() => {
              setAddnDataEnter(getAddnDone());
            }}
          />
        </div>
      )}
      <h2>Step 3</h2>
      {isCategoryEnter ? (
        <div>
          <h3>You have chosen your Path</h3>
          <h3>3 out of 5 steps done!</h3>
        </div>
      ) : (
        <div>
          <Category
            onCategoryEnterSuccess={() => {
              setCategoryEnter(getCategoryDone());
            }}
          />
        </div>
      )}
      <h2>Step 4</h2>
      {isNoOfDaysEnter ? (
        <div>
          <h3>The Number of Days has been Chosen</h3>
          <h3>4 out of 5 steps done!</h3>
        </div>
      ) : (
        <div>
          <NoOfDays
            onDaysEnterSuccess={() => {
              setNoOfDays(getNoOfDaysDone);
            }}
          />
        </div>
      )}
      <h2>Step 5</h2>
      {isPaymentDone ? (
        <div>
          <h3>Yeah boi!! Payment Received</h3>
          <h3>5 out of 5 steps done!</h3>
        </div>
      ) : (
        <div>
          <PaymentPortal
            onPaymentEnterSuccess={() => {
              setPaymentDone(getPaymentDone());
            }}
          />
        </div>
      )}

      <div>
        {getDoneRegistry() && (
          <div>
            {" "}
            <h2>Click to Start-off your journey to Greatness</h2>
            <button
              onClick={reverseProgCnfVisible}
              style={{ width: "130px", height: "55px" }}
            >
              Complete Prog Sign Up
            </button>
            <Modal isOpen={isPrgCnfVisible}>
              <h3>Once Submitted cant be Editted</h3>
              <button
                onClick={updateVal}
                style={{ width: "100px", height: "50px" }}
              >
                ----⚡----
              </button>
              {isRedirectBtnVisible ? (
                <div>
                  <Link to="/progress">
                    <button>Go to Progress Page</button>
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgSignUpPage;
