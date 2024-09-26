import { Button, useDisclosure } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useState } from "react";
import AddSupplyItem from "../components/AddSupplier";
import Layout from "../components/Layout";
import TableSupply from "../components/TableSupplier";
import { supabase } from "../utils/SupaClient";

const Supplier = () => {
  const [supplier, setSupplier] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllSupplier = async () => {
    try {
      const { data } = await supabase
        .from("supplier")
        .select("*")
        .order("id", { ascending: false });
      setSupplier(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSupplier();
    document.getElementById("title").innerHTML = "Supplier Table";
  }, []);

  return (
    <Layout>
      <section id="table-supply" className="p-8">
        <div className="flex justify-between mb-5">
          <h2 className="text-4xl font-bold">
            {supplier.length} Data Suppliers
          </h2>
          <Button color="primary" onPress={onOpen}>
            + Add new Supplier
          </Button>
          <AddSupplyItem isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
        <TableSupply allSupply={supplier} />
      </section>
    </Layout>
  );
};

export default Supplier;
