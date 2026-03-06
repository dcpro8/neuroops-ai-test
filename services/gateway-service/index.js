const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected in gateway"))
  .catch((err) => console.error("Mongo connection error:", err));

// Schema
const PRSchema = new mongoose.Schema({
  action: String,
  repo: String,
  prNumber: Number,
  title: String,
  author: String,
  aiReview: String,
  riskScore: Number,
  createdAt: { type: Date, default: Date.now },
});

const PR = mongoose.model("PullRequest", PRSchema);

// Routes
const prsRoutes = require("./routes/prs")(PR);
const analyticsRoutes = require("./routes/analytics")(PR);
const repoAnalyticsRoutes = require("./routes/repos")(PR);
const intelligenceRoutes = require("./routes/intelligence")(PR);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "gateway-service" });
});

app.use("/api/prs", prsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/analytics/repos", repoAnalyticsRoutes);
app.use("/api/analytics/intelligence", intelligenceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
