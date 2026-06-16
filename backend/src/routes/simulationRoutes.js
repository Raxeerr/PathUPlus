const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  saveSimulation,
  getMyProgress,
  getMySimulations
} = require("../controllers/simulationController");

router.post(
  "/",
  authMiddleware,
  saveSimulation
);

router.get(
  "/my-progress",
  authMiddleware,
  getMyProgress
);

router.get(
  "/my-simulations",
  authMiddleware,
  getMySimulations
);

module.exports = router;