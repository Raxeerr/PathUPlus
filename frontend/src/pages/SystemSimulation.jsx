import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";  

import neutralBg from "../assets/systems-neutral.png";
import successBg from "../assets/systems-success.png";
import failBg from "../assets/systems-fail.png";

export default function SystemsSimulation() {

  const navigate = useNavigate();

  // Proyecto actual
  const [currentCase, setCurrentCase] = useState(0);

  // Opción seleccionada
  const [selectedCard, setSelectedCard] = useState(null);

  // ¿Ya respondió?
  const [answered, setAnswered] = useState(false);

  // Resultado final
  const [finished, setFinished] = useState(false);

  // Puntaje
  const [score, setScore] = useState(0);

  // Estado visual
  const [emotion, setEmotion] = useState("neutral");

  // Código mostrado en pantalla
  const [codePreview, setCodePreview] = useState(`// Sistema iniciado

function main(){

  console.log("Proyecto creado");

}
`);

  // Habilidades
  const [skills, setSkills] = useState({

    Programacion: 0,

    Algoritmos: 0,

    BasesDeDatos: 0,

    Seguridad: 0,

    Debugging: 0,

    Arquitectura: 0

  });

  // Fondo dinámico
  const background =

    emotion === "success"

      ? successBg

      : emotion === "fail"

      ? failBg

      : neutralBg;

      // =========================================
// CASOS DE LA SIMULACIÓN
// =========================================

const challenges = [

  {
    id: 1,

    title: "Sistema de inicio de sesión",

    client:
      "Una universidad necesita un módulo seguro para autenticar estudiantes.",

    skill: "Seguridad",

    code: `function login(usuario,password){

  if(validar(usuario,password)){

    return true;

  }

  return false;

}`,

    options: [

      {
        text: "Validar usuario y contraseña correctamente antes de iniciar sesión.",
        correct: true,
        feedback:
          "Excelente decisión. Todo sistema debe verificar las credenciales antes de conceder acceso."
      },

      {
        text: "Permitir el acceso si el usuario existe.",
        correct: false,
        feedback:
          "Esto representa una vulnerabilidad crítica de seguridad."
      },

      {
        text: "Ignorar la contraseña para agilizar el proceso.",
        correct: false,
        feedback:
          "Nunca debe omitirse la autenticación en un sistema real."
      }

    ]

  },

  {
    id: 2,

    title: "Elección de base de datos",

    client:
      "La plataforma almacenará miles de usuarios y relaciones entre ellos.",

    skill: "BasesDeDatos",

    code: `const database = "PostgreSQL";`,

    options: [

      {
        text: "Utilizar PostgreSQL por su consistencia y relaciones.",
        correct: true,
        feedback:
          "Una base de datos relacional es adecuada para este escenario."
      },

      {
        text: "Guardar toda la información en archivos TXT.",
        correct: false,
        feedback:
          "No es escalable ni seguro para aplicaciones empresariales."
      },

      {
        text: "Guardar todo en variables JavaScript.",
        correct: false,
        feedback:
          "Los datos desaparecerán al reiniciar el servidor."
      }

    ]

  },

  {
    id: 3,

    title: "Protección de contraseñas",

    client:
      "Se deben almacenar credenciales de forma segura.",

    skill: "Seguridad",

    code: `const hash = bcrypt.hashSync(password,10);`,

    options: [

      {
        text: "Encriptar utilizando bcrypt.",
        correct: true,
        feedback:
          "Excelente práctica para proteger contraseñas."
      },

      {
        text: "Guardar la contraseña en texto plano.",
        correct: false,
        feedback:
          "Esto pone en riesgo toda la información del usuario."
      },

      {
        text: "Guardar únicamente el nombre del usuario.",
        correct: false,
        feedback:
          "El sistema dejaría de autenticar correctamente."
      }

    ]

  },

  {
    id: 4,

    title: "Optimización de búsqueda",

    client:
      "El sistema tiene más de un millón de usuarios registrados.",

    skill: "Algoritmos",

    code: `usuarios.find(u => u.id === id);`,

    options: [

      {
        text: "Usar índices y búsquedas optimizadas.",
        correct: true,
        feedback:
          "Reduce considerablemente los tiempos de respuesta."
      },

      {
        text: "Recorrer todos los usuarios siempre.",
        correct: false,
        feedback:
          "No escala cuando aumenta el volumen de datos."
      },

      {
        text: "Duplicar toda la lista en memoria.",
        correct: false,
        feedback:
          "Incrementa innecesariamente el consumo de recursos."
      }

    ]

  },

  {
    id: 5,

    title: "Corrección de errores",

    client:
      "Un usuario reporta un fallo crítico en producción.",

    skill: "Debugging",

    code: `console.error(error);`,

    options: [

      {
        text: "Revisar logs y reproducir el error antes de modificar el código.",
        correct: true,
        feedback:
          "Un buen proceso de depuración evita introducir nuevos errores."
      },

      {
        text: "Eliminar el módulo completo.",
        correct: false,
        feedback:
          "Es una solución extrema e irresponsable."
      },

      {
        text: "Ignorar el reporte.",
        correct: false,
        feedback:
          "Los errores críticos deben atenderse inmediatamente."
      }

    ]

  },

  {
    id: 6,

    title: "Diseño de API",

    client:
      "Una aplicación móvil necesita consumir información del servidor.",

    skill: "Arquitectura",

    code: `app.get("/usuarios", controller.obtenerUsuarios);`,

    options: [

      {
        text: "Diseñar una API REST bien estructurada.",
        correct: true,
        feedback:
          "Facilita la integración entre distintos sistemas."
      },

      {
        text: "Enviar archivos manualmente por correo.",
        correct: false,
        feedback:
          "No es una solución escalable."
      },

      {
        text: "Permitir acceso directo a la base de datos.",
        correct: false,
        feedback:
          "Compromete la seguridad de la aplicación."
      }

    ]

  },

  {
    id: 7,

    title: "Pruebas automáticas",

    client:
      "Antes del lanzamiento se necesita verificar el funcionamiento.",

    skill: "Programacion",

    code: `expect(login("admin","123")).toBe(true);`,

    options: [

      {
        text: "Implementar pruebas automatizadas.",
        correct: true,
        feedback:
          "Permiten detectar errores antes de llegar a producción."
      },

      {
        text: "Confiar únicamente en que todo funciona.",
        correct: false,
        feedback:
          "Nunca debe omitirse la fase de pruebas."
      },

      {
        text: "Probar solo una vez y publicar.",
        correct: false,
        feedback:
          "No garantiza la calidad del software."
      }

    ]

  },

  {
    id: 8,

    title: "Escalabilidad",

    client:
      "La plataforma ahora tendrá más de 500.000 usuarios diarios.",

    skill: "Arquitectura",

    code: `const cache = redis.createClient();`,

    options: [

      {
        text: "Implementar caché y balanceo de carga.",
        correct: true,
        feedback:
          "Excelente decisión para mejorar rendimiento y disponibilidad."
      },

      {
        text: "Utilizar un único servidor para siempre.",
        correct: false,
        feedback:
          "El sistema colapsará ante una alta demanda."
      },

      {
        text: "Desactivar la base de datos cuando haya mucho tráfico.",
        correct: false,
        feedback:
          "La aplicación dejaría de funcionar correctamente."
      }

    ]

  }

];


// =========================================
// MANEJAR SELECCIÓN
// =========================================

const handleSelect = (option, index) => {

  // Evita responder dos veces
  if (selectedCard !== null) return;

  setSelectedCard(index);
  setAnswered(true);

  // Actualizar código mostrado
  setCodePreview(option.correct ? challenges[currentCase].code : codePreview);

  if (option.correct) {

    setScore((prev) => prev + 1);

    setEmotion("success");

    // Incrementar skill correspondiente
    setSkills((prev) => ({

      ...prev,

      [challenges[currentCase].skill]:
        Math.min(
          (prev[challenges[currentCase].skill] || 0) + 20,
          100
        ),

    }));

  } else {

    setEmotion("fail");

  }

};

// =========================================
// SIGUIENTE RETO
// =========================================

const nextChallenge = async () => {

  if (currentCase < challenges.length - 1) {

    setCurrentCase((prev) => prev + 1);

    setSelectedCard(null);

    setAnswered(false);

    setEmotion("neutral");

    // Subir automáticamente al inicio
    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

    return;

  }

 // Calcular resultado final
const percentage = Math.round(
  (score / challenges.length) * 100
);

let result = "";

if (percentage >= 90) {
  result =
    "Excelente desempeño. Demuestras sólidas competencias en Ingeniería de Sistemas.";
} else if (percentage >= 70) {
  result =
    "Buen desempeño. Presentas una buena afinidad con Ingeniería de Sistemas.";
} else if (percentage >= 50) {
  result =
    "Tienes potencial, pero debes reforzar tus conocimientos técnicos.";
} else {
  result =
    "Necesitas fortalecer las bases de programación y resolución de problemas.";
}

try {
  const token = localStorage.getItem("token");

  await api.post(
    "/simulations",
    {
      simulacion_id: 1, // ⚠️ CAMBIA este ID por el correcto de tu BD
      puntaje: percentage,
      observaciones: result,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
} catch (error) {
  console.error(error);
}

setFinished(true);

};

const percentage = Math.round(

  (score / challenges.length) * 100

);

if (finished) {

  return (

    <div className="min-h-screen bg-[#070b1a] flex items-center justify-center p-8">

      <div className="max-w-7xl w-full bg-[#111827] rounded-[40px] p-10 text-white shadow-2xl">

        {/* Encabezado */}

        <h1 className="text-6xl font-bold text-center">
          💻 Simulación Finalizada
        </h1>

        <p className="text-center text-slate-400 mt-4 text-xl">
          Has completado todos los desafíos de Ingeniería de Sistemas.
        </p>

        {/* Compatibilidad */}

        <div className="mt-10 text-center">

          <h2 className="text-8xl font-bold text-cyan-400">
            {percentage}%
          </h2>

          <p className="text-2xl mt-3">
            Compatibilidad con Ingeniería de Sistemas
          </p>

        </div>

        {/* Barra */}

        <div className="mt-8">

          <div className="h-5 bg-slate-700 rounded-full overflow-hidden">

            <div
              className="h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        {/* Skills */}

        <div className="grid grid-cols-2 gap-5 mt-10">

          <div className="bg-[#1e293b] rounded-2xl p-5">
            💻 Programación: {skills.Programacion}%
          </div>

          <div className="bg-[#1e293b] rounded-2xl p-5">
            ⚙️ Algoritmos: {skills.Algoritmos}%
          </div>

          <div className="bg-[#1e293b] rounded-2xl p-5">
            🗄️ Bases de Datos: {skills.BasesDeDatos}%
          </div>

          <div className="bg-[#1e293b] rounded-2xl p-5">
            🔒 Seguridad: {skills.Seguridad}%
          </div>

          <div className="bg-[#1e293b] rounded-2xl p-5">
            🐞 Debugging: {skills.Debugging}%
          </div>

          <div className="bg-[#1e293b] rounded-2xl p-5">
            🏗️ Arquitectura: {skills.Arquitectura}%
          </div>

        </div>

        {/* Feedback */}

        <div className="mt-10 bg-[#1e293b] rounded-[30px] p-8">

          <h2 className="text-3xl font-bold mb-6">
            📋 Evaluación Profesional
          </h2>

          <p className="leading-8 text-lg text-slate-300">

            {percentage >= 90

              ? "Demuestras un perfil altamente compatible con Ingeniería de Sistemas. Tus decisiones evidencian pensamiento lógico, capacidad de resolución de problemas, comprensión de buenas prácticas de desarrollo y un enfoque sólido en seguridad, arquitectura y escalabilidad."

              : percentage >= 70

              ? "Presentas una afinidad sólida con la Ingeniería de Sistemas. Comprendes conceptos importantes relacionados con programación, diseño de software y optimización, aunque aún puedes fortalecer habilidades avanzadas en arquitectura y análisis técnico."

              : percentage >= 50

              ? "Tienes una buena base para desarrollarte en esta disciplina. Se recomienda profundizar en estructuras de datos, algoritmos, seguridad informática y desarrollo de software para consolidar tus conocimientos."

              : "Tus respuestas indican que aún necesitas fortalecer competencias fundamentales relacionadas con programación, resolución de problemas y diseño de sistemas. Con estudio y práctica podrás desarrollar estas habilidades progresivamente."

            }

          </p>

        </div>

        {/* Recomendación */}

        <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-[25px] p-8">

          <h2 className="text-3xl font-bold mb-4">
            🚀 Recomendación
          </h2>

          <p className="text-lg leading-8">

            {
              percentage >= 80

                ? "Tu perfil muestra una excelente proyección para desempeñarte en áreas como Desarrollo Full Stack, Backend, Ciberseguridad, Inteligencia Artificial o Arquitectura de Software."

                : "Continúa practicando programación mediante proyectos personales, algoritmos, bases de datos y desarrollo web para fortalecer tus competencias técnicas."
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
            from-cyan-600
            to-blue-600
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

  <div className="grid grid-cols-12 gap-8">
    <div className="col-span-3">

  <div className="bg-[#0f172a]/95 rounded-[30px] p-6 shadow-2xl text-white h-full">

    <h2 className="text-3xl font-bold mb-6">
      📋 Proyecto
    </h2>

    <h3 className="text-xl font-semibold">
      {challenges[currentCase].title}
    </h3>

    <p className="mt-4 leading-7 text-slate-300">
      {challenges[currentCase].client}
    </p>

    <div className="mt-10">

      <div className="flex justify-between mb-2">

        <span>Progreso</span>

        <span>
          {currentCase + 1}/{challenges.length}
        </span>

      </div>

      <div className="h-3 bg-slate-700 rounded-full">

        <div
          className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            width: `${((currentCase + 1) / challenges.length) * 100}%`,
          }}
        />

      </div>

    </div>

    <div className="mt-10">

      <h3 className="font-bold mb-3">
        🛠 Tecnologías sugeridas
      </h3>

      <ul className="space-y-2 text-slate-300">

        <li>• JavaScript</li>
        <li>• Node.js</li>
        <li>• PostgreSQL</li>
        <li>• REST API</li>
        <li>• Git</li>
        <li>• Docker</li>

      </ul>

    </div>

  </div>

</div>

<div className="col-span-6">

  <div className="bg-[#111827]/95 rounded-[30px] shadow-2xl overflow-hidden">

    {/* Barra superior */}

    <div className="bg-[#1f2937] px-6 py-4 flex items-center gap-3">

      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>

      <span className="ml-5 text-slate-300">
        app.js
      </span>

    </div>

    {/* Editor */}

    <pre className="p-8 text-green-400 text-lg overflow-auto min-h-[520px] whitespace-pre-wrap">

{codePreview}

    </pre>

  </div>

</div>

{/* ======================================
        PANEL DERECHO
====================================== */}

<div className="col-span-3">

  <div className="space-y-5">

    <h2 className="text-white text-3xl font-bold text-center mb-4">
      💡 Soluciones
    </h2>

    {challenges[currentCase].options.map((option, index) => (

      <div

        key={index}

        onClick={() => handleSelect(option, index)}

        className={`
          h-36
          cursor-pointer
          perspective-[1000px]

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

          {/* ======================
                  FRENTE
          ======================= */}

          <div

            className="
              absolute

              inset-0

              rounded-[25px]

              bg-[#111827]

              border

              border-cyan-500

              flex

              items-center

              px-5

              [backface-visibility:hidden]
            "

          >

            <div

              className="
                w-14
                h-14

                rounded-full

                bg-cyan-600

                flex

                items-center

                justify-center

                text-white

                font-bold

                text-xl

                mr-5
              "

            >

              {index + 1}

            </div>

            <p className="text-white leading-6 font-medium">

              {option.text}

            </p>

          </div>

          {/* ======================
                  ATRÁS
          ======================= */}

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

            <div className="text-center text-4xl mb-3">

              {

                option.correct

                  ? "✅"

                  : "❌"

              }

            </div>

            <h3 className="text-center text-xl font-bold text-white mb-3">

              {

                option.correct

                  ? "Buena decisión"

                  : "No es recomendable"

              }

            </h3>

            <p className="text-center text-white text-sm leading-6">

              {option.feedback}

            </p>

          </div>

        </div>

      </div>

    ))}

    {/* Botón */}

    <button

      disabled={!answered}

      onClick={nextChallenge}

      className={`
        w-full

        py-4

        rounded-2xl

        font-bold

        text-lg

        transition-all

        ${
          answered

            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"

            : "bg-slate-500 text-white cursor-not-allowed"
        }

      `}

    >

      Continuar desafío →

    </button>

  </div>

</div>

  </div> {/* Cierra grid */}

</div> 

);

}