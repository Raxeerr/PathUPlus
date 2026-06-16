import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Diagnostic() {

  const [ranking, setRanking] = useState([]);
  const [bestCareer, setBestCareer] = useState(null);
  const strengthsMap = {

  "Ingeniería de Sistemas": [
    "Pensamiento analítico",
    "Resolución de problemas",
    "Lógica matemática",
    "Adaptación tecnológica",
    "Trabajo con sistemas"
  ],

  "Ingeniería Civil": [
    "Planificación",
    "Pensamiento estructural",
    "Gestión de proyectos",
    "Resolución de problemas",
    "Trabajo en equipo"
  ],

  "Psicología": [
    "Empatía",
    "Escucha activa",
    "Comunicación interpersonal",
    "Observación",
    "Análisis del comportamiento"
  ],

  "Diseño Gráfico": [
    "Creatividad",
    "Diseño visual",
    "Innovación",
    "Comunicación visual",
    "Pensamiento artístico"
  ],

  "Comunicación Social": [
    "Comunicación efectiva",
    "Redacción",
    "Creatividad",
    "Trabajo colaborativo",
    "Expresión oral"
  ],

  "Administración": [
    "Liderazgo",
    "Planificación estratégica",
    "Toma de decisiones",
    "Gestión de recursos",
    "Organización"
  ]
};

const strengths =
  strengthsMap[
    bestCareer?.name
  ] || [];

  useEffect(() => {

  const loadResults = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/test/my-result",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        response.data.compatibilidades;

      const careers =
        Object.entries(data).map(
          ([name, value]) => ({
            name,
            value
          })
        );

      careers.sort(
        (a, b) => b.value - a.value
      );

      setRanking(careers);
      setBestCareer(careers[0]);

    } catch (error) {

      console.error(error);

    }

  };

  loadResults();

}, []);

  return (
  <div className="min-h-screen flex bg-[#f5f7fb]">

    <Sidebar />

    <main className="flex-1 p-8 overflow-y-auto">

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-5xl font-bold text-slate-800">
          Diagnóstico
        </h1>

        <p className="text-slate-500 text-lg">
          Resultados de tu test vocacional
        </p>
      </div>

      {/* RESULTADO GENERAL */}

      <div className="bg-gradient-to-r from-violet-700 to-fuchsia-500 rounded-3xl p-8 text-white flex justify-between items-center">

        <div>
          <p className="text-violet-100 text-lg">
            Resultado general
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {bestCareer?.name}
          </h2>

          <p className="mt-4 text-lg max-w-2xl">
            Tu perfil muestra una alta afinidad
            con esta área profesional según
            tus respuestas en el test vocacional.
          </p>
        </div>

        <div className="w-44 h-44 rounded-full border-[10px] border-white flex items-center justify-center">

          <div>
            <h2 className="text-5xl font-bold text-center">
              {bestCareer?.value}%
            </h2>

            <p className="text-center">
              Afinidad
            </p>
          </div>

        </div>

      </div>

      {/* AREAS */}

      <h2 className="text-3xl font-bold text-slate-800 mt-10 mb-6">
        Áreas de mayor afinidad
      </h2>

      <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-6">

        {ranking.map((item) => (

          <div
  key={item.name}
  className="
  bg-white
  rounded-2xl
  p-6
  shadow-sm
  h-44
  flex
  flex-col
  justify-between
  "
>
            <h3
  className="
  font-semibold
  text-slate-800
  text-xl
  leading-snug
  min-h-[70px]
  "
>
  {item.name}
</h3>

            <p
  className="
  text-4xl
  font-extrabold
  text-violet-600
  "
>
              {item.value}%
            </p>
          </div>

        ))}

      </div>

      {/* FORTALEZAS + TOP */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-2xl font-bold mb-6">
            Fortalezas principales
          </h2>

          <ul className="space-y-4 text-slate-700">

  {strengths.map((item) => (

    <li
      key={item}
      className="flex items-center gap-3"
    >
      <span className="text-green-500">
        ✅
      </span>

      {item}
    </li>

  ))}

</ul>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <h2 className="text-2xl font-bold mb-6">
            Carreras compatibles
          </h2>

          {ranking.slice(0, 5).map((career, index) => (

            <div
              key={career.name}
              className="mb-5"
            >

              <div className="flex justify-between">

                <span>
                  #{index + 1} {career.name}
                </span>

                <span className="font-bold text-violet-600">
                  {career.value}%
                </span>

              </div>

              <div className="bg-slate-200 h-3 rounded-full mt-2">

                <div
                  className="bg-violet-600 h-3 rounded-full"
                  style={{
                    width: `${career.value}%`
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* RESUMEN */}

      <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">

        <h2 className="text-3xl font-bold mb-8">
  📋 Resumen del diagnóstico
</h2>

<div className="grid md:grid-cols-4 gap-5">

  <div className="bg-violet-50 rounded-2xl p-6">
    <p className="text-slate-500 text-sm">
      Estado
    </p>

    <h3 className="text-2xl font-bold text-green-600 mt-2">
      Finalizado
    </h3>
  </div>

  <div className="bg-violet-50 rounded-2xl p-6">
    <p className="text-slate-500 text-sm">
      Compatibilidad máxima
    </p>

    <h3 className="text-4xl font-bold text-violet-600 mt-2">
      {bestCareer?.value}%
    </h3>
  </div>

  <div className="bg-violet-50 rounded-2xl p-6">
    <p className="text-slate-500 text-sm">
      Carrera recomendada
    </p>

    <h3 className="text-xl font-bold mt-2">
      {bestCareer?.name}
    </h3>
  </div>

  <div className="bg-violet-50 rounded-2xl p-6">
    <p className="text-slate-500 text-sm">
      Ranking obtenido
    </p>

    <h3 className="text-2xl font-bold mt-2">
      #1
    </h3>
  </div>

</div>

      </div>

      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-3xl p-8 mt-8 text-white">

  <h2 className="text-2xl font-bold">
    🎯 Recomendación personalizada
  </h2>

  <p className="mt-4 text-lg">

    Según tu perfil vocacional, tienes mayor potencial en
    <strong> {bestCareer?.name}</strong>.
    Te recomendamos explorar simulaciones, revisar el mercado laboral
    y profundizar en las habilidades relacionadas con esta área para
    confirmar tu decisión profesional.

  </p>

</div>

    </main>

  </div>
);

}