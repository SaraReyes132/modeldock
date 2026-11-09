export const helpFetch = () => {
  const getURL = () => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:3004/";
    }
    return window.location.origin.replace(/-\d+\./, "-3004.") + "/";
  };

  const URL = getURL();

  const customFetch = (endpoint, options = {}) => {
    options.method = options.method || "GET";
    options.headers = { "Content-Type": "application/json" };
    if (options.body) options.body = JSON.stringify(options.body);

    return fetch(`${URL}${endpoint}`, options)
      .then((response) =>
        response.ok ? response.json() : Promise.reject({ error: true, status: response.status })
      )
      .catch((error) => {
        console.error("Fetch Error:", error);
        return { error: true, message: "Error de conexión con la API" };
      });
  };

  return {
    get: (endpoint) => customFetch(endpoint),
    post: (endpoint, options) => { options.method = "POST"; return customFetch(endpoint, options); },
    put: (endpoint, options, id) => { options.method = "PUT"; return customFetch(`${endpoint}/${id}`, options); },
    del: (endpoint, id) => { const options = { method: "DELETE" }; return customFetch(`${endpoint}/${id}`, options); },
  };
};