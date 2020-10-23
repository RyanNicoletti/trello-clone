import config from "../config";
import TokenService from "./token-service";
import IdleService from "./idle-service";

const authApiService = {
  async postUser(newUser) {
    try {
      let res = await fetch(`${config.API_ENDPOINT}/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      let userInDb = await res.json();
      if (!res.ok) {
        return Promise.reject(userInDb);
      }

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

      let userLoggingIn = await res.json();
      if (!res.ok) {
        return Promise.reject(userLoggingIn);
      }

      TokenService.saveAuthToken(userLoggingIn.authToken);
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        authApiService.postRefreshToken();

        return userLoggingIn;
      });
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
      let userAuthToken = await res.json();
      if (!res.ok) {
        return Promise.reject(userAuthToken);
      }

      TokenService.saveAuthToken(userAuthToken.authToken);
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        authApiService.postRefreshToken();

        return userAuthToken;
      });
    } catch (err) {
      console.log("refresh token req error");
      console.log(err);
    }
  },
};

export default authApiService;
