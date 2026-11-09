import { useState, useEffect } from "react";
import { helpFetch } from "../../helpers/helpFetch";

export const Playground = () => {
  const API = helpFetch();
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [modelo, setModelo] = useState("GPT-4");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    API.get("prompts").then((res) => {
      if (res && !res.error && Array.isArray(res)) setPrompts(res);
    });
  }, []);

  const handleExecute = (e) => {
    e.preventDefault();
    if (!selectedPrompt) return alert("Selecciona un prompt");
    
    setLoading(true);
    setResultado(null);

    setTimeout(() => {
      const latency = (Math.random() * 2 + 0.5).toFixed(2);
      const tokens = Math.floor(Math.random() * 500) + 100;
      const mockResponse = `[Respuesta de ${modelo}]: Procesé el prompt usando el contexto "${input || 'vacío'}". Aquí tienes la respuesta generada.`;

      const ejecucion = {
        id: Date.now().toString(),
        promptId: selectedPrompt,
        modelo: modelo,
        latencia: parseFloat(latency),
        tokens: tokens,
        fecha: new Date().toISOString()
      };

      API.post("ejecuciones", { body: ejecucion }).then(() => {
        setLoading(false);
        setResultado({ texto: mockResponse, latency, tokens });
      });
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-gradient mb-4">Playground LLM</h2>
      <div className="row g-4">
        <div className="col-md-5">
          <div className="glass-card p-4">
            <form onSubmit={handleExecute}>
              <div className="mb-3">
                <label className="form-label text-info">Selecciona un Prompt</label>
                <select className="form-select form-control-custom" onChange={(e) => setSelectedPrompt(e.target.value)} value={selectedPrompt}>
                  <option value="">-- Elige --</option>
                  {prompts.map(p => <option key={p.id} value={p.id}>{p.titulo}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-info">Modelo</label>
                <select className="form-select form-control-custom" value={modelo} onChange={(e) => setModelo(e.target.value)}>
                  <option>GPT-4</option><option>Claude 3</option><option>Llama 3</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-info">Entrada de contexto</label>
                <textarea className="form-control form-control-custom" rows="3" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe algo..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Ejecutando...</> : <><i className="bi bi-play-fill me-2"></i> Ejecutar</>}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-7">
          <div className="glass-card p-4 h-100">
            <h5 className="text-info mb-3 border-bottom border-secondary pb-2">Salida del Modelo</h5>
            {!resultado && !loading && <p className="text-muted">Los resultados aparecerán aquí.</p>}
            {loading && <p className="text-info">Consultando a los servidores...</p>}
            {resultado && (
              <div>
                <div className="alert alert-dark border border-info"><p className="mb-0 text-light">{resultado.texto}</p></div>
                <div className="d-flex gap-3 mt-3">
                  <span className="badge bg-success">Latencia: {resultado.latency}s</span>
                  <span className="badge bg-warning text-dark">Tokens: {resultado.tokens}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};