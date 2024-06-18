import React from "react";
import AvatarDemo from "./Components/Avatar";
import { PopoverDemo } from "./Components/Popover";

function Users({ data }) {
  console.log(data);

  return (
    <div className="border-2 rounded-lg w-full ">
      <div className="flex gap-3  p-2 overflow-x-auto max-w-full">
        {data &&
          data.map((item, index) => (
            <div key={index} className="min-w-[25px]">
              {/* <AvatarDemo
                profilePicture={item.profilePicture}
                name={item.username}
              /> */}
              <PopoverDemo
                profilePicture={item.profilePicture}
                name={item.username}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Users;
