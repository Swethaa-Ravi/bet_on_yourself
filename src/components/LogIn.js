import { useState } from "react";
import { updateToken } from "../api/tempAuth";
import { getName, updateName } from "../api/loginDetails";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Log the login data

    fetch("http://localhost:8000/users/" + formData.email)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        if (Object.keys(resp).length === 0) {
          console.log("Enter Valid User!");
        } else {
          if (formData.password === resp.password) {
            alert("Verification Sucessful");
            updateToken(true);
            updateName(resp.fname);
            console.log(getName());
          }
        }
      })
      .catch((err) => {
        console.log("Login Failed due to: " + err.message);
      });
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LogIn;
