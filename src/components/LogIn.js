import { useState } from "react";
import { updateToken } from "../api/tempAuth";
import { updateName, updateId } from "../api/loginDetails";
import {
  updateAddnDone,
  updateCategoryDone,
  updatePaymentDone,
  updateNoOfDaysDone,
  updateProgramStart,
  updateProgStartDate,
  updateProgEndDate,
  updateNoOfDaysEntered,
} from "../utilis/variables";

import apiUrl from "../utilis/config";

const LogIn = ({ reverseLogInVisible, onLoginSuccess }) => {
  const [loginForm, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...loginForm, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetch(apiUrl + "/users/" + loginForm.email)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        if (Object.keys(resp).length === 0) {
          alert("Enter Valid User!");
        } else {
          if (loginForm.password === resp.password) {
            // alert("Verification Successful");
            reverseLogInVisible();
            updateToken(true);
            updateName(resp.fname);
            updateId(resp.id);
            updateAddnDone(resp.isAddnDataEntered);
            updateCategoryDone(resp.isCategoryAdded);
            updateNoOfDaysDone(resp.isNoOfDaysEntered);
            updatePaymentDone(resp.isPaymentDone);
            updateProgramStart(resp.isProgramStart);
            updateProgStartDate(resp.programStartDateTime);
            updateProgEndDate(resp.programEndDateTime);
            updateNoOfDaysEntered(resp.selectedNoOfDays);
            onLoginSuccess();
          } else {
            alert("Email & Password doesn't match");
          }
        }
      })
      .catch((err) => {
        console.log("Login Failed due to: " + err.message);
      });
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginForm.email}
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleLoginChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LogIn;
