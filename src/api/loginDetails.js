let logName = "";
let logId = "";

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

export { updateName, getName, updateId, getId };
