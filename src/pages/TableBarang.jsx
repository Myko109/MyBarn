import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import Layout from "../components/Layout";
import TableData from "../components/TableData";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalAddBarang from "../components/ModalAddBarang";

const TableBarang = () => {
  const [allBarang, setAllBarang] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllBarang = async () => {
    try {
      const { data } = await supabase
        .from("product")
        .select("*")
        .order("id", { ascending: false });
      setAllBarang(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBarang();
    document.getElementById("title").innerHTML = "Item Table";
  }, []);

  return (
    <Layout>
      <section id="table-barang" className="p-8">
        <div className="flex justify-between mb-5">
          <h2 className="text-4xl font-bold">Item Table</h2>
          <Button color="primary" onPress={onOpen}>
            + Add item
          </Button>
          <ModalAddBarang isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
        <TableData allBarang={allBarang} />
      </section>
    </Layout>
  );
};

export default TableBarang;
