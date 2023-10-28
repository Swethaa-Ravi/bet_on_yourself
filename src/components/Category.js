import { useState } from "react";

import { getId, updateCategoryDone } from "../api/loginDetails";

import { signUpCountAdder } from "../utilis/variables";

const Category = ({ onCategoryEnterSuccess }) => {
  const initialCategoryForm = {
    sleep: false,
    cardio: false,
    gym: false,
    yoga: false,
    morningRoutine: false,
    journaling: false,
    dopamineDetox: false,
  };

  const [categoryData, setCategoryData] = useState(initialCategoryForm);

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCategoryData({ ...categoryData, [name]: checked });
  };
  const handleCategorySubmit = (event) => {
    event.preventDefault();
    const selectedCategories = Object.keys(categoryData).filter(
      (category) => categoryData[category]
    );

    // Fetch the user data by ID from the server
    fetch(`http://localhost:8000/users?id=${getId()}`)
      .then((res) => res.json())
      .then((userData) => {
        // Check if the user exists
        if (userData.length > 0) {
          const existingUser = userData[0];

          // Update the existing user data with selected categories
          const updatedUser = {
            ...existingUser,
            selectedCategories: selectedCategories,
            isCategoryAdded: true,
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
              updateCategoryDone(true);
              signUpCountAdder();
              onCategoryEnterSuccess();
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
        <h3>Where do you want to level up</h3>
        <form onSubmit={handleCategorySubmit}>
          <label>
            <input
              type="checkbox"
              name="sleep"
              checked={categoryData.sleep}
              onChange={handleCategoryChange}
            />
            Sleep
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="cardio"
              checked={categoryData.cardio}
              onChange={handleCategoryChange}
            />
            Cardio
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="gym"
              checked={categoryData.gym}
              onChange={handleCategoryChange}
            />
            Gym
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="yoga"
              checked={categoryData.yoga}
              onChange={handleCategoryChange}
            />
            Yoga
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="morningRoutine"
              checked={categoryData.morningRoutine}
              onChange={handleCategoryChange}
            />
            Morning Routine
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="journaling"
              checked={categoryData.journaling}
              onChange={handleCategoryChange}
            />
            Journaling
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="dopamineDetox"
              checked={categoryData.dopamineDetox}
              onChange={handleCategoryChange}
            />
            Dopamine Detox
          </label>
          <br />
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Category;
