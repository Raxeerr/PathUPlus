import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import neutralBg from "../assets/design-neutral.png";
import successBg from "../assets/design-success.png";
import failBg from "../assets/design-fail.png";

export default function GraphicDesignSimulation() {

  const navigate = useNavigate();

  // Paso actual de la simulación
  const [step, setStep] = useState(0);

  // Opción seleccionada
  const [selected, setSelected] = useState(null);

  // ¿Ya respondió?
  const [answered, setAnswered] = useState(false);

  // ¿Terminó?
  const [finished, setFinished] = useState(false);

  // Puntaje
  const [score, setScore] = useState(0);

  // Estado visual
  const [emotion, setEmotion] = useState("neutral");

  // Logo construido dinámicamente
  const [logo, setLogo] = useState({

    icon: "❔",

    colors: {
      primary: "#6d28d9",
      secondary: "#9333ea"
    },

    font: "Poppins",

    style: "Minimalista",

    slogan: "",

    company: "Café Campus"

  });

  // Skills
  const [skills, setSkills] = useState({

    Creatividad: 0,

    Branding: 0,

    Color: 0,

    Tipografia: 0,

    Composicion: 0,

    ComunicacionVisual: 0

  });

  // Fondo según resultado
  const background =

    emotion === "success"
      ? successBg

      : emotion === "fail"

      ? failBg

      : neutralBg;

      const steps = [

  // =====================================
  // PASO 1 - ÍCONO
  // =====================================

  {
    title: "Selecciona el ícono principal",

    description:
      "El cliente quiere una cafetería universitaria moderna, amigable y fácil de recordar.",

    skill: "Branding",

    property: "icon",

    options: [

      {
        text: "☕ Taza de café con hoja",
        value: "☕",
        correct: true,
        feedback:
          "Excelente decisión. El símbolo comunica claramente café, sostenibilidad y cercanía."
      },

      {
        text: "💀 Calavera",
        value: "💀",
        correct: false,
        feedback:
          "La iconografía transmite un mensaje negativo y no representa la personalidad de la marca."
      },

      {
        text: "⚔️ Espada medieval",
        value: "⚔️",
        correct: false,
        feedback:
          "No existe relación conceptual entre este símbolo y una cafetería universitaria."
      }

    ]

  },

  // =====================================
  // PASO 2 - COLORES
  // =====================================

  {
    title: "Selecciona la paleta de colores",

    description:
      "El cliente desea transmitir naturaleza, tranquilidad y cercanía.",

    skill: "Color",

    property: "colors",

    options: [

      {
        text: "🟢 Verde + Marrón",
        value: {
          primary: "#2E7D32",
          secondary: "#8D6E63"
        },
        correct: true,
        feedback:
          "Muy buena elección. Estos colores evocan naturaleza, café artesanal y confianza."
      },

      {
        text: "🔴 Rojo + Negro",
        value: {
          primary: "#B71C1C",
          secondary: "#000000"
        },
        correct: false,
        feedback:
          "La combinación resulta demasiado agresiva para el concepto de la marca."
      },

      {
        text: "🟡 Amarillo Neón + Rosa",
        value: {
          primary: "#FDD835",
          secondary: "#EC407A"
        },
        correct: false,
        feedback:
          "Los colores generan demasiado ruido visual y reducen la elegibilidad."
      }

    ]

  },

  // =====================================
  // PASO 3 - TIPOGRAFÍA
  // =====================================

  {
    title: "Selecciona la tipografía",

    description:
      "La marca busca un aspecto moderno y limpio.",

    skill: "Tipografia",

    property: "font",

    options: [

      {
        text: "Poppins",
        value: "Poppins",
        correct: true,
        feedback:
          "Excelente elección. Es una tipografía moderna, clara y muy versátil."
      },

      {
        text: "Comic Sans",
        value: "Comic Sans MS",
        correct: false,
        feedback:
          "No transmite profesionalismo ni coherencia con una identidad corporativa."
      },

      {
        text: "Blackletter",
        value: "serif",
        correct: false,
        feedback:
          "Una fuente medieval dificulta la lectura y rompe con el concepto de marca."
      }

    ]

  },

  // =====================================
  // PASO 4 - ESTILO
  // =====================================

  {
    title: "Selecciona el estilo del logo",

    description:
      "Debe funcionar en redes sociales, empaques y publicidad.",

    skill: "Composicion",

    property: "style",

    options: [

      {
        text: "Minimalista",
        value: "Minimalista",
        correct: true,
        feedback:
          "El minimalismo mejora la recordación de marca y facilita la adaptación a múltiples formatos."
      },

      {
        text: "Muy recargado",
        value: "Recargado",
        correct: false,
        feedback:
          "El exceso de elementos afecta la claridad y la escalabilidad del logo."
      },

      {
        text: "Efecto 3D extremo",
        value: "3D",
        correct: false,
        feedback:
          "Los efectos excesivos reducen la versatilidad en aplicaciones reales."
      }

    ]

  },

  // =====================================
  // PASO 5 - ESLOGAN
  // =====================================

  {
    title: "Selecciona el eslogan",

    description:
      "Debe reforzar el posicionamiento de la cafetería.",

    skill: "ComunicacionVisual",

    property: "slogan",

    options: [

      {
        text: "Conecta. Aprende. Disfruta.",
        value: "Conecta. Aprende. Disfruta.",
        correct: true,
        feedback:
          "Excelente mensaje. Comunica comunidad, aprendizaje y experiencia positiva."
      },

      {
        text: "Compra ahora mismo",
        value: "Compra ahora mismo",
        correct: false,
        feedback:
          "Es un llamado comercial directo, pero no fortalece la identidad de marca."
      },

      {
        text: "El mejor café del planeta",
        value: "El mejor café del planeta",
        correct: false,
        feedback:
          "Una afirmación absoluta sin respaldo puede percibirse como poco creíble."
      }

    ]

  }

];

// ================================
// SELECCIONAR OPCIÓN
// ================================

const handleSelect = (option, index) => {

  // Evita responder dos veces
  if (selected !== null) return;

  setSelected(index);
  setAnswered(true);

  // Actualizar el logo dinámicamente
  setLogo((prev) => ({
    ...prev,
    [steps[step].property]: option.value,
  }));

  if (option.correct) {

    setScore((prev) => prev + 1);

    setEmotion("success");

    setSkills((prev) => ({

      ...prev,

      [steps[step].skill]:
        Math.min(
          (prev[steps[step].skill] || 0) + 20,
          100
        ),

    }));

  } else {

    setEmotion("fail");

  }

};

const nextStep = async () => {

  if (step < steps.length - 1) {

    setStep((prev) => prev + 1);

    setSelected(null);

    setAnswered(false);

    setEmotion("neutral");

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

    return;

  }

  // Calcular porcentaje final
const finalPercentage = Math.round(
  (score / steps.length) * 100
);

let observaciones = "";

if (finalPercentage >= 90) {
  observaciones =
    "Excelente desempeño. Demuestra un alto dominio de branding, color y composición visual.";
} else if (finalPercentage >= 70) {
  observaciones =
    "Buen desempeño. Presenta una sólida afinidad con el Diseño Gráfico.";
} else if (finalPercentage >= 50) {
  observaciones =
    "Tiene potencial creativo, pero puede fortalecer fundamentos de identidad visual y comunicación.";
} else {
  observaciones =
    "Se recomienda desarrollar habilidades en teoría del color, tipografía y composición.";
}

try {
  const token = localStorage.getItem("token");

  await api.post(
    "/simulations",
    {
      simulacion_id: 5, // ⚠️ Usa el ID correcto para Diseño Gráfico en tu BD
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

const percentage = Math.round(
  (score / steps.length) * 100
);

if (finished) {

  const percentage = Math.round(
    (score / steps.length) * 100
  );

  return (

    <div className="min-h-screen bg-[#0b0424] flex items-center justify-center p-8">

      <div className="max-w-6xl w-full bg-[#16053f] rounded-[40px] p-10 text-white shadow-2xl">

        {/* Título */}

        <h1 className="text-6xl font-bold text-center">
          🎉 Proyecto Finalizado
        </h1>

        <p className="text-center text-slate-300 mt-4 text-xl">
          Has completado la simulación de Diseño Gráfico.
        </p>

        {/* Logo construido */}

        <div className="mt-10 bg-white rounded-[35px] p-10 text-center">

          <div
            className="text-8xl"
            style={{
              color: logo.colors.primary,
            }}
          >
            {logo.icon}
          </div>

          <h2
            className="mt-5 text-5xl font-bold"
            style={{
              color: logo.colors.primary,
              fontFamily: logo.font,
            }}
          >
            {logo.company}
          </h2>

          <div
            className="w-52 h-2 mx-auto rounded-full mt-5"
            style={{
              background: logo.colors.secondary,
            }}
          />

          <p
            className="mt-5 text-xl text-slate-700"
            style={{
              fontFamily: logo.font,
            }}
          >
            {logo.slogan}
          </p>

        </div>

        {/* Compatibilidad */}

        <div className="mt-10 text-center">

          <h2 className="text-8xl font-bold text-fuchsia-400">

            {percentage}%

          </h2>

          <p className="text-2xl mt-3">

            Compatibilidad con Diseño Gráfico

          </p>

        </div>

        {/* Skills */}

        <div className="grid grid-cols-2 gap-5 mt-10">

          <div className="bg-[#24115b] rounded-2xl p-5">
            💡 Creatividad: {skills.Creatividad}%
          </div>

          <div className="bg-[#24115b] rounded-2xl p-5">
            🎯 Branding: {skills.Branding}%
          </div>

          <div className="bg-[#24115b] rounded-2xl p-5">
            🎨 Teoría del Color: {skills.Color}%
          </div>

          <div className="bg-[#24115b] rounded-2xl p-5">
            🔤 Tipografía: {skills.Tipografia}%
          </div>

          <div className="bg-[#24115b] rounded-2xl p-5">
            📐 Composición: {skills.Composicion}%
          </div>

          <div className="bg-[#24115b] rounded-2xl p-5">
            👁️ Comunicación Visual: {skills.ComunicacionVisual}%
          </div>

        </div>

        {/* Feedback profesional */}

        <div className="mt-10 bg-[#24115b] rounded-[30px] p-8">

          <h2 className="text-3xl font-bold mb-5">
            📋 Evaluación Profesional
          </h2>

          <p className="leading-8 text-slate-300 text-lg">

            {percentage >= 90

              ? "Tu desempeño refleja un perfil altamente compatible con la carrera de Diseño Gráfico. Has demostrado criterio para seleccionar elementos visuales coherentes, una adecuada comprensión del branding y una buena capacidad para transmitir mensajes mediante iconografía, color y tipografía. Tus decisiones evidencian pensamiento creativo, atención al detalle y una visión estratégica del diseño."

              : percentage >= 70

              ? "Presentas una afinidad sólida con el Diseño Gráfico. Generalmente tomas decisiones acertadas y comprendes principios importantes como identidad visual y comunicación de marca. Aun así, puedes fortalecer aspectos relacionados con la innovación, la consistencia visual y la diferenciación para crear propuestas más memorables."

              : percentage >= 50

              ? "Cuentas con una base interesante para desarrollarte en Diseño Gráfico, pero es recomendable profundizar en teoría del color, composición, jerarquía visual y branding. Con más práctica podrás crear identidades más claras, funcionales y atractivas."

              : "Tus respuestas indican que todavía necesitas fortalecer los fundamentos del diseño visual. Te beneficiará estudiar conceptos como composición, tipografía, psicología del color, identidad corporativa y comunicación gráfica. La práctica constante y el análisis de proyectos reales te permitirán desarrollar estas competencias progresivamente."

            }

          </p>

        </div>

        <div className="mt-8 bg-[#1d1250] rounded-[30px] p-8">

  <h2 className="text-3xl font-bold mb-6">
    ⭐ Fortalezas Detectadas
  </h2>

  <ul className="space-y-4 text-lg text-slate-300">

    {skills.Branding >= 80 && (
      <li>✅ Comprendes cómo construir una identidad de marca coherente y memorable.</li>
    )}

    {skills.Color >= 80 && (
      <li>✅ Seleccionas paletas de color alineadas con la personalidad de una marca.</li>
    )}

    {skills.Tipografia >= 80 && (
      <li>✅ Demuestras criterio al elegir tipografías legibles y profesionales.</li>
    )}

    {skills.Composicion >= 80 && (
      <li>✅ Organizas los elementos visuales de forma equilibrada y funcional.</li>
    )}

    {skills.ComunicacionVisual >= 80 && (
      <li>✅ Sabes transmitir mensajes claros mediante recursos gráficos.</li>
    )}

    {skills.Creatividad >= 80 && (
      <li>✅ Presentas una buena capacidad para generar soluciones creativas.</li>
    )}

  </ul>

</div>

<div className="mt-8 bg-[#1d1250] rounded-[30px] p-8">

  <h2 className="text-3xl font-bold mb-6">
    📈 Oportunidades de Mejora
  </h2>

  <ul className="space-y-4 text-lg text-slate-300">

    {skills.Branding < 80 && (
      <li>• Reforzar conocimientos sobre branding e identidad corporativa.</li>
    )}

    {skills.Color < 80 && (
      <li>• Profundizar en teoría del color y psicología aplicada al diseño.</li>
    )}

    {skills.Tipografia < 80 && (
      <li>• Practicar selección y combinación de tipografías.</li>
    )}

    {skills.Composicion < 80 && (
      <li>• Mejorar el manejo de jerarquía visual y composición.</li>
    )}

    {skills.ComunicacionVisual < 80 && (
      <li>• Desarrollar una comunicación gráfica más efectiva y consistente.</li>
    )}

    {skills.Creatividad < 80 && (
      <li>• Explorar referencias y ejercicios para fortalecer la creatividad.</li>
    )}

  </ul>

</div>

<div className="mt-8 bg-gradient-to-r from-violet-700 to-fuchsia-600 rounded-[30px] p-8">

  <h2 className="text-3xl font-bold mb-5">
    🧑‍💼 Perfil Profesional Estimado
  </h2>

  <p className="text-xl leading-9">

    {percentage >= 90
      ? "Tu desempeño indica un perfil sobresaliente para desempeñarte en áreas como Branding, Identidad Visual, Dirección de Arte y Diseño de Marca."

      : percentage >= 70
      ? "Presentas una base sólida para desarrollarte como diseñador gráfico. Con práctica adicional podrías destacar en proyectos de identidad visual y comunicación corporativa."

      : percentage >= 50
      ? "Muestras interés y potencial creativo. Se recomienda fortalecer habilidades técnicas y ampliar tu experiencia mediante proyectos prácticos."

      : "Actualmente te encuentras en una etapa inicial de desarrollo. Con estudio y práctica puedes mejorar significativamente tu capacidad para resolver desafíos de diseño gráfico."
    }

  </p>

</div>

<div className="mt-6">

  <div className="h-5 bg-slate-700 rounded-full overflow-hidden">

    <div
      className="h-5 bg-gradient-to-r from-violet-500 to-fuchsia-400"
      style={{
        width: `${percentage}%`,
      }}
    />

  </div>

</div>

        {/* Recomendación personalizada */}

        <div className="mt-8 bg-violet-700 rounded-[25px] p-6">

          <h3 className="text-2xl font-bold mb-3">
            🚀 Recomendación
          </h3>

          <p className="leading-7 text-lg">

            {
              percentage >= 80

              ? "Tu perfil muestra una excelente proyección para estudiar Diseño Gráfico. Considera profundizar en UX/UI, branding estratégico e ilustración digital para ampliar tus oportunidades profesionales."

              : "Continúa desarrollando tus habilidades mediante proyectos prácticos, creación de portafolios y estudio de principios de identidad visual. Cada ejercicio fortalecerá tu criterio creativo y tu capacidad para resolver problemas de comunicación visual."
            }

          </p>

        </div>

        {/* Botón */}

        <button

          onClick={() => navigate("/guardados")}

          className="w-full mt-10 py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-2xl font-bold"

        >

          Ver mis resultados

        </button>

      </div>

    </div>

  );

}

return (

<div
  className="min-h-screen p-8 bg-cover bg-center"
  style={{
    backgroundImage: `url(${background})`,
  }}
>
{/* ===========================
      PANEL IZQUIERDO
=========================== */}

<div className="col-span-3">

  <div className="bg-white/95 rounded-[30px] p-6 shadow-2xl h-full">

    <h2 className="text-3xl font-bold mb-6">
      📋 Brief del Cliente
    </h2>

    <p className="text-slate-600 leading-7">
      Diseña un logo para una cafetería universitaria moderna que transmita
      cercanía, naturaleza e innovación.
    </p>

    <div className="mt-8">

      <p className="font-bold mb-2">
        Progreso
      </p>

      <div className="h-3 bg-slate-200 rounded-full">

        <div
          className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
          style={{
            width: `${((step + 1) / steps.length) * 100}%`,
          }}
        />

      </div>

      <p className="mt-2 text-sm text-slate-500">
        Paso {step + 1} de {steps.length}
      </p>

    </div>

    <div className="mt-10">

      <h3 className="font-bold text-xl mb-3">
        Habilidades
      </h3>

      <div className="space-y-2 text-slate-600">

        <p>💡 Creatividad: {skills.Creatividad}%</p>

        <p>🎯 Branding: {skills.Branding}%</p>

        <p>🎨 Color: {skills.Color}%</p>

        <p>🔤 Tipografía: {skills.Tipografia}%</p>

        <p>📐 Composición: {skills.Composicion}%</p>

        <p>👁️ Comunicación Visual: {skills.ComunicacionVisual}%</p>

      </div>

    </div>

  </div>

</div>

{/* ===========================
      PANEL CENTRAL
=========================== */}

<div className="col-span-6">

  <div className="bg-white/95 rounded-[30px] p-8 shadow-2xl">

    <h1 className="text-center text-3xl font-bold">
      🎨 Constructor de Logo
    </h1>

    <div className="mt-8 h-[430px] rounded-[30px] border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50">

      <div className="text-center">

        <div
          className="text-8xl transition-all"
          style={{
            color: logo.colors.primary,
          }}
        >
          {logo.icon}
        </div>

        <h2
          className="mt-6 text-6xl font-bold"
          style={{
            color: logo.colors.primary,
            fontFamily: logo.font,
          }}
        >
          {logo.company}
        </h2>

        <div
          className="w-56 h-2 rounded-full mx-auto mt-5"
          style={{
            background: logo.colors.secondary,
          }}
        />

        <p
          className="mt-6 text-xl"
          style={{
            fontFamily: logo.font,
          }}
        >
          {logo.slogan || "El eslogan aparecerá aquí"}
        </p>

        <div className="mt-6 inline-block bg-slate-200 rounded-full px-5 py-2">

          {logo.style}

        </div>

      </div>

    </div>

    <div className="mt-8 bg-violet-50 rounded-[25px] p-6">

      <h2 className="text-2xl font-bold mb-3">

        {steps[step].title}

      </h2>

      <p className="text-slate-700 leading-8">

        {steps[step].description}

      </p>

    </div>

  </div>

</div>

{/* ===========================
      PANEL DERECHO
=========================== */}

<div className="col-span-3">

  <div className="space-y-5">

    {steps[step].options.map((option, index) => (

      <div
        key={index}
        onClick={() => handleSelect(option, index)}
        className={`
          h-32
          cursor-pointer
          perspective-[1000px]

          ${
            selected !== null &&
            selected !== index
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
              selected === index
                ? "[transform:rotateY(180deg)]"
                : ""
            }
          `}
        >

          {/* Frente */}

          <div
            className="
              absolute
              inset-0
              rounded-[25px]
              bg-[#16053f]
              border
              border-violet-500
              flex
              items-center
              px-5
              [backface-visibility:hidden]
            "
          >

            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold mr-4">

              {index + 1}

            </div>

            <p className="text-white font-semibold">

              {option.text}

            </p>

          </div>

          {/* Parte trasera */}

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
                option.correct
                  ? "bg-green-600"
                  : "bg-red-600"
              }
            `}
          >

            <div className="text-center text-4xl mb-2">

              {option.correct ? "😊" : "😕"}

            </div>

            <p className="text-white text-center text-sm leading-6">

              {option.feedback}

            </p>

          </div>

        </div>

      </div>

    ))}

    <button

      disabled={!answered}

      onClick={nextStep}

      className={`
        w-full
        py-4
        rounded-2xl
        font-bold

        ${
          answered
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"
            : "bg-slate-400 cursor-not-allowed text-white"
        }
      `}
    >

      Continuar →

    </button>

  </div>

</div>

  </div> 



);

}