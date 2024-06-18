import React from "react";
import AvatarDemo from "./Components/Avatar";
import { PopoverDemo } from "./Components/Popover";

function Users({ data }) {
  console.log("users=", data);

  return (
    <div className="border-2 rounded-lg w-full ">
      <h2 className="p-2">
        Contact to below admins by making a push notifications.
      </h2>
      <div className="flex gap-3  p-2 overflow-x-auto max-w-full">
        {data &&
          data.map((item, index) => (
            <div key={index} className="min-w-[25px]">
              <div className="flex flex-col items-center justify-center">
                <PopoverDemo
                  profilePicture={item.profilePicture}
                  name={item.username}
                  endpoint={item.endpoint}
                />
                <h1>{item.username.slice(0, 5)}</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Users;
