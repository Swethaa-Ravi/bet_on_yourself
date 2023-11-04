import { getId } from "../api/loginDetails";

import { updateProgStartDate, updateProgEndDate } from "../utilis/variables";

function getCurrentAndFutureDateTime(x, y) {
  const startDate = new Date(y);
  const endDate = new Date(startDate.getTime() + x * 24 * 60 * 60 * 1000);

  return [startDate, endDate];
}

const programStart = (NoOfDays, date) => {
  const dateTimeInfo = getCurrentAndFutureDateTime(NoOfDays, date);
  fetch(`http://localhost:8000/users?id=${getId()}`)
    .then((res) => res.json())
    .then((userData) => {
      if (userData.length > 0) {
        const existingUser = userData[0];

        const updatedUser = {
          ...existingUser,
          isProgramStart: true,
          programStartDateTime: dateTimeInfo[0],
          programEndDateTime: dateTimeInfo[1],
        };

        fetch(`http://localhost:8000/users/${getId()}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Sign Up Failed");
            }
            updateProgStartDate(dateTimeInfo[0]);
            updateProgEndDate(dateTimeInfo[1]);
            alert("Program Sign Up Successful!");
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

export default programStart;
