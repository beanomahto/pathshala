//express
const express = require("express");
const app = express();
//dotenv
const dotenv = require("dotenv");
dotenv.config();
//cors
const cors = require("cors");
const { corsOptions } = require("./utility/cors.js");
app.use(cors(corsOptions));

//incoming json ko parse karne ke liye to req body
app.use(express.json());

//routes
const apiRoutes = require("./routes/apiRoutes");
const pyqRoutes = require("./routes/pyqRoutes");

//route middlewares
app.use("/api", apiRoutes);
app.use("/api", pyqRoutes);

//listening
app.listen(8000, () => {
  console.log(`server running at port 8000`);
});
