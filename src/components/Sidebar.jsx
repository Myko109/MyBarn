import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const location = useLocation();

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-4 focus:outline-none z-50 fixed top-4 left-4 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.5 12.5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13zm0-5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13zm0-5a.75.75 0 0 1 0-1.5h13a.75.75 0 0 1 0 1.5h-13z"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block w-72 bg-[#2A3F54] text-white h-full lg:relative fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out`}
      >
        <div className="h-20 shadow-lg flex justify-center items-center bg-[#1F2D3D]">
          <h2 className="flex items-center text-2xl font-bold gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0l267.9 107.1c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24h-48c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32v264c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24H152c-13.3 0-24-10.7-24-24v-56h384v56c0 13.3-10.7 24-24 24zM128 400v-64h384v64H128zm0-96v-80h384v80H128z"
              />
            </svg>
            MyBarn
          </h2>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex pl-8 pt-10 h-[39.5rem]">
          <ul className="flex flex-col gap-8">
            <li>
              <ActiveSidebar link={"/"} onClick={toggleSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect width="18.5" height="18.5" x="2.75" y="2.75" rx="6" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m7 15l2.45-3.26a1 1 0 0 1 1.33-.25L13.17 13a1 1 0 0 0 1.37-.29L17 9"
                    />
                  </g>
                </svg>
                Dashboard
              </ActiveSidebar>
            </li>

            <li>
              <ActiveSidebar link={"/table-barang"} onClick={toggleSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  transform="rotate(90)"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4 21q-.425 0-.713-.288T3 20v-2.65q0-.425.288-.713T4 16.35h16q.425 0 .713.288t.287.712V20q0 .425-.288.713T20 21H4Zm0-6.65q-.425 0-.713-.288T3 13.35v-2.725q0-.425.288-.713T4 9.625h16q.425 0 .713.288t.287.712v2.725q0 .425-.288.713T20 14.35H4Zm0-6.725q-.425 0-.713-.288T3 6.625V4q0-.425.288-.713T4 3h16q.425 0 .713.288T21 4v2.625q0 .425-.288.713T20 7.625H4Z"
                  />
                </svg>
                Item Table
              </ActiveSidebar>
            </li>

            <li>
              <ActiveSidebar link={"/all-barang"} onClick={toggleSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-600-80h56c4.4 0 8-3.6 8-8V560c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V384c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v320c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V462c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v242c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v400c0 4.4 3.6 8 8 8z"
                  />
                </svg>
                All Items
              </ActiveSidebar>
            </li>
            <li>
              <ActiveSidebar link={"/supplier_"} onClick={toggleSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M23 23v3H8.5a4.5 4.5 0 0 1 0-9H9v-2h-.5a6.5 6.5 0 0 0 0 13H23v3h8v-8Zm6 6h-4v-4h4Z"
                  />
                  <path
                    fill="currentColor"
                    d="M21 22h-2v-3h-6v3h-2v-3a2.002 2.002 0 0 1 2-2h6a2.002 2.002 0 0 1 2 2zm-5-6a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3zm0-4a1 1 0 1 0 1 1a1.001 1.001 0 0 0-1-1z"
                  />
                  <path
                    fill="currentColor"
                    d="M23.5 4H9V1H1v8h8V6h14.5a4.5 4.5 0 0 1 0 9H23v2h.5a6.5 6.5 0 0 0 0-13ZM7 7H3V3h4Z"
                  />
                </svg>
                Supplier Table
              </ActiveSidebar>
            </li>
          </ul>
        </nav>
        {/* Sidebar Header */}
      </aside>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

const ActiveSidebar = ({ link, children, onClick }) => {
  const location = useLocation();
  return (
    <Link
      to={link}
      onClick={onClick}
      className={`${
        location.pathname === link ? `text-cyan-400` : `text-white`
      } flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200`}
    >
      {children}
    </Link>
  );
};

export default Sidebar;
