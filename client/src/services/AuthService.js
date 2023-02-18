import decode from "jwt-decode";
import http from "../common/NodeCommon";
import http2 from "../common/PythonCommon"

class AuthService {
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
        localStorage.removeItem("token");
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  signIn(data) {
    this.saveToken(data.token);
    window.location.assign(`/profile/${this.getUserId()}`);
  }

  saveToken(token) {
    localStorage.setItem("token", token);
  }

  /**
   * need to call loggedIn() first whenever the following getters are used, otherwise may trigger error if toekn does not exist
   * @returns
   */
  getName() {
    return this.getProfile().data.name;
  }

  getUserId() {
    return this.getProfile().data.id;
  }

  getAdmin() {
    return this.getProfile().data.admin;
  }

  isOwner(id) {
    if (this.loggedIn() && (this.getUserId() == id)) {
      return true;
    }
    return false;
  }

  isAdmin() {
    if (this.loggedIn() && this.getAdmin()) {
      return true;
    }
    return false;
  }

  logIn(data) {
    return http.post("/user/login", data);
  }

  signUp(data) {
    return http2.post("/user/signUp", data);
    return http.post("/user/signUp", data);
  }

  logout() {
    localStorage.removeItem("token");
    window.location.assign("/");
  }
}

const authService = new AuthService();
export default authService;
