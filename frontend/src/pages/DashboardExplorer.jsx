import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Rocket } from "lucide-react";
import api from "../services/api";
import {
  Search,
  Heart,
  Briefcase,
  Clock
} from "lucide-react";

export default function DashboardExplorer() {

  const navigate = useNavigate();

  const [
selectedCareer,
setSelectedCareer
] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const compatibilidades =
JSON.parse(
  localStorage.getItem("compatibilidades")
) || {};

const [search, setSearch] = useState("");

  const careers = [

  {
    id: 1,
    name: "Ingeniería de Sistemas",
    image: "💻",
    route: "/simulacion-sistemas",
    area: "Tecnología",
    salary: "$4.200.000",
    duration: "4 años",
    demand: "Muy alta",
    description:
  "La Ingeniería de Sistemas forma profesionales capaces de diseñar, desarrollar e implementar soluciones tecnológicas para resolver problemas mediante software, inteligencia artificial, bases de datos, redes y transformación digital.",
   whatDo:
  "Desarrolla software, aplicaciones web y móviles, administra bases de datos, implementa inteligencia artificial, protege la ciberseguridad y lidera proyectos tecnológicos.",

  compatibility:
      compatibilidades[
        "Ingeniería de Sistemas"
      ] || 0
  },

  {
    id: 2,
    name: "Diseño Gráfico",
    route: "/simulacion-diseno",
    image: "🎨",
    area: "Diseño",
    salary: "$2.500.000",
    duration: "4 años",
    demand: "Media",
    description:
  "El Diseño Gráfico se enfoca en la comunicación visual mediante imágenes, ilustraciones, tipografía y contenido digital para transmitir mensajes de manera creativa y efectiva.",
whatDo:
  "Crea identidades visuales, logotipos, interfaces, ilustraciones, campañas publicitarias y contenido multimedia para marcas y organizaciones.",

    compatibility:
      compatibilidades[
        "Diseño Gráfico"
      ] || 0
  },

  {
    id: 3,
    name: "Psicología",
    route: "/simulacion-psicologia",
    image: "🧠",
    area: "Ciencias Sociales",
    salary: "$3.000.000",
    duration: "5 años",
    demand: "Alta",
    description:
  "La Psicología estudia el comportamiento humano y los procesos mentales para comprender, evaluar y mejorar el bienestar emocional, social y cognitivo de las personas.",
whatDo:
  "Evalúa, orienta y acompaña a personas y grupos para mejorar su salud mental, desempeño y bienestar en distintos contextos.",

    compatibility:
      compatibilidades[
        "Psicología"
      ] || 0
  },

  {
    id: 4,
    name: "Comunicación Social",
    route: "/simulacion-comunicacion",
    image: "📡",
    area: "Comunicación",
    salary: "$2.800.000",
    duration: "4 años",
    demand: "Media",
    description:
  "La Comunicación Social prepara profesionales para crear estrategias de comunicación, gestionar medios, producir contenido y generar impacto positivo en organizaciones y comunidades.",
whatDo:
  "Diseña campañas de comunicación, produce contenido para medios digitales, gestiona relaciones públicas y fortalece la imagen institucional.",

    compatibility:
      compatibilidades[
        "Comunicación Social"
      ] || 0
  },

  {
    id: 5,
    name: "Ingeniería Civil",
    route: "/simulacion-civil",
    image: "🏗️",
    area: "Ingeniería",
    salary: "$4.500.000",
    duration: "5 años",
    demand: "Alta",
    description:
  "La Ingeniería Civil se dedica al diseño, construcción y mantenimiento de obras de infraestructura como puentes, carreteras, edificios, presas y sistemas urbanos.",
whatDo:
  "Planifica, diseña y supervisa la construcción de obras civiles garantizando seguridad, eficiencia y cumplimiento de normas técnicas.",

    compatibility:
      compatibilidades[
        "Ingeniería Civil"
      ] || 0
  },

  {
    id: 6,
    name: "Administración de Empresas",
    route: "/simulacion-admin",
    image: "📊",
    area: "Administración",
    salary: "$3.500.000",
    duration: "4 años",
    demand: "Alta",
    description:
  "La Administración de Empresas forma líderes capaces de gestionar organizaciones, tomar decisiones estratégicas y optimizar recursos para alcanzar objetivos empresariales.",
whatDo:
  "Dirige equipos, administra recursos financieros y humanos, desarrolla estrategias de negocio y mejora los procesos organizacionales.",

    compatibility:
      compatibilidades[
        "Administración"
      ] || 0
  }

];

  useEffect(() => {

  const loadFavorites = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/favorites",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    console.log(
      response.data.favorites
    );

    response.data.favorites.forEach(
      fav => {

        console.log(
          "ID:",
          fav.carrera_id,
          "Nombre:",
          fav.nombre
        );

      }
    );

    setFavorites(
      response.data.favorites
    );

  } catch (error) {

    console.error(error);

  }

};

  loadFavorites();

}, []);
const toggleFavorite = async (career) => {

  console.log(
  "Guardando carrera:",
  career.id,
  career.name
);

  try {

    const token =
      localStorage.getItem("token");

    const isFavorite =
      favorites.some(
        (item) =>
          item.carrera_id === career.id
      );

    if (isFavorite) {

      await api.delete(
        `/favorites/${career.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    } else {

      await api.post(
        "/favorites",
        {
          carrera_id: career.id
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    }

    const response =
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
      response.data.favorites
    );

  } catch (error) {

    console.error(error);

  }

};

  const filteredCareers =
careers
.filter((career)=>
career.name
.toLowerCase()
.includes(
search.toLowerCase()
)
)
.sort(
(a,b)=>
b.compatibility -
a.compatibility
);

  return (

    <div className="min-h-screen flex bg-[#f5f7fb]">

      <Sidebar />

      <main className="flex-1 p-8">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Explorar carreras
            </h1>

            <p className="text-slate-500 mt-2">
              Descubre carreras según tu perfil
            </p>

          </div>

         

        </div>

        {/* BUSCADOR */}

        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 mb-8">

          <Search size={20} />

          <input
            type="text"
            placeholder="Buscar carrera..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 outline-none"
          />

        </div>

        {/* GRID */}

        <div className="grid lg:grid-cols-3 gap-6">

          {filteredCareers.map((career) => (

            <div
  key={career.id}
    className="
 bg-white
 rounded-3xl
 shadow-sm
 hover:shadow-xl
 transition
 overflow-hidden
 flex
 flex-col
 h-[650px]
 "
>

              {/* IMAGEN */}

              <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-52 flex justify-center items-center relative">

                <span className="text-8xl">

                  {career.image}

                </span>

                <button
                  onClick={() =>
                    toggleFavorite(career)
                  }
                  className="
                  absolute
                  top-4
                  right-4
                  bg-white
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  "
                >

                  <Heart
                    size={22}
                    fill={
                      favorites.find(
                        (item) =>
                          item.carrera_id === career.id
                      )
                        ? "#ff0000"
                        : "none"
                    }
                    color="#ff0000"
                  />

                </button>

              </div>

              {/* INFO */}

              <div
  className="
  p-6
  flex
  flex-col
  flex-1
  justify-between
  "
>

                <h2
  className="
  text-2xl
  font-bold
  text-slate-800
  h-20
  flex
  items-start
  "
>
  {career.name}
</h2>

               <span
  className="
  inline-flex
  items-center
  h-10
  bg-violet-100
  text-violet-700
  px-4
  rounded-full
  text-sm
  mt-3
  "
>

                  {career.area}

                </span>

                <div className="mt-5">

                  <div className="flex justify-between mb-2">

                    <span className="text-slate-500">
                      Compatibilidad
                    </span>

                    <span className="font-bold text-violet-600">

                      {career.compatibility}%

                    </span>

                  </div>

                  <div className="h-3 bg-slate-200 rounded-full">

                    <div
                      className="h-3 bg-violet-600 rounded-full"
                      style={{
                        width:
                          `${career.compatibility}%`
                      }}
                    />

                  </div>

                </div>

                <div className="flex justify-between mt-5 text-slate-600">

                  <div className="flex items-center gap-2">

                    <Briefcase size={16}/>
                    {career.demand}

                  </div>

                  <div className="flex items-center gap-2">

                    <Clock size={16}/>
                    {career.duration}

                  </div>

                </div>

                <p className="mt-4 font-semibold text-slate-700">

                  {career.salary}

                </p>

                <button
onClick={() =>
setSelectedCareer(career)
}
className="
mt-auto
w-full
py-3
rounded-xl
bg-violet-600
text-white
"
>
Ver carrera
</button>

              </div>

            </div>

          ))}

        </div>
            {
selectedCareer && (

<div
className="
fixed
inset-0
bg-black/50
overflow-y-auto
p-6
z-50
"
>

<div
className="
bg-white
w-full
max-w-4xl
mx-auto
rounded-[32px]
overflow-hidden
shadow-2xl
my-10
"
>

  {/* HEADER */}

  <div className="
    bg-gradient-to-r
    from-violet-600
    to-fuchsia-500
    p-6
    text-white
  ">

    <div className="flex justify-between items-center">

      <div>

        <span className="text-5xl">
          {selectedCareer.image}
        </span>

        <h2 className="text-5xl font-bold mt-4">
          {selectedCareer.name}
        </h2>

        <p className="mt-3 text-violet-100 text-lg">
          {selectedCareer.area}
        </p>

      </div>

      <div
        className="
        w-32
        h-32
        rounded-full
        border-8
        border-white
        flex
        items-center
        justify-center
        "
      >

        <div className="text-center">

          <h3 className="text-2xl font-bold">
            {selectedCareer.compatibility}%
          </h3>

          <p className="text-sm">
            Afinidad
          </p>

        </div>

      </div>

    </div>

  </div>

  {/* CONTENIDO */}

  <div className="p-6">

    <h3 className="text-2xl font-bold text-slate-800 mb-4">
      Descripción de la carrera
    </h3>

    <p className="text-slate-600 leading-8 text-lg">

      {selectedCareer.description}

    </p>

    <div className="mt-8">

  <h3 className="text-2xl font-bold text-slate-800 mb-4">
    ¿Qué hace un profesional de esta carrera?
  </h3>

  <div className="bg-blue-50 rounded-2xl p-6">

    <p className="text-slate-700 leading-8">

      {selectedCareer.whatDo}

    </p>

  </div>

</div>

    {/* INFO */}

    <div className="grid grid-cols-3 gap-5 mt-10">

      <div className="bg-violet-50 rounded-2xl p-5">

        <p className="text-slate-500 text-sm">
          Salario promedio
        </p>

        <h3 className="font-bold text-2xl mt-2">
          {selectedCareer.salary}
        </h3>

      </div>

      <div className="bg-violet-50 rounded-2xl p-5">

        <p className="text-slate-500 text-sm">
          Duración
        </p>

        <h3 className="font-bold text-2xl mt-2">
          {selectedCareer.duration}
        </h3>

      </div>

      <div className="bg-violet-50 rounded-2xl p-5">

        <p className="text-slate-500 text-sm">
          Demanda laboral
        </p>

        <h3 className="font-bold text-2xl mt-2">
          {selectedCareer.demand}
        </h3>

      </div>

    </div>

    {/* HABILIDADES */}

    <div className="mt-10">

      <h3 className="text-2xl font-bold text-slate-800 mb-5">
        Habilidades recomendadas
      </h3>

      <div className="flex flex-wrap gap-3">

        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full">
          Liderazgo
        </span>

        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full">
          Comunicación
        </span>

        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full">
          Trabajo en equipo
        </span>

        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full">
          Resolución de problemas
        </span>

      </div>

    </div>

    {/* BOTONES */}

    <div className="flex gap-4 mt-12">

      <button
        onClick={() => navigate(selectedCareer.route)}
        className="
        flex-1
        bg-violet-600
        hover:bg-violet-700
        text-white
        py-4
        rounded-2xl
        text-lg
        font-semibold
        "
      >
        <div className="flex items-center justify-center gap-2">
  <Rocket size={20} />
  <span>Realizar simulación</span>
</div>
      </button>

      <button
        onClick={() => setSelectedCareer(null)}
        className="
        px-8
        py-4
        rounded-2xl
        bg-slate-200
        hover:bg-slate-300
        "
      >
        Cerrar
      </button>

    </div>

  </div>

</div>
</div>

)
}
      </main>

    </div>

  );

}