import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    edad: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/auth/register",
        formData
      );

      alert("Usuario registrado correctamente");

      navigate("/login");

    } catch (error) {

      alert("Error al registrar usuario");

    }

  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* IZQUIERDA */}
        <div className="p-12 flex flex-col justify-center">

          <div className="mb-10">

            <h1 className="text-5xl font-extrabold text-violet-600">
              PathU+
            </h1>

            <h2 className="mt-8 text-4xl font-bold text-slate-900">
              ¡Crea tu cuenta! 🚀
            </h2>

            <p className="mt-3 text-slate-500">
              Comienza tu camino profesional con PathU+.
            </p>

          </div>

          <div className="flex mb-8 bg-slate-100 rounded-xl p-1">

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="flex-1 py-3 rounded-xl bg-white shadow text-violet-600 font-semibold"
            >
              Registrarse
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex-1 py-3 rounded-xl text-slate-500 hover:bg-slate-200 transition"
            >
              Iniciar sesión
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold text-lg hover:scale-[1.02] transition"
            >
              Crear cuenta →
            </button>

          </form>

          <p className="text-center text-slate-500 mt-6">
            ¿Ya tienes cuenta?

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-2 text-violet-600 font-semibold"
            >
              Inicia sesión
            </button>

          </p>

        </div>

        {/* DERECHA */}
        <div className="hidden md:flex relative bg-gradient-to-br from-violet-700 via-purple-600 to-violet-500 items-center justify-center">

          <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>

          <div className="absolute bottom-16 left-10 w-40 h-40 border border-white/20 rounded-full"></div>

          <div className="text-center text-white px-10">

            <div className="text-8xl mb-8">
              🚀
            </div>

            <h2 className="text-5xl font-bold mb-6">
              Construye tu futuro
            </h2>

            <p className="text-xl text-white/90 leading-relaxed">
              Descubre tus habilidades, explora carreras y encuentra tu propósito.
            </p>

            <div className="mt-10 bg-white/10 backdrop-blur rounded-2xl p-5">
              <p className="text-lg">
                "Cada gran profesional comenzó con una decisión."
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}