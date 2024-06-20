import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { filter1 } from "./Navigation";
import { ArrowUpCircle } from "lucide-react";
import { HamBurgerHandler } from "../constants/data";
import SearchSideBar from "./SearchSideBar";
import { temporaryGlobal, triggerGlobal } from "./Home";

function Filter() {
  const [filterImg, setFilterImg] = useAtom(filter1);
  const [animate, setAnimate] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [ham, setHam] = useAtom(HamBurgerHandler);
  const [temporary, setTemporary] = useAtom(temporaryGlobal);
  const [trigger, setTrigger] = useAtom(triggerGlobal);
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

  function triggerChange(data) {
    setTemporary((prev) => [data, ...prev]);
    setTrigger(!trigger);
  }

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
        <div className="md:min-w-[440px] md:max-w-[450px] z-10 h-fit sticky top-[89px]">
          <h1 className="text-[25px] bg-white  text-center font-mono">
            Generate a post
          </h1>
          <SearchSideBar handle={handle} triggerChange={triggerChange} />
        </div>
      </div>
    </div>
  );
}

export default Filter;
