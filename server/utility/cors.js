const cors = require("cors");

//integration
//frontend ke url's
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

module.exports = { corsOptions };
