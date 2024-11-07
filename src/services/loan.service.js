import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/loans/');
}

const create = (formData) => {
    return httpClient.post("/api/loans/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

const get = state => {
    return httpClient.get(`/api/loans/${state}`);
}

const update = (id, formData) => {
    return httpClient.put(`/api/loans/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

const remove = id => {  
    return httpClient.delete(`/api/loans/${id}`);
}

const getLoan = id => {
    return httpClient.get(`/api/loans/${id}`);
}

const simulation = (data) => {
    return httpClient.post("/api/loans/simulation", data, {
        headers:{
            "Content-Type": "multipart/from-data",
        }
    });
};

const costCalculation = data => {    
    return httpClient.post("/api/loans/total_cost", data);
}

export default { getAll, create, get, update, remove, getLoan, simulation, costCalculation };