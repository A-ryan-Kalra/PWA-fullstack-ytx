import { useAtom } from "jotai";
import { allowNotification } from "./data";
import { getSubscription } from "../getSubscription";
import { useEffect, useState } from "react";
import { setDate } from "date-fns";

// import kl from "../../public/serviceworker";
function RequestPermission() {
  const [notificationAtom, setNotificationAtom] = useAtom(allowNotification);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setUserData(data);
  }, []);

  // console.log("UserData", userData);
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
  const fetchSubscription = async () => {
    console.log("Triggered");
    const sub = await getSubscription();
    var uploadedData = { username: userData.username };
    uploadedData.endpoint = sub;
    console.log("uploadedData", uploadedData);
    // Send subscription to the backend server
    await fetch("http://localhost:5000/api/user/save-subscription", {
      method: "PUT",
      body: JSON.stringify(uploadedData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("sub=", sub);
    return sub;
  };
  const notificationRequest = async () => {
    checkPermission();
    await requestNotficationPermission();
    await registerSW();
    const kl = await registerSW();
    const data = fetchSubscription();
    // kl.showNotification("Chal bhai", {
    //   body: "Nice come back",
    // });
  };
  return { notificationRequest };
}

export default RequestPermission;
