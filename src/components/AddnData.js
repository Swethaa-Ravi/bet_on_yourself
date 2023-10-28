import { useState } from "react";

import { updateAddnDone } from "../api/loginDetails";

import { getId } from "../api/loginDetails";

import { signUpCountAdder } from "../utilis/variables";

const AddnData = ({ onDataEnterSuccess }) => {
  const initialAddnForm = {
    age: "",
    occupation: "",
    location: "",
  };

  const [addnDataForm, setAddnData] = useState(initialAddnForm);

  const handleAddnChange = (event) => {
    const { name, value } = event.target;
    setAddnData({ ...addnDataForm, [name]: value });
  };

  const handleAddnData = (event) => {
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
            addnInfo: {
              location: addnDataForm.location,
              age: addnDataForm.age,
              occupation: addnDataForm.occupation,
            },
            isAddnDataEntered: true, // Set isAddnDataEntered to true
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
              updateAddnDone(true);
              signUpCountAdder();
              onDataEnterSuccess();
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
        <h3>We need to know little more about you</h3>
        <form onSubmit={handleAddnData}>
          <h4>Where do you live</h4>
          <input
            type="text"
            name="location"
            value={addnDataForm.location}
            onChange={handleAddnChange}
          />
          <h4>Age</h4>
          <input
            type="number"
            name="age"
            value={addnDataForm.age}
            onChange={handleAddnChange}
          ></input>
          <h4>What do you do for living</h4>
          <input
            type="text"
            name="occupation"
            value={addnDataForm.occupation}
            onChange={handleAddnChange}
          ></input>
          <button>Continue</button>
        </form>
      </div>
    </div>
  );
};

export default AddnData;
