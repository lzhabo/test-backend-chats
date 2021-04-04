import apiService from "./apiService";

apiService.init(process.env.API_BASE ?? "http://localhost:5000");
export { apiService };
