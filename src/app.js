import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// ✅ 1. Security
app.use(helmet());

// ✅ 2. Enable CORS (allow only frontend domain)
app.use(cors({
  origin: ["http://localhost:5000"], // Replace with your frontend URL
  credentials: true,
}));

// ✅ 3. Body Parser
app.use(express.json());

// ✅ 4. Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ✅ 5. Rate Limiting (Protects API)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { message: "Too many requests, please try again later." },
});
app.use(limiter);

// ✅ 6. Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ 7. Health Check Route (Optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
