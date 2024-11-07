import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/users/');
}

const create = (formData) => {
    return httpClient.post("/api/users/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

const get = id => {
    return httpClient.get(`/api/users/${id}`);
}

const update = (id, formData) => {
    return httpClient.put(`/api/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

const remove = id => {
    return httpClient.delete(`/api/users/${id}`);
}

export default { getAll, create, get, update, remove };