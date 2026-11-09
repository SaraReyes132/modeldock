import { useState, useEffect } from "react";
import { helpFetch } from "../../helpers/helpFetch";

export const Dashboard = () => {
  const API = helpFetch();
  const [metricas, setMetricas] = useState({ ejecuciones: 0, latencia: 0, tokens: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("ejecuciones").then((res) => {
      if (res && !res.error && Array.isArray(res)) {
        const totalLatencia = res.reduce((acc, curr) => acc + curr.latencia, 0);
        const totalTokens = res.reduce((acc, curr) => acc + curr.tokens, 0);
        setMetricas({
          ejecuciones: res.length,
          latencia: res.length > 0 ? (totalLatencia / res.length).toFixed(2) : 0,
          tokens: totalTokens
        });
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 className="text-gradient mb-4">Panel de Monitoreo LLM</h2>
      {loading ? (
         <div className="text-center text-info my-5"><div className="spinner-border spinner-border-sm me-2"></div>Cargando métricas...</div>
      ) : (
        <div className="row g-4">
          <div className="col-md-4"><div className="glass-card p-4"><h6 className="text-secondary">Total Ejecuciones</h6><h1 className="display-4 fw-bold text-info">{metricas.ejecuciones}</h1></div></div>
          <div className="col-md-4"><div className="glass-card p-4"><h6 className="text-secondary">Latencia Promedio</h6><h1 className="display-4 fw-bold text-success">{metricas.latencia}s</h1></div></div>
          <div className="col-md-4"><div className="glass-card p-4"><h6 className="text-secondary">Tokens Consumidos</h6><h1 className="display-4 fw-bold text-warning">{metricas.tokens}</h1></div></div>
        </div>
      )}
    </div>
  );
};