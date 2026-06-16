import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import neutralBg from "../assets/communication-neutral.png";
import successBg from "../assets/communication-success.png";
import failBg from "../assets/communication-fail.png";

export default function CommunicationSimulation() {

  const navigate = useNavigate();

  // Caso actual
  const [currentCase, setCurrentCase] = useState(0);

  // Opción seleccionada
  const [selectedCard, setSelectedCard] = useState(null);

  // Respondió
  const [answered, setAnswered] = useState(false);

  // Finalizó
  const [finished, setFinished] = useState(false);

  // Puntaje
  const [score, setScore] = useState(0);

  // Estado visual
  const [emotion, setEmotion] = useState("neutral");

  // Campaña construida dinámicamente
  const [campaign, setCampaign] = useState({

    audience: "Sin definir",

    slogan: "Sin definir",

    tone: "Sin definir",

    channel: "Sin definir",

    creativity: 40,

    coherence: 40,

    impact: 40,

    reach: 500

  });

  // Habilidades
  const [skills, setSkills] = useState({

    ComunicacionEstrategica: 0,

    Creatividad: 0,

    Storytelling: 0,

    RelacionesPublicas: 0,

    MarketingDigital: 0,

    AnalisisAudiencias: 0

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

  // 1
  {
    id: 1,

    title: "Define el público objetivo",

    challenge:
      "La campaña busca incentivar el reciclaje en la ciudad. ¿A quién dirigirías principalmente el mensaje?",

    skill: "AnalisisAudiencias",

    property: "audience",

    value: "Estudiantes universitarios",

    cards: [

      {
        text: "Dirigir la campaña a estudiantes universitarios.",
        correct: true,
        feedback:
          "Excelente elección. Es un público fácil de movilizar y con alto potencial de difusión."
      },

      {
        text: "Intentar llegar a todo el mundo sin segmentar.",
        correct: false,
        feedback:
          "Una campaña sin segmentación pierde efectividad y claridad."
      },

      {
        text: "Enfocarla únicamente en turistas.",
        correct: false,
        feedback:
          "No corresponde con el objetivo principal de la iniciativa."
      }

    ]

  },

  // 2
  {
    id: 2,

    title: "Selecciona el mensaje principal",

    challenge:
      "Debes escoger un eslogan que motive la participación ciudadana.",

    skill: "Storytelling",

    property: "slogan",

    value: "Pequeñas acciones, grandes cambios",

    cards: [

      {
        text: "Pequeñas acciones, grandes cambios.",
        correct: true,
        feedback:
          "El mensaje es positivo, memorable y genera identificación."
      },

      {
        text: "Recicla o serás sancionado.",
        correct: false,
        feedback:
          "El tono amenazante suele reducir el compromiso voluntario."
      },

      {
        text: "Compra más productos.",
        correct: false,
        feedback:
          "No comunica el propósito ambiental de la campaña."
      }

    ]

  },

  // 3
  {
    id: 3,

    title: "Define el tono comunicativo",

    challenge:
      "¿Qué estilo utilizarás para conectar con la audiencia?",

    skill: "ComunicacionEstrategica",

    property: "tone",

    value: "Inspirador",

    cards: [

      {
        text: "Inspirador y cercano.",
        correct: true,
        feedback:
          "Favorece la empatía y aumenta la participación."
      },

      {
        text: "Agresivo y culpabilizador.",
        correct: false,
        feedback:
          "Puede generar rechazo y disminuir el impacto positivo."
      },

      {
        text: "Muy técnico y complejo.",
        correct: false,
        feedback:
          "Reduce la comprensión para el público general."
      }

    ]

  },

  // 4
  {
    id: 4,

    title: "Selecciona el canal principal",

    challenge:
      "Debes elegir el medio más efectivo para difundir la campaña.",

    skill: "MarketingDigital",

    property: "channel",

    value: "Redes sociales",

    cards: [

      {
        text: "Publicar en redes sociales.",
        correct: true,
        feedback:
          "Permite un gran alcance y fomenta la interacción."
      },

      {
        text: "Enviar únicamente fax.",
        correct: false,
        feedback:
          "No resulta apropiado para este público."
      },

      {
        text: "No utilizar ningún canal digital.",
        correct: false,
        feedback:
          "Reduce significativamente el alcance."
      }

    ]

  },

  // 5
  {
    id: 5,

    title: "Diseña el contenido visual",

    challenge:
      "La creatividad es clave para captar la atención.",

    skill: "Creatividad",

    property: "creativity",

    value: 90,

    cards: [

      {
        text: "Crear piezas visuales claras y atractivas.",
        correct: true,
        feedback:
          "Una buena identidad visual mejora el reconocimiento de la campaña."
      },

      {
        text: "Usar imágenes aleatorias sin coherencia.",
        correct: false,
        feedback:
          "La falta de consistencia afecta la credibilidad."
      },

      {
        text: "Llenar todo de texto.",
        correct: false,
        feedback:
          "Disminuye el impacto visual."
      }

    ]

  },

  // 6
  {
    id: 6,

    title: "Gestiona una crisis",

    challenge:
      "Surgen comentarios negativos en redes sociales.",

    skill: "RelacionesPublicas",

    property: "coherence",

    value: 92,

    cards: [

      {
        text: "Responder con transparencia y datos.",
        correct: true,
        feedback:
          "Una gestión adecuada fortalece la confianza pública."
      },

      {
        text: "Ignorar completamente las críticas.",
        correct: false,
        feedback:
          "Puede agravar la percepción negativa."
      },

      {
        text: "Eliminar todos los comentarios.",
        correct: false,
        feedback:
          "Perjudica la reputación y genera desconfianza."
      }

    ]

  },

  // 7
  {
    id: 7,

    title: "Amplía el alcance",

    challenge:
      "Quieres que la campaña llegue a más personas.",

    skill: "MarketingDigital",

    property: "reach",

    value: 5000,

    cards: [

      {
        text: "Colaborar con creadores de contenido.",
        correct: true,
        feedback:
          "Las alianzas estratégicas incrementan la difusión."
      },

      {
        text: "No realizar ninguna promoción.",
        correct: false,
        feedback:
          "La campaña tendrá un crecimiento limitado."
      },

      {
        text: "Publicar una sola vez.",
        correct: false,
        feedback:
          "La frecuencia es importante para mantener visibilidad."
      }

    ]

  },

  // 8
  {
    id: 8,

    title: "Evalúa el impacto",

    challenge:
      "Es momento de medir los resultados obtenidos.",

    skill: "AnalisisAudiencias",

    property: "impact",

    value: 95,

    cards: [

      {
        text: "Analizar alcance, interacción y percepción.",
        correct: true,
        feedback:
          "Excelente decisión. Las métricas permiten mejorar futuras campañas."
      },

      {
        text: "Medir únicamente los 'me gusta'.",
        correct: false,
        feedback:
          "Una sola métrica no refleja el impacto real."
      },

      {
        text: "No realizar ninguna evaluación.",
        correct: false,
        feedback:
          "Sin medición no es posible optimizar la estrategia."
      }

    ]

  }

];

// =====================================
// SELECCIONAR RESPUESTA
// =====================================

const handleSelect = (card, index) => {

  if (selectedCard !== null) return;

  setSelectedCard(index);
  setAnswered(true);

  // Subir para mostrar el feedback
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

    // Actualizar campaña
    setCampaign(prev => ({

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

    // ===========================
  // FINALIZAR SIMULACIÓN
  // ===========================

  const percentage = Math.round(

    (score / cases.length) * 100

  );

  let observaciones = "";

  if (percentage >= 90) {

    observaciones =
      "Excelente desempeño. Demuestras habilidades sobresalientes en comunicación estratégica, creatividad y gestión de campañas.";

  } else if (percentage >= 70) {

    observaciones =
      "Buen desempeño. Presentas una afinidad importante con Comunicación Social y una adecuada capacidad de análisis.";

  } else if (percentage >= 50) {

    observaciones =
      "Tienes potencial para esta carrera, aunque puedes fortalecer aspectos relacionados con storytelling y marketing digital.";

  } else {

    observaciones =
      "Es recomendable desarrollar competencias en comunicación estratégica, creatividad y análisis de audiencias.";

  }

  try {

    const token = localStorage.getItem("token");

    await api.post(

      "/simulations",

      {

        // ⚠️ CAMBIA ESTE ID POR EL
        // CORRESPONDIENTE A
        // COMUNICACIÓN SOCIAL

        simulacion_id: 6,

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

  return (

    <div className="min-h-screen bg-[#fff7f2] flex items-center justify-center p-10">

      <div className="max-w-7xl w-full bg-white rounded-[40px] shadow-2xl p-10">

        <h1 className="text-6xl font-bold text-center text-orange-500">
          📢 Campaña Finalizada
        </h1>

        <h2 className="text-center text-8xl font-bold mt-8 text-orange-600">
          {percentage}%
        </h2>

        <p className="text-center text-2xl mt-4">
          Compatibilidad con Comunicación Social
        </p>

        <div className="mt-10 grid grid-cols-3 gap-5">

          <div className="bg-orange-50 rounded-3xl p-6">
            <h3 className="font-bold text-xl">👥 Público</h3>
            <p className="mt-2">{campaign.audience}</p>
          </div>

          <div className="bg-orange-50 rounded-3xl p-6">
            <h3 className="font-bold text-xl">💬 Eslogan</h3>
            <p className="mt-2">{campaign.slogan}</p>
          </div>

          <div className="bg-orange-50 rounded-3xl p-6">
            <h3 className="font-bold text-xl">📱 Canal</h3>
            <p className="mt-2">{campaign.channel}</p>
          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            📊 Habilidades
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div>🗣 Comunicación Estratégica: {skills.ComunicacionEstrategica}%</div>

            <div>🎨 Creatividad: {skills.Creatividad}%</div>

            <div>📖 Storytelling: {skills.Storytelling}%</div>

            <div>🤝 Relaciones Públicas: {skills.RelacionesPublicas}%</div>

            <div>📱 Marketing Digital: {skills.MarketingDigital}%</div>

            <div>📈 Análisis de Audiencias: {skills.AnalisisAudiencias}%</div>

          </div>

        </div>

        <div className="mt-10 bg-orange-50 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-4">
            🧠 Evaluación Profesional
          </h2>

          <p className="text-lg leading-8">

            {percentage >= 90

              ? "Tu desempeño refleja excelentes competencias en comunicación estratégica, creatividad y construcción de campañas de alto impacto. Presentas un perfil altamente compatible con Comunicación Social."

              : percentage >= 70

              ? "Demuestras una buena capacidad para diseñar campañas, comunicar ideas y conectar con diferentes audiencias. Puedes seguir fortaleciendo el análisis de métricas y la gestión de crisis."

              : percentage >= 50

              ? "Tienes potencial para desarrollarte en Comunicación Social, aunque sería recomendable reforzar habilidades relacionadas con storytelling, marketing digital y planificación estratégica."

              : "Se recomienda fortalecer competencias en comunicación, creatividad y análisis de públicos para mejorar el impacto de tus campañas."

            }

          </p>

        </div>

        <button

          onClick={() => navigate("/guardados")}

          className="
            mt-10
            w-full
            py-5
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-amber-500
            text-white
            text-2xl
            font-bold
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

    backgroundImage: `url(${background})`

  }}

>

  <div className="grid grid-cols-12 gap-6">


    {/* =====================================
      PANEL IZQUIERDO
===================================== */}

<div className="col-span-3">

  <div className="bg-white rounded-[32px] shadow-xl p-6">

    <h2 className="text-3xl font-bold text-orange-500">
      📢 Comunicación Social
    </h2>

    <p className="text-slate-600 mt-3 leading-7">
      Diseña una campaña que genere impacto positivo y conecte con la audiencia adecuada.
    </p>

    {/* Barra de progreso */}

    <div className="mt-8">

      <div className="flex justify-between font-semibold">

        <span>Progreso</span>

        <span>
          {currentCase + 1}/{cases.length}
        </span>

      </div>

      <div className="mt-3 h-3 rounded-full bg-slate-200 overflow-hidden">

        <div

          className="h-3 rounded-full bg-orange-500 transition-all"

          style={{
            width: `${((currentCase + 1) / cases.length) * 100}%`
          }}

        />

      </div>

    </div>

    {/* Estado de la campaña */}

    <div className="mt-8 space-y-3">

      <div className="bg-orange-50 rounded-2xl p-4">
        👥 <strong>Público:</strong><br />
        {campaign.audience}
      </div>

      <div className="bg-orange-50 rounded-2xl p-4">
        💬 <strong>Eslogan:</strong><br />
        {campaign.slogan}
      </div>

      <div className="bg-orange-50 rounded-2xl p-4">
        🎙️ <strong>Tono:</strong><br />
        {campaign.tone}
      </div>

      <div className="bg-orange-50 rounded-2xl p-4">
        📱 <strong>Canal:</strong><br />
        {campaign.channel}
      </div>

    </div>

    {/* Métricas */}

    <div className="mt-8">

      <h3 className="font-bold text-lg mb-3">
        📊 Métricas estimadas
      </h3>

      <div className="space-y-3">

        <div className="bg-slate-100 rounded-xl p-3 flex justify-between">
          <span>🎨 Creatividad</span>
          <strong>{campaign.creativity}%</strong>
        </div>

        <div className="bg-slate-100 rounded-xl p-3 flex justify-between">
          <span>🎯 Coherencia</span>
          <strong>{campaign.coherence}%</strong>
        </div>

        <div className="bg-slate-100 rounded-xl p-3 flex justify-between">
          <span>🚀 Impacto</span>
          <strong>{campaign.impact}%</strong>
        </div>

        <div className="bg-slate-100 rounded-xl p-3 flex justify-between">
          <span>👥 Alcance</span>
          <strong>{campaign.reach}</strong>
        </div>

      </div>

    </div>

  </div>

</div>

{/* =====================================
      PANEL CENTRAL
===================================== */}

<div className="col-span-6">

  <div className="bg-white rounded-[32px] shadow-xl p-8">

    <h2 className="text-3xl font-bold text-center text-orange-500">
      📱 Vista previa de la campaña
    </h2>

    {/* Mockup de publicación */}

    <div className="mt-8 rounded-[30px] border-4 border-slate-200 overflow-hidden shadow-lg">

      {/* Cabecera */}

      <div className="flex items-center justify-between px-6 py-4 bg-orange-100">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold">
            CS
          </div>

          <div>

            <p className="font-bold">
              Campaña Ciudadana
            </p>

            <p className="text-sm text-slate-500">
              Comunicación Social
            </p>

          </div>

        </div>

        <span className="text-slate-500">
          📡 En vivo
        </span>

      </div>

      {/* Imagen simulada */}

      <div className="h-[260px] bg-gradient-to-br from-orange-300 to-yellow-200 flex flex-col items-center justify-center">

        <div className="text-7xl">
          ♻️
        </div>

        <h2 className="text-4xl font-extrabold mt-4 text-center px-8">
          {campaign.slogan}
        </h2>

      </div>

      {/* Contenido */}

      <div className="p-6">

        <h3 className="text-2xl font-bold">
          👥 Público objetivo
        </h3>

        <p className="mt-2 text-slate-700">
          {campaign.audience}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="bg-orange-50 rounded-2xl p-4">

            <h4 className="font-bold">
              🎙️ Tono
            </h4>

            <p className="mt-2">
              {campaign.tone}
            </p>

          </div>

          <div className="bg-orange-50 rounded-2xl p-4">

            <h4 className="font-bold">
              📱 Canal principal
            </h4>

            <p className="mt-2">
              {campaign.channel}
            </p>

          </div>

        </div>

      </div>

    </div>

    {/* Estadísticas */}

    <div className="grid grid-cols-4 gap-4 mt-8">

      <div className="bg-green-100 rounded-2xl p-5 text-center">

        <p className="text-3xl">
          🎨
        </p>

        <p className="font-bold mt-2">
          Creatividad
        </p>

        <p className="text-2xl mt-1">
          {campaign.creativity}%
        </p>

      </div>

      <div className="bg-blue-100 rounded-2xl p-5 text-center">

        <p className="text-3xl">
          🎯
        </p>

        <p className="font-bold mt-2">
          Coherencia
        </p>

        <p className="text-2xl mt-1">
          {campaign.coherence}%
        </p>

      </div>

      <div className="bg-purple-100 rounded-2xl p-5 text-center">

        <p className="text-3xl">
          🚀
        </p>

        <p className="font-bold mt-2">
          Impacto
        </p>

        <p className="text-2xl mt-1">
          {campaign.impact}%
        </p>

      </div>

      <div className="bg-yellow-100 rounded-2xl p-5 text-center">

        <p className="text-3xl">
          👥
        </p>

        <p className="font-bold mt-2">
          Alcance
        </p>

        <p className="text-2xl mt-1">
          {campaign.reach}
        </p>

      </div>

    </div>

  </div>

</div>


{/* =====================================
      PANEL DERECHO
===================================== */}

<div className="col-span-3">

  <div className="space-y-5">

    {/* Tarjeta del desafío */}

    <div className="bg-white rounded-[32px] shadow-xl p-6">

      <h2 className="text-2xl font-bold text-orange-500">
        🎯 Desafío Actual
      </h2>

      <h3 className="text-xl font-semibold mt-4">
        {cases[currentCase].title}
      </h3>

      <p className="mt-4 text-slate-600 leading-7">
        {cases[currentCase].challenge}
      </p>

    </div>

    {/* Opciones */}

    {cases[currentCase].cards.map((card, index) => (

      <div
        key={index}
        className="h-40 cursor-pointer perspective-[1200px]"
        onClick={() => handleSelect(card, index)}
      >

        <div

          className={`
            relative
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

          {/* Frente */}

          <div

            className="
              absolute
              inset-0

              rounded-[28px]

              bg-gradient-to-br

              from-orange-500

              to-amber-500

              text-white

              flex

              items-center

              justify-center

              p-6

              text-center

              text-lg

              font-semibold

              [backface-visibility:hidden]
            "

          >

            {card.text}

          </div>

          {/* Reverso */}

          <div

            className={`
              absolute

              inset-0

              rounded-[28px]

              p-5

              text-white

              flex

              flex-col

              justify-center

              [transform:rotateY(180deg)]

              [backface-visibility:hidden]

              ${
                card.correct

                  ? "bg-green-600"

                  : "bg-red-600"
              }

            `}

          >

            <h3 className="text-2xl font-bold text-center">

              {

                card.correct

                  ? "✅ Excelente"

                  : "❌ Incorrecto"

              }

            </h3>

            <p className="mt-4 text-center leading-6">

              {card.feedback}

            </p>

          </div>

        </div>

      </div>

    ))}

    {/* Botón siguiente */}

    <button

      onClick={nextCase}

      disabled={!answered}

      className={`
        w-full

        py-5

        rounded-2xl

        text-xl

        font-bold

        transition-all

        ${
          answered

            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"

            : "bg-slate-300 text-slate-500 cursor-not-allowed"
        }

      `}

    >

      {

        currentCase === cases.length - 1

          ? "Finalizar simulación 🚀"

          : "Siguiente desafío ➜"

      }

    </button>

  </div>

</div>

  </div> {/* Fin del grid */}

</div>

);

}