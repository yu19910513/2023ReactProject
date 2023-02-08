import http from "../common/http-common";

class UserService {
  logIn(data) {
    return http.post("/user/login", data);
  }
}

export default new UserService();
