import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import bannerImage from "../assets/mercado-banner.jpg";

export default function MercadoLaboral() {

  const [careers, setCareers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const response = await api.get("/careers");

      setCareers(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const getDemandColor = (demanda) => {

    switch (demanda) {

      case "Alta":
        return "bg-green-100 text-green-700";

      case "Media":
        return "bg-yellow-100 text-yellow-700";

      case "Baja":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";

    }

  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HERO */}
      <section
        className="relative bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${bannerImage})`
        }}
      >

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10"></div>

        <div className="relative max-w-7xl mx-auto px-10 py-32">

          <button
            onClick={() => navigate("/")}
            className="mb-8 bg-white text-violet-700 px-6 py-3 rounded-2xl font-semibold hover:bg-slate-100 transition"
          >
            ← Volver al inicio
          </button>

          <div className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white mb-6">
            📈 Información actualizada del mercado laboral
          </div>

          <h1 className="text-7xl font-extrabold text-white drop-shadow-2xl">

            Analiza el

            <span className="block text-violet-200">
              mercado laboral
            </span>

          </h1>

          <p className="text-2xl text-white mt-6 max-w-3xl">

            Conoce salarios, empleabilidad,
            demanda laboral y crecimiento
            de cada profesión.

          </p>

        </div>

      </section>

      {/* ESTADÍSTICAS */}
      <div className="max-w-7xl mx-auto px-10 -mt-12 relative z-10">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-4xl font-bold text-violet-600">
              {careers.length}
            </h3>

            <p className="text-slate-600 mt-2">
              Carreras disponibles
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-4xl font-bold text-green-600">
              90%
            </h3>

            <p className="text-slate-600 mt-2">
              Empleabilidad promedio
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-4xl font-bold text-blue-600">
              +10K
            </h3>

            <p className="text-slate-600 mt-2">
              Estudiantes orientados
            </p>
          </div>

        </div>

      </div>

      {/* TABLA */}
      <div className="max-w-7xl mx-auto p-10">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="p-8 border-b">

            <h2 className="text-3xl font-bold text-slate-800">
              Carreras y oportunidades laborales
            </h2>

            <p className="text-slate-500 mt-2">
              Consulta indicadores clave del mercado laboral.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">

                  <th className="p-5 text-left">
                    Carrera
                  </th>

                  <th className="p-5 text-center">
                    Salario Promedio
                  </th>

                  <th className="p-5 text-center">
                    Empleabilidad
                  </th>

                  <th className="p-5 text-center">
                    Demanda
                  </th>

                  <th className="p-5 text-center">
                    Crecimiento
                  </th>

                </tr>

              </thead>

              <tbody>

                {careers.map((career) => (

                  <tr
                    key={career.id}
                    className="border-b hover:bg-violet-50 transition"
                  >

                    <td className="p-5 font-semibold text-slate-800">
                      {career.nombre}
                    </td>

                    <td className="p-5 text-center font-medium">
                      $
                      {Number(
                        career.salario_promedio
                      ).toLocaleString()}
                    </td>

                    <td className="p-5 text-center">

                      <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold">
                        {career.empleabilidad}%
                      </span>

                    </td>

                    <td className="p-5 text-center">

                      <span
                        className={`px-4 py-1 rounded-full font-semibold ${getDemandColor(
                          career.demanda_laboral
                        )}`}
                      >
                        {career.demanda_laboral}
                      </span>

                    </td>

                    <td className="p-5 text-center font-semibold text-green-600">
                      +{career.crecimiento_sector}%
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}