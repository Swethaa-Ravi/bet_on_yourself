import Modal from "react-modal";
import { useState } from "react";

const LogIn = () => {
  const [visible, setVisible] = useState(false);

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
            console.log("Verification Sucessful");
          }
        }
      })
      .catch((err) => {
        console.log("Login Failed due to: " + err.message);
      });
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Log In</button>
      <Modal isOpen={visible}>
        <button onClick={() => setVisible(false)}>X</button>
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
      </Modal>
    </div>
  );
};

export default LogIn;
