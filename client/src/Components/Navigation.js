import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Tabs, { showDashboard } from "./Tabs";
import TabsDemo from "./Tabs";
import { Button } from "./ui/button";
import { useAtom } from "jotai";

function Navigation() {
  const [show, setShow] = useState(false);
  const ref = useRef();

  const [dashboardAtom, setDashboardAtom] = useAtom(showDashboard);

  useEffect(() => {
    const closeDropDown = (e) => {
      if (!ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", closeDropDown);

    return () => document.removeEventListener("click", closeDropDown);
  }, []);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("isAdmin"));

    setDashboardAtom(res);
  }, [dashboardAtom]);

  return (
    <nav className="bg-fuchsia-300 shadow-md sticky top-0 z-[100]">
      <div className="flex justify-between items-center max-md:p-2 md:max-w-[1320px] mx-auto">
        <h1 className="text-[15px] md:text-[20px] shadow-lg p-2 font-bold  border-2  rounded-md duration-200 text-white bg-cyan-500 border-lime-400 cursor-default">
          WebApp
        </h1>
        <div className="flex  items-center p-4  md:gap-10 ">
          <Link
            to={"/"}
            className="text-[15px] md:text-[20px] hover:text-black  hover:shadow-lg font-semibold p-2 hover:border-1 border-2 border-transparent hover:rounded-md duration-200 hover:border-black"
          >
            Home
          </Link>
          {dashboardAtom && (
            <Link
              to={"/dashboard"}
              className="text-[15px] md:text-[20px] hover:text-black hover:shadow-lg font-semibold p-2 hover:border-1 border-2 border-transparent hover:rounded-md duration-200 hover:border-black"
            >
              Dashboard
            </Link>
          )}

          <div className="relative" ref={ref} onClick={() => setShow(true)}>
            <Button
              className="text-[15px] bg-transparent shadow-none hover:bg-transparent md:text-[20px] hover:text-black hover:shadow-lg font-semibold  hover:border-1 border-2 border-transparent hover:rounded-md duration-200 hover:border-black"
              variant="outline"
            >
              Settings
            </Button>
            <div className="absolute  top-10 right-[30%] 2xl:-right-full ">
              {show && <TabsDemo />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
