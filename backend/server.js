const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow all origins (for now, simplest)
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/adagency")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// schema
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String
});

// test route
app.get("/", (req, res) => {
  res.send("OK");
});

// contact route
app.post("/contact", async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ message: "All fields required" });
  }

  await Contact.create({ name, email, message });

  res.json({ message: "Saved successfully" });
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
