import http from "../common/http-common";
import authService from "./AuthService";

class UserService {
  getOwner(id) {
    return http.get(`/user/owner/${id}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  }

  updateUser(user, address) {
    const body = {
      user,
      address,
    };
    try {
      return http.put(`/user/updateUserData`, body, {
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

const userService = new UserService();
export default userService;
