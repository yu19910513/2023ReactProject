import http from "../common/http-common";
import authService from "./AuthService";

class UserService {
  getProfile(id) {
    return http.get(`/user/profile/${id}`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      },
    });
  }
  getOwner(id) {
    return http.get(`/user/owner/${id}`, {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      },
    });
  }
}

const userService = new UserService();
export default userService;
