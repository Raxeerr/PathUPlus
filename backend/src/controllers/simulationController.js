const db = require("../config/db");

const getMyProgress = async (req, res) => {

  try {

    const userId = req.user.id;

    const [rows] = await db.query(
      `
      SELECT COUNT(
        DISTINCT simulacion_id
      ) AS total
      FROM resultados_simulacion
      WHERE usuario_id = ?
      `,
      [userId]
    );

    res.json({
      success: true,
      completed: rows[0].total
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getMySimulations = async (req, res) => {

  try {

    const userId = req.user.id;

    const [rows] = await db.query(
      `
      SELECT
        rs.id,
        rs.puntaje,
        rs.fecha,
        s.nombre
      FROM resultados_simulacion rs
      INNER JOIN simulaciones s
      ON rs.simulacion_id = s.id
      WHERE rs.usuario_id = ?
      ORDER BY rs.fecha DESC
      `,
      [userId]
    );

    res.json({
      success: true,
      simulations: rows
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const saveSimulation = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      simulacion_id,
      puntaje,
      observaciones
    } = req.body;

    await db.query(
      `
      INSERT INTO resultados_simulacion
      (
        usuario_id,
        simulacion_id,
        puntaje,
        observaciones
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        userId,
        simulacion_id,
        puntaje,
        observaciones
      ]
    );

    res.json({
      success: true
    });

  } catch (error) {

  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message
  });

}

};

module.exports = {
  saveSimulation,
  getMyProgress,
  getMySimulations
};