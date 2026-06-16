
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("usuario");

  navigate("/");

};


  const isActive = (path) =>
  location.pathname === path;

  const [user, setUser] = useState(null);

  useEffect(() => {

    const usuario = JSON.parse(
      localStorage.getItem("usuario")
    );

    setUser(usuario);

  }, []);

      const menuItems = [
  {
    title: "Inicio",
    icon: Home,
    path: "/dashboard"
  },
  {
    title: "Diagnóstico",
    icon: Brain,
    path: "/diagnostico"
  },
  {
    title: "Explorar carreras",
    icon: GraduationCap,
    path: "/dashboard-explorer"
  },
  {
    title: "Simulaciones",
    icon: Gamepad2,
    path: "/simulaciones"
  },
 
  {
    title: "Guardados",
    icon: Heart,
    path: "/guardados"
  },
  {
    title: "Proyección a futuro",
    icon: Rocket,
    path: "/proyeccion"
  }
];

const secondaryItems = [
  
 

];

  return (

    <aside className="w-72 bg-[#1f1b4b] text-white flex flex-col min-h-screen">

      {/* LOGO */}

      <div className="p-8">

        <h1 className="text-4xl font-bold">
          PathU+
        </h1>

      </div>

      {/* MENU */}

        <nav className="flex-1 px-5">

  <div className="space-y-2">

    {menuItems.map((item) => {

      const Icon = item.icon;

      return (

        <button
          key={item.title}
          onClick={() => navigate(item.path)}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
            isActive(item.path)
              ? "bg-gradient-to-r from-violet-600 to-purple-500 shadow-lg"
              : "hover:bg-violet-800"
          }`}
        >
          <Icon size={22} />
          <span>{item.title}</span>
        </button>

      );

    })}

  </div>

  <hr className="border-violet-800 my-5" />

  <div className="space-y-2">

    {secondaryItems.map((item) => {

      const Icon = item.icon;

      return (

        <button
          key={item.title}
          onClick={() => navigate(item.path)}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
            isActive(item.path)
              ? "bg-gradient-to-r from-violet-600 to-purple-500 shadow-lg"
              : "hover:bg-violet-800"
          }`}
        >
          <Icon size={22} />
          <span>{item.title}</span>
        </button>

      );

    })}

  </div>

</nav>
<div className="px-5 pb-4">

  <button
    onClick={logout}
    className="
      w-full
      p-4
      rounded-2xl
      bg-red-500
      hover:bg-red-600
      text-white
      font-semibold
      transition
    "
  >
    Cerrar sesión
  </button>

</div>

      {/* PERFIL */}

    

    </aside>

  );

}