import { useState } from "react";

import { getId } from "../api/loginDetails";

import {
  getProgEndDate,
  getProgStartDate,
  getNoOfDaysEntered,
} from "../utilis/variables";

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
  const [dayVal, setDayVal] = useState(0);
  const [dayData, setDayData] = useState([]);
  let Id = getId();

  const handleDayButtonClick = (day, Id) => {
    setDayVal(day);

    // Fetch data from the server when a Day x button is pressed
    fetch(`http://localhost:8000/users/${Id}`)
      .then((response) => response.json())
      .then((data) => {
        setDayData(data.programData[day - 1].dayData);
        console.log(dayData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

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
          {dayData.map((category, index) => (
            <div key={index}>
              <h3>{category.category}</h3>
              <input type="text" placeholder="Enter URL" />
              <button>Upload</button>
              <br></br>
              {category.categoryStatus ? "✔️" : "❌"}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ProgressPage;
