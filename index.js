const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connectDB");
const user = require("./routes/user");
const login = require("./routes/login");

const app = express();

// DataBase Connection
connectDB();

// Middlewares
app.use(express.json());
// Routes
app.use("/api/user", user);
app.use("/api/user", login);
// Listen App
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
