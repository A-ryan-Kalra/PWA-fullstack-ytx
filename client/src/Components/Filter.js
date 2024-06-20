import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { filter1 } from "./Navigation";
import { ArrowUpCircle } from "lucide-react";
import { HamBurgerHandler } from "../constants/data";

function Filter() {
  const [filterImg, setFilterImg] = useAtom(filter1);
  const [animate, setAnimate] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [ham, setHam] = useAtom(HamBurgerHandler);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterImg) {
        setAnimate(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [filterImg]);

  function handle() {
    setAnimate(false);

    const timer = setTimeout(() => {
      setFilterImg(!filterImg);
      setHam(false);
    }, 400);
    setTimerId(timer);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 z-[200]" onClick={handle}>
      <div
        className={`${
          animate
            ? "translate-y-0 duration-500 transition-all ease-in-out"
            : "-translate-y-[1000px] duration-500 transition-all ease-in-out"
        } bg-white relative  `}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative px-4 bg-white border-b-2 border-black"
          onClick={handle}
        >
          <ArrowUpCircle
            icon="formkit:arrowup"
            width={25}
            className="rounded-full hover:bg-[#efebeb] cursor-pointer"
          />
        </div>
        {/* <Sidebar /> */}
        <div className="h-[30vh]"></div>
      </div>
    </div>
  );
}

export default Filter;
