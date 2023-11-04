import { useState } from "react";
import { getId } from "../api/loginDetails";
import { updatePaymentDone } from "../utilis/variables";

const PaymentPortal = ({ onPaymentEnterSuccess }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handlePaymentChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePaymentsOption = (event) => {
    event.preventDefault();
    // Fetch the user data by ID from the server
    fetch(`http://localhost:8000/users?id=${getId()}`)
      .then((res) => res.json())
      .then((userData) => {
        // Check if the user exists
        if (userData.length > 0) {
          const existingUser = userData[0];

          // Update the existing user data with additional information
          const updatedUser = {
            ...existingUser,
            selectedOption,
            isPaymentDone: true, // Set isAddnDataEntered to true
          };

          // Send the updated user data to the server
          fetch(`http://localhost:8000/users/${getId()}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedUser),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Sign Up Failed");
              }
              alert("Success!");
              updatePaymentDone(true);
              onPaymentEnterSuccess();
            })
            .catch((err) => {
              alert("Failed: " + err.message);
            });
        } else {
          alert("User not found"); // Handle the case where the user is not found
        }
      })
      .catch((err) => {
        alert("Failed: " + err.message);
      });
  };

  return (
    <div>
      <div>
        <h3>Payments</h3>
        <h4>Choose Your Preferred Payment Method</h4>
        <form onSubmit={handlePaymentsOption}>
          <label>
            <input
              type="radio"
              value="creditdebit"
              checked={selectedOption === "credit_debit"}
              onChange={handlePaymentChange}
            />
            Credit/Debit Card
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="upi"
              checked={selectedOption === "upi"}
              onChange={handlePaymentChange}
            />
            UPI
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="wallets"
              checked={selectedOption === "wallets"}
              onChange={handlePaymentChange}
            />
            Wallets
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="paylater"
              checked={selectedOption === "paylater"}
              onChange={handlePaymentChange}
            />
            Pay Later
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPortal;
