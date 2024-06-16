// import kl from "../../public/serviceworker";

const checkPermission = () => {
  if (!"serviceWorker" in navigator) {
    throw new Error("Browser does not support Service worker");
  }
  if (!"Notification" in window) {
    throw new Error("No support for Notification API");
  }
};

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register(
    "./serviceworker.js"
  );
  //   console.log("Register ", registration);
  return registration;
};

const requestNotficationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission not granted");
  }
};

export const notificationRequest = async () => {
  checkPermission();
  await requestNotficationPermission();
  await registerSW();
  const kl = await registerSW();
  // kl.showNotification("Chal bhai", {
  //   body: "Nice come back",
  // });
};
