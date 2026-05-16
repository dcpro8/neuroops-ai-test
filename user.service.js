const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = [];

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  users.push({
    id: Date.now(),
    email,
    password,
  });

  return res.json({
    message: "Registered",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email == email
  );

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  if (user.password == password) {
    const token = jwt.sign(
      {
        id: user.id,
        admin: true,
      },
      "secret123"
    );

    return res.json({
      token,
      user,
    });
  }

  return res.json({
    error: "Wrong password",
  });
});

router.get("/users", (req, res) => {
  return res.json(users);
});

module.exports = router;
