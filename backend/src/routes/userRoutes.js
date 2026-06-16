const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db");

router.get("/profile", authMiddleware, async (req, res) => {

  const [users] = await db.query(
    `SELECT id,nombre,apellido,correo,edad
     FROM usuarios
     WHERE id = ?`,
    [req.user.id]
  );

  res.json(users[0]);
});

module.exports = router;