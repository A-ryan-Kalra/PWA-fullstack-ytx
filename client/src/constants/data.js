import { atom } from "jotai";

export const DataCollection = [];
export const allowNotification = atom(false);
export const style = ` cursor-pointer group relative  before:bg-[#0e0d0d]  before:h-[2px] before:w-[100%]  before:left-0 before:bottom-0 w-fit before:rounded-full before:inset-x-0 before:absolute before:transform hover:before:origin-left before:origin-right  before:scale-x-0 before:transition before:duration-200 decoration-none no-underline hover:before:scale-x-100 dark:before:bg-black dark:text-black`;

export const style1 = ` cursor-pointer group relative  before:bg-[#0e0d0d]  before:h-[2px] before:w-[100%]  before:left-0 before:bottom-0 w-fit before:rounded-full before:inset-x-0 before:absolute before:transform hover:before:origin-left before:origin-right  before:scale-x-0 before:transition before:duration-200 decoration-none no-underline before:scale-x-100 dark:before:bg-black dark:text-black`;

export const styleWhite = ` cursor-pointer group relative  before:bg-[#efefef]  before:h-[3px] before:w-[100%]  before:left-0 before:bottom-0 w-fit before:rounded-full before:inset-x-0 before:absolute before:transform hover:before:origin-left before:origin-right  before:scale-x-0 before:transition before:duration-200 decoration-none no-underline hover:before:scale-x-100 dark:before:bg-black dark:text-black`;

export const triggeredNames = [
  "Welcome to WebApp 🚀",
  "Top Images Collection 🖼️",
  "Upload new images daily for new awards 🤑 💸",
  "Howdy!! 🏖️ ",
];
export const HamBurgerHandler = atom(false);
