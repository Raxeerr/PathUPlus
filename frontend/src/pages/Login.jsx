import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/login",
        {
          correo,
          password
        }
      );

      /* LIMPIAR DATOS DEL USUARIO ANTERIOR */

    

/* GUARDAR NUEVA SESIÓN */

localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "usuario",
  JSON.stringify(
    response.data.usuario
  )
);
const resultResponse = await api.get(
  "/test/my-result",
  {
    headers: {
      Authorization: `Bearer ${response.data.token}`
    }
  }
);

if (resultResponse.data.compatibilidades) {

  localStorage.setItem(
    "compatibilidades",
    JSON.stringify(
      resultResponse.data.compatibilidades
    )
  );

}
      if (!response.data.usuario.test_completado) {

    navigate("/test");

} else {

    navigate("/dashboard");

}

    } catch (error) {

  console.error(error);

  alert(
    error?.response?.data?.message ||
    error.message
  );

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
            ¡Bienvenido de vuelta! 👋
          </h2>

          <p className="mt-3 text-slate-500">
            Ingresa tus datos para continuar.
          </p>
        </div>

        <div className="flex mb-8 bg-slate-100 rounded-xl p-1">

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="flex-1 py-3 rounded-xl text-slate-500 hover:bg-slate-200 transition"
  >
    Registrarse
  </button>

  <button
    type="button"
    className="flex-1 py-3 rounded-xl bg-white shadow text-violet-600 font-semibold"
  >
    Iniciar sesión
  </button>

</div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold text-lg hover:scale-[1.02] transition"
          >
            Iniciar sesión →
          </button>

        </form>

      </div>

      {/* DERECHA */}
      <div className="hidden md:flex relative bg-gradient-to-br from-violet-700 via-purple-600 to-violet-500 items-center justify-center">

        <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>

        <div className="absolute bottom-16 left-10 w-40 h-40 border border-white/20 rounded-full"></div>

        <div className="text-center text-white px-10">

          <div className="text-8xl mb-8">
            🎓
          </div>

          <h2 className="text-5xl font-bold mb-6">
            Descubre tu futuro
          </h2>

          <p className="text-xl text-white/90 leading-relaxed">
            Explora carreras, realiza test vocacionales y encuentra tu camino ideal.
          </p>

          <div className="mt-10 bg-white/10 backdrop-blur rounded-2xl p-5">
            <p className="text-lg">
              "El futuro pertenece a quienes creen en la belleza de sus sueños."
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
  );
  
}