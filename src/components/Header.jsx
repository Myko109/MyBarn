import React from "react";
// import { Dark } from "./Dark";
import Dropdown from "./nextui/DropdownUser";

const Header = () => {
  return (
    <header className="h-20 shadow-lg flex items-center px-10 w-full dark:bg-slate-400">
      <h1 className="text-2xl flex flex-row text-center gap-3" id="title"></h1>

      <div className="ml-auto flex gap-5">
        {/* <Dark /> */}
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
