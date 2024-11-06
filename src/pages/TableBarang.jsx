import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import Layout from "../components/Layout";
import TableData from "../components/TableData";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalAddBarang from "../components/ModalAddBarang";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import Search from "../components/Search";

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

  const { user, role } = useAuth();

  useEffect(() => {
    getAllBarang();
    document.getElementById("title").innerHTML = "Item Table";
  }, []);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Layout>
      <section id="table-barang" className="p-8 dark:bg-slate-900">
        <div className="flex justify-between mb-5">
          <h2 className="text-4xl font-bold">{allBarang.length} Items</h2>
          {user.id && role === "admin" ? (
            <>
              <Button color="primary" onPress={onOpen}>
                + Add item
              </Button>

              <ModalAddBarang isOpen={isOpen} onOpenChange={onOpenChange} />
            </>
          ) : (
            <Link to={"/login"}>
              <Button color="primary" onPress={onOpen}>
                Login As Admin
              </Button>
            </Link>
          )}
        </div>

        <div className="my-3">
          <Search handleSearch={Search} />
        </div>

        <TableData
          allBarang={allBarang}
          user={user}
          role={role}
          search={search}
        />
      </section>
    </Layout>
  );
};

export default TableBarang;
