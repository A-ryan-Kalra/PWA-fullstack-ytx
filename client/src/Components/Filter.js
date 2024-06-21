import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { arrowTurn, filter1 } from "./Navigation";
import { ArrowBigUp, ArrowBigUpDashIcon, ArrowUpCircle } from "lucide-react";
import { HamBurgerHandler } from "../constants/data";
import SearchSideBar from "./SearchSideBar";
import { temporaryGlobal, triggerGlobal } from "./Home";
import { ClipLoader } from "react-spinners";

function Filter() {
  const [filterImg, setFilterImg] = useAtom(filter1);
  const [animate, setAnimate] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [timer1Id, setTimer1Id] = useState(null);
  const [timer2Id, setTimer2Id] = useState(null);
  const [timer3Id, setTimer3Id] = useState(null);
  const [ham, setHam] = useAtom(HamBurgerHandler);
  const [temporary, setTemporary] = useAtom(temporaryGlobal);
  const [trigger, setTrigger] = useAtom(triggerGlobal);
  const [bar, setBar] = useState(false);
  const [bar1, setBar1] = useState(false);
  const [turn, setTurn] = useAtom(arrowTurn);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterImg) {
        setAnimate(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [filterImg]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBar(true);
      setTimeout(() => {
        setBar1(true);
      }, 900);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filterImg]);

  function handle() {
    setBar1(false);
    const timer12 = setTimeout(() => {
      setBar(false);
      const timer = setTimeout(() => {
        const timer1 = setTimeout(() => {
          const timer3Id = setTimeout(() => {
            setTurn(false);
          }, 400);
          setTimer3Id(timer3Id);
          setFilterImg(!filterImg);
          setHam(false);
        }, 500);
        setTimer1Id(timer1);
        setAnimate(false);
      }, 400);
      setTimerId(timer);
    }, 400);
    setTimer2Id(timer12);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
      clearTimeout(timer1Id);
      clearTimeout(timer2Id);
      clearTimeout(timer3Id);
    };
  }, []);

  function triggerChange(data) {
    setTemporary((prev) => [data, ...prev]);
    setTrigger(!trigger);
  }

  return (
    <div
      className="fixed sm:hidden inset-0 bg-black/60 z-[200]"
      onClick={handle}
    >
      <div
        className={`${
          animate
            ? "translate-y-0 duration-500 transition-all ease-in-out"
            : "-translate-y-[1000px] duration-500 transition-all ease-in-out"
        } bg-white relative `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative px-4 bg-white " onClick={handle}>
          <ArrowBigUp
            width={25}
            className="rounded-full  hover:bg-[#efebeb] cursor-pointer"
          />
        </div>
        <div className="border-2 w-[100%] mx-auto group">
          <div
            className={`border-2 border-black  ${
              bar ? "scale-x-100 duration-500" : "scale-x-0 duration-500"
            }  transition-all ease-in-out origin-left w-full`}
          ></div>
        </div>
        {/* {bar ? ( */}
        <div
          className={`translate-x-[0px] md:min-w-[440px] md:max-w-[450px] duration-500 my-3 z-10 h-fit sticky ${
            !bar1 ? "translate-x-[1400px]" : ""
          } `}
        >
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
