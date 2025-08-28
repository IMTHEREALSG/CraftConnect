const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");
const communityRoutes = require("./Routes/communityRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const analyticsRoutes = require("./Routes/analyticsRoutes");

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://craft-connect-tau.vercel.app", // no trailing slash
  "http://localhost:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true); // e.g., curl, Postman
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // set to false if you never use cookies/credentials
  })
);

// Ensure preflight requests are handled
app.options("*", cors());
// app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error(err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
