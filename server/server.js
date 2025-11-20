const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const apiRoutes = require("./routes/apiRoutes");

//integration
const allowedOrigins = [
  "http://localhost:5173",
  "https://pathshala-blond.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  maxAge: 600,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", apiRoutes);

//listening
app.listen(8000, () => {
  console.log(`server running at port 8000`);
});
