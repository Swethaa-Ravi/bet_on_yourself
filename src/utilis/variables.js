let NoOfDaysEntered = 0;
let ProgStartDate = "";
let ProgEndDate = "";

function updateNoOfDaysEntered(value) {
  NoOfDaysEntered = value;
}

function getNoOfDaysEntered() {
  return NoOfDaysEntered;
}

function updateProgStartDate(value) {
  ProgStartDate = value;
}

function getProgStartDate() {
  return ProgStartDate;
}

function updateProgEndDate(value) {
  ProgEndDate = value;
}

function getProgEndDate() {
  return ProgEndDate;
}

export {
  updateNoOfDaysEntered,
  getNoOfDaysEntered,
  updateProgStartDate,
  getProgStartDate,
  updateProgEndDate,
  getProgEndDate,
};
