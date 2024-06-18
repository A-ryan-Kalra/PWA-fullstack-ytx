import { useAtom } from "jotai";
import { allowNotification } from "./data";
import { getSubscription } from "../getSubscription";
import { useEffect, useState } from "react";
import { setDate } from "date-fns";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import kl from "../../public/serviceworker";
function RequestPermission() {
  const [notificationAtom, setNotificationAtom] = useAtom(allowNotification);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!data.username) {
      toast.error("Username does not exit please try to login again!");
      navigate("/");
    } else {
      setUserData(data);
    }
  }, []);

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
    return registration;
  };

  const requestNotficationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationAtom(permission === "granted");
      if (permission !== "granted") {
        throw new Error("Notification permission not granted");
      }
    } catch (error) {
      console.error("Failure ", error);
    }
  };
  const fetchSubscription = async () => {
    const sub = await getSubscription();
    try {
      var uploadedData = { username: (userData && userData.username) || "" };
      uploadedData.endpoint = sub;

      // Send subscription to the backend server

      const res = await fetch("/api/user/save-subscription", {
        method: "PUT",
        body: JSON.stringify(uploadedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
    } catch (error) {
      console.error("Failure ", error);
    }

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
