let timeoutId;
let notIdleEvents = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart",
];
let userIdleCallback = null;
let fiveMinutes = 5 * 60 * 1000;

const IdleService = {
  setIdleCallback(idleCallback) {
    userIdleCallback = idleCallback;
  },
  resetIdleTimer(e) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(userIdleCallback, fiveMinutes);
  },
  registerIdleTimerResets() {
    notIdleEvents.forEach((event) =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
  clearCallbackEvents() {
    clearTimeout(timeoutId);
    notIdleEvents.forEach((event) =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
};

export default IdleService;
