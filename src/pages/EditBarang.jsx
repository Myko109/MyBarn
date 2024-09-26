import { Button, Spinner } from "@nextui-org/react";
import { data } from "autoprefixer";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";

const EditBarang = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    name: "",
    price: 0,
    stock: 0,
    type: "",
    description: "",
    image: "",
  });

  //bikin loading
  const [loading, setLoading] = useState(true);

  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const getBarangById = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();

      setFormEdit(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // edit
  const updateItemById = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    try {
      const { data } = await supabase
        .from("product")
        .update({
          name: formEdit.name,
          price: formEdit.price,
          type: formEdit.type,
          stock: formEdit.stock,
          description: formEdit.description,
          image: formEdit.image,
        })
        .eq("id", id)
        .select();

      if (data) {
        Swal.fire({
          icon: "success",
          title: "Your items has been stored!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate("/table-barang"));
      }

      console.log(data);
    } catch (error) {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    getBarangById();
    document.getElementById("title").innerHTML = "Edit Item Page";
  }, []);

  // loading juga
  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner label="Please Wait" color="secondary" />
        </div>
      ) : (
        <section id="edit-page" className="px-8 py-12">
          <form className="flex flex-col gap-4" onSubmit={updateItemById}>
            <label>
              Item Name
              <input
                type="text"
                name="name"
                className="form-input rounded-lg w-full"
                value={formEdit.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Price/Pcs
              <input
                type="number"
                name="price"
                className="form-input rounded-lg w-full"
                value={formEdit.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                name="stock"
                className="form-input rounded-lg w-full"
                value={formEdit.stock}
                onChange={handleChange}
              />
            </label>
            <label>
              Type
              <select
                name="type"
                className="form-select rounded-lg w-full mt-1"
                value={formEdit.type}
                onChange={handleChange}
              >
                <option value="Food">Foods</option>
                <option value="Drink">Drinks</option>
              </select>
            </label>
            <label>
              Description
              <textarea
                name="description"
                type="text"
                className="form-input rounded-lg w-full mt-1"
                value={formEdit.description}
                onChange={handleChange}
              ></textarea>
            </label>
            <label>
              Image Item
              <input
                type="text"
                name="image"
                className="form-input rounded-lg w-full mt-1"
                value={formEdit.image}
                onChange={handleChange}
              />
            </label>

            <div className="flex gap-4">
              <Button onClick={() => navigate("/table-barang")} color="default">
                Back to Table
              </Button>
              {loadingBtn ? (
                <Button color="warning" disabled>
                  Progress...
                </Button>
              ) : (
                <Button color="primary" type="submit">
                  Reupdate
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};

export default EditBarang;