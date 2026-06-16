const db = require("../config/db");
const getMyResult = async (req, res) => {

  try {

    const userId = req.user.id;

    const [result] = await db.query(
      `
      SELECT *
      FROM resultados_test
      WHERE usuario_id = ?
      ORDER BY id DESC
      LIMIT 1
      `,
      [userId]
    );

    if (result.length === 0) {

      return res.json({
        success: true,
        result: null
      });

    }

    const row = result[0];

    const total =
      row.tecnologia +
      row.creatividad +
      row.investigacion +
      row.social +
      row.administracion +
      row.ingenieria;

    const compatibilidades = {

  "Ingeniería de Sistemas":
    Math.round(
      (
        (
          row.tecnologia * 0.7 +
          row.ingenieria * 0.3
        ) / 25
      ) * 100
    ),

  "Ingeniería Civil":
    Math.round(
      (
        (
          row.ingenieria * 0.7 +
          row.investigacion * 0.3
        ) / 25
      ) * 100
    ),

  "Psicología":
    Math.round(
      (
        (
          row.social * 0.7 +
          row.investigacion * 0.3
        ) / 25
      ) * 100
    ),

  "Administración":
    Math.round(
      (
        (
          row.administracion * 0.8 +
          row.social * 0.2
        ) / 25
      ) * 100
    ),

  "Diseño Gráfico":
    Math.round(
      (
        (
          row.creatividad * 0.8 +
          row.social * 0.2
        ) / 25
      ) * 100
    ),

  "Comunicación Social":
    Math.round(
      (
        (
          row.social * 0.6 +
          row.creatividad * 0.4
        ) / 25
      ) * 100
    )

};

    res.json({
      success: true,
      compatibilidades
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getQuestions = async (req, res) => {
  try {

    const [questions] = await db.query(
      "SELECT * FROM preguntas_test"
    );

    res.json(questions);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const submitTest = async (req, res) => {
  try {

    const userId = req.user.id;
    const { respuestas } = req.body;

    const scores = {
      Tecnologia: 0,
      Creatividad: 0,
      Investigacion: 0,
      Social: 0,
      Administracion: 0,
      Ingenieria: 0
    };

    for (const respuesta of respuestas) {

      const [pregunta] = await db.query(
        "SELECT categoria FROM preguntas_test WHERE id = ?",
        [respuesta.pregunta_id]
      );

      if (pregunta.length > 0) {

        const categoria = pregunta[0].categoria;

        if (scores[categoria] !== undefined) {
          scores[categoria] += respuesta.valor;
        }

      }
    }

    let perfilDominante = "";
    let mayor = 0;

    Object.entries(scores).forEach(([categoria, valor]) => {

      if (valor > mayor) {
        mayor = valor;
        perfilDominante = categoria;
      }

    });

    await db.query(
      `INSERT INTO resultados_test
      (
        usuario_id,
        perfil_dominante,
        tecnologia,
        creatividad,
        investigacion,
        social,
        administracion,
        ingenieria
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        perfilDominante,
        scores.Tecnologia,
        scores.Creatividad,
        scores.Investigacion,
        scores.Social,
        scores.Administracion,
        scores.Ingenieria
      ]
    );

    const total =
  Object.values(scores)
  .reduce((acc, val) => acc + val, 0);

const compatibilidades = {

  "Ingeniería de Sistemas":
    Math.round(
      (
        (
          scores.Tecnologia * 0.7 +
          scores.Ingenieria * 0.3
        ) / 25
      ) * 100
    ),

  "Ingeniería Civil":
    Math.round(
      (
        (
          scores.Ingenieria * 0.7 +
          scores.Investigacion * 0.3
        ) / 25
      ) * 100
    ),

  "Psicología":
    Math.round(
      (
        (
          scores.Social * 0.7 +
          scores.Investigacion * 0.3
        ) / 25
      ) * 100
    ),

  "Administración":
    Math.round(
      (
        (
          scores.Administracion * 0.8 +
          scores.Social * 0.2
        ) / 25
      ) * 100
    ),

  "Diseño Gráfico":
    Math.round(
      (
        (
          scores.Creatividad * 0.8 +
          scores.Social * 0.2
        ) / 25
      ) * 100
    ),

  "Comunicación Social":
    Math.round(
      (
        (
          scores.Social * 0.6 +
          scores.Creatividad * 0.4
        ) / 25
      ) * 100
    )

};

await db.query(
  `UPDATE usuarios
   SET test_completado = TRUE
   WHERE id = ?`,
  [userId]
);

res.json({
  success: true,
  perfilDominante,
  scores,
  compatibilidades
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
  getQuestions,
  submitTest,
  getMyResult
};