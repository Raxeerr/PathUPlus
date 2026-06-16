import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import neutralBg from "../assets/civil-neutral.png";
import successBg from "../assets/civil-success.png";
import failBg from "../assets/civil-fail.png";

export default function CivilSimulation() {

  const navigate = useNavigate();

  // Paso actual
  const [currentCase, setCurrentCase] = useState(0);

  // Opción seleccionada
  const [selectedCard, setSelectedCard] = useState(null);

  // ¿Ya respondió?
  const [answered, setAnswered] = useState(false);

  // ¿Terminó?
  const [finished, setFinished] = useState(false);

  // Puntaje
  const [score, setScore] = useState(0);

  // Estado visual
  const [emotion, setEmotion] = useState("neutral");

  // Estado del puente
  const [bridge, setBridge] = useState({

    material: "Sin definir",

    support: "Sin definir",

    structure: "Sin definir",

    safety: "Sin definir",

    budget: 90000,

    resistance: 20,

    stability: 25

  });

  // Skills
  const [skills, setSkills] = useState({

    DisenoEstructural: 0,

    Analisis: 0,

    Materiales: 0,

    Seguridad: 0,

    Planificacion: 0,

    Gestion: 0

  });

  // Fondo dinámico
  const background =

    emotion === "success"

      ? successBg

      : emotion === "fail"

      ? failBg

      : neutralBg;

// =====================================
// CASOS DE LA SIMULACIÓN
// =====================================

const cases = [

  {
    id: 1,
    title: "Selección del material",
    challenge:
      "Debes elegir el material principal para un puente vehicular de 40 metros.",

    skill: "Materiales",

    property: "material",

    value: "Acero estructural",

    cards: [

      {
        text: "Utilizar acero estructural.",
        correct: true,
        feedback:
          "Excelente decisión. El acero ofrece alta resistencia y buen comportamiento para este tipo de puente."
      },

      {
        text: "Construirlo completamente en madera.",
        correct: false,
        feedback:
          "La madera no es adecuada para soportar cargas pesadas y exposición prolongada."
      },

      {
        text: "Usar plástico reciclado.",
        correct: false,
        feedback:
          "No proporciona la capacidad estructural necesaria."
      }

    ]

  },

  {
    id: 2,
    title: "Diseño estructural",
    challenge:
      "Selecciona el tipo de estructura más eficiente para distribuir las cargas.",

    skill: "DisenoEstructural",

    property: "structure",

    value: "Cercha triangular",

    cards: [

      {
        text: "Implementar una cercha triangular.",
        correct: true,
        feedback:
          "Las cerchas distribuyen eficientemente las cargas y mejoran la estabilidad."
      },

      {
        text: "Usar únicamente una viga horizontal.",
        correct: false,
        feedback:
          "Puede generar deformaciones excesivas bajo carga."
      },

      {
        text: "Eliminar elementos de soporte.",
        correct: false,
        feedback:
          "Compromete gravemente la integridad estructural."
      }

    ]

  },

  {
    id: 3,
    title: "Cimentación",
    challenge:
      "El terreno es cercano a un río y presenta baja capacidad portante.",

    skill: "Analisis",

    property: "support",

    value: "Pilotes profundos",

    cards: [

      {
        text: "Construir pilotes profundos.",
        correct: true,
        feedback:
          "Los pilotes permiten transmitir la carga a estratos resistentes."
      },

      {
        text: "Apoyar directamente sobre el suelo superficial.",
        correct: false,
        feedback:
          "Existe riesgo de asentamientos importantes."
      },

      {
        text: "No realizar cimentación.",
        correct: false,
        feedback:
          "Toda estructura requiere una base adecuada."
      }

    ]

  },

  {
    id: 4,
    title: "Carga máxima",
    challenge:
      "El puente será utilizado por vehículos de carga pesada.",

    skill: "Analisis",

    property: "resistance",

    value: 85,

    cards: [

      {
        text: "Diseñar considerando carga de camiones pesados.",
        correct: true,
        feedback:
          "Es fundamental prever las condiciones reales de uso."
      },

      {
        text: "Diseñarlo solo para bicicletas.",
        correct: false,
        feedback:
          "La estructura podría colapsar bajo cargas mayores."
      },

      {
        text: "No considerar cargas futuras.",
        correct: false,
        feedback:
          "El diseño debe incluir factores de seguridad."
      }

    ]

  },

  {
    id: 5,
    title: "Protección climática",
    challenge:
      "La zona presenta lluvias intensas durante gran parte del año.",

    skill: "Seguridad",

    property: "safety",

    value: "Sistema de drenaje",

    cards: [

      {
        text: "Instalar drenajes y protección contra corrosión.",
        correct: true,
        feedback:
          "Reduce el deterioro y prolonga la vida útil del puente."
      },

      {
        text: "Ignorar el agua acumulada.",
        correct: false,
        feedback:
          "Puede acelerar el desgaste estructural."
      },

      {
        text: "Eliminar canales de evacuación.",
        correct: false,
        feedback:
          "Incrementa el riesgo de daños por humedad."
      }

    ]

  },

  {
    id: 6,
    title: "Diseño sísmico",
    challenge:
      "El proyecto se ubica en una zona con actividad sísmica moderada.",

    skill: "Seguridad",

    property: "stability",

    value: 90,

    cards: [

      {
        text: "Aplicar criterios de diseño sismorresistente.",
        correct: true,
        feedback:
          "Mejora significativamente el comportamiento ante eventos sísmicos."
      },

      {
        text: "Ignorar completamente los sismos.",
        correct: false,
        feedback:
          "Representa un riesgo importante para la seguridad."
      },

      {
        text: "Reducir el refuerzo estructural.",
        correct: false,
        feedback:
          "Disminuye la capacidad resistente."
      }

    ]

  },

  {
    id: 7,
    title: "Optimización del presupuesto",
    challenge:
      "Debes controlar los costos sin comprometer la seguridad.",

    skill: "Gestion",

    property: "budget",

    value: 86000,

    cards: [

      {
        text: "Optimizar recursos manteniendo la calidad.",
        correct: true,
        feedback:
          "Una buena gestión equilibra costos y desempeño."
      },

      {
        text: "Eliminar controles de calidad.",
        correct: false,
        feedback:
          "Reducir la seguridad nunca es una buena estrategia."
      },

      {
        text: "Comprar materiales de baja calidad.",
        correct: false,
        feedback:
          "Puede incrementar fallos y costos futuros."
      }

    ]

  },

  {
    id: 8,
    title: "Evaluación final",
    challenge:
      "Antes de construir, debes validar el diseño completo.",

    skill: "Planificacion",

    property: "validated",

    value: true,

    cards: [

      {
        text: "Realizar simulaciones y revisión técnica.",
        correct: true,
        feedback:
          "Validar el diseño reduce riesgos y mejora la confiabilidad."
      },

      {
        text: "Construir inmediatamente.",
        correct: false,
        feedback:
          "Todo proyecto requiere una revisión previa."
      },

      {
        text: "Omitir pruebas estructurales.",
        correct: false,
        feedback:
          "Las pruebas son esenciales para garantizar la seguridad."
      }

    ]

  }

];

// =====================================
// RESPONDER UNA OPCIÓN
// =====================================

const handleSelect = (card, index) => {

  if (selectedCard !== null) return;

  setSelectedCard(index);
  setAnswered(true);

  // Subir automáticamente para ver el feedback
  setTimeout(() => {

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  }, 300);

  if (card.correct) {

    setScore(prev => prev + 1);

    // Actualizar habilidad
    setSkills(prev => ({

      ...prev,

      [cases[currentCase].skill]:
        Math.min(
          (prev[cases[currentCase].skill] || 0) + 20,
          100
        ),

    }));

    // Construir el puente
    setBridge(prev => ({

      ...prev,

      [cases[currentCase].property]:
        cases[currentCase].value,

    }));

    setEmotion("success");

  } else {

    setEmotion("fail");

  }

};

// =====================================
// SIGUIENTE CASO
// =====================================

const nextCase = async () => {

  if (currentCase < cases.length - 1) {

    setCurrentCase(prev => prev + 1);

    setSelectedCard(null);

    setAnswered(false);

    setEmotion("neutral");

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

    return;

  }

  // ============================
  // TERMINÓ LA SIMULACIÓN
  // ============================

  const percentage = Math.round(

    (score / cases.length) * 100

  );

  let observaciones = "";

  if (percentage >= 90) {

    observaciones =
      "Excelente desempeño. Demuestras competencias sobresalientes en diseño estructural, análisis técnico y planificación de proyectos de Ingeniería Civil.";

  } else if (percentage >= 70) {

    observaciones =
      "Buen desempeño. Presentas una afinidad importante con Ingeniería Civil y buenas capacidades de análisis.";

  } else if (percentage >= 50) {

    observaciones =
      "Tienes potencial para la carrera, aunque sería recomendable fortalecer conceptos estructurales y de gestión de proyectos.";

  } else {

    observaciones =
      "Necesitas desarrollar con mayor profundidad habilidades relacionadas con análisis estructural, materiales y seguridad.";

  }

  try {

    const token = localStorage.getItem("token");

    await api.post(

      "/simulations",

      {

        // ⚠️ CAMBIA ESTE ID POR EL DE
        // INGENIERÍA CIVIL EN TU BASE

        simulacion_id: 2,

        puntaje: percentage,

        observaciones,

      },

      {

        headers: {

          Authorization:

            `Bearer ${token}`,

        },

      }

    );

  } catch (error) {

    console.error(

      "Error guardando simulación:",

      error

    );

  }

  setFinished(true);

};

const percentage = Math.round(
  (score / cases.length) * 100
);
if (finished) {

  const percentage = Math.round(
    (score / cases.length) * 100
  );

  return (

    <div className="min-h-screen bg-[#08121d] flex items-center justify-center p-8">

      <div className="max-w-7xl w-full bg-[#102235] rounded-[40px] p-10 text-white">

        {/* Título */}

        <h1 className="text-6xl font-bold text-center">
          🌉 Proyecto Finalizado
        </h1>

        <p className="text-center text-slate-300 mt-4 text-xl">
          Has completado la simulación de Ingeniería Civil.
        </p>

        {/* Resultado */}

        <div className="text-center mt-10">

          <h2 className="text-8xl font-bold text-green-400">

            {percentage}%

          </h2>

          <p className="text-2xl mt-4">

            Compatibilidad con Ingeniería Civil

          </p>

        </div>

        {/* Barra */}

        <div className="mt-8 h-5 rounded-full bg-slate-700 overflow-hidden">

          <div

            className="h-5 bg-gradient-to-r from-green-500 to-emerald-400"

            style={{

              width: `${percentage}%`

            }}

          />

        </div>

        {/* Estado final */}

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-[#18344f] rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-4">
              🏗 Estado del Puente
            </h3>

            <p>Material: {bridge.material}</p>

            <p className="mt-2">
              Estructura: {bridge.structure}
            </p>

            <p className="mt-2">
              Soporte: {bridge.support}
            </p>

            <p className="mt-2">
              Seguridad: {bridge.safety}
            </p>

          </div>

          <div className="bg-[#18344f] rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-4">
              📊 Indicadores
            </h3>

            <p>💪 Resistencia: {bridge.resistance}%</p>

            <p className="mt-2">
              ⚖️ Estabilidad: {bridge.stability}%
            </p>

            <p className="mt-2">
              💰 Presupuesto: ${bridge.budget}
            </p>

          </div>

        </div>

        {/* Skills */}

        <div className="grid grid-cols-3 gap-5 mt-10">

          <div className="bg-[#18344f] rounded-2xl p-5">
            🏗 Diseño Estructural: {skills.DisenoEstructural}%
          </div>

          <div className="bg-[#18344f] rounded-2xl p-5">
            📐 Análisis: {skills.Analisis}%
          </div>

          <div className="bg-[#18344f] rounded-2xl p-5">
            🧱 Materiales: {skills.Materiales}%
          </div>

          <div className="bg-[#18344f] rounded-2xl p-5">
            🦺 Seguridad: {skills.Seguridad}%
          </div>

          <div className="bg-[#18344f] rounded-2xl p-5">
            📅 Planificación: {skills.Planificacion}%
          </div>

          <div className="bg-[#18344f] rounded-2xl p-5">
            📈 Gestión: {skills.Gestion}%
          </div>

        </div>

        {/* Evaluación */}

        <div className="mt-10 bg-[#18344f] rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-5">
            📋 Evaluación Profesional
          </h2>

          <p className="leading-8 text-lg text-slate-300">

            {percentage >= 90

              ? "Tu desempeño demuestra una excelente capacidad para resolver problemas de Ingeniería Civil. Has tomado decisiones acertadas relacionadas con materiales, seguridad, análisis estructural y planificación, mostrando un perfil altamente compatible con esta profesión."

              : percentage >= 70

              ? "Presentas una afinidad sólida con Ingeniería Civil. Comprendes los principios fundamentales del diseño estructural y la gestión de proyectos, aunque puedes seguir fortaleciendo tus conocimientos técnicos."

              : percentage >= 50

              ? "Tienes una buena base para desarrollarte en Ingeniería Civil. Se recomienda profundizar en análisis estructural, comportamiento de materiales y gestión de riesgos."

              : "Es recomendable reforzar los fundamentos relacionados con estructuras, materiales, planificación y seguridad para mejorar tu desempeño en proyectos de ingeniería."

            }

          </p>

        </div>

        {/* Perfil */}

        <div className="mt-8 bg-gradient-to-r from-green-700 to-emerald-600 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-4">
            👷 Perfil Profesional
          </h2>

          <p className="text-lg leading-8">

            {percentage >= 80

              ? "Tu perfil es compatible con áreas como diseño estructural, construcción, supervisión de obras, infraestructura vial y gestión de proyectos civiles."

              : "Con mayor práctica y formación podrás desarrollar competencias para desempeñarte exitosamente en proyectos de infraestructura y construcción."

            }

          </p>

        </div>

        {/* Botón */}

        <button

          onClick={() => navigate("/guardados")}

          className="
            w-full
            mt-10
            py-5
            rounded-2xl
            text-2xl
            font-bold
            bg-gradient-to-r
            from-green-600
            to-emerald-500
          "

        >

          Ver mis resultados

        </button>

      </div>

    </div>

  );

} 

return (

<div
  className="min-h-screen bg-cover bg-center p-8"
  style={{
    backgroundImage: `url(${background})`,
  }}
>

  <div className="grid grid-cols-12 gap-6">

    {/* =========================
        PANEL IZQUIERDO
    ========================= */}

    <div className="col-span-3">

      <div className="bg-white rounded-[30px] p-6 shadow-xl">

        <h2 className="text-3xl font-bold">
          🏗 Ingeniería Civil
        </h2>

        <p className="mt-4 text-slate-600">
          Diseña un puente seguro y eficiente.
        </p>

        <div className="mt-8">

          <div className="flex justify-between">

            <span>Progreso</span>

            <span>

              {currentCase + 1}/{cases.length}

            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-200 mt-2">

            <div

              className="h-3 rounded-full bg-green-500"

              style={{

                width: `${((currentCase + 1) / cases.length) * 100}%`

              }}

            />

          </div>

        </div>

        <div className="mt-8">

          <h3 className="font-bold mb-4">

            Condiciones del reto

          </h3>

          <div className="space-y-3">

            <div className="bg-slate-100 rounded-xl p-3">
              🌉 Luz del puente: 40 metros
            </div>

            <div className="bg-slate-100 rounded-xl p-3">
              🚛 Carga máxima: 20 toneladas
            </div>

            <div className="bg-slate-100 rounded-xl p-3">
              💰 Presupuesto: ${bridge.budget}
            </div>

            <div className="bg-slate-100 rounded-xl p-3">
              🧱 Material: {bridge.material}
            </div>

          </div>

        </div>

      </div>

    </div>

    {/* =========================
        PANEL CENTRAL
    ========================= */}

    <div className="col-span-6">

      <div className="bg-white rounded-[30px] p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-center">

          Tu diseño

        </h2>

        <div className="mt-8 flex justify-center">

          <svg
            width="520"
            height="260"
            viewBox="0 0 520 260"
          >

            {/* Base */}

            <line

              x1="40"

              y1="200"

              x2="480"

              y2="200"

              stroke="#64748b"

              strokeWidth="8"

            />

            {/* Soportes */}

            <line
              x1="130"
              y1="200"
              x2="130"
              y2="120"
              stroke="#94a3b8"
              strokeWidth="6"
            />

            <line
              x1="390"
              y1="200"
              x2="390"
              y2="120"
              stroke="#94a3b8"
              strokeWidth="6"
            />

            {/* Puente */}

            <polyline

              fill="none"

              stroke={
                bridge.material === "Acero estructural"

                  ? "#16a34a"

                  : "#ef4444"
              }

              strokeWidth="8"

              points="
                40,200
                130,120
                220,180
                300,120
                390,180
                480,200
              "

            />

            {/* Nodos */}

            {[

              [40,200],

              [130,120],

              [220,180],

              [300,120],

              [390,180],

              [480,200],

            ].map((p,i)=>(

              <circle

                key={i}

                cx={p[0]}

                cy={p[1]}

                r="7"

                fill="#22c55e"

              />

            ))}

          </svg>

        </div>

        <div className="grid grid-cols-3 gap-4 mt-10">

          <div className="bg-green-100 rounded-xl p-4">

            <p className="font-bold">

              Resistencia

            </p>

            <p className="text-3xl mt-2">

              {bridge.resistance}%

            </p>

          </div>

          <div className="bg-blue-100 rounded-xl p-4">

            <p className="font-bold">

              Estabilidad

            </p>

            <p className="text-3xl mt-2">

              {bridge.stability}%

            </p>

          </div>

          <div className="bg-yellow-100 rounded-xl p-4">

            <p className="font-bold">

              Material

            </p>

            <p className="mt-2">

              {bridge.material}

            </p>

          </div>

        </div>

      </div>

    </div>

    {/* =========================
      PANEL DERECHO
========================= */}

<div className="col-span-3">

  <div className="space-y-5">

    <div className="bg-white rounded-[30px] p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-3">
        📋 Desafío Actual
      </h2>

      <h3 className="text-xl font-semibold">
        {cases[currentCase].title}
      </h3>

      <p className="mt-4 text-slate-600 leading-7">
        {cases[currentCase].challenge}
      </p>

    </div>

    {/* CARTAS */}

    {cases[currentCase].cards.map((card, index) => (

      <div

        key={index}

        onClick={() => handleSelect(card, index)}

        className={`
          h-36
          cursor-pointer
          perspective-[1200px]

          ${
            selectedCard !== null &&
            selectedCard !== index
              ? "opacity-40"
              : ""
          }

        `}

      >

        <div

          className={`
            relative

            w-full
            h-full

            duration-700

            [transform-style:preserve-3d]

            ${
              selectedCard === index

                ? "[transform:rotateY(180deg)]"

                : ""
            }

          `}

        >

          {/* FRENTE */}

          <div

            className="
              absolute

              inset-0

              rounded-[25px]

              bg-[#0f172a]

              border

              border-green-500

              flex

              items-center

              px-5

              [backface-visibility:hidden]
            "

          >

            <div

              className="
                w-12
                h-12

                rounded-full

                bg-green-600

                flex

                items-center

                justify-center

                text-white

                font-bold

                mr-4
              "

            >

              {index + 1}

            </div>

            <p className="text-white">

              {card.text}

            </p>

          </div>

          {/* ATRÁS */}

          <div

            className={`
              absolute

              inset-0

              rounded-[25px]

              p-5

              [transform:rotateY(180deg)]

              [backface-visibility:hidden]

              flex

              flex-col

              justify-center

              ${
                card.correct

                  ? "bg-green-600"

                  : "bg-red-600"

              }

            `}

          >

            <div className="text-center text-4xl mb-3">

              {

                card.correct

                  ? "🏗️"

                  : "⚠️"

              }

            </div>

            <h3 className="text-center text-xl font-bold text-white mb-2">

              {

                card.correct

                  ? "Buena decisión"

                  : "Decisión incorrecta"

              }

            </h3>

            <p className="text-center text-sm text-white leading-6">

              {card.feedback}

            </p>

          </div>

        </div>

      </div>

    ))}

    {/* BOTÓN */}

    <button

      disabled={!answered}

      onClick={nextCase}

      className={`
        w-full

        py-4

        rounded-2xl

        text-lg

        font-bold

        transition-all

        ${
          answered

            ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white"

            : "bg-slate-400 cursor-not-allowed text-white"
        }

      `}

    >

      Probar siguiente decisión →

    </button>

  </div>

</div>

  </div> {/* Fin grid */}

</div>

);

}