import { useAtom } from "jotai";
import { allowNotification } from "./data";

// import kl from "../../public/serviceworker";
function RequestPermission() {
  const [notificationAtom, setNotificationAtom] = useAtom(allowNotification);
  // console.log("notificationAtom", notificationAtom);
  const checkPermission = () => {
    try {
      if (!"serviceWorker" in navigator) {
        throw new Error("Browser does not support Service worker");
      }
      if (!"Notification" in window) {
        throw new Error("No support for Notification API");
      }
    } catch (error) {
      console.error("Failure ", error);
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
    try {
      const permission = await Notification.requestPermission();
      // console.log("permission=", permission);
      setNotificationAtom(permission === "granted");
      if (permission !== "granted") {
        throw new Error("Notification permission not granted");
      }
    } catch (error) {
      console.error("Failure ", error);
    }
  };

  const notificationRequest = async () => {
    checkPermission();
    await requestNotficationPermission();
    await registerSW();
    const kl = await registerSW();
    // kl.showNotification("Chal bhai", {
    //   body: "Nice come back",
    // });
  };
  return { notificationRequest };
}

export default RequestPermission;
