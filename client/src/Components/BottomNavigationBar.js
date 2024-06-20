import { HomeIcon, LayoutDashboardIcon, UserCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { style, style1, styleWhite } from "../constants/data";
import TabsDemo, { showDashboard } from "./Tabs";
import { useAtom } from "jotai";

function BottomNavigationBar() {
  const [check, setCheck] = useState("");
  const location = useLocation();
  const ref = useRef();
  const [show, setShow] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [dashboardAtom, setDashboardAtom] = useAtom(showDashboard);

  useEffect(() => {
    setCheck(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("isAdmin"));

    setDashboardAtom(res);
  }, [dashboardAtom]);

  function turnOffSettings() {
    setShow(false);
  }
  useEffect(() => {
    const closeDropDown = (e) => {
      // if (submit) {
      //   console.log("submit");
      //   setShow(false);
      //   setSubmit(false);
      // }
      if (!ref.current.contains(e.target)) {
        setCheck(location.pathname);
        setShow(false);
      }
    };
    document.addEventListener("click", closeDropDown);

    return () => document.removeEventListener("click", closeDropDown);
  }, []);

  return (
    <div className="fixed z-[100] sm:hidden w-full flex justify-around items-center text-white bg-black bottom-0">
      <Link
        onClick={() => setCheck("/")}
        to={"/"}
        className={`duration-300 ${
          check === "/" && "bg-white/30"
        } p-2  rounded-full overflow-hidden`}
      >
        <HomeIcon className="" />
      </Link>
      {currentUser && (
        <Link
          onClick={() => setCheck("/dashboard")}
          to={"/dashboard"}
          className={`duration-300 ${
            check === "/dashboard" && "bg-white/30"
          } p-2  rounded-full overflow-hidden`}
        >
          <LayoutDashboardIcon className="" />
        </Link>
      )}
      <div
        ref={ref}
        onClick={() => {
          setCheck("setting");
          setShow(!show);
        }}
        className={`p-2  relative rounded-full ${
          check === "setting" ? styleWhite : ""
        } `}
      >
        <UserCircle className="" />
        {show && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bg-white border-2 rounded-lg shadow-lg bottom-full -right-[60px]"
          >
            <TabsDemo turnOffSettings={turnOffSettings} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BottomNavigationBar;
