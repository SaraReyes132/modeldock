import { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Dashboard } from "./components/layout/Dashboard";
import { PromptsView } from "./components/proyectos/PromptsView";
import { Playground } from "./components/playground/Playground";
import { CrudApp } from "./components/crud/CrudApp"; 
import { helpFetch } from "./helpers/helpFetch";

export const Negocio = () => {
  const API = helpFetch();
  
  const [vista, setVista] = useState("proyectos");
  const [proyectoActivo, setProyectoActivo] = useState(null);

  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get("proyectos").then((res) => {
      if (res && !res.error && Array.isArray(res)) {
        setProyectos(res);
        setErrorMsg(null);
      } else {
        setErrorMsg("Error al conectar con la API de ModelDock.");
      }
      setLoading(false);
    });
  }, []);

  const handleVolver = () => {
    setProyectoActivo(null);
    setVista("proyectos");
  };

  return (
    <div className="min-vh-100 pb-5">
      <Navbar vistaActual={vista} setVista={(v) => { setVista(v); setProyectoActivo(null); }} />
      
      <div className="container mt-4">
        {/* Estado de carga global */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-info" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            <p className="mt-3 text-light">Iniciando ModelDock...</p>
          </div>
        ) : errorMsg ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : (
          <>
            {vista === "dashboard" && <Dashboard />}

            {vista === "proyectos" && !proyectoActivo && (
              <div>
                <h2 className="text-gradient mb-4">Gestión de Proyectos</h2>
                {/* Le pasamos los proyectos ya cargados al CRUD */}
                <CrudApp 
                  proyectos={proyectos} 
                  setProyectos={setProyectos} 
                  setProyectoSeleccionado={setProyectoActivo} 
                />
              </div>
            )}

            {vista === "proyectos" && proyectoActivo && (
              <PromptsView proyecto={proyectoActivo} onBack={handleVolver} />
            )}

            {vista === "playground" && <Playground />}
          </>
        )}
      </div>
    </div>
  );
};
