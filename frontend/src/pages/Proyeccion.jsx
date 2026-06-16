import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import {
  Target,
  TrendingUp,
  Calendar,
  Star,
  BookOpen,
  Briefcase,
  GraduationCap
} from "lucide-react";

export default function Proyeccion() {

  const [bestCareer, setBestCareer] = useState(null);

  useEffect(() => {

    const data = JSON.parse(
      localStorage.getItem("compatibilidades")
    );

    if (!data) return;

    const ranking = Object.entries(data)
      .map(([name, value]) => ({
        name,
        value
      }))
      .sort((a, b) => b.value - a.value);

    setBestCareer(ranking[0]);

  }, []);

  const strengthsMap = {

    "Ingeniería de Sistemas": [
      "Pensamiento lógico",
      "Resolución de problemas",
      "Adaptación tecnológica"
    ],

    "Ingeniería Civil": [
      "Planificación",
      "Pensamiento estructural",
      "Trabajo en equipo"
    ],

    "Psicología": [
      "Empatía",
      "Escucha activa",
      "Análisis humano"
    ],

    "Administración": [
      "Liderazgo",
      "Gestión",
      "Organización"
    ],

    "Diseño Gráfico": [
      "Creatividad",
      "Innovación",
      "Diseño visual"
    ],

    "Comunicación Social": [
      "Comunicación",
      "Redacción",
      "Trabajo colaborativo"
    ]

  };

  const strengths =
    strengthsMap[bestCareer?.name] || [];

    const skillsMap = {

  "Ingeniería de Sistemas": [
    ["Programación", 80],
    ["Bases de Datos", 75],
    ["Inglés Técnico", 70],
    ["Resolución de Problemas", 90]
  ],

  "Ingeniería Civil": [
    ["Diseño Estructural", 85],
    ["Matemáticas", 80],
    ["Gestión de Proyectos", 70],
    ["AutoCAD", 75]
  ],

  "Psicología": [
    ["Empatía", 90],
    ["Escucha Activa", 85],
    ["Análisis Conductual", 75],
    ["Comunicación", 80]
  ],

  "Administración": [
    ["Liderazgo", 85],
    ["Gestión Empresarial", 80],
    ["Toma de Decisiones", 75],
    ["Trabajo en Equipo", 70]
  ],

  "Diseño Gráfico": [
    ["Creatividad", 90],
    ["Diseño Visual", 85],
    ["Photoshop", 75],
    ["Branding", 70]
  ],

  "Comunicación Social": [
    ["Redacción", 85],
    ["Oratoria", 80],
    ["Comunicación Digital", 75],
    ["Creatividad", 70]
  ]

};

const durationMap = {

  "Ingeniería de Sistemas": "4 años",

  "Ingeniería Civil": "5 años",

  "Psicología": "5 años",

  "Administración": "4 años",

  "Diseño Gráfico": "4 años",

  "Comunicación Social": "4 años"

};

const estimatedTime =
  durationMap[
    bestCareer?.name
  ] || "4 años";

const skills =
  skillsMap[
    bestCareer?.name
  ] || [];

  return (

    <div className="min-h-screen flex bg-[#f5f7fb]">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-5xl font-bold text-slate-800">
            Mi proyección a futuro
          </h1>

          <p className="text-slate-500 mt-3">
            Visualiza tus metas, habilidades y los pasos
            recomendados para alcanzar tu mejor versión.
          </p>

        </div>

        {/* CARDS SUPERIORES */}

        <div className="grid lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-4">

              <Target className="text-violet-600" />

              <span className="text-slate-500">
                Meta principal
              </span>

            </div>

            <h2 className="text-xl font-bold text-violet-600">

              {bestCareer?.name}

            </h2>

            <p className="text-slate-500 mt-2">
              Tu carrera ideal
            </p>

            <div className="h-2 bg-slate-200 rounded-full mt-4">

              <div
                className="h-2 bg-violet-600 rounded-full"
                style={{
                  width: `${bestCareer?.value || 0}%`
                }}
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-4">

              <TrendingUp className="text-green-600" />

              <span className="text-slate-500">
                Progreso general
              </span>

            </div>

            <h2 className="text-4xl font-bold text-green-600">

              {bestCareer?.value || 0}%

            </h2>

            <p className="text-slate-500 mt-2">
              Vas por buen camino
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-4">

              <Calendar className="text-orange-500" />

              <span className="text-slate-500">
                Tiempo estimado
              </span>

            </div>

            <h3 className="text-5xl font-bold text-orange-500">
  {estimatedTime}
</h3>

            <p className="text-slate-500 mt-2">

              Para tu meta profesional

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-4">

              <Star className="text-blue-600" />

              <span className="text-slate-500">

                Fortalezas

              </span>

            </div>

            <ul className="space-y-2">

              {strengths.map((item) => (

                <li
                  key={item}
                  className="text-slate-700"
                >
                  • {item}
                </li>

              ))}

            </ul>

          </div>

        </div>

        {/* BLOQUE CENTRAL */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* RUTA */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">

              Ruta recomendada

            </h2>

            <div className="space-y-6">

              <div className="flex gap-4">

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center">

                  1

                </div>

                <div>

                  <h3 className="font-bold">
                    Corto plazo
                  </h3>

                  <p className="text-slate-500">
                    Fortalece tus habilidades básicas.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center">

                  2

                </div>

                <div>

                  <h3 className="font-bold">
                    Mediano plazo
                  </h3>

                  <p className="text-slate-500">
                    Realiza proyectos y especialízate.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center">

                  3

                </div>

                <div>

                  <h3 className="font-bold">
                    Largo plazo
                  </h3>

                  <p className="text-slate-500">
                    Alcanza tus metas profesionales.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* HABILIDADES */}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">

              Habilidades a desarrollar

            </h2>

            {skills.map(([name, value]) => (

              <div
                key={name}
                className="mb-5"
              >

                <div className="flex justify-between">

                  <span>{name}</span>

                  <span>{value}%</span>

                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">

                  <div
                    className="h-3 bg-violet-600 rounded-full"
                    style={{
                      width: `${value}%`
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* PARTE INFERIOR */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">

              Oportunidades para ti

            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">

                <div className="flex items-center gap-3">

                  <BookOpen />

                  <span>
                    Cursos recomendados
                  </span>

                </div>

                <button className="text-violet-600 font-semibold">
                  Ver
                </button>

              </div>

              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">

                <div className="flex items-center gap-3">

                  <GraduationCap />

                  <span>
                    Becas disponibles
                  </span>

                </div>

                <button className="text-violet-600 font-semibold">
                  Explorar
                </button>

              </div>

              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">

                <div className="flex items-center gap-3">

                  <Briefcase />

                  <span>
                    Prácticas profesionales
                  </span>

                </div>

                <button className="text-violet-600 font-semibold">
                  Buscar
                </button>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col justify-center">

            <h2 className="text-2xl font-bold mb-6">

              Inspiración diaria

            </h2>

            <div className="bg-violet-50 rounded-2xl p-8 text-center">

              <p className="text-xl text-violet-700">

                "El futuro pertenece a quienes creen
                en la belleza de sus sueños."

              </p>

              <p className="mt-4 font-semibold text-violet-600">

                — Eleanor Roosevelt

              </p>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}