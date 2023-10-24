const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.post("/updateData", (req, res) => {
  const updatedData = req.body;

  // Update the JSON file with updatedData
  fs.writeFileSync("userBase.json", JSON.stringify(updatedData));

  res.json({ message: "Data updated successfully" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
