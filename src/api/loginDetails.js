let logName = "";
let logId = "";
let AddnDone = false;
let CategoryDone = false;
let DaysDone = false;
let PaymentDone = false;

function updateName(value) {
  logName = value;
}

function getName() {
  return logName;
}

function updateId(value) {
  logId = value;
}

function getId() {
  return logId;
}

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

export {
  updateName,
  getName,
  updateId,
  getId,
  updateAddnDone,
  getAddnDone,
  updateCategoryDone,
  getCategoryDone,
  updateNoOfDaysDone,
  getNoOfDaysDone,
  updatePaymentDone,
  getPaymentDone,
};
