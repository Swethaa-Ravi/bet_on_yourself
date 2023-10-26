let logName = "";

function updateName(value) {
  logName = value;
}

function getName() {
  return logName;
}

export { updateName, getName };
