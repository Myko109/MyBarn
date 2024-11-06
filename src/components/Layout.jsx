import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <main className="flex w-screen">
      <Sidebar />
      <div className="flex flex-col w-4/5">
        <Header />

        {children}

        <Footer />
      </div>
    </main>
  );
};

export default Layout;
