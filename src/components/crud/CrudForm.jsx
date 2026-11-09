import { useState, useEffect } from "react";

export const CrudForm = ({ addProyecto, editProyecto, editData, setEditData }) => {
  const [formData, setFormData] = useState({ id: null, nombre: "", descripcion: "" });

  useEffect(() => {
    if (editData != null) setFormData(editData);
    else setFormData({ id: null, nombre: "", descripcion: "" });
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre.trim() !== "" && formData.descripcion.trim() !== "") {
      if (editData != null) { editProyecto(formData); } 
      else { formData.id = Date.now().toString(); addProyecto(formData); }
      setFormData({ id: null, nombre: "", descripcion: "" });
    } else { alert("Por favor, complete todos los campos. No se aceptan solo espacios."); }
  };

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label text-info fw-bold">Nombre del Proyecto</label>
        <input type="text" className="form-control form-control-custom" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej. Analizador" />
      </div>
      <div className="mb-4">
        <label className="form-label text-info fw-bold">Descripción</label>
        <textarea className="form-control form-control-custom" name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange} placeholder="Describe el objetivo..."></textarea>
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary fw-bold">
          {editData ? "Actualizar" : "Crear Proyecto"}
        </button>
        {editData && <button type="button" className="btn btn-outline-secondary" onClick={() => setEditData(null)}>Cancelar Edición</button>}
      </div>
    </form>
  );
};