const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes"); // Import the router

dotenv.config();
const app = express();

// app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/", router); // Use the router

// app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));