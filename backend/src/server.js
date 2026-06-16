require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const careerRoutes = require("./routes/careerRoutes");
const simulationRoutes = require("./routes/simulationRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/simulations", simulationRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PathU+ API funcionando correctamente"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});