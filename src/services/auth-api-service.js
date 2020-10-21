import config from "../config";
import TokenService from "./token-service";
import IdleService from "./idle-service";

const authApiService = {
  async postUser(newUser) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const userInDb = await (!res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json());
      TokenService.saveAuthToken(userInDb.authToken);
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        authApiService.postRefreshToken();
      });
      return userInDb;
    } catch (err) {
      console.log(err);
    }
  },
  async userLogin({ email, password }) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const loggedInUser = await (!res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json());
      TokenService.saveAuthToken(loggedInUser.authToken);
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        authApiService.postRefreshToken();
      });
      return loggedInUser;
    } catch (err) {
      console.log(err);
    }
  },
  async postRefreshToken() {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/auth/refresh`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
      });
      const refreshToken = await (!res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json());
      TokenService.saveAuthToken(refreshToken.authToken);
      TokenService.queueCallbackBeforeExpiry(() => {
        authApiService.postRefreshToken();
      });
      return refreshToken;
    } catch (err) {
      console.log("refresh token req error");
      console.log(err);
    }
  },
};

export default authApiService;
