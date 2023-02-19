import http from "../common/NodeCommon";
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
    http
      .put(`/user/updateUserData`, body, {
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      })
      .then((res) => {
        if (res.status != 200) {
          alert("Fail");
          window.location.assign("/");
        }
        authService.saveToken(res.data.token);
      })
      .catch((error) => {
        console.log(error);
        alert("Operation invalid. Please log in and try again.");
        window.location.assign("/");
        return 0;
      });
  }

  updateProfilePicture(formData) {
    http
      .put("/user/updateProfilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then((response) => {
        if (response.status == 200){
          window.location.reload();
        }
      })
      .catch((error) => {
        alert("failed")
        console.log(error);
      });
  }
}

const userService = new UserService();
export default userService;
