
import api from "../services/api";
import { useEffect, useState, useRef } from "react";

export default function Test() {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionRef = useRef(null);

  useEffect(() => {

  if (questionRef.current) {

    questionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}, [currentQuestion]);

  useEffect(() => {

    const loadQuestions = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          "/test/questions",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setQuestions(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    loadQuestions();

  }, []);

  const handleChange = (id, value) => {

    setAnswers({
      ...answers,
      [id]: Number(value)
    });

  };
  const nextQuestion = () => {

  if (
    currentQuestion <
    questions.length - 1
  ) {

    setCurrentQuestion(
      currentQuestion + 1
    );

  } else {

    submitTest();

  }

};

  const submitTest = async () => {

    try {

      const token = localStorage.getItem("token");

      const respuestas = Object.keys(answers).map(
        (id) => ({
          pregunta_id: Number(id),
          valor: answers[id]
        })
      );

      const response = await api.post(
        "/test/submit",
        { respuestas },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.setItem(
        "resultado",
        JSON.stringify(response.data)
      );
      localStorage.setItem(
  "compatibilidades",
  JSON.stringify(
    response.data.compatibilidades
  )
);

      window.location.href = "/dashboard";

    } catch (error) {

      console.error(error);

    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 p-8">

    <div className="max-w-7xl mx-auto flex gap-8">

      {/* SIDEBAR */}

      <div className="w-80 bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Tu progreso
        </h2>

        <div className="flex justify-center mb-8">

          <div className="w-44 h-44 rounded-full border-8 border-violet-500 flex items-center justify-center">

            <div className="text-center">

              <div className="text-5xl font-bold text-violet-600">
                {currentQuestion + 1}
              </div>

              <div className="text-slate-500">
                / {questions.length}
              </div>

            </div>

          </div>

        </div>

        <div className="text-center mb-8">

          <p className="text-violet-600 font-bold">
            {Math.round(
              ((currentQuestion + 1) /
                questions.length) *
                100
            )}%
          </p>

          <p className="text-slate-500">
            completado
          </p>

        </div>

        <div className="border-t pt-6">

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center">
                {currentQuestion + 1}
              </div>

              <span className="text-violet-600 font-semibold">
                Pregunta actual
              </span>

            </div>

          </div>

        </div>

        <div className="mt-12 bg-violet-50 rounded-2xl p-5">

          <p className="text-sm text-violet-700">

            💡 No existen respuestas correctas o incorrectas.

            Responde con sinceridad para obtener mejores recomendaciones.

          </p>

        </div>

      </div>

      {/* CONTENIDO */}

      <div className="flex-1 bg-white rounded-3xl shadow-xl p-10">

        <div className="mb-10">

          <div className="flex items-center gap-4 mb-4">

            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-2xl">
              📋
            </div>

            <div>

              <p className="text-violet-600 font-semibold">
                Test Vocacional
              </p>

              <h1 className="text-5xl font-bold text-slate-800">
                Descubre tu camino ideal ✨
              </h1>

            </div>

          </div>

          <p className="text-slate-500 text-lg">

            Responde cada pregunta para encontrar las carreras
            más compatibles contigo

          </p>

        </div>

        {questions.length > 0 && (

          <div
  ref={questionRef}
  className="bg-slate-50 border rounded-3xl p-10"
>

            <div className="mb-8">

              <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold">

                Pregunta {currentQuestion + 1}
                {" "}
                de
                {" "}
                {questions.length}

              </span>

            </div>

            <h2 className="text-4xl font-bold text-slate-800 mb-10">

              {questions[currentQuestion]?.pregunta}

            </h2>

            <div className="space-y-5">

              {[
                {
                  value: 5,
                  emoji: "😍",
                  title: "Totalmente de acuerdo",
                  subtitle: "Me identifica completamente",
                  border: "border-green-500"
                },
                {
                  value: 4,
                  emoji: "🙂",
                  title: "De acuerdo",
                  subtitle: "Me gusta bastante",
                  border: "border-blue-500"
                },
                {
                  value: 3,
                  emoji: "😐",
                  title: "Neutral",
                  subtitle: "Ni me gusta ni me disgusta",
                  border: "border-yellow-500"
                },
                {
                  value: 2,
                  emoji: "🙁",
                  title: "En desacuerdo",
                  subtitle: "No me llama mucho la atención",
                  border: "border-orange-500"
                },
                {
                  value: 1,
                  emoji: "😖",
                  title: "Totalmente en desacuerdo",
                  subtitle: "No me identifica para nada",
                  border: "border-red-500"
                }
              ].map((option) => (

                <button
                  key={option.value}
                  onClick={() => {

                    handleChange(
                      questions[currentQuestion].id,
                      option.value
                    );

                    setTimeout(() => {

                      if (
                        currentQuestion <
                        questions.length - 1
                      ) {

                        setCurrentQuestion(
                          currentQuestion + 1
                        );

                      } else {

                        submitTest();

                      }

                    }, 250);

                  }}
                  className={`
                    w-full
                    p-6
                    rounded-2xl
                    border-2
                    ${option.border}
                    bg-white
                    hover:shadow-lg
                    hover:scale-[1.01]
                    transition
                    text-left
                  `}
                >

                  <div className="flex items-center gap-4">

                    <div className="text-4xl">
                      {option.emoji}
                    </div>

                    <div>

                      <div className="font-bold text-xl text-slate-800">
                        {option.title}
                      </div>

                      <div className="text-slate-500">
                        {option.subtitle}
                      </div>

                    </div>

                  </div>

                </button>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  </div>
);
}