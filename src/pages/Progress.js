import { useState, useEffect } from "react";

import { getId } from "../api/loginDetails";

import {
  getProgEndDate,
  getProgStartDate,
  getNoOfDaysEntered,
} from "../utilis/variables";

import CategoryForm from "../components/categoryForm";

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString(undefined, options);
}

function calculateCurrentDay(startDate) {
  const today = new Date();
  const differenceInTime = today - startDate;
  const differenceInDays =
    Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;
  return differenceInDays;
}

function ProgressPage() {
  const startDate = new Date(getProgStartDate());
  const formattedStartDate = formatDate(startDate);
  const endDate = formatDate(getProgEndDate());
  const noOfDays = getNoOfDaysEntered();
  const currentDay = calculateCurrentDay(startDate);
  const dayButtons = [];
  const [dayVal, setDayVal] = useState(currentDay);
  const [dayData, setDayData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let Id = getId();

  const handleDayButtonClick = (day, Id) => {
    setDayVal(day);

    // Fetch data from the server when a Day x button is pressed
    fetch(`http://localhost:8000/users/${Id}`)
      .then((response) => response.json())
      .then((data) => {
        setDayData(data.programData[day - 1].dayData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleFormSubmit = (updatedCategoryData) => {
    fetch(`http://localhost:8000/users/${Id}`)
      .then((response) => response.json())
      .then((userData) => {
        const updatedUserData = { ...userData };
        const updatedProgramData = [...updatedUserData.programData];

        // Find the specific dayData array to update
        const dayDataIndex = updatedProgramData.findIndex(
          (dayData) => dayData.day === dayVal
        );

        // Update the dayData array for the selected day
        if (dayDataIndex !== -1) {
          updatedProgramData[dayDataIndex].dayData = updatedProgramData[
            dayDataIndex
          ].dayData.map((category) =>
            category.category === updatedCategoryData.category
              ? updatedCategoryData
              : category
          );

          // Update the programData object in the user data
          updatedUserData.programData = updatedProgramData;

          // Send the updated user data to the server
          fetch(`http://localhost:8000/users/${Id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Data successfully updated: ", data);
            })
            .catch((error) => {
              console.error("Error updating data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  };

  useEffect(() => {
    if (currentDay !== 0 && !loaded) {
      setDayVal(currentDay);
      setLoaded(true);
    }
  }, [currentDay, loaded]);

  for (let day = 1; day <= noOfDays; day++) {
    dayButtons.push(
      <button
        key={day}
        onClick={() => {
          handleDayButtonClick(day, Id);
        }}
      >
        Day {day}
      </button>
    );
  }

  return (
    <div>
      <h2>Start Date: {formattedStartDate}</h2>
      <h2>End Date: {endDate}</h2>
      <h2> No. of Days Chosen: {noOfDays}</h2>
      <h2>Today: Day {currentDay}</h2>
      <div>{dayButtons}</div>
      {dayVal !== 0 ? (
        <div>
          <h2>Day {dayVal}</h2>

          <div>
            {dayData.map((category, index) => (
              <div key={index}>
                <h2>{category.title}</h2>
                {category.categorySubmit ? (
                  <p>Great! You have upload for the day</p>
                ) : (
                  <CategoryForm
                    category={category}
                    onFormSubmit={handleFormSubmit}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ProgressPage;
