import React, { useEffect, useState } from "react";
import SearchSideBar from "./SearchSideBar";
import { Progress } from "./ui/progress";
import { ClipLoader } from "react-spinners";
import { atom, useAtom } from "jotai";
import ScrollUp from "./ScrollUp";

export const triggerGlobal = atom(false);
export const temporaryGlobal = atom([]);
function Home() {
  const [product, setProduct] = useState();
  const [temporary, setTemporary] = useAtom(temporaryGlobal);
  const [trigger, setTrigger] = useAtom(triggerGlobal);
  const [bar, setBar] = useState(0);
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handlePage = (i) => {
    setPage(i);
  };

  useEffect(() => {
    apisfetch();
  }, [page]);

  useEffect(() => {
    let incrementalValue = 0;
    if (trigger) {
      let incrementValue = 0;
      const interval = setInterval(() => {
        incrementValue += 1;
        setBar(incrementValue);
        if (incrementValue >= 100) {
          const timer1 = setTimeout(() => {
            setTrigger(false);
            setProduct(temporary);
            clearInterval(interval);
            clearTimeout(timer1);
          }, 1000);
        }
      }, 20); // Adjust the interval time as needed
    } else {
      setBar(0);
    }
  }, [trigger]);

  const apisfetch = async () => {
    const imag = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const res = await imag.json();

    setTemporary(res?.products);
    setProduct(res.products);
    setTotalPage(res?.total);
  };
  useEffect(() => {
    apisfetch();
  }, [page]);

  function triggerChange(data) {
    setTemporary((prev) => [data, ...prev]);

    setTrigger(!trigger);
  }

  return (
    <div className="min-h-screen w-full gap-3 flex  flex-col">
      <ScrollUp trigger={page} />
      {trigger && <Progress value={bar} />}

      <div className="min-h-screen  md:flex-row flex-col w-full gap-6 flex">
        <div
          className={` max-md:hidden md:min-w-[440px] md:max-w-[450px] z-10 h-fit sticky top-[89px]`}
        >
          <h1 className="text-[25px] bg-white  text-center font-mono">
            Generate a post
          </h1>
          <SearchSideBar triggerChange={triggerChange} />
        </div>

        <div className="flex-col flex">
          <h1 className="text-left max-md:text-center text-[30px] md:text-[40px] font-serif">
            Today's Top Chart
          </h1>

          <div className="border-l-2 flex flex-wrap justify-start p-2 max-md:justify-center gap-3">
            {product ? (
              product.slice(0, 10).map((item, index) => (
                <div
                  key={index}
                  className="hover:shadow-2xl max-w-[320px] duration-200 border-[1px] rounded-md shadow-md border-neutral-200 cursor-pointer p-3 "
                >
                  <div className="w-fit overflow-hidden">
                    <img
                      className="h-64 bg-cover w-64"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </div>
                  <h1>
                    {index + 1}. {item.title}
                  </h1>
                  <p className="">{item.description}</p>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center md:w-[50vh] h-[30vh]">
                <ClipLoader size={50} color="#44ab85" speedMultiplier={1} />
              </div>
            )}
          </div>
        </div>
      </div>
      {product && (
        <div className="w-full flex max-sm:text-[10px] duration-300 items-center justify-center my-10">
          {page > 1 && (
            <span
              className="cursor-pointer border-2 rounded-md p-2 hover:bg-gray-300"
              onClick={() => handlePage(page - 1)}
            >
              Previous
            </span>
          )}
          {[...Array(Math.round(totalPage / 10))].slice(0, 10)?.map((_, i) => (
            <span
              key={i}
              onClick={() => handlePage(i + 1)}
              className={`py-2 px-3 ${
                i + 1 === page
                  ? "hover:opacity-70 cursor-pointer border-2 rounded-full bg-gray-300 border-gray-400"
                  : "hover:bg-emerald-300 cursor-pointer rounded-full"
              }`}
              index={i}
            >
              {i + 1}
            </span>
          ))}

          {page < totalPage / 10 && (
            <span
              className="cursor-pointer border-2 rounded-md p-2 hover:bg-lime-300"
              onClick={() => handlePage(page + 1)}
            >
              Next
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
