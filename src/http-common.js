import axios from "axios";

const prestabancoBackendServer = "104.40.59.254";
const prestabancoBackendPort = import.meta.env.VITE_PRESTABANCO_BACKEND_PORT;

console.log(prestabancoBackendServer)
console.log(prestabancoBackendPort)

export default axios.create({
    baseURL: `http://${prestabancoBackendServer}:${prestabancoBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});