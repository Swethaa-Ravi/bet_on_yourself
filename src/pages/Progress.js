import React from "react";
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

  return (
    <div>
      <h3> No. of Days Chosen: {noOfDays}</h3>
      <h3>Start Date: {formattedStartDate}</h3>
      <h3>End Date: {endDate}</h3>
      <h3>Current Day: Day {currentDay}</h3>
    </div>
  );
}

export default ProgressPage;
