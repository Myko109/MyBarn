import React from "react";
import Dropdown from "./nextui/DropdownUser";

const Header = () => {
  return (
    <header className="h-20 shadow-lg flex items-center px-10">
      <h1 className="text-2xl flex flex-row text-center gap-3" id="title"></h1>

      <div className="ml-auto">
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
