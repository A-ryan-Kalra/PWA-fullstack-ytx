import React, { useEffect, useState } from "react";
import TableDemo from "./Tabular";
import { updateNotification } from "./Popover";
import { useAtom } from "jotai";
// import { format } from "date-fns";

function Dashboard() {
  const [notification, setNotifications] = useState();
  const [updateNotificationAtom, setUpdateNotificationAtom] =
    useAtom(updateNotification);
  const storeDetails = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get-notification");
      const data = await res.json();
      setNotifications(data);
      // console.log(data);
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };

  console.log("notification ", notification);
  useEffect(() => {
    storeDetails();
  }, [updateNotificationAtom]);

  return (
    <div className="min-h-[90vh] w-full">
      <TableDemo notification={notification} />
    </div>
  );
}

export default Dashboard;
