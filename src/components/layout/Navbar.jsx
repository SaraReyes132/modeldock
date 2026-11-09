export const Navbar = ({ vistaActual, setVista }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary py-3">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="#">
          <i className="bi bi-boxes text-primary me-2"></i>
          <span className="text-gradient">ModelDock</span>
        </a>
        <div className="d-flex gap-2">
          <button className={`btn btn-sm ${vistaActual === 'dashboard' ? 'btn-primary' : 'btn-outline-light'}`} onClick={() => setVista('dashboard')}>
            <i className="bi bi-speedometer2 me-1"></i> Dashboard
          </button>
          <button className={`btn btn-sm ${vistaActual === 'proyectos' ? 'btn-primary' : 'btn-outline-light'}`} onClick={() => setVista('proyectos')}>
            <i className="bi bi-kanban me-1"></i> Proyectos
          </button>
          <button className={`btn btn-sm ${vistaActual === 'playground' ? 'btn-primary' : 'btn-outline-light'}`} onClick={() => setVista('playground')}>
            <i className="bi bi-terminal me-1"></i> Playground
          </button>
        </div>
      </div>
    </nav>
  );
};