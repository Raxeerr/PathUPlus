import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import {
  Home,
  Brain,
  GraduationCap,
  Gamepad2,
  Briefcase,
  Heart,
  Rocket,
  MessageCircle,
  Bell,
  Settings
} from "lucide-react";

export default function Dashboard() {

  const [showNotifications, setShowNotifications] =
  useState(false);

  const [notificationCount, setNotificationCount] =
useState(0);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [bestCareer, setBestCareer] = useState(null);
  const [completedSimulations, setCompletedSimulations] = useState(0);

  useEffect(() => {

  const loadProgress = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/simulations/my-progress",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setCompletedSimulations(
  response.data.completed
);

    } catch (error) {

      console.error(error);

    }

  };

  loadProgress();

}, []);

  useEffect(() => {

    const usuario = JSON.parse(
      localStorage.getItem("usuario")
    );

    setUser(usuario);

    const compatibilidades = JSON.parse(
      localStorage.getItem("compatibilidades")
    );

    if (compatibilidades) {

      const careers = Object.entries(
        compatibilidades
      ).map(([name, value]) => ({
        name,
        value
      }));

      careers.sort(
        (a, b) => b.value - a.value
      );

      setRanking(careers);
      setBestCareer(careers[0]);

    }

  }, []);

  useEffect(() => {

  let totalProgress = 0;

  // TEST COMPLETADO
  if (bestCareer) {
    totalProgress += 30;
  }

  // CARRERAS GUARDADAS
  const favorites =
    JSON.parse(
      localStorage.getItem(
        "favoriteCareers"
      )
    ) || [];

  totalProgress += Math.min(
    (favorites.length / 3) * 20,
    20
  );

  // SIMULACIONES 
 totalProgress +=
  (completedSimulations / 6) * 50;

  setProgress(
    Math.round(totalProgress)
  );

}, [bestCareer, completedSimulations]);


  const notificationsMap = {

  "Ingeniería de Sistemas": [
    {
      title: "💻 Nueva simulación disponible",
      text: "Ingeniería de Sistemas"
    },
    {
      title: "📚 Curso recomendado",
      text: "Introducción a Programación"
    }
  ],

  "Ingeniería Civil": [
    {
      title: "🏗️ Nueva simulación disponible",
      text: "Ingeniería Civil"
    },
    {
      title: "📐 Curso recomendado",
      text: "AutoCAD Básico"
    }
  ],

  "Psicología": [
    {
      title: "🧠 Nueva simulación disponible",
      text: "Psicología Clínica"
    },
    {
      title: "📖 Lectura recomendada",
      text: "Psicología del comportamiento"
    }
  ],

  "Administración": [
    {
      title: "📊 Nueva simulación disponible",
      text: "Administración de Empresas"
    },
    {
      title: "💼 Curso recomendado",
      text: "Liderazgo y Gestión"
    }
  ],

  "Diseño Gráfico": [
    {
      title: "🎨 Nuevo reto creativo",
      text: "Diseño de Marca"
    },
    {
      title: "🖌️ Curso recomendado",
      text: "Adobe Illustrator"
    }
  ],

  "Comunicación Social": [
    {
      title: "🎤 Nueva actividad",
      text: "Producción de contenidos"
    },
    {
      title: "📰 Curso recomendado",
      text: "Periodismo Digital"
    }
  ]

};

const notifications =
notificationsMap[
  bestCareer?.name
] || [];

useEffect(() => {

  setNotificationCount(
    notifications.length
  );

}, [bestCareer]);

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENIDO */}

      <main className="flex-1 p-10">
        {
  showNotifications && (

    <div
      className="
        absolute
        top-24
        right-10
        w-80
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-slate-200
        z-50
      "
    >

      <div className="p-5 border-b">

        <h3 className="font-bold text-slate-800">
          Notificaciones
        </h3>

      </div>

     <div className="p-5 space-y-4">

  {notifications.map((item, index) => (

    <div
      key={index}
      className="
      border-b
      border-slate-100
      pb-3
      "
    >

      <p className="font-semibold">
        {item.title}
      </p>

      <p className="text-sm text-slate-500">
        {item.text}
      </p>

    </div>

  ))}

</div>

    </div>

  )
}

        {/* HEADER */}

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-5xl font-bold text-slate-800">

              Hola, {user?.nombre} 👋

            </h1>

            <p className="text-slate-500 mt-2 text-xl">
              Continúa explorando tu camino vocacional.
            </p>

          </div>

          <div className="flex items-center gap-4">

  <div className="relative">

   <button
  onClick={() => {

    setShowNotifications(
      !showNotifications
    );

    setNotificationCount(0);

  }}
  className="
    bg-white
    rounded-full
    p-4
    shadow
    hover:shadow-lg
    transition
    cursor-pointer
  "
>
  <Bell size={20} />
</button>

    {
notificationCount > 0 && (

<span
className="
absolute
-top-1
-right-1
bg-violet-600
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
"
>
{notificationCount}
</span>

)
}

  </div>

</div>

          

       

        </div>

        {/* HERO */}

        {bestCareer && (

          <div className="mt-10 bg-gradient-to-r from-violet-800 to-fuchsia-500 rounded-3xl p-10 text-white">

            <p className="text-violet-100">
              Carrera recomendada para ti
            </p>

            <h2 className="text-5xl font-bold mt-3">
              {bestCareer.name}
            </h2>

            <p className="text-2xl mt-3">
              Compatibilidad: {bestCareer.value}%
            </p>

          </div>

        )}

        {/* CARDS */}

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-3xl p-8 shadow">

            <h3 className="font-bold text-xl mb-4">
              Tu progreso vocacional
            </h3>

            <h2 className="text-5xl font-bold text-violet-600">
              {progress}%
            </h2>

            <div className="bg-slate-200 h-3 rounded-full mt-5">

              <div
                className="bg-violet-600 h-3 rounded-full"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow lg:col-span-2 flex justify-between items-center">

  <div>

    <p className="text-violet-600 font-semibold">
      Próximo paso
    </p>

    <h3 className="text-3xl font-bold mt-3">
      {bestCareer?.name}
    </h3>

    <p className="text-slate-500 mt-3">
      Inicia una simulación para conocer mejor esta carrera.
    </p>

    <button
      onClick={() => navigate("/simulaciones")}
      className="mt-6 px-6 py-3 rounded-xl bg-violet-600 text-white"
    >
      Iniciar simulación
    </button>

  </div>

  <img
    src="/simulacion.png"
    className="w-52"
    alt=""
  />

</div>

        </div>

        {/* TOP 3 */}

        <div className="bg-white rounded-3xl p-8 shadow mt-8">

          <h2 className="text-3xl font-bold mb-6">

            🏆 Top 3 carreras para ti

          </h2>

          {ranking.slice(0,3).map((career,index)=>(

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

      </main>

    </div>

  );

}