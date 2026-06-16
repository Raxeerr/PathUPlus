const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getRecommendations,
  getAllCareers
} = require("../controllers/careerController");

router.get(
  "/",
  getAllCareers
);

router.get(
  "/recommendations",
  authMiddleware,
  getRecommendations
);

module.exports = router;