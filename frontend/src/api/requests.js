import axios from 'axios';

const { REACT_APP_BACKEND_API } = process.env;

// const REACT_APP_BACKEND_API_URL = 'http://localhost:8000';

/**
 * Creates a new instance of axios
 */
export const apiRequest = axios.create({
  baseURL: REACT_APP_BACKEND_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

/**
 * Creates a new document type in the backend by using POST API
 * @param {object} dtObject The document type object to be created
 * @returns void
 */
export const postDocumentTypesToBackend = async (dtObject) => {
  try {
    dtObject.map(async (dtItem) => {
      await apiRequest.post('/documents/type/', dtItem);
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Updates the given document type in the backend using PUT API
 * @param {*} dtObject Document type object that has to be updated
 * @returns void
 */
export const updateDocumentTypeinBackend = async (dtObject) => {
  try {
    dtObject.map(async (dtItem) => {
      let id = dtItem.id;
      await apiRequest.put(`/documents/type/${id}`, dtItem);
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Fetches the document types from the backend using GET API
 * @returns Boolean
 */
export const getDocumentTypesFromBackend = async () => {
  try {
    let response = await apiRequest.get('/documents/type/?skip=0&take=15', {});

    /* Sorting the data position-wise to make sure we maintain the order */
    response.data.sort((a, b) => (a.position > b.position) ? 1 : -1);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
