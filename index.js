const express = require("express");
const app = express();
const path = require("path");

const authRoute = require("./routes/auth");
const protectedRoute = require("./routes/protected");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
//DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

//Middleware
app.use(cors()); //CORS policy enabled
app.use(express.json()); //Parse JSON

//Route Middlewares
app.use("/auth", authRoute);
app.use("/protected", protectedRoute);
app.listen(PORT, () => {
  console.log("Server is running " + PORT);
});
