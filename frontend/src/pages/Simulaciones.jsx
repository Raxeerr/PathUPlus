
import { useNavigate } from "react-router-dom";

import sistemasImg from "../assets/ings-career.jpeg";
import civilImg from "../assets/ingc-career.jpeg";
import adminImg from "../assets/admin-career.jpeg";
import psicoImg from "../assets/ps-career.jpeg";
import disenoImg from "../assets/diseñador-career.jpeg";
import comunicacionImg from "../assets/comunicacion-career.jpeg";
export default function Simulaciones() {

  const navigate = useNavigate();

 const simulations = [
  {
    title: "Ingeniería de Sistemas",
    icon: "💻",
    image: sistemasImg,
    description: "Construye software para una startup.",
    duration: "15 min",
    level: "⭐⭐⭐",
    route: "/simulacion-sistemas"
  },
  {
    title: "Ingeniería Civil",
    icon: "🏗️",
    image: civilImg,
    description: "Diseña estructuras y resuelve problemas reales.",
    duration: "12 min",
    level: "⭐⭐⭐",
    route: "/simulacion-civil"
  },
  {
    title: "Psicología",
    icon: "🧠",
    image: psicoImg,
    description: "Analiza casos y ayuda a tus pacientes.",
    duration: "10 min",
    level: "⭐⭐",
    route: "/simulacion-psicologia"
  },
  {
    title: "Administración",
    icon: "📊",
    image: adminImg,
    description: "Gestiona una empresa y toma decisiones.",
    duration: "12 min",
    level: "⭐⭐⭐",
    route: "/simulacion-admin"
  },
  {
    title: "Diseño Gráfico",
    icon: "🎨",
    image: disenoImg,
    description: "Crea campañas y branding profesional.",
    duration: "10 min",
    level: "⭐⭐",
    route: "/simulacion-diseno"
  },
  {
    title: "Comunicación Social",
    icon: "🎙️",
    image: comunicacionImg,
    description: "Investiga y cubre noticias importantes.",
    duration: "10 min",
    level: "⭐⭐",
    route: "/simulacion-comunicacion"
  }
];

  return (
    <div className="min-h-screen bg-[#08041b] text-white">

      <div className="max-w-7xl mx-auto p-10">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 bg-violet-600 px-6 py-3 rounded-xl"
        >
          ← Volver
        </button>

        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-1000 rounded-3xl p-10 mb-10">

  <h1 className="text-6xl font-bold mb-4">
    🎮 Simulaciones Profesionales
  </h1>

  <p className="text-xl text-violet-90">
    Vive experiencias reales de cada profesión y descubre si encaja contigo.
  </p>

</div>

       

       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">

  {simulations.map((career) => (

    <div
      key={career.title}
      className="bg-[#120b35] rounded-3xl overflow-hidden border border-violet-900 hover:scale-105 transition duration-300 shadow-2xl"
    >

      <div
        className="h-56 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${career.image})`
        }}
      >

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-4 left-4">

          <span className="text-5xl">
            {career.icon}
          </span>

        </div>

      </div>

      <div className="p-6">

        <h2 className="text-3xl font-bold mb-3">
          {career.title}
        </h2>

        <p className="text-slate-400 mb-5">
          {career.description}
        </p>

        <div className="flex justify-between text-sm text-violet-300 mb-6">

          <span>
            ⏱ {career.duration}
          </span>

          <span>
            {career.level}
          </span>

        </div>

        <button
          onClick={() => navigate(career.route)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 font-bold"
        >
          Iniciar Simulación →
        </button>

      </div>

    </div>

  ))}

</div>

      </div>

    </div>
  );
}