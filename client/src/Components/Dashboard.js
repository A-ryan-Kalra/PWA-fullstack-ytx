import React, { useEffect, useState } from "react";
import RequestUi from "./RequestUi";
import { Table } from "./ui/table";
import TableDemo from "./Tabular";
// import { format } from "date-fns";

function Dashboard() {
  const [notification, setNotifications] = useState();
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

  // const now = new Date();
  // const formattedDate = format(now, "yyyy-MM-dd hh:mm a");
  // console.log(formattedDate);

  console.log("notification ", notification);
  useEffect(() => {
    storeDetails();
  }, []);

  return (
    <div className="min-h-[90vh] w-full">
      <TableDemo notification={notification} />
      <RequestUi />
    </div>
  );
}

export default Dashboard;
