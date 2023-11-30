import { useState, useEffect } from "react";

import { getId } from "../api/loginDetails";

import {
  getProgEndDate,
  getProgStartDate,
  getNoOfDaysEntered,
} from "../utilis/variables";

import CategoryForm from "../components/categoryForm";

import apiUrl from "../utilis/config";

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
  const endDate = new Date(getProgEndDate());
  const formattedEndDate = formatDate(endDate);
  const noOfDays = getNoOfDaysEntered();
  const currentDay = calculateCurrentDay(startDate);
  const dayButtons = [];
  const [dayVal, setDayVal] = useState(currentDay);
  const [dayData, setDayData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let Id = getId();

  const handleDayButtonClick = (day) => {
    setDayVal(day);

    fetch(apiUrl + `/users/${Id}`)
      .then((response) => response.json())
      .then((data) => {
        setDayData(data.programData[day - 1].dayData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    if (!loaded) {
      handleDayButtonClick(currentDay);
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay, loaded]);

  const handleFormSubmit = (updatedCategoryData) => {
    fetch(apiUrl + `/users/${Id}`)
      .then((response) => response.json())
      .then((userData) => {
        const updatedUserData = { ...userData };
        const updatedProgramData = [...updatedUserData.programData];

        const dayDataIndex = updatedProgramData.findIndex(
          (dayData) => dayData.day === dayVal
        );

        if (dayDataIndex !== -1) {
          updatedProgramData[dayDataIndex].dayData = updatedProgramData[
            dayDataIndex
          ].dayData.map((category) =>
            category.category === updatedCategoryData.category
              ? updatedCategoryData
              : category
          );

          updatedUserData.programData = updatedProgramData;

          fetch(apiUrl + `/users/${Id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
          })
            .then((response) => response.json())
            .then((data) => {
              handleDayButtonClick(dayVal);
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
          handleDayButtonClick(day);
        }}
      >
        Day {day}
      </button>
    );
  }

  return (
    <div>
      <h3>Start Date: {formattedStartDate}</h3>
      <h3>End Date: {formattedEndDate}</h3>
      <h3> No. of Days Chosen: {noOfDays}</h3>
      <h3>Today: Day {currentDay}</h3>
      <div>{dayButtons}</div>
      {dayVal !== 0 ? (
        <div>
          <h2>Day {dayVal}</h2>
          <div>
            {dayData.map((category, index) => (
              <div key={index}>
                <h2>{category.title}</h2>
                {(() => {
                  switch (category.categorySubmit) {
                    case "yet_to_upload":
                      return (
                        <div>
                          <CategoryForm
                            category={category}
                            onFormSubmit={handleFormSubmit}
                          />
                          <p>Update Now</p>
                        </div>
                      );

                    case "processing":
                      return (
                        <div>
                          <h4>Status</h4>
                          <p>Submitted for review</p>
                        </div>
                      );
                    case "verified":
                      return (
                        <div>
                          <h4>Status</h4>
                          <p>Successfully Verified, Keep Going!</p>
                        </div>
                      );
                    case "not_uploaded":
                      return (
                        <div>
                          <h4>Status</h4>
                          <p>Time Exceeded, get back on track</p>
                        </div>
                      );

                    default:
                      return null;
                  }
                })()}
                <h4>Verification</h4>
                <div>{category.categoryStatus ? "✔️" : "❌"}</div>
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
