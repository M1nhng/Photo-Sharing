/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 * Returns: a Promise that should be filled with the response of the GET request
 * parsed as a JSON object. If the request has an error the promise should be
 * rejected with an Error object containing the reason for the error.
 */
function fetchModel(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(new Error(`Request failed with status ${response.status}: ${response.statusText}`));
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
