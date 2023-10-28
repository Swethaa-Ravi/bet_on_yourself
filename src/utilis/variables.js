let x = 0;

function getSignUpCount() {
  return x;
}

function signUpCountAdder() {
  x = x + 1;
}

export { getSignUpCount, signUpCountAdder };
