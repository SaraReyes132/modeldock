import { useState, useEffect } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { helpFetch } from "../../helpers/helpFetch";

export const CrudApp = ({ setProyectoSeleccionado }) => {
  const API = helpFetch();
  const [editData, setEditData] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => { cargarProyectos(); }, []);

  const cargarProyectos = () => {
    setLoading(true);
    API.get("proyectos").then((res) => {
      if (res && !res.error && Array.isArray(res)) { setProyectos(res); setErrorMsg(null); } 
      else { setErrorMsg("Error al cargar los proyectos."); }
      setLoading(false);
    });
  };

  const addProyecto = (proyecto) => {
    API.post("proyectos", { body: proyecto }).then((res) => {
      if (res && !res.error) { setProyectos([...proyectos, res]); alert("✅ Proyecto creado exitosamente"); }
    });
  };

  const editProyecto = (proyecto) => {
    API.put("proyectos", { body: proyecto }, proyecto.id).then((res) => {
      if (res && !res.error) {
        setProyectos(proyectos.map((p) => (p.id === proyecto.id ? proyecto : p)));
        setEditData(null);
        alert("✅ Proyecto actualizado exitosamente");
      }
    });
  };

  const deleteProyecto = (id) => {
    const proyectoAEliminar = proyectos.find(p => p.id === id);
    if (window.confirm(`¿Estás seguro de eliminar el proyecto "${proyectoAEliminar.nombre}"?`)) {
      API.del("proyectos", id).then((res) => {
        if (res && !res.error) { setProyectos(proyectos.filter((p) => p.id !== id)); alert("🗑️ Proyecto eliminado"); }
      });
    }
  };

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="glass-card p-4 h-100">
          <h4 className="text-gradient mb-4 border-bottom border-secondary pb-2">Nuevo / Editar Proyecto</h4>
          <CrudForm addProyecto={addProyecto} editProyecto={editProyecto} editData={editData} setEditData={setEditData} />
        </div>
      </div>
      <div className="col-lg-8">
        <div className="glass-card p-4 h-100">
          <h4 className="text-gradient mb-4 border-bottom border-secondary pb-2">Proyectos Registrados</h4>
          {loading ? (
            <div className="text-center text-info my-5"><div className="spinner-border spinner-border-sm me-2"></div>Cargando...</div>
          ) : errorMsg ? (
            <div className="alert alert-danger">{errorMsg}</div>
          ) : (
            <CrudTable proyectos={proyectos} setEditData={setEditData} deleteProyecto={deleteProyecto} setProyectoSeleccionado={setProyectoSeleccionado} />
          )}
        </div>
      </div>
    </div>
  );
};