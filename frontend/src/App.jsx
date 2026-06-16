import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import Results from "./pages/Results";
import Careers from "./pages/Careers";
import CareerExplorer from "./pages/CareerExplorer";
import MercadoLaboral from "./pages/MercadoLaboral";
import Simulaciones from "./pages/Simulaciones";
import SystemSimulation from "./pages/SystemSimulation";
import DashboardExplorer from "./pages/DashboardExplorer";
import Diagnostic from "./pages/Diagnostic";
import Guardados from "./pages/Guardados";
import Proyeccion from "./pages/Proyeccion";
import CivilSimulation from "./pages/CivilSimulation";
import PsychologySimulation from "./pages/PsychologySimulation";
import BusinessSimulation from "./pages/BusinessSimulation";
import CommunicationSimulation from "./pages/CommunicationSimulation";
import GraphicDesignSimulation from "./pages/GraphicDesignSimulation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<Route
  path="/simulacion-diseno"
  element={<GraphicDesignSimulation />}
/>
        <Route
          path="/simulacion-civil"
          element={<CivilSimulation />}
        />

        <Route
          path="/simulacion-comunicacion"
          element={<CommunicationSimulation />}
        />

        <Route
          path="/simulacion-psicologia"
          element={<PsychologySimulation />}
        />

        <Route
          path="/simulacion-admin"
            element={<BusinessSimulation />}
        />


        <Route
          path="/proyeccion"
          element={<Proyeccion />}
        />
        <Route path="/diagnostico" element={<Diagnostic />} />
        <Route
          path="/dashboard-explorer"
          element={<DashboardExplorer />}
        />
        <Route
          path="/simulacion-sistemas"
          element={<SystemSimulation />}
        />

        <Route
          path="/guardados"
          element={<Guardados />}
        />
        <Route
          path="/mercado-laboral"
          element={<MercadoLaboral />}
        />
        <Route
          path="/simulaciones"
          element={<Simulaciones />}
        />

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/careers"
          element={<Careers />}
        />

        <Route
          path="/explorer"
          element={<CareerExplorer />}
        />

        <Route
          path="/test"
          element={<Test />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;