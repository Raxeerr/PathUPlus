import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
// Cambia estas rutas por tus propias imágenes
import neutralBusiness from "../assets/business-neutral.png";
import successBusiness from "../assets/business-success.png";
import dangerBusiness from "../assets/business-danger.png";

export default function BusinessSimulation() {
  const navigate = useNavigate();

  const [currentCase, setCurrentCase] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [emotion, setEmotion] = useState("neutral");
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const [skills, setSkills] = useState({
    Estrategia: 0,
    Liderazgo: 0,
    Finanzas: 0,
    Marketing: 0,
    Decision: 0,
    Innovacion: 0,
  });

  // Aquí agregaremos los casos en la siguiente parte

  const cases = [

  // CASO 1
  {
    id: 1,
    skill: "Marketing",

    title: "Festival Universitario",

    situation:
      "Tu stand recibe pocos visitantes durante las primeras horas del evento. Debes decidir cómo atraer más estudiantes.",

    cards: [

      {
        text: "Lanzar una campaña promocional con regalos y actividades.",
        correct: true,
        feedback:
          "Excelente decisión. Incrementar la interacción y generar experiencias memorables mejora la atracción de clientes y fortalece el posicionamiento de la marca."
      },

      {
        text: "Esperar a que lleguen personas sin realizar cambios.",
        correct: false,
        feedback:
          "Una estrategia pasiva reduce las posibilidades de captar clientes en un entorno altamente competitivo."
      },

      {
        text: "Cerrar el stand durante una hora.",
        correct: false,
        feedback:
          "Reducir la disponibilidad disminuye la visibilidad de la empresa y puede afectar negativamente las ventas potenciales."
      }

    ]

  },

  // CASO 2
  {
    id: 2,
    skill: "Decision",

    title: "Competencia inesperada",

    situation:
      "Un competidor instala un stand justo al frente con precios mucho más bajos.",

    cards: [

      {
        text: "Crear una oferta diferenciadora resaltando el valor del producto.",
        correct: true,
        feedback:
          "Competir por valor suele ser más sostenible que entrar en una guerra de precios. Fortalece la percepción de calidad y la diferenciación."
      },

      {
        text: "Reducir todos los precios sin analizar costos.",
        correct: false,
        feedback:
          "Una reducción impulsiva puede afectar la rentabilidad y poner en riesgo la sostenibilidad financiera."
      },

      {
        text: "Ignorar completamente al competidor.",
        correct: false,
        feedback:
          "No reaccionar ante cambios del mercado puede generar pérdida de participación y oportunidades."
      }

    ]

  },

  // CASO 3
  {
    id: 3,
    skill: "Marketing",

    title: "Influencer visita tu stand",

    situation:
      "Un creador de contenido con miles de seguidores muestra interés por tu negocio.",

    cards: [

      {
        text: "Invitarlo a probar el producto y compartir su experiencia.",
        correct: true,
        feedback:
          "Excelente estrategia. Aprovechas una oportunidad de marketing orgánico con alto potencial de alcance."
      },

      {
        text: "Cobrarle por acercarse al stand.",
        correct: false,
        feedback:
          "La decisión puede generar una mala experiencia y desperdiciar una oportunidad de promoción."
      },

      {
        text: "Ignorarlo y seguir trabajando normalmente.",
        correct: false,
        feedback:
          "Perderías una valiosa oportunidad para aumentar la visibilidad de la empresa."
      }

    ]

  },

  // CASO 4
  {
    id: 4,
    skill: "Finanzas",

    title: "Problemas de presupuesto",

    situation:
      "El presupuesto mensual se redujo un 30% y debes decidir cómo actuar.",

    cards: [

      {
        text: "Priorizar gastos estratégicos y optimizar recursos.",
        correct: true,
        feedback:
          "Una correcta gestión financiera consiste en optimizar recursos sin comprometer los objetivos principales."
      },

      {
        text: "Gastar el dinero restante rápidamente.",
        correct: false,
        feedback:
          "Las decisiones impulsivas pueden agravar la situación financiera."
      },

      {
        text: "Cancelar todas las actividades de la empresa.",
        correct: false,
        feedback:
          "Eliminar completamente la operación puede afectar ingresos y reputación."
      }

    ]

  },

  // CASO 5
  {
    id: 5,
    skill: "Liderazgo",

    title: "Conflicto entre empleados",

    situation:
      "Dos colaboradores importantes tienen una discusión que afecta al equipo.",

    cards: [

      {
        text: "Escuchar ambas partes y mediar una solución.",
        correct: true,
        feedback:
          "Demuestras liderazgo al promover la comunicación y resolver conflictos de manera objetiva."
      },

      {
        text: "Despedir a uno inmediatamente.",
        correct: false,
        feedback:
          "Tomar decisiones precipitadas puede afectar el clima laboral y generar injusticias."
      },

      {
        text: "Ignorar el problema.",
        correct: false,
        feedback:
          "Los conflictos sin resolver suelen empeorar y afectar el desempeño del equipo."
      }

    ]

  },

  // CASO 6
  {
    id: 6,
    skill: "Innovacion",

    title: "Nueva tecnología",

    situation:
      "Existe una herramienta digital que podría automatizar gran parte del trabajo.",

    cards: [

      {
        text: "Evaluar su implementación y capacitar al personal.",
        correct: true,
        feedback:
          "Adoptar innovación de forma planificada mejora la competitividad y la eficiencia."
      },

      {
        text: "Rechazar cualquier cambio tecnológico.",
        correct: false,
        feedback:
          "La resistencia al cambio puede hacer perder ventajas competitivas."
      },

      {
        text: "Comprar la herramienta sin analizar necesidades.",
        correct: false,
        feedback:
          "Toda inversión debe justificarse mediante un análisis previo."
      }

    ]

  },

  // CASO 7
  {
    id: 7,
    skill: "Decision",

    title: "Caída en ventas",

    situation:
      "Las ventas disminuyeron durante tres meses consecutivos.",

    cards: [

      {
        text: "Analizar datos y ajustar la estrategia comercial.",
        correct: true,
        feedback:
          "Las decisiones basadas en datos permiten identificar causas y proponer soluciones efectivas."
      },

      {
        text: "Esperar sin hacer nada.",
        correct: false,
        feedback:
          "La inacción puede agravar la situación."
      },

      {
        text: "Cerrar la empresa inmediatamente.",
        correct: false,
        feedback:
          "Antes de tomar medidas extremas deben evaluarse alternativas."
      }

    ]

  },

  // CASO 8
  {
    id: 8,
    skill: "Marketing",

    title: "Malas reseñas",

    situation:
      "Comienzan a aparecer comentarios negativos en redes sociales.",

    cards: [

      {
        text: "Responder con respeto y buscar soluciones.",
        correct: true,
        feedback:
          "Una buena gestión de reputación fortalece la confianza del cliente y demuestra compromiso."
      },

      {
        text: "Eliminar todos los comentarios.",
        correct: false,
        feedback:
          "Intentar ocultar el problema puede afectar la credibilidad."
      },

      {
        text: "Discutir públicamente con los clientes.",
        correct: false,
        feedback:
          "Una respuesta agresiva suele empeorar la imagen de la empresa."
      }

    ]

  },

  // CASO 9
  {
    id: 9,
    skill: "Liderazgo",

    title: "Empleado desmotivado",

    situation:
      "Un colaborador clave ha disminuido considerablemente su rendimiento.",

    cards: [

      {
        text: "Reunirte con él para comprender la situación y ofrecer apoyo.",
        correct: true,
        feedback:
          "El liderazgo efectivo implica escuchar, comprender y buscar soluciones antes de tomar decisiones."
      },

      {
        text: "Amenazar con despedirlo.",
        correct: false,
        feedback:
          "Las amenazas deterioran el clima laboral y reducen la motivación."
      },

      {
        text: "Ignorar el cambio de rendimiento.",
        correct: false,
        feedback:
          "La falta de seguimiento puede afectar a todo el equipo."
      }

    ]

  },

  // CASO 10
  {
    id: 10,
    skill: "Estrategia",

    title: "Expansión del negocio",

    situation:
      "La empresa tiene recursos para abrir una nueva sucursal.",

    cards: [

      {
        text: "Realizar un estudio de mercado antes de invertir.",
        correct: true,
        feedback:
          "Una planificación estratégica basada en información reduce riesgos y aumenta las probabilidades de éxito."
      },

      {
        text: "Abrir inmediatamente sin investigar.",
        correct: false,
        feedback:
          "Expandirse sin análisis puede generar pérdidas importantes."
      },

      {
        text: "Guardar todo el dinero sin invertir nunca.",
        correct: false,
        feedback:
          "No aprovechar oportunidades también puede limitar el crecimiento empresarial."
      }

    ]

  }

];

// ------------------------
// Seleccionar una respuesta
// ------------------------

const handleSelect = (card, index) => {

  if (selectedCard !== null) return;

  setSelectedCard(index);
  setAnswered(true);

  // Subir automáticamente para mostrar el feedback
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 300);

  if (card.correct) {

    setScore(prev => prev + 1);

    setSkills(prev => ({
      ...prev,
      [cases[currentCase].skill]:
        Math.min(
          (prev[cases[currentCase].skill] || 0) + 20,
          100
        ),
    }));

    setEmotion("success");

  } else {

    setEmotion("danger");

  }

};


// ------------------------
// Siguiente caso
// ------------------------

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

// Calcular porcentaje
const finalPercentage = Math.round(
  (score / cases.length) * 100
);

// Generar observaciones
let observaciones = "";

if (finalPercentage >= 90) {

  observaciones =
    "Excelente desempeño. Demuestras sólidas competencias en liderazgo, estrategia y toma de decisiones empresariales.";

} else if (finalPercentage >= 70) {

  observaciones =
    "Buen desempeño. Presentas una afinidad importante con Administración de Empresas.";

} else if (finalPercentage >= 50) {

  observaciones =
    "Tienes potencial para la gestión empresarial, pero puedes fortalecer áreas como estrategia y finanzas.";

} else {

  observaciones =
    "Se recomienda desarrollar habilidades de liderazgo, análisis estratégico y gestión organizacional.";

}

try {

  const token = localStorage.getItem("token");

  await api.post(
    "/simulations",
    {
      simulacion_id: 4, // ⚠️ Cambia este ID por el que corresponda en tu base de datos
      puntaje: finalPercentage,
      observaciones,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

} catch (error) {

  console.error("Error guardando simulación:", error);

}

setFinished(true);

};


// ------------------------
// Imagen actual
// ------------------------

const currentImage =

  emotion === "success"
    ? successBusiness

    : emotion === "danger"
    ? dangerBusiness

    : neutralBusiness;

if (finished) {

  const percentage =
    Math.round(
      (score / cases.length) * 100
    );

  return (

    <div className="
    min-h-screen

    bg-[#09011d]

    flex

    items-center

    justify-center

    p-10
    ">

      <div className="
      max-w-5xl

      w-full

      rounded-[40px]

      bg-[#13043d]

      p-10

      text-white
      ">

        <h1 className="
        text-5xl

        font-bold

        text-center
        ">
          🏆 ¡Simulación completada!
        </h1>

        <div className="
        text-center

        mt-8
        ">

          <p className="
          text-8xl

          font-bold

          text-fuchsia-400
          ">
            {percentage}%
          </p>

          <p className="
          text-2xl

          mt-3
          ">
            Compatibilidad con Administración de Empresas
          </p>

        </div>

        <div className="
        mt-10

        grid

        grid-cols-2

        gap-5
        ">

          <div className="bg-[#24115b] p-5 rounded-3xl">
            📊 Estrategia: {skills.Estrategia}%
          </div>

          <div className="bg-[#24115b] p-5 rounded-3xl">
            💼 Liderazgo: {skills.Liderazgo}%
          </div>

          <div className="bg-[#24115b] p-5 rounded-3xl">
            💰 Finanzas: {skills.Finanzas}%
          </div>

          <div className="bg-[#24115b] p-5 rounded-3xl">
            📢 Marketing: {skills.Marketing}%
          </div>

          <div className="bg-[#24115b] p-5 rounded-3xl">
            🤝 Toma de decisiones: {skills.Decision}%
          </div>

          <div className="bg-[#24115b] p-5 rounded-3xl">
            🚀 Innovación: {skills.Innovacion}%
          </div>

        </div>

        <div className="
        mt-10

        rounded-3xl

        bg-[#24115b]

        p-8
        ">

          <h2 className="
          text-3xl

          font-bold

          mb-5
          ">
            📋 Evaluación Profesional
          </h2>

          <p className="
          leading-8

          text-lg

          text-slate-300
          ">

            {percentage >= 90

              ? "Demuestras una destacada capacidad para analizar escenarios empresariales, liderar equipos y tomar decisiones estratégicas. Tus respuestas reflejan visión de negocio, pensamiento crítico y orientación a resultados, competencias esenciales para un profesional en Administración de Empresas."

              : percentage >= 70

              ? "Presentas un perfil sólido para Administración de Empresas. Muestras habilidades relevantes en liderazgo, estrategia y resolución de problemas, aunque podrías fortalecer la planificación financiera y la innovación para potenciar tu desempeño."

              : percentage >= 50

              ? "Posees interés y varias competencias relacionadas con la gestión empresarial. Sin embargo, sería recomendable seguir desarrollando habilidades en análisis estratégico, toma de decisiones y planificación para enfrentar escenarios complejos."

              : "Tus resultados indican que aún puedes fortalecer competencias fundamentales para la administración empresarial, como el liderazgo, la estrategia, el análisis financiero y la toma de decisiones. Con práctica y formación, estas habilidades pueden desarrollarse significativamente."

            }

          </p>

        </div>

        <button

          onClick={() =>
            navigate("/guardados")
          }

          className="
          w-full

          mt-10

          py-5

          rounded-2xl

          font-bold

          bg-gradient-to-r

          from-violet-600

          to-fuchsia-500
          "
        >

          Ver resultados

        </button>

      </div>

    </div>

  );

}
return (

<div
  className="
  min-h-screen
  bg-cover
  bg-center
  bg-no-repeat
  overflow-y-auto
  pb-24
  "
  style={{
    backgroundImage: `url(${currentImage})`,
  }}
>

  {/* ================= HEADER ================= */}

  <div className="p-6">

    <div className="
      bg-[#15043f]/95
      rounded-[35px]
      p-6
      border
      border-violet-700
      shadow-2xl
    ">

      <h1 className="
        text-5xl
        font-bold
        text-white
      ">
        🏢 Simulación Empresarial
      </h1>

      <div className="flex justify-between mt-5 text-white text-xl">

        <span>
          Caso {currentCase + 1}
        </span>

        <span>
          {currentCase + 1} / {cases.length}
        </span>

      </div>

      <div className="
        h-5
        bg-white/20
        rounded-full
        mt-3
      ">

        <div
          className="
            h-5
            rounded-full
            bg-gradient-to-r
            from-violet-500
            to-fuchsia-500
          "
          style={{
            width: `${((currentCase + 1) / cases.length) * 100}%`
          }}
        />

      </div>

    </div>

  </div>

  {/* ================= CONTENIDO ================= */}

  <div className="
    max-w-7xl
    mx-auto

    grid

    grid-cols-2

    gap-12

    items-center

    px-8

    mt-6
  ">

    {/* IZQUIERDA */}

    <div className="relative h-[700px]">

      {/* Solo se ve la imagen de fondo */}

    </div>

    {/* DERECHA */}

    <div>

      <div className="
        bg-white

        rounded-[35px]

        border-[5px]

        border-violet-600

        p-8

        shadow-2xl

        relative
      ">

        <p className="
          text-sm
          uppercase
          font-bold
          mb-3
          text-slate-600
        ">
          ESCENARIO
        </p>

        <h2 className="
          text-3xl
          font-bold
          text-slate-800
          mb-3
        ">
          {cases[currentCase].title}
        </h2>

        <p className="
          text-xl
          leading-relaxed
          text-slate-700
        ">
          {cases[currentCase].situation}
        </p>

        <div className="
          absolute

          -bottom-5

          left-20

          w-10
          h-10

          rotate-45

          bg-white

          border-r-[5px]

          border-b-[5px]

          border-violet-600
        " />

      </div>

      <h2 className="
        text-white
        text-4xl
        font-bold
        mt-14
        mb-6
      ">
        ¿Qué decisión tomarías?
      </h2>

      <div className="space-y-5">

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

        {/* =================== FRENTE =================== */}

        <div
          className="
          absolute
          inset-0

          rounded-[30px]

          bg-[#1b0b4f]/90

          backdrop-blur-xl

          border

          border-violet-500/30

          flex

          items-center

          px-8

          [backface-visibility:hidden]
          "
        >

          <div
            className="
            w-16
            h-16

            rounded-full

            bg-violet-600

            flex

            items-center

            justify-center

            text-3xl

            font-bold

            text-white

            mr-6
            "
          >
            {index + 1}
          </div>

          <p
            className="
            text-2xl

            text-white

            leading-relaxed
            "
          >
            {card.text}
          </p>

        </div>

        {/* =================== ATRÁS =================== */}

        <div
          className={`
            absolute
            inset-0

            rounded-[30px]

            p-6

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

          <div className="text-center text-6xl mb-3">

            {card.correct ? "📈" : "⚠️"}

          </div>

          <h3 className="
            text-2xl

            font-bold

            text-center

            text-white

            mb-3
          ">

            {card.correct

              ? "Decisión Estratégica"

              : "Decisión Riesgosa"

            }

          </h3>

          <p className="
            text-center

            text-lg

            leading-7

            text-white
          ">

            {card.feedback}

          </p>

        </div>

      </div>

    </div>

  ))}

  {/* ================= BOTÓN ================= */}

  <button

    disabled={!answered}

    onClick={nextCase}

    className={`
      w-full

      mt-8

      py-5

      rounded-2xl

      text-xl

      font-bold

      transition-all

      ${
        answered

          ? "bg-gradient-to-r from-violet-600 to-fuchsia-500"

          : "bg-slate-700 cursor-not-allowed"
      }
    `}
  >

    Continuar escenario →

  </button>

</div>

    </div>

  </div>

</div>

);
}