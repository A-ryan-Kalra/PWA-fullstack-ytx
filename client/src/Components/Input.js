import { EyeClosedIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";
import { useRef, useState } from "react";

function Input({ id, onChange, label, value, type }) {
  const [passwordShow, setPasswordShow] = useState(false);
  //   const touchRef = useRef(null);
  //   const handleFocus = () => {
  //     const input = touchRef.current;
  //     input.focus();
  //     // Move cursor to the end
  //     input.setSelectionRange(input.value.length, input.value.length);
  //   };

  return (
    <div className="relative">
      {type === "text" ? (
        <>
          <input
            id={id}
            type={type}
            onChange={onChange}
            value={value}
            className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-black appearance-none border-2 focus:outline-none  focus:ring-0 peer"
            placeholder=""
          />
          <label
            htmlFor={id}
            className="absolute text-md text-neutral-600 duration-150 transform -translate-y-3 top-4 z-10 left-6 scale-75 origin-[0]
        peer-placeholder-shown:scale-100   peer- peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            {label}
          </label>
        </>
      ) : (
        <div className=" flex justify-between items-center border-2 rounded-md">
          <input
            id={id}
            type={passwordShow ? "text" : "password"}
            onChange={onChange}
            value={value}
            className="block rounded-md bg-transparent px-6 pt-6 pb-1 w-full text-md text-black appearance-none  focus:outline-none  focus:ring-0 peer"
            placeholder=""
          />
          <label
            htmlFor={id}
            className="absolute text-md text-neutral-600 duration-150 transform -translate-y-3 top-4 z-10 left-6 scale-75 origin-[0]
        peer-placeholder-shown:scale-100   peer- peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            {label}
          </label>
          <div
            className="p-2 bg-transparent cursor-pointer  transition-all "
            onClick={(e) => {
              e.stopPropagation();
              setPasswordShow(!passwordShow);
            }}
          >
            {passwordShow ? (
              <EyeIcon
                // icon="akar-icons:eye-open"
                width={25}
                className="duration-[2s] transition ease-in-out"
              />
            ) : (
              <EyeClosedIcon
                // icon="ph:eye-closed"
                width={25}
                className="duration-[2s] transition ease-in-out"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Input;
