import { useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Dashboard } from "./components/layout/Dashboard";
import { PromptsView } from "./components/proyectos/PromptsView";
import { Playground } from "./components/playground/Playground";
import { CrudApp } from "./components/crud/CrudApp"; 

export const Negocio = () => {
  const [vista, setVista] = useState("proyectos");
  const [proyectoActivo, setProyectoActivo] = useState(null);

  const handleVolver = () => {
    setProyectoActivo(null);
    setVista("proyectos");
  };

  return (
    <div className="min-vh-100 pb-5">
      <Navbar vistaActual={vista} setVista={(v) => { setVista(v); setProyectoActivo(null); }} />
      
      <div className="container mt-4">
        {vista === "dashboard" && <Dashboard />}

        {vista === "proyectos" && !proyectoActivo && (
          <div>
            <h2 className="text-gradient mb-4">Gestión de Proyectos</h2>
            <CrudApp setProyectoSeleccionado={setProyectoActivo} />
          </div>
        )}

        {vista === "proyectos" && proyectoActivo && (
          <PromptsView proyecto={proyectoActivo} onBack={handleVolver} />
        )}

        {vista === "playground" && <Playground />}
      </div>
    </div>
  );
};