import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-fuchsia-300 shadow-md sticky top-0 z-[100]">
      <div className="flex justify-between items-center max-md:p-2 md:max-w-[1320px] mx-auto">
        <h1 className="text-[15px] md:text-[20px] shadow-lg p-2 font-bold  border-2  rounded-md duration-200 text-white bg-cyan-500 border-lime-400 cursor-default">
          WebApp
        </h1>
        <div className="flex items-center p-4  gap-10 ">
          <Link
            to={"/"}
            className="text-[15px] md:text-[20px] hover:text-black  hover:shadow-lg font-semibold p-2 hover:border-1 border-2 border-transparent hover:rounded-md duration-200 hover:border-black"
          >
            Home
          </Link>
          <Link
            to={"/dashboard"}
            className="text-[15px] md:text-[20px] hover:text-black hover:shadow-lg font-semibold p-2 hover:border-1 border-2 border-transparent hover:rounded-md duration-200 hover:border-black"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
