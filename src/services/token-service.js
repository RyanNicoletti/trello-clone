import jwtDecode from "jwt-decode";
import config from "../config";

let timeoutId;
const tenSeconds = 10000;

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  readJwt() {
    return TokenService.parseJwt(TokenService.getAuthToken());
  },
  getTimeInMsUntilExpiry(payload) {
    return payload.exp * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback) {
    const timeUntilExpiry = TokenService.getTimeInMsUntilExpiry(
      TokenService.readJwt()
    );
    timeoutId = setTimeout(callback, timeUntilExpiry - tenSeconds);
  },
  clearCallback() {
    clearTimeout(timeoutId);
  },
};

export default TokenService;
