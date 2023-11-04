import { useState } from "react";

import { updateNoOfDaysDone } from "../api/loginDetails";

import { getId } from "../api/loginDetails";

import { updateNoOfDaysEntered } from "../utilis/variables";

const NoOfDays = ({ onDaysEnterSuccess }) => {
  const initialAddnForm = {
    noOfDays: 0,
  };

  const [selectedOption, setSelectedOption] = useState(initialAddnForm);

  const handleDaysChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDaysOption = (event) => {
    event.preventDefault();
    // Fetch the user data by ID from the server
    fetch(`http://localhost:8000/users?id=${getId()}`)
      .then((res) => res.json())
      .then((userData) => {
        // Check if the user exists
        if (userData.length > 0) {
          const existingUser = userData[0];

          // Update the existing user data with additional information
          const updatedUser = {
            ...existingUser,
            isNoOfDaysEntered: true,
            selectedNoOfDays: selectedOption,
          };

          // Send the updated user data to the server
          fetch(`http://localhost:8000/users/${getId()}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedUser),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Sign Up Failed");
              }
              alert("Success!");
              updateNoOfDaysDone(true);
              updateNoOfDaysEntered(selectedOption);
              onDaysEnterSuccess();
            })
            .catch((err) => {
              alert("Failed: " + err.message);
            });
        } else {
          alert("User not found"); // Handle the case where the user is not found
        }
      })
      .catch((err) => {
        alert("Failed: " + err.message);
      });
  };

  return (
    <div>
      <div>
        <h3>Days</h3>
        <h4>Choose No. of Days</h4>
        <form onSubmit={handleDaysOption}>
          <label>
            <input
              type="radio"
              value="21"
              checked={selectedOption === "21"}
              onChange={handleDaysChange}
            />
            21
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="14"
              checked={selectedOption === "14"}
              onChange={handleDaysChange}
            />
            14
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="7"
              checked={selectedOption === "7"}
              onChange={handleDaysChange}
            />
            7
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NoOfDays;
