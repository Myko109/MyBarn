import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LoadingSkel from "../components/nextui/LoadingSkel";
import Sidebar from "../components/Sidebar";
import { supabase } from "../utils/SupaClient";

const Dashboard = () => {
  const [barang, setBarang] = useState(0);
  const [jenisBarangCount, setJenisBarangCount] = useState({});
  const [loadSkeleton, setLoadSkeleton] = useState(true);

  const jumlahBarang = async () => {
    setLoadSkeleton(true);

    try {
      const countTotalBarang = supabase
        .from("product")
        .select("*", { count: "exact", head: true });

      const jenisBarang = ["Food", "Drink"];

      const countTotalJenisBarang = jenisBarang.map((jenis) =>
        supabase
          .from("product")
          .select("*", { count: "exact", head: true })
          .eq("type", jenis)
      );

      const result = await Promise.all([
        countTotalBarang,
        ...countTotalJenisBarang,
      ]);

      const totalCount = result[0].count;
      let count = {};
      result.slice(1).forEach((result, index) => {
        count[jenisBarang[index]] = result.count;
      });

      setBarang(totalCount);
      setJenisBarangCount(count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadSkeleton(false);
    }
  };

  useEffect(() => {
    document.getElementById("title").innerHTML = "Dashboard";
    jumlahBarang();
  }, []);

  return (
    <Layout>
      <section id="dashboard" className="p-10">
        <div className="bg-cyan-800 text-white rounded-lg h-40 p-5">
          <h2 className="text-2xl font-semibold">
            Welcome, {import.meta.env.VITE_USER}
          </h2>
          <p className="text-md mt-2 italic">
            Effortless Inventory Management, Anytime, Anywhere.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full mt-2">
          {loadSkeleton ? ( // Conditional rendering untuk loading state
            <>
              <LoadingSkel />
              <LoadingSkel />
              <LoadingSkel />
            </>
          ) : (
            <>
              <div className="p-4 bg-[#16423C] text-white h-36 rounded-lg items-center text-center">
                <h2 className="text-xl font-semibold">Total Items :</h2>
                <p className="text-4xl font-bold mt-2">{barang}</p>
              </div>
              <div className="p-4 bg-[#295F98] text-white h-36 rounded-lg items-center text-center">
                <h2 className="text-xl font-semibold">Foods :</h2>
                <p className="text-4xl font-bold mt-2">
                  {jenisBarangCount.Food}
                </p>
              </div>
              <div className="p-4 bg-[#7A1CAC] text-white h-36 rounded-lg items-center text-center">
                <h2 className="text-xl font-semibold">Beverages:</h2>
                <p className="text-4xl font-bold mt-2">
                  {jenisBarangCount.Drink}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
