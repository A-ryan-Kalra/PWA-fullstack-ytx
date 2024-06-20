import React from "react";
import { triggeredNames } from "../constants/data";

function Adjustbar({ count }) {
  return (
    <div
      className={`flex items-center justify-center relative max-md:h-[45px] bg-black  p-2 text-white`}
    >
      {/* {triggeredNames} */}
      <h1 className="font-mono font-semibold max-md:text-[14px]">
        {triggeredNames[count % triggeredNames.length]}
      </h1>
    </div>
  );
}

export default Adjustbar;
