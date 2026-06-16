const db = require("../config/db");

const getRecommendations = async (req, res) => {
  try {

    const userId = req.user.id;

    const [results] = await db.query(
      `SELECT *
       FROM resultados_test
       WHERE usuario_id = ?
       ORDER BY fecha DESC
       LIMIT 1`,
      [userId]
    );

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No existen resultados del test"
      });
    }

    const perfil = results[0].perfil_dominante;

    let carreras = [];

    switch (perfil) {

      case "Tecnologia":
        carreras = [
          "Ingeniería de Sistemas",
          "Desarrollo de Software",
          "Ciencia de Datos"
        ];
        break;

      case "Creatividad":
        carreras = [
          "Diseño Gráfico",
          "Publicidad",
          "Comunicación Social"
        ];
        break;

      case "Social":
        carreras = [
          "Psicología",
          "Trabajo Social",
          "Pedagogía"
        ];
        break;

      case "Administracion":
        carreras = [
          "Administración de Empresas",
          "Negocios Internacionales",
          "Mercadeo"
        ];
        break;

      case "Ingenieria":
        carreras = [
          "Ingeniería Civil",
          "Ingeniería Industrial",
          "Arquitectura"
        ];
        break;

      default:
        carreras = ["Explora más opciones"];
    }

    res.json({
      success: true,
      perfil,
      carreras
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



const getAllCareers = async (req, res) => {
  try {

    const [rows] = await db.query(`
  SELECT
    c.id,
    c.nombre,
    c.descripcion,
    c.duracion,
    c.area,
    c.universidades,
    c.imagen,

    e.salario_promedio,
    e.salario_experiencia,
    e.demanda_laboral,
    e.empleabilidad,
    e.crecimiento_sector,
    e.habilidades,
    e.sectores

  FROM carreras c

  LEFT JOIN estadisticas_laborales e
  ON c.id = e.carrera_id

  ORDER BY c.nombre
`);

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getRecommendations,
  getAllCareers
};