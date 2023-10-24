import Modal from "react-modal";
import { useState } from "react";

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const initialFormData = {
    name: "",
    id: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Log the form data
    setFormData(initialFormData); // Clear the form after submission

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log("Registered successfully.");
      })
      .catch((err) => {
        console.log("Failed :" + err.message);
      });
  };
  return (
    <div>
      <button onClick={() => setVisible(true)}>Sign In</button>
      <Modal isOpen={visible}>
        <button onClick={() => setVisible(false)}>X</button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="id"
              value={formData.id}
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
          <button type="submit">Update Data</button>
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
