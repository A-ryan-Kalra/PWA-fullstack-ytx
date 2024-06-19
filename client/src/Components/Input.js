function Input({ id, onChange, label, value, type }) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white appearance-none bg-neutral-700 focus:outline-none  focus:ring-0 peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-md text-red-400 duration-150 transform -translate-y-3 top-4 z-10 left-6 scale-75 origin-[0]
        peer-placeholder-shown:scale-100   peer- peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
