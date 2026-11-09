import { useState, useEffect } from "react";
import { helpFetch } from "../../helpers/helpFetch";

export const PromptsView = ({ proyecto, onBack }) => {
  const API = helpFetch();
  const [prompts, setPrompts] = useState([]);
  const [formData, setFormData] = useState({ id: null, titulo: "", contenido: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => { cargarPrompts(); }, []);

  const cargarPrompts = () => {
    setLoading(true);
    API.get("prompts").then((res) => {
      if (res && !res.error && Array.isArray(res)) setPrompts(res.filter((p) => p.proyectoId === proyecto.id));
      setLoading(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.titulo.trim() === "" || formData.contenido.trim() === "") return alert("Complete todos los campos (sin espacios vacíos).");

    const payload = { ...formData, proyectoId: proyecto.id, version: formData.id ? formData.version : 1 };

    if (formData.id) {
      API.put("prompts", { body: payload }, formData.id).then((res) => {
        if (!res.error) { cargarPrompts(); setFormData({ id: null, titulo: "", contenido: "" }); alert("✅ Prompt actualizado"); }
      });
    } else {
      payload.id = Date.now().toString();
      API.post("prompts", { body: payload }).then((res) => {
        if (!res.error) { cargarPrompts(); setFormData({ id: null, titulo: "", contenido: "" }); alert("✅ Prompt creado"); }
      });
    }
  };

  const handleDelete = (id) => {
    const promptAEliminar = prompts.find(p => p.id === id);
    if (window.confirm(`¿Estás seguro de eliminar el prompt "${promptAEliminar.titulo}"?`)) {
      API.del("prompts", id).then((res) => {
        if (!res.error) { cargarPrompts(); alert("🗑️ Prompt eliminado"); }
      });
    }
  };

  return (
    <div>
      <button className="btn btn-outline-light mb-4" onClick={onBack}><i className="bi bi-arrow-left me-2"></i> Volver a Proyectos</button>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h4 className="text-gradient mb-3">Prompt para: {proyecto.nombre}</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-info">Título</label>
                <input type="text" className="form-control form-control-custom" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label text-info">Contenido</label>
                <textarea className="form-control form-control-custom" rows="4" value={formData.contenido} onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold">{formData.id ? "Actualizar Prompt" : "Crear Prompt"}</button>
              {formData.id && <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={() => setFormData({ id: null, titulo: "", contenido: "" })}>Cancelar</button>}
            </form>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="glass-card p-4">
            <h4 className="text-gradient mb-3">Prompts Guardados</h4>
            {loading ? <div className="text-info">Cargando...</div> : prompts.length === 0 ? <p className="text-muted">No hay prompts aún.</p> : (
              prompts.map((p) => (
                <div key={p.id} className="card bg-dark border-secondary mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-info mb-0">{p.titulo} <span className="badge bg-secondary ms-2">v{p.version}</span></h5>
                      <div>
                        <button className="btn btn-sm btn-outline-warning me-2" onClick={() => setFormData(p)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
                      </div>
                    </div>
                    <p className="text-light mt-2 mb-0">{p.contenido}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};