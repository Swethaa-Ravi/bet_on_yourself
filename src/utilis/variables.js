let NoOfDaysEntered = 0;
let ProgStartDate = "";
let ProgEndDate = "";
let CategoryEntered = [];
let AddnDone = false;
let CategoryDone = false;
let DaysDone = false;
let PaymentDone = false;
let ProgramStart = false;

function updateAddnDone(value) {
  AddnDone = value;
}

function getAddnDone() {
  return AddnDone;
}

function updateCategoryDone(value) {
  CategoryDone = value;
}

function getCategoryDone() {
  return CategoryDone;
}

function updateNoOfDaysDone(value) {
  DaysDone = value;
}

function getNoOfDaysDone() {
  return DaysDone;
}

function updatePaymentDone(value) {
  PaymentDone = value;
}

function getPaymentDone() {
  return PaymentDone;
}

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

function updateCategoryEntered(value) {
  CategoryEntered = value;
}

function getCategoryEntered() {
  return CategoryEntered;
}

function updateProgramStart(value) {
  ProgramStart = value;
}

function getProgramStart() {
  return ProgramStart;
}

export {
  updateNoOfDaysEntered,
  getNoOfDaysEntered,
  updateProgStartDate,
  getProgStartDate,
  updateProgEndDate,
  getProgEndDate,
  updateAddnDone,
  updateCategoryEntered,
  getCategoryEntered,
  getAddnDone,
  updateCategoryDone,
  getCategoryDone,
  updateNoOfDaysDone,
  getNoOfDaysDone,
  updatePaymentDone,
  getPaymentDone,
  updateProgramStart,
  getProgramStart,
};
