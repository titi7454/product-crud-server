const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
//Connect to database
connectDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/products", require("./routes/product"));

//start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`The server is running`);
});
