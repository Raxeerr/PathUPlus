import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import {
  Heart,
  Trash2,
  Calendar,
  BarChart3
} from "lucide-react";

export default function Guardados() {

  const [favorites, setFavorites] = useState([]);
  const [simulations, setSimulations] = useState([]);

  const careerIcons = {
    "Ingeniería de Sistemas": "💻",
    "Ingeniería Civil": "🏗️",
    "Psicología": "🧠",
    "Diseño Gráfico": "🎨",
    "Comunicación Social": "🎤",
    "Administración": "📊",
    "Administración de Empresas": "📊"
  };

  const loadData = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const favoritesResponse =
        await api.get(
          "/favorites",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setFavorites(
        favoritesResponse.data.favorites
      );

      const simulationsResponse =
        await api.get(
          "/simulations/my-simulations",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setSimulations(
        simulationsResponse.data.simulations
      );

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadData();

  }, []);

  const removeFavorite = async (carreraId) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/favorites/${carreraId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setFavorites(
        favorites.filter(
          (career) =>
            career.carrera_id !== carreraId
        )
      );

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="min-h-screen flex bg-[#f5f7fb]">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-slate-800">
            Mis guardados
          </h1>

          <p className="text-slate-500 mt-2">
            Aquí puedes consultar tus carreras favoritas y simulaciones realizadas.
          </p>

        </div>

        {/* FAVORITOS */}

        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <div className="flex items-center gap-3 mb-8">

            <Heart
              className="text-violet-600"
              fill="#7c3aed"
            />

            <h2 className="text-3xl font-bold">
              Carreras guardadas
            </h2>

            <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-sm">
              {favorites.length}
            </span>

          </div>

          {favorites.length === 0 ? (

            <div className="text-center py-12">

              <p className="text-slate-500">
                No tienes carreras guardadas.
              </p>

            </div>

          ) : (

            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {favorites.map((career) => (

                <div
                  key={career.carrera_id}
                  className="
                  bg-white
                  border
                  rounded-3xl
                  overflow-hidden
                  hover:shadow-xl
                  transition
                  "
                >

                  <div
                    className="
                    h-40
                    bg-gradient-to-r
                    from-violet-600
                    to-fuchsia-500
                    flex
                    justify-center
                    items-center
                    "
                  >

                    <span className="text-7xl">

                      {
                        careerIcons[
                          career.nombre
                        ] || "🎓"
                      }

                    </span>

                  </div>

                  <div className="p-5">

                    <h3 className="text-xl font-bold text-slate-800">

                      {career.nombre}

                    </h3>

                    <p className="text-slate-500 mt-3 line-clamp-3">

                      {career.descripcion}

                    </p>

                    <div className="mt-5 flex justify-between items-center">

                      <span className="text-violet-600 font-semibold">

                        Guardada

                      </span>

                      <button
                        onClick={() =>
                          removeFavorite(
                            career.carrera_id
                          )
                        }
                        className="
                        text-red-500
                        hover:text-red-700
                        transition
                        "
                      >

                        <Trash2 size={20} />

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* SIMULACIONES */}

        <div className="bg-white rounded-3xl shadow-sm p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3
              className="text-violet-600"
            />

            <h2 className="text-3xl font-bold">
              Simulaciones realizadas
            </h2>

            <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-sm">
              {simulations.length}
            </span>

          </div>

          {simulations.length === 0 ? (

            <div className="text-center py-12">

              <p className="text-slate-500">
                No has realizado simulaciones.
              </p>

            </div>

          ) : (

            <div className="overflow-hidden rounded-2xl border">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left p-4">
                      Simulación
                    </th>

                    <th className="text-left p-4">
                      Fecha
                    </th>

                    <th className="text-left p-4">
                      Resultado
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {simulations.map((sim) => (

                    <tr
                      key={sim.id}
                      className="border-t"
                    >

                      <td className="p-4 font-medium">

                        {sim.nombre}

                      </td>

                      <td className="p-4 text-slate-500">

                        <div className="flex items-center gap-2">

                          <Calendar size={16} />

                          {
                            new Date(
                              sim.fecha
                            ).toLocaleDateString()
                          }

                        </div>

                      </td>

                      <td className="p-4">

                        <span
                          className="
                          bg-green-100
                          text-green-700
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          "
                        >

                          {sim.puntaje}%

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>

  );

}