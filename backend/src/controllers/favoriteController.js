const db = require("../config/db");

const addFavorite = async (req, res) => {

  try {

    const userId = req.user.id;
    const { carrera_id } = req.body;


    const [exists] = await db.query(
      `
      SELECT *
      FROM favoritos
      WHERE usuario_id = ?
      AND carrera_id = ?
      `,
      [userId, carrera_id]
    );

    if (exists.length > 0) {

      return res.json({
        success: true
      });

    }

    await db.query(
      `
      INSERT INTO favoritos
      (
        usuario_id,
        carrera_id
      )
      VALUES (?, ?)
      `,
      [userId, carrera_id]
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


const removeFavorite = async (req, res) => {

  try {

    const userId = req.user.id;

    const carreraId =
      req.params.carreraId;

    await db.query(
      `
      DELETE FROM favoritos
      WHERE usuario_id = ?
      AND carrera_id = ?
      `,
      [userId, carreraId]
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getFavorites = async (req, res) => {

  try {

    const userId = req.user.id;

    const [rows] = await db.query(
`
SELECT
  f.id,
  c.id AS carrera_id,
  c.nombre,
  c.descripcion
FROM favoritos f
INNER JOIN carreras c
ON f.carrera_id = c.id
WHERE f.usuario_id = ?
`,
[userId]
);

    res.json({
      success: true,
      favorites: rows
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite
};