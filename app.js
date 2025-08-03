const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const userApis = require("./routes/user.routes.js");
const taskApis = require("./routes/task.routes.js");

require('dotenv').config();
const FE_LINK = process.env.FE_WEBSITE_LINK;
console.log(`${process.env.FE_WEBSITE_LINK}`);
const app = express();
app.use(cors({
  origin:FE_LINK ,
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

PORT = process.env.PORT;

//DataBase Connection
connectDB();

//Routes
app.get("/",(req,res)=>{
  res.json(
    {
    message: "hello world"
  }
  )
})
//API
app.use("/api/v1", userApis);
app.use("/api/v1", taskApis);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});


