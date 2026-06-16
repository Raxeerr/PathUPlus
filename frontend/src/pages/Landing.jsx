
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/pathu-hero.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const handleTest = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/test");
  };

  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-6">

        <h1 className="text-4xl font-bold text-white cursor-pointer">
          PathU+
        </h1>

        <div className="hidden md:flex gap-8 text-white font-medium">

          <button>
            Inicio
          </button>

          <button onClick={() => navigate("/explorer")}>
            Explorar Carreras
          </button>

          <button onClick={() => navigate("/mercado-laboral")}>
            Mercado Laboral
          </button>

          <button
            onClick={() =>
              document
                .getElementById("como-funciona")
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Cómo funciona
          </button>

        </div>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-2xl border-2 border-white text-white font-semibold backdrop-blur-sm"
          >
            Iniciar sesión
          </button>

          <button
  onClick={() => navigate("/login")}
  className="px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-lg font-semibold"
>
  Realizar Test 
</button>

        </div>

      </nav>

      {/* HERO */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      >
        <div className="w-full h-full bg-black/40">

          <div className="max-w-7xl mx-auto px-12 py-32">

            <div className="max-w-2xl">

              <div className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white mb-8">
                🎓 
              </div>

              <h1 className="text-7xl font-extrabold text-white leading-tight">

                Descubre tu

                <span className="block text-violet-300">
                  camino
                </span>

                profesional ideal

              </h1>

              <p className="mt-8 text-xl text-white/90">
                Descubre tus talentos, explora carreras y toma
                decisiones informadas para construir el futuro
                profesional que siempre has imaginado.
              </p>

              <div className="flex gap-4 mt-10">

                <button
  onClick={() => navigate("/login")}
  className="px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-lg font-semibold"
>
  Realizar Test ✨
</button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 rounded-2xl border-2 border-white text-white text-lg font-semibold"
                >
                  Iniciar sesión
                </button>

              </div>

              <div className="mt-10 flex items-center gap-4">

                <div className="flex -space-x-2 text-3xl">
                  👩‍🎓 👨‍🎓 👩‍💻 🧑‍💼
                </div>

                <p className="text-white">
                  <span className="font-bold text-violet-300">
                    +10.000 estudiantes
                  </span>{" "}
                  ya están explorando su futuro profesional
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CARACTERÍSTICAS */}
      <section
        id="caracteristicas"
        className="py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-12">

          <h2 className="text-5xl font-bold text-center mb-16">
            Todo lo que necesitas para descubrir tu futuro
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-50 p-8 rounded-3xl shadow hover:shadow-xl transition">
              <div className="text-5xl mb-4">📝</div>

              <h3 className="text-2xl font-bold mb-3">
                Test Vocacional
              </h3>

              <p className="text-slate-600">
                Descubre tus fortalezas, intereses y habilidades.
              </p>
            </div>

            <div
              onClick={() => navigate("/explorer")}
              className="bg-slate-50 p-8 rounded-3xl shadow hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-5xl mb-4">💼</div>

              <h3 className="text-2xl font-bold mb-3">
                Explorar Carreras
              </h3>

              <p className="text-slate-600">
                Conoce profesiones, perfiles y oportunidades.
              </p>
            </div>

            <div
              onClick={() => navigate("/mercado-laboral")}
              className="bg-slate-50 p-8 rounded-3xl shadow hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-5xl mb-4">📈</div>

              <h3 className="text-2xl font-bold mb-3">
                Mercado Laboral
              </h3>

              <p className="text-slate-600">
                Consulta salarios, demanda y empleabilidad.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* COMO FUNCIONA */}
      <section
        id="como-funciona"
        className="py-24 bg-violet-50"
      >

        <div className="max-w-6xl mx-auto px-12">

          <h2 className="text-5xl font-bold text-center mb-16">
            ¿Cómo funciona PathU+?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white p-8 rounded-3xl shadow text-center">
              <div className="text-6xl mb-4">📝</div>

              <h3 className="font-bold text-2xl mb-4">
                1. Regístrate
              </h3>

              <p className="text-slate-600">
                Crea tu cuenta y accede gratuitamente a la plataforma.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow text-center">
              <div className="text-6xl mb-4">🧠</div>

              <h3 className="font-bold text-2xl mb-4">
                2. Realiza el Test
              </h3>

              <p className="text-slate-600">
                Responde preguntas diseñadas para descubrir tu perfil.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow text-center">
              <div className="text-6xl mb-4">🚀</div>

              <h3 className="font-bold text-2xl mb-4">
                3. Obtén Recomendaciones
              </h3>

              <p className="text-slate-600">
                Recibe carreras sugeridas según tus intereses.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ESTADÍSTICAS */}
      <section className="py-24 bg-white">

        <div className="max-w-6xl mx-auto px-12">

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div>
              <h2 className="text-6xl font-bold text-violet-600">
                10K+
              </h2>

              <p className="text-xl text-slate-600 mt-3">
                Estudiantes
              </p>
            </div>

            <div>
              <h2 className="text-6xl font-bold text-violet-600">
                100+
              </h2>

              <p className="text-xl text-slate-600 mt-3">
                Carreras
              </p>
            </div>

            <div>
              <h2 className="text-6xl font-bold text-violet-600">
                95%
              </h2>

              <p className="text-xl text-slate-600 mt-3">
                Satisfacción
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12">

        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between">

          <div>

            <h2 className="text-3xl font-bold text-violet-400">
              PathU+
            </h2>

            <p className="mt-4 text-slate-400">
              Plataforma inteligente de orientación vocacional.
            </p>

          </div>

          <div className="mt-8 md:mt-0">

            <h3 className="font-semibold mb-4">
              Navegación
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li>Explorar Carreras</li>
              <li>Mercado Laboral</li>
              <li>Cómo funciona</li>
              <li>Iniciar Sesión</li>
            </ul>

          </div>

        </div>

      </footer>

    </div>
  );
}

