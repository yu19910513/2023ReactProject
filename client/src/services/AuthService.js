import decode from "jwt-decode";
import http from "../common/http-common";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    console.log(token);
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
    return localStorage.getItem("userId");
  }

  login(token, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    window.location.assign(`/user/${userId}`);
  }

  logIn(data) {
    return http.post("/user/login", data);
  }
  logout() {
    localStorage.removeItem("token");
    window.location.assign("/");
  }
}

const authService = new AuthService();
export default authService;
