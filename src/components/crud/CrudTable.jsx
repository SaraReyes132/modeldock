export const CrudTable = ({ proyectos, setEditData, deleteProyecto, setProyectoSeleccionado }) => {
  return (
    <div className="table-responsive">
      <table className="table table-custom table-hover">
        <thead><tr><th>#</th><th>Proyecto</th><th>Descripción</th><th className="text-center">Acciones</th></tr></thead>
        <tbody>
          {proyectos.length === 0 ? (
            <tr><td colSpan="4" className="text-center text-muted py-4"><i className="bi bi-inbox fs-3 d-block mb-2"></i>No hay proyectos.</td></tr>
          ) : (
            proyectos.map((proyecto, index) => (
              <tr key={proyecto.id}>
                <td className="text-muted fw-bold">{index + 1}</td>
                <td className="fw-bold" style={{ color: "#38bdf8" }}>{proyecto.nombre}</td>
                <td className="text-secondary">{proyecto.descripcion}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-outline-info me-2" onClick={() => setProyectoSeleccionado(proyecto)}><i className="bi bi-chat-left-text"></i> Prompts</button>
                  <button className="btn btn-sm btn-outline-warning me-2" onClick={() => setEditData(proyecto)}><i className="bi bi-pencil"></i></button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProyecto(proyecto.id)}><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};