const express = require("express");
const crypto = require("crypto");
const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const app = express();
app.use(express.json());

// Environment
const WEBHOOK_SECRET = "neuroopssecret123";
const REDIS_HOST = process.env.REDIS_HOST || "redis";

// Redis connection
// const connection = new IORedis({
//   host: REDIS_HOST,
//   port: 6379
// });

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: 6379,
  maxRetriesPerRequest: null
});

// Create queue
const prQueue = new Queue("pr-review-queue", { connection });

// Verify GitHub signature
function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest =
    "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(digest)
    );
  } catch {
    return false;
  }
}

// Webhook endpoint
app.post("/webhook", async (req, res) => {
  if (!verifySignature(req)) {
    console.log("Invalid signature attempt");
    return res.status(401).send("Invalid signature");
  }

  const event = req.headers["x-github-event"];

  if (event === "pull_request") {
    const { action, pull_request, repository } = req.body;

    console.log("PR Event Received:", action);

    await prQueue.add("process-pr", {
      action,
      repo: repository.full_name,
      prNumber: pull_request.number,
      title: pull_request.title,
      author: pull_request.user.login
    });

    console.log("PR job added to queue");
  }

  res.status(200).send("Webhook received");
});

// Health route
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "github-service" });
});

app.listen(5001, () => {
  console.log("GitHub Service running on port 5001");
});