import React, { useState } from "react";
import Input from "./Input";

function Authentication() {
  const [variant, setVariant] = useState("login");

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
    setDetails({
      password: "",
      username: "",
    });
    // return variant;
  };

  return (
    <div className="flex justify-center relative rounded-md shadow-md border-1.5">
      <div className="bg-white py-7 px-7 self-center mt-2 md:w-2/5 md:min-w-[470px] lg:max-w-[270px] rounded w-full">
        <h2 className=" text-4xl mb-8 font-semibold">
          {variant === "login" ? "Sign in" : "Register"}
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            label="username"
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
                createdAt: formattedDate,
              }))
            }
            id="username"
            value={details.username}
          />
          <Input
            label="password"
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
            id="password"
            type="password"
            value={details.password}
          />
        </div>
        <button
          // onClick={variant === "login" ? login : register}
          className="bg-black py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
        >
          {variant === "login" ? "Login" : "Sign up"}
        </button>
        <p className="text-neutral-500 text-sm mt-12 text-center">
          {variant === "login"
            ? "First time using Netflix?"
            : "Already have an account?"}
          <span
            className=" ml-1 text-sm hover:underline cursor-pointer"
            onClick={toggleVariant}
          >
            {variant === "login" ? "Create an account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Authentication;
