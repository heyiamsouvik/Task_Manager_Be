const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const userApis = require("./routes/user.routes.js");
const taskApis = require("./routes/task.routes.js");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

PORT = process.env.PORT;

//DataBase Connection
connectDB();

//Routes

//API
app.use("/api/v1", userApis);
app.use("/api/v1", taskApis);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
