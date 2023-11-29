import { useState } from "react";

const SignUp = ({ reverseSignUpVisible }) => {
  const initialFormData = {
    fname: "",
    lname: "",
    id: "",
    password: "",
    isAddnDataEntered: false,
    isCategoryAdded: false,
    isNoOfDaysEntered: false,
    isPaymentDone: false,
    isProgramStart: false,
    programData: [],
  };

  const [signUpForm, setSignUpData] = useState(initialFormData);

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpData({ ...signUpForm, [name]: value });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setSignUpData(initialFormData); // Clear the form after submission

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(signUpForm),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sign Up Failed"); // Throw an error if the response is not OK
        }
        // alert("Sign Up Successful");
        reverseSignUpVisible();
      })
      .catch((err) => {
        console.log("Failed: " + err.message); // Set the error message in the state
      });
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={signUpForm.fname}
            onChange={handleSignUpChange}
          />
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={signUpForm.lname}
            onChange={handleSignUpChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="id"
            value={signUpForm.id}
            onChange={handleSignUpChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signUpForm.password}
            onChange={handleSignUpChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
