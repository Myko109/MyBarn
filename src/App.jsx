import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailBarang from "./pages/DetailBarang";
import TableBarang from "./pages/TableBarang";
import EditBarang from "./pages/EditBarang";
import Supplier from "./pages/Supplier";
import DetailSupply from "./pages/DetailSupply";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/table-barang" element={<TableBarang />} />

        <Route path="/detail/:id" element={<DetailBarang />} />
        <Route path="/edit/:id" element={<EditBarang />} />

        <Route path="/supplier_" element={<Supplier />} />
        <Route path="/detailsupply/:id" element={<DetailSupply />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
