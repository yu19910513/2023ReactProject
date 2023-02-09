import decode from "jwt-decode";
import http from "../common/http-common";

class AuthService {
  constructor() {
    this.name = "";
    this.email = "";
    this.id = "";
    this.admin = false;
  }
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    if (token != null && !this.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUserId() {
    return localStorage.getItem("id");
  }

  login(token, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    window.location.assign(`/user/${userId}`);
  }

  setData(data) {
    this.name = data.name;
    this.id = data.id;
    this.email = data.email;
    this.admin = data.admin;
    localStorage.setItem("name", this.name);
    localStorage.setItem("id", this.id);
  }

  getName() {
    if (this.name === "") {
      return localStorage.getItem("name");
    }
    return this.name;
  }

  getId() {
    if (this.id === "") {
      return localStorage.getItem("id");
    }
    return this.name;
  }

  getAdmin() {
    return this.admin;
  }
  cleanData() {
    this.name = "";
    this.id = "";
    this.email = "";
    this.admin = false;
  }

  logIn(data) {
    return http.post("/user/login", data);
  }
  logout() {
    localStorage.removeItem("token");
    this.cleanData();
    window.location.assign("/");
  }
}

const authService = new AuthService();
export default authService;
