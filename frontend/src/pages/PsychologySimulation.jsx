import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import neutralPatient from "../assets/patient-neutral.png";
import happyPatient from "../assets/patient-happy.png";
import sadPatient from "../assets/patient-sad.png";

export default function PsychologySimulationV2() {

  const navigate = useNavigate();

  const [currentCase, setCurrentCase] =
    useState(0);

  const [selectedCard, setSelectedCard] =
    useState(null);

  const [answered, setAnswered] =
    useState(false);

  const [emotion, setEmotion] =
    useState("neutral");

  const [finished, setFinished] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const [skills, setSkills] = useState({
    Empatia: 0,
    EscuchaActiva: 0,
    Analisis: 0,
    Etica: 0,
    Comunicacion: 0,
    InteligenciaEmocional: 0,
  });

  const cases = [


    {
      id: 1,
      skill: "Empatia",
      patient:
        "Desde hace semanas siento que nadie me entiende y ya no disfruto las cosas que antes me gustaban.",

      cards: [
        {
          text: "Todos pasamos por momentos difíciles.",
          correct: false,
          feedback:
            "Esta respuesta minimiza el sufrimiento del paciente y puede generar una sensación de incomprensión. En psicología es fundamental validar las emociones antes de intentar ofrecer soluciones."
        },
        {
          text: "Entiendo que esto está siendo difícil para ti. ¿Podrías contarme más sobre cómo te has sentido?",
          correct: true,
          feedback:
            "Excelente intervención. Validas la experiencia emocional del paciente, utilizas una pregunta abierta y promueves un espacio seguro para la expresión de sentimientos. Esto demuestra una alta capacidad de empatía y fortalece la relación terapéutica."
        },
        {
          text: "Debes distraerte para dejar de pensar en eso.",
          correct: false,
          feedback:
            "Aunque la intención es ayudar, se intenta resolver el problema demasiado rápido sin comprender primero la experiencia emocional del paciente."
        }
      ]
    },
    {
      id: 2,
      skill: "EscuchaActiva",
      patient:
        "Perdí a mi abuelo hace dos meses y todavía siento mucho dolor.",

      cards: [
        {
          text: "Ya deberías haber superado eso.",
          correct: false,
          feedback:
            "Cada persona vive el duelo de forma distinta. Presionar para 'superarlo' puede aumentar el sentimiento de culpa y dificultar el proceso de adaptación."
        },
        {
          text: "Perder a alguien importante puede ser muy doloroso. ¿Cómo has vivido este proceso?",
          correct: true,
          feedback:
            "Has validado el duelo y favorecido la expresión emocional. Tu respuesta refleja escucha activa, sensibilidad y respeto por el proceso individual de afrontamiento."
        },
        {
          text: "Intenta distraerte.",
          correct: false,
          feedback:
            "Evitar el dolor no siempre ayuda. En muchos casos es importante permitir que la persona procese sus emociones de forma saludable."
        }
      ]
    },
    {
      id: 3,
      skill: "InteligenciaEmocional",
      patient:
        "Tengo un examen importante mañana y siento que no puedo respirar del estrés.",

      cards: [
        {
          text: "No es para tanto.",
          correct: false,
          feedback:
            "Minimizar la ansiedad puede hacer que el paciente se sienta incomprendido y aumentar su malestar."
        },
        {
          text: "Parece que esta situación te genera mucha ansiedad. ¿Qué pensamientos aparecen cuando piensas en el examen?",
          correct: true,
          feedback:
            "Identificas adecuadamente la emoción predominante y fomentas la exploración cognitiva. Esta respuesta demuestra inteligencia emocional y habilidades para comprender el origen del malestar."
        },
        {
          text: "Solo estudia más.",
          correct: false,
          feedback:
            "La respuesta ignora el componente emocional y se centra únicamente en la conducta."
        }
      ]
    },
    {
      id: 4,
      skill: "Analisis",
      patient:
        "Siento que nunca hago nada bien y que siempre decepciono a los demás.",

      cards: [
        {
          text: "Eso es porque piensas demasiado.",
          correct: false,
          feedback:
            "Reducir el problema a un exceso de pensamientos no ayuda a comprender la raíz de la baja autoestima."
        },
        {
          text: "Parece que eres muy crítico contigo mismo. ¿Qué situaciones te hacen sentir así?",
          correct: true,
          feedback:
            "Excelente análisis. Identificas un posible patrón cognitivo negativo e invitas al paciente a reflexionar sobre sus experiencias, favoreciendo una comprensión más profunda del problema."
        },
        {
          text: "Simplemente deja de pensar eso.",
          correct: false,
          feedback:
            "Los pensamientos automáticos negativos requieren exploración y trabajo terapéutico, no solo intentar ignorarlos."
        }
      ]
    },
    {
      id: 5,
      skill: "Comunicacion",
      patient:
        "En la universidad se burlan de mí constantemente y ya no quiero asistir.",

      cards: [
        {
          text: "Debes ignorarlos.",
          correct: false,
          feedback:
            "Restar importancia al acoso puede hacer que la persona se sienta desprotegida y poco comprendida."
        },
        {
          text: "Lamento que estés pasando por eso. ¿Cómo ha afectado esta situación tu bienestar emocional?",
          correct: true,
          feedback:
            "Demuestras una comunicación terapéutica adecuada al validar la experiencia y permitir que el paciente exprese el impacto emocional del acoso."
        },
        {
          text: "Seguro exageras.",
          correct: false,
          feedback:
            "Cuestionar la experiencia del paciente puede romper la confianza y dificultar la relación terapéutica."
        }
      ]
    },
    {
      id: 6,
      skill: "Empatia",
      patient:
        "Últimamente discuto todos los días con mis padres y siento que nadie me comprende.",

      cards: [
        {
          text: "Tus padres seguramente tienen razón.",
          correct: false,
          feedback:
            "Tomar partido sin comprender la situación limita la exploración emocional y puede generar rechazo."
        },
        {
          text: "Parece que estas discusiones están siendo muy difíciles para ti. ¿Cómo te hacen sentir?",
          correct: true,
          feedback:
            "Validas la experiencia emocional del paciente y fomentas una conversación centrada en sus sentimientos, fortaleciendo la empatía y la alianza terapéutica."
        },
        {
          text: "Deja de discutir.",
          correct: false,
          feedback:
            "La respuesta simplifica un conflicto complejo sin explorar sus causas."
        }
      ]
    },
    {
      id: 7,
      skill: "Etica",
      patient:
        "Mi trabajo me exige demasiado y siento que estoy agotado todo el tiempo.",

      cards: [
        {
          text: "Todos pasan por eso.",
          correct: false,
          feedback:
            "Normalizar el agotamiento puede invisibilizar un posible problema de salud mental."
        },
        {
          text: "Parece que estás experimentando un nivel importante de agotamiento. ¿Cómo ha afectado esto tu vida diaria?",
          correct: true,
          feedback:
            "Tu intervención es respetuosa y profesional. Exploras el impacto funcional del problema antes de emitir juicios o recomendaciones, mostrando un adecuado criterio ético."
        },
        {
          text: "Renuncia inmediatamente.",
          correct: false,
          feedback:
            "Proponer soluciones impulsivas sin comprender el contexto puede resultar contraproducente."
        }
      ]
    },
    {
      id: 8,
      skill: "Analisis",
      patient:
        "Hace unos minutos sentí que me iba a morir y mi corazón latía muy rápido.",

      cards: [
        {
          text: "Eso fue imaginación tuya.",
          correct: false,
          feedback:
            "Invalidar los síntomas puede aumentar el miedo y reducir la confianza del paciente."
        },
        {
          text: "Debió ser una experiencia muy angustiante. ¿Podrías contarme exactamente qué ocurrió?",
          correct: true,
          feedback:
            "Realizas una exploración estructurada del episodio y validas la experiencia emocional, demostrando capacidad analítica y pensamiento clínico."
        },
        {
          text: "No vuelvas a pensar en eso.",
          correct: false,
          feedback:
            "Evitar el tema no ayuda a comprender el origen ni el manejo del episodio."
        }
      ]
    },
    {
      id: 9,
      skill: "InteligenciaEmocional",
      patient:
        "Siento que no puedo ser feliz si mi pareja no está conmigo.",

      cards: [
        {
          text: "Eso demuestra cuánto la amas.",
          correct: false,
          feedback:
            "Confundir dependencia emocional con afecto puede reforzar patrones poco saludables."
        },
        {
          text: "¿Qué emociones aparecen cuando estás lejos de tu pareja y cómo las manejas?",
          correct: true,
          feedback:
            "Favoreces la reflexión sobre las emociones y los estilos de apego, mostrando una adecuada inteligencia emocional y comprensión interpersonal."
        },
        {
          text: "Busca otra pareja.",
          correct: false,
          feedback:
            "La respuesta evita analizar el origen del problema y ofrece una solución superficial."
        }
      ]
    },
    {
      id: 10,
      skill: "Comunicacion",
      patient:
        "Tengo miedo de intentar cosas nuevas porque siento que siempre voy a fracasar.",

      cards: [
        {
          text: "Entonces mejor no lo intentes.",
          correct: false,
          feedback:
            "Reforzar la evitación incrementa el miedo y limita el desarrollo personal."
        },
        {
          text: "Entiendo ese temor. ¿De dónde crees que proviene esa sensación de fracaso?",
          correct: true,
          feedback:
            "Excelente respuesta. Facilitas la exploración de creencias limitantes y promueves una conversación reflexiva basada en preguntas abiertas y comunicación terapéutica efectiva."
        },
        {
          text: "Solo piensa en positivo.",
          correct: false,
          feedback:
            "El pensamiento positivo por sí solo no aborda las causas profundas del problema ni favorece un cambio significativo."
        }
      ]
    }
  ];

  const handleSelect = (
    card,
    index
  ) => {

    if (selectedCard !== null)
      return;

    setSelectedCard(index);

    setAnswered(true);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);

    if (card.correct) {

      setScore(prev => prev + 1);

      setSkills(prev => ({
        ...prev,
        [cases[currentCase].skill]:
          Math.min((prev[cases[currentCase].skill] || 0) + 20, 100),
      }));

      setEmotion("happy");

    }

    else {

      setEmotion("sad");

    }

  };

  const nextCase = async () => {

    if (
      currentCase <
      cases.length - 1
    ) {

      setCurrentCase(
        prev => prev + 1
      );

      setSelectedCard(null);

      setAnswered(false);

      setEmotion(
        "neutral"
      );

      return;

    }

    const finalScore = score;

const percentage = Math.round(
  (finalScore / cases.length) * 100
);

let observaciones = "";

if (percentage >= 90) {
  observaciones =
    "Excelente desempeño. Demuestra una alta empatía, escucha activa y criterio profesional.";
} else if (percentage >= 70) {
  observaciones =
    "Buen desempeño. Presenta una afinidad importante con la Psicología.";
} else if (percentage >= 50) {
  observaciones =
    "Tiene potencial, pero puede fortalecer habilidades de comunicación y análisis.";
} else {
  observaciones =
    "Se recomienda desarrollar competencias básicas de empatía, escucha y razonamiento clínico.";
}

try {
  const token = localStorage.getItem("token");

  await api.post(
    "/simulations",
    {
      simulacion_id: 3, // ⚠️ Usa el ID correcto para Psicología en tu BD
      puntaje: percentage,
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
      bg-[#12043b]
      rounded-3xl
      p-10
      max-w-4xl
      w-full
      text-white
      ">

          <h1 className="
        text-5xl
        font-bold
        text-center
        ">
            🧠 Resultado Final
          </h1>

          <h2 className="
        text-center
        text-8xl
        font-bold
        mt-8
        text-green-400
        ">
            {percentage}%
          </h2>

          <p className="
        text-center
        text-2xl
        mt-4
        ">
            Afinidad con Psicología
          </p>

          <div className="mt-10 bg-[#1a1145] rounded-3xl p-8">

            <h3 className="text-3xl font-bold mb-6 text-center">
              📊 Perfil Profesional
            </h3>

            <div className="space-y-4 text-xl">

              <p>❤️ Empatía: {skills.Empatia}%</p>

              <p>👂 Escucha activa: {skills.EscuchaActiva}%</p>

              <p>🧩 Capacidad de análisis: {skills.Analisis}%</p>

              <p>⚖️ Ética profesional: {skills.Etica}%</p>

              <p>💬 Comunicación terapéutica: {skills.Comunicacion}%</p>

              <p>🧠 Inteligencia emocional: {skills.InteligenciaEmocional}%</p>

            </div>

          </div>

          <div className="mt-8 bg-[#1a1145] rounded-3xl p-8">

            <h3 className="text-3xl font-bold mb-6">
              ⭐ Fortalezas detectadas
            </h3>

            <div className="space-y-3 text-lg">

              {skills.Empatia >= 60 && (
                <p>❤️ Excelente capacidad para comprender y validar emociones.</p>
              )}

              {skills.EscuchaActiva >= 60 && (
                <p>👂 Buen nivel de escucha activa y formulación de preguntas abiertas.</p>
              )}

              {skills.Analisis >= 60 && (
                <p>🧩 Destacas en el análisis de situaciones y patrones psicológicos.</p>
              )}

              {skills.Comunicacion >= 60 && (
                <p>💬 Posees habilidades sólidas de comunicación terapéutica.</p>
              )}

              {skills.Etica >= 60 && (
                <p>⚖️ Muestras criterio ético y respeto por la experiencia del paciente.</p>
              )}

              {skills.InteligenciaEmocional >= 60 && (
                <p>🧠 Demuestras una adecuada comprensión y regulación emocional.</p>
              )}

            </div>

          </div>
          <p className="
mt-8
text-lg
leading-8
text-slate-300
text-center
">

            {percentage >= 90
              ? "Tu desempeño evidencia un perfil altamente compatible con la carrera de Psicología. Demuestras una sólida capacidad para comprender las emociones de otras personas, formular preguntas abiertas, analizar situaciones complejas y responder con empatía y criterio profesional. Estas competencias son esenciales en contextos clínicos, educativos, organizacionales y sociales."

              : percentage >= 70
                ? "Presentas una afinidad importante con la Psicología y cuentas con habilidades relevantes para el acompañamiento emocional, la comunicación terapéutica y el análisis de situaciones personales. Con mayor práctica podrías fortalecer aspectos relacionados con la exploración clínica y la intervención profesional."

                : percentage >= 50
                  ? "Tus respuestas muestran interés por comprender a las personas y resolver conflictos, aunque aún es recomendable fortalecer competencias como la escucha activa, la empatía profunda, el análisis de pensamientos y emociones y la comunicación centrada en el paciente."

                  : "Los resultados indican que todavía puedes desarrollar habilidades fundamentales para el ejercicio de la Psicología. Trabajar en la validación emocional, la comunicación respetuosa, el pensamiento crítico y la capacidad de análisis favorecerá un mejor desempeño en este campo profesional."
            }

          </p>
          <button



            onClick={() =>
              navigate("/guardados")
            }

            className="
          mt-10
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-violet-600
          to-fuchsia-500
          font-bold
          "
          >

            Ver resultados

          </button>

        </div>

      </div>

    );

  }

  const currentImage =

    emotion === "happy"
      ? happyPatient

      : emotion === "sad"
        ? sadPatient

        : neutralPatient;

  return (

    <div
      className="
min-h-screen
bg-cover
bg-center
bg-no-repeat

relative

overflow-y-auto
pb-40
"

      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center 120px"
      }}

    >

      <div className="
absolute
top-0
left-0

w-full

p-4

z-30
">

        <div className="
bg-[#12043b]/95

rounded-3xl

p-4

border
border-violet-600
">

          <h1 className="
text-3xl
font-bold
text-white
">
            🧠 Simulación Profesional
          </h1>

          <div className="
mt-4
">

            <div className="
flex
justify-between
text-white
mb-2
">

              <span>
                Caso {currentCase + 1}
              </span>

              <span>
                {cases.length}
              </span>

            </div>

            <div className="
h-4
bg-white/20
rounded-full
">

              <div

                className="
h-4
rounded-full
bg-gradient-to-r
from-violet-500
to-fuchsia-500
"

                style={{
                  width:
                    `${((currentCase + 1) / cases.length) * 100}%`
                }}

              ></div>

            </div>

          </div>

        </div>

      </div>

      <div


        className="
absolute

top-[140px]
right-[180px]

z-20
"
      >

        <div

          className="
relative

bg-white

w-[420px]

rounded-[40px]

p-8

border-[6px]
border-violet-600

shadow-2xl
"

        >

          <p

            className="
text-xl
font-medium
leading-relaxed
text-slate-800
"

          >

            {cases[currentCase].patient}

          </p>

          <div

            className="
absolute

-bottom-5
left-16

w-10
h-10

bg-white

border-r-[6px]
border-b-[6px]

border-violet-600

rotate-45
"

          ></div>

        </div>

      </div>

      <div
        className="
relative

mt-[500px]

mx-auto

w-[820px]

z-20
"
      >


        <h2

          className="
text-center

text-3xl

font-bold

text-white

mb-5
"
        >
          ¿Cómo responderías?
        </h2>

        <div
          className="
    space-y-5
    "
        >

          {
            cases[currentCase]
              .cards
              .map(
                (
                  card,
                  index
                ) => (

                  <div

                    key={index}

                    onClick={() =>
                      handleSelect(
                        card,
                        index
                      )
                    }

                    className={`
          h-32

          cursor-pointer

          perspective-[1000px]

          ${selectedCard !== null &&
                        selectedCard !== index
                        ? "opacity-50"
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

            ${selectedCard === index
                          ? "[transform:rotateY(180deg)]"
                          : ""
                        }
            `}
                    >

                      <div

                        className="
              absolute

              inset-0

              rounded-3xl

              bg-[#14053d]/90

              backdrop-blur-xl

              border
              border-violet-500/40

              flex
              items-center

              px-6

              [backface-visibility:hidden]
              "
                      >

                        <div

                          className="
                w-14
                h-14

                rounded-full

                bg-violet-600

                flex
                items-center
                justify-center

                text-white

                text-2xl
                font-bold

                mr-6
                "
                        >

                          {index + 1}

                        </div>

                        <p

                          className="
                text-white

                text-2xl

                leading-relaxed
                "
                        >

                          {card.text}

                        </p>

                      </div>

                      <div

                        className={`
              absolute

              inset-0

              rounded-3xl

              p-4

              [transform:rotateY(180deg)]

              [backface-visibility:hidden]

              flex
              flex-col
              justify-center

              ${card.correct
                            ? "bg-green-600"
                            : "bg-red-600"
                          }
              `}
                      >

                        <div
                          className="
                text-5xl

                text-center

                mb-3
                "
                        >

                          {
                            card.correct
                              ? "😊"
                              : "😔"
                          }

                        </div>

                        <p
                          className="
                text-center

                text-lg

                leading-relaxed

                text-white
                "
                        >

                          {card.feedback}

                        </p>

                      </div>

                    </div>

                  </div>

                )
              )
          }

          <button

            disabled={!answered}

            onClick={nextCase}

            className={`
  w-full

  py-4

  rounded-2xl

  font-bold

  mt-8

  ${answered
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-500"
                : "bg-slate-700 cursor-not-allowed"
              }
  `}
          >

            Continuar caso

          </button>

        </div>

      </div>

    </div>

  );
}