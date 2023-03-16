import axios from "axios";

const API_BASE_URL = `http://localhost:8080`;

class AuthService {
  login(payload) {
    return axios.post(`${API_BASE_URL}/auth/signin`, payload);
  }

}

export default new AuthService();
