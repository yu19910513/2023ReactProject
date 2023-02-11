import http from "../common/http-common";
import authService from "./AuthService";

class UserService {

  getProfile(id) {
    return http.get(`/user/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  }

  getOwner(id) {
    return http.get(`/user/owner/${id}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  }

  isOwner(id) {
    this.getOwner(id)
      .then((res) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
}

const userService = new UserService();
export default userService;
