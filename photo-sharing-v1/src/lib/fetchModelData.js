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
const API_BASE = process.env.REACT_APP_API_URL || "";

function fetchModel(url) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE}${url}`)
      .then((response) => {
        if (!response.ok) {
          reject(
            new Error(
              `Request failed with status ${response.status}: ${response.statusText}`
            )
          );
          return;
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        reject(new Error(error.message));
      });
  });
}

export default fetchModel;
