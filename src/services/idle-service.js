let timeoutId;
let notIdleEvents = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart",
];
let idleCallBack = null;
let fiveMinutes = 5 * 60 * 1000;

const IdleService = {
  resetIdleTimer(e) {
    console.info("event:", e.type);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(idleCallBack, fiveMinutes);
  },
  registerIdleTimerResets() {
    notIdleEvents.forEach((event) =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
};
