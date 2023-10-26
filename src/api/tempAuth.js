let authToken = false;

function updateToken(value) {
  authToken = value;
}

function getToken() {
  return authToken;
}

export { updateToken, getToken };
