import React from "react";
import { triggeredNames } from "../constants/data";

function Adjustbar({ count }) {
  return (
    <div
      className={`flex items-center  justify-center relative max-md:h-[45px] bg-black  p-2 text-white`}
    >
      {/* {triggeredNames} */}
      <p className="font-mono break-all font-semibold max-md:text-[13px]">
        {triggeredNames[count % triggeredNames.length]}
      </p>
    </div>
  );
}

export default Adjustbar;
