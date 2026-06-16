import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import bannerImage from "../assets/career-banner.jpeg";
import adminCareer from "../assets/admin-career.jpeg";
import comunicacionCareer from "../assets/comunicacion-career.jpeg";
import disenadorCareer from "../assets/diseñador-career.jpeg";
import ingCivilCareer from "../assets/ingc-career.jpeg";
import ingSistemasCareer from "../assets/ings-career.jpeg";
import psicologiaCareer from "../assets/ps-career.jpeg";
export default function CareerExplorer() {
  
  const [careers, setCareers] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [selectedCareer, setSelectedCareer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {

    try {

      const response = await api.get("/careers");

      setCareers(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const getBackground = (area) => {

    switch (area) {

      case "Tecnología":
        return "from-blue-700 via-cyan-600 to-blue-500";

      case "Ingeniería":
        return "from-orange-600 via-amber-500 to-yellow-400";

      case "Creatividad":
        return "from-pink-600 via-fuchsia-500 to-purple-500";

      case "Administración":
        return "from-emerald-600 via-green-500 to-teal-500";

      case "Social":
        return "from-rose-600 via-red-500 to-orange-500";

      default:
        return "from-violet-700 to-purple-600";

    }

  };
  const getCareerImage = (nombre) => {

  switch (nombre) {

    case "Administración de Empresas":
      return adminCareer;

    case "Comunicación Social":
      return comunicacionCareer;

    case "Diseño Gráfico":
      return disenadorCareer;

    case "Ingeniería Civil":
      return ingCivilCareer;

    case "Ingeniería de Sistemas":
      return ingSistemasCareer;

    case "Psicología":
      return psicologiaCareer;

    default:
      return null;

  }

};

  const filteredCareers =
    filter === "Todas"
      ? careers
      : careers.filter(
          (career) => career.area === filter
        );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HERO */}
      <section
  className="relative overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: `url(${bannerImage})`
  }}
>

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-7xl mx-auto px-10 py-24">

          <div className="inline-block px-5 py-2 rounded-full bg-white/20 text-white backdrop-blur-md mb-6">
            🚀 Plataforma de orientación profesional
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6">

            Encuentra la carrera

            <span className="block text-violet-200">
              perfecta para ti
            </span>

          </h1>

          <p className="text-xl text-white/90 max-w-3xl">
            Explora perfiles profesionales,
            salarios, empleabilidad y demanda
            laboral para tomar decisiones más inteligentes.
          </p>

          <div className="flex gap-4 mt-8">

  <button
    onClick={() => navigate("/")}
    className="px-6 py-3 rounded-2xl bg-white text-violet-700 font-semibold hover:bg-slate-100 transition"
  >
    ← Volver al inicio
  </button>

</div>

          <div className="flex flex-wrap gap-6 mt-10">

            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl text-white">
              <h3 className="text-3xl font-bold">
                {careers.length}
              </h3>
              <p>Carreras disponibles</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl text-white">
              <h3 className="text-3xl font-bold">
                90%
              </h3>
              <p>Empleabilidad promedio</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl text-white">
              <h3 className="text-3xl font-bold">
                +10K
              </h3>
              <p>Estudiantes orientados</p>
            </div>

          </div>

        </div>

      </section>

      {/* FILTROS */}
      <div className="max-w-7xl mx-auto px-10 mt-10">

        <div className="flex flex-wrap gap-4">

          {[
            "Todas",
            "Tecnología",
            "Ingeniería",
            "Administración",
            "Creatividad",
            "Social"
          ].map((item) => (

            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full font-semibold transition
              ${
                filter === item
                  ? "bg-violet-600 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* TARJETAS */}
      <div className="max-w-7xl mx-auto p-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredCareers.map((career) => (

            <div
              key={career.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              {/* CABECERA */}
<div className="relative h-56 overflow-hidden">

  <img
    src={getCareerImage(career.nombre)}
    alt={career.nombre}
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/40"></div>

  <div className="absolute inset-0 flex items-center justify-center">

    <h2 className="text-white text-3xl font-bold text-center px-4">
      {career.nombre}
    </h2>

  </div>

</div>


              {/* CONTENIDO */}
              <div className="p-6">

                <span className="inline-block bg-violet-100 text-violet-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {career.area}
                </span>

                <p className="text-slate-600 mb-6 min-h-[90px]">
                  {career.descripcion}
                </p>

                <div className="space-y-3">

                  <div className="flex justify-between">
                    <span>💰 Salario</span>

                    <span className="font-bold">
                      ${Number(
                        career.salario_promedio
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>📈 Empleabilidad</span>

                    <span className="font-bold">
                      {career.empleabilidad}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>🚀 Demanda</span>

                    <span className="font-bold">
                      {career.demanda_laboral}
                    </span>
                  </div>

                </div>

                <button
  onClick={() => setSelectedCareer(career)}
  className="mt-8 w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold"
>
  Explorar carrera →
</button>

              </div>

            </div>

          ))}

        </div>

      </div>
            {selectedCareer && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

    <div className="bg-white max-w-3xl w-full rounded-3xl p-8 relative shadow-2xl">

      <button
        onClick={() => setSelectedCareer(null)}
        className="absolute top-5 right-5 text-2xl hover:text-red-500"
      >
        ✕
      </button>

      <h2 className="text-4xl font-bold text-violet-700 mb-4">
        {selectedCareer.nombre}
      </h2>

      <p className="text-slate-600 mb-6">
        {selectedCareer.descripcion}
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-100 p-4 rounded-xl">
          <h3 className="font-bold mb-2">
            💰 Salario Promedio
          </h3>

          <p>
            ${Number(selectedCareer.salario_promedio).toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl">
          <h3 className="font-bold mb-2">
            📈 Salario con Experiencia
          </h3>

          <p>
            ${Number(selectedCareer.salario_experiencia).toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl">
          <h3 className="font-bold mb-2">
            🚀 Demanda Laboral
          </h3>

          <p>{selectedCareer.demanda_laboral}</p>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl">
          <h3 className="font-bold mb-2">
            📊 Empleabilidad
          </h3>

          <p>{selectedCareer.empleabilidad}%</p>
        </div>

      </div>

      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">
          🧠 Habilidades
        </h3>

        <p className="text-slate-600">
          {selectedCareer.habilidades}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">
          🏢 Sectores
        </h3>

        <p className="text-slate-600">
          {selectedCareer.sectores}
        </p>
      </div>

    </div>

  </div>
)}
    </div>
  );
}