import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DataCollection } from "../constants/data";
import { Button } from "./ui/button";
function SearchSideBar({ triggerChange, handle }) {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDetails((prev) => ({
        ...prev,
        thumbnail: URL.createObjectURL(file),
      }));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    triggerChange(details);
    setDetails({ title: "", description: "", thumbnail: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex py-4 relative px-4 flex-col gap-2  md:gap-7 w-full z-[100] bg-white"
    >
      <div className="my-3 flex gap-2 items-center whitespace-nowrap">
        <Input
          type="text"
          id="title"
          value={details.title}
          onChange={(e) =>
            setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          placeholder="Enter Product Name"
          className="border-2 w-full resize-none focus-visible:outline-none p-2 rounded-md"
        />
      </div>
      <div className="my-3 flex gap-2 items-center whitespace-nowrap">
        <Textarea
          type="search"
          id="description"
          value={details.description}
          onChange={(e) =>
            setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          placeholder="Description"
          className="border-2 w-full h-20 resize-none focus-visible:outline-none p-2 rounded-md"
        />
      </div>
      <div className="border-2 border-neutral-300 p-2 rounded-lg">
        <input
          type="file"
          className="text-ellipsis"
          onChange={handleImage}
          accept="image/*"
        />
      </div>
      {details.thumbnail && (
        <div className="border-2 border-neutral-400 w-fit p-2 rounded-md">
          <img
            src={details.thumbnail}
            className="w-[234px] object-contain h-[234px]"
            alt=""
          />
        </div>
      )}
      <Button
        onClick={handle}
        className="bg-black hover:bg-black/80 font-semibold"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default SearchSideBar;
