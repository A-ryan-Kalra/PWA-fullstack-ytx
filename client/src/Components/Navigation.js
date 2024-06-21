import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Tabs, { showDashboard } from "./Tabs";
import TabsDemo from "./Tabs";
import { atom, useAtom } from "jotai";
import Adjustbar from "./Adjustbar";
import { HamBurgerHandler, style, style1 } from "../constants/data";
import { UserCircle } from "lucide-react";
import { useSelector } from "react-redux";

export const arrowTurn = atom(false);

export const filter1 = atom(false);
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
  const [filterImg, setFilterImg] = useAtom(filter1);
  const [ham, setHam] = useAtom(HamBurgerHandler);
  const [timerId, setTimerId] = useState(null);
  // const urlParams = new URLSearchParams(location.search);
  const [animate, setAnimate] = useState(false);
  const [turn, setTurn] = useAtom(arrowTurn);

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

  const handle = () => {
    if (ham) {
      setTurn(false);
      setAnimate(false);
      const timer = setTimeout(() => {
        setHam(!ham);
      }, 100);
      setTimerId(timer);
    } else {
      setTurn(true);
      const timer = setTimeout(() => {
        setHam(!ham);
        setFilterImg(!filterImg);
      }, 300);
    }
  };
  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [ham, timerId]);

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
        <Link
          to={"/"}
          className={` text-[15px] md:text-[20px] duration-700 p-2 font-bold my-1 border-2  rounded-md   text-white bg-black ${
            state ? "scale-105 duration-700" : "scale-90 duration-700"
          }`}
        >
          PhotoBasket
        </Link>
        <div className="flex justify-center items-center gap-5 p-2  md:gap-10 max-sm:hidden">
          <Link
            to={"/"}
            className={`${
              check === "/" ? style1 : style
            } text-[15px] md:text-[20px]  font-semibold  `}
          >
            Home
          </Link>
          <Link
            to={"/posts"}
            className={`${
              check === "/posts" ? style1 : style
            } text-[15px] md:text-[20px]  font-semibold  `}
          >
            Posts
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
            onClick={() => setShow(!show)}
          >
            <button>
              <UserCircle className="outline-none" />
            </button>
            {show && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bg-white top-10 right-[30%] 2xl:-right-full "
              >
                <TabsDemo turnOffSettings={turnOffSettings} />
              </div>
            )}
          </div>
        </div>
        {location.pathname === "/posts" && (
          <button
            onClick={handle}
            className={`flex flex-col ${
              turn ? "rotate-90" : "rotate-0"
            } sm:hidden duration-200 z-[100] justify-center items-center`}
          >
            <span
              className={`bg-black duration-200 transition-all block h-0.5 w-6 rounded-sm  ${
                ham ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`bg-black  duration-500 transition-all my-0.5  block h-0.5 w-6 rounded-sm ${
                ham ? "opacity-0 -translate-x-3" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-black duration-200 transition-all  block h-0.5 w-6 rounded-sm  ${
                ham ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
            ></span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
