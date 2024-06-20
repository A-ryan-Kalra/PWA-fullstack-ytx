import { useAtom } from "jotai";
import { allowNotification } from "./data";
import { getSubscription } from "../getSubscription";
import { useEffect, useState } from "react";
import { setDate } from "date-fns";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateNotification } from "../Components/Popover";
import { useSelector } from "react-redux";

// import kl from "../../public/serviceworker";
function RequestPermission() {
  const [notificationAtom, setNotificationAtom] = useAtom(allowNotification);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const [updateNotificationAtom, setUpdateNotificationAtom] =
    useAtom(updateNotification);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser?.username) {
      console.error("Username does not exit please try to login again!");
      // navigate("/");
    } else {
      setUserData(currentUser);
    }
  }, []);

  // console.log("updateNotificationAtom", updateNotificationAtom);
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
        var uploadedData = {
          username: (userData && userData.username) || "unknown",
        };
        uploadedData.endpoint = [];

        // Send subscription to the backend server

        const res = await fetch(
          "http://localhost:5000/api/user/save-subscription",
          {
            method: "PUT",
            body: JSON.stringify(uploadedData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        setUpdateNotificationAtom((prev) => !prev);
        toast.error(
          "Notifications are blocked. Please enable notifications in your browser settings or reset permissions"
        );
        throw new Error("Notification permission not granted");
      }
    } catch (error) {
      console.error("Failure ", error);
    }
  };
  const fetchSubscription = async () => {
    const sub = await getSubscription();
    try {
      var uploadedData = {
        username: (userData && userData.username) || "unknown",
      };
      uploadedData.endpoint = sub;

      // Send subscription to the backend server

      const res = await fetch(
        "http://localhost:5000/api/user/save-subscription",
        {
          method: "PUT",
          body: JSON.stringify(uploadedData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setUpdateNotificationAtom((prev) => !prev);
    } catch (error) {
      console.error("Failure ", error);
    }
  };
  const notificationRequest = async () => {
    checkPermission();
    await requestNotficationPermission();
    await registerSW();
    const kl = await registerSW();
    fetchSubscription();

    // kl.showNotification("Chal bhai", {
    //   body: "Nice come back",
    // });
  };
  return { notificationRequest };
}

export default RequestPermission;
