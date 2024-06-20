import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tabs, { showDashboard } from "./Tabs";
import TabsDemo from "./Tabs";
import { useAtom } from "jotai";
import Adjustbar from "./Adjustbar";
import { style, style1 } from "../constants/data";
import { UserCircle } from "lucide-react";
import { useSelector } from "react-redux";

function Navigation() {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const [submit, setSubmit] = useState(false);
  const [state, setState] = useState(false);
  const [dashboardAtom, setDashboardAtom] = useAtom(showDashboard);
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  // const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    setCheck(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setState(true);
        setTimeout(() => {
          setCount(count + 1);
        }, 200);
      } else {
        setState(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state]);

  useEffect(() => {
    const closeDropDown = (e) => {
      // if (submit) {
      //   console.log("submit");
      //   setShow(false);
      //   setSubmit(false);
      // }
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

  function turnOffSettings() {
    console.log("Wut");
    setShow(false);
  }
  return (
    <nav
      // className="bg-fuchsia-300 shadow-md sticky top-0 z-[100]"
      className={`${
        state ? "-translate-y-12 md:-translate-y-11 " : ""
      }  z-[100] shadow-md border-2  sticky top-0 bg-white duration-300  `}
    >
      <Adjustbar count={count} />
      <div className="flex justify-between items-center max-md:p-2 md:max-w-[1320px] mx-auto">
        <h1 className="text-[15px] md:text-[20px]  p-2 font-bold my-1 border-2  rounded-md duration-200 text-white bg-black cursor-default">
          WebApp
        </h1>
        <div className="flex  items-center p-2  md:gap-10 ">
          <Link
            to={"/"}
            className={`${
              check === "/" ? style1 : style
            } text-[15px] md:text-[20px]  font-semibold  `}
          >
            Home
          </Link>
          {currentUser && (
            <Link
              to={"/dashboard"}
              className={`${
                check === "/dashboard" ? style1 : style
              } text-[15px] md:text-[20px]  font-semibold`}
              onClick={() => setCheck("/dashboard")}
            >
              Dashboard
            </Link>
          )}

          <div
            className="relative flex p-[4px] hover:bg-[#dddde4]  duration-200 rounded-full"
            ref={ref}
            onClick={() => setShow(true)}
          >
            <button>
              <UserCircle className="outline-none" />
            </button>
            <div className="absolute bg-white top-10 right-[30%] 2xl:-right-full ">
              {show && <TabsDemo turnOffSettings={turnOffSettings} />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
