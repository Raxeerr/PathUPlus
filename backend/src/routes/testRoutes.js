const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getQuestions,
  submitTest,
  getMyResult
} = require("../controllers/testController");

router.get(
  "/questions",
  authMiddleware,
  getQuestions
);

router.get(
  "/my-result",
  authMiddleware,
  getMyResult
);

router.post(
  "/submit",
  authMiddleware,
  submitTest
);

module.exports = router;