const express = require("express");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: process.env.SERVICE_NAME || "unknown" });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
