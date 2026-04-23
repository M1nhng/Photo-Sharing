/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 * Returns: a Promise that should be filled with the response of the GET request
 * parsed as a JSON object. If the request has an error the promise should be
 * rejected with an Error object containing the reason for the error.
 *
 * When REACT_APP_API_URL is set (e.g. on CodeSandbox), it is used as the
 * base URL so the frontend can reach a backend running in a different sandbox.
 * In local development the proxy in package.json handles routing automatically.
 */
export const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");
const USE_DEV_PROXY = process.env.REACT_APP_USE_DEV_PROXY === "true";

export function buildApiUrl(path) {
  if (USE_DEV_PROXY) {
    return `/api${path}`;
  }
  return `${API_BASE}${path}`;
}

function fetchModel(url) {
  return fetch(buildApiUrl(url))
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Network request failed");
    });
}

export default fetchModel;
