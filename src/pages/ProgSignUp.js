import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "../components/SignUp";
import PaymentPortal from "../components/Payment";
import AddnData from "../components/AddnData";
import Category from "../components/Category";

import { getToken } from "../api/tempAuth";

import {
  getAddnDone,
  getCategoryDone,
  getPaymentDone,
  getName,
} from "../api/loginDetails";
import LogIn from "../components/LogIn";

function ProgSignUpPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(getToken());
  const [isAddnDataEnter, setAddnDataEnter] = useState(getAddnDone());
  const [isCategoryEnter, setCategoryEnter] = useState(getCategoryDone());
  const [isPaymentDone, setPaymentDone] = useState(getPaymentDone());

  const getDoneRegistry = () => {
    return getAddnDone() && getCategoryDone() && getPaymentDone() && getToken();
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
            <h3>1 out of 4 steps done!</h3>
          </div>
        ) : (
          <div>
            <SignUp />
            <LogIn
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setAddnDataEnter(getAddnDone());
                setCategoryEnter(getCategoryDone());
                setPaymentDone(getPaymentDone());
              }}
            />
          </div>
        )}
      </div>
      <h2>Step 2</h2>

      {isAddnDataEnter ? (
        <div>
          {" "}
          <div>
            <h3>You have Successfully entered the Additional Details</h3>
            <h3>2 out of 4 steps done!</h3>
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
          <h3>3 out of 4 steps done!</h3>
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
      {isPaymentDone ? (
        <div>
          <h3>Yeah boi!! Payment Received</h3>
          <h3>4 out of 4 steps done!</h3>
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
            <Link to="/progress">
              <button style={{ width: "100px", height: "50px" }}>
                ----⚡----
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgSignUpPage;
