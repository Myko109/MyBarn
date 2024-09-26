import { Divider, Spinner } from "@nextui-org/react";
import { data } from "autoprefixer";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import useFormatRupiah from "../hooks/useFormatRupiah";
import { supabase } from "../utils/SupaClient";

const DetailSupply = () => {
  const [getSupplyId, setGetSupplyId] = useState({});

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const getIdSupply = async () => {
    try {
      const { data } = await supabase
        .from("supplier")
        .select("*")
        .eq("id", id)
        .single();
      setGetSupplyId(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdSupply();

    document.getElementById("title").innerHTML = `${getSupplyId.supplier_name}`;
  }, [getSupplyId]);

  return (
    <Layout>
      {loading ? (
        <Spinner className="m-auto" label="Please Wait..." />
      ) : (
        <section className="py-16 px-40">
          <div className="flex gap-16">
            <img
              src={getSupplyId.image_supplier}
              alt={getSupplyId.supplier_name}
              width={300}
              className="object-cover"
            />

            <div className="flex flex-col">
              <h2 className="text-4xl font-bold mb-2">
                {getSupplyId.supplier_name}
              </h2>

              <div className="my-5">
                <h2 className="font-bold">Supplier Contact :</h2>
                <Divider className="my-2" />
                <p>{getSupplyId.phone_number}</p>
              </div>

              <div className="my-5">
                <h2 className="font-bold">Supplier Email :</h2>
                <Divider className="my-2" />
                <p>{getSupplyId.email}</p>
              </div>

              <div className="my-5">
                <h2 className="font-bold">Supplier Location :</h2>
                <Divider className="my-2" />
                <p>{getSupplyId.address}</p>
              </div>

              <Link
                to={"/supplier_"}
                className="flex items-center gap-2 bg-cyan-800 text-white p-2 justify-center rounded-lg transition-all duration-300 hover:bg-cyan-950"
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg"'
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                {""}
                Back
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default DetailSupply;
