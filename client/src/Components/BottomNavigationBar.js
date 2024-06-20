import { HomeIcon, LayoutDashboardIcon, UserCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { style, style1, style1White, styleWhite } from "../constants/data";
import TabsDemo, { showDashboard } from "./Tabs";
import { useAtom } from "jotai";

function BottomNavigationBar() {
  const [check, setCheck] = useState("");
  const location = useLocation();
  const ref = useRef();
  const [show, setShow] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [dashboardAtom, setDashboardAtom] = useAtom(showDashboard);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheck(location.pathname);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // console.log("check", check);
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
        setCheck(location.pathname);
      }
    };
    document.addEventListener("click", closeDropDown);

    return () => document.removeEventListener("click", closeDropDown);
  }, [location.pathname]);

  return (
    <div className="fixed z-[100] sm:hidden w-full flex justify-around items-center text-white bg-black bottom-0">
      <div
        onClick={() => {
          setCheck("/");
          navigate("/");
        }}
        className={`duration-300 ${
          check === "/" && "bg-white/30"
        } p-2  rounded-full overflow-hidden`}
      >
        <HomeIcon className="" />
      </div>
      {currentUser && (
        <div
          onClick={() => {
            setCheck("/dashboard");
            navigate("/dashboard");
          }}
          className={`duration-300 ${
            check === "/dashboard" && "bg-white/30"
          } p-2  rounded-full overflow-hidden`}
        >
          <LayoutDashboardIcon className="" />
        </div>
      )}
      <div
        ref={ref}
        onBlur={() => setCheck(location.pathname)}
        onClick={() => {
          setCheck("setting");
          setShow(!show);
        }}
        className={`p-2  relative rounded-full ${
          check === "setting" ? style1White : ""
        } `}
      >
        <UserCircle className="" />
        {show && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bg-white border-2 rounded-lg shadow-lg bottom-full ${
              currentUser ? "-right-[40px]" : "-right-[60px]"
            }`}
          >
            <TabsDemo turnOffSettings={turnOffSettings} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BottomNavigationBar;
