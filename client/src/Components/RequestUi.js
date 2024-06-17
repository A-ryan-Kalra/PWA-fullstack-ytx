import { useState } from "react";
import Req from "../constants/RequestPermission";
import { format } from "date-fns";

function RequestUi() {
  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd hh:mm a");
  console.log(formattedDate);

  const [details, setDetails] = useState({
    title: "",
    body: "",
    createdAt: formattedDate || "",
  });

  const storeDetails = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/save-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };

  console.log(details);
  return (
    <div>
      <div>
        <h1>Hello</h1>
        <button
          onClick={notificationRequest}
          className="bg-fuchsia-400 text-white p-2"
        >
          Request notification
        </button>
        <div className="flex justify-between  flex-col gap-3">
          <input
            type="text"
            placeholder="Enter title"
            id="title"
            value={details?.title}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }))
            }
            className="bg-neutral-300 w-fit placeholder:text-gray-800"
          />
          <input
            id="body"
            value={details?.body}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }))
            }
            type="text"
            placeholder="Enter boody"
            className="bg-neutral-300 w-fit placeholder:text-gray-800"
          />
        </div>

        <button
          onClick={storeDetails}
          className="bg-fuchsia-400 text-white p-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default RequestUi;
