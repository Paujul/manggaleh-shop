import React, { useState } from "react";

import Navbar from "../Navbar";
import Footer from "../Footer";
import RenderUser from "./RenderUser";
import RenderEdit from "./RenderEdit";

const User = () => {
  const baseData = {
    id: "",
    nama: "",
    qty: "",
    price: "",
  };
  const [data, setData] = useState(baseData);
  console.log(baseData);
  //   console.log(data.barang);
  const [edit, setEdit] = useState(false);
  const toggleEdit = (id) => {
    console.log(edit);
    setEdit(!toggleEdit);
    setData({ ...data, id: id });
    console.log(id);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-28">
        <div className="w-3/5 h-full bg-gray-100 flex flex-col flex-wrap items-center justify-around p-2">
          <div className="w-4/5 h-full">
            <h1 className="p-5 font-extrabold text-green-700/70">Lapak Kamu</h1>
            <div className="overflow-auto relative">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Nama Produk
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Jumlah Produk
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Harga
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Opsi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <RenderUser isEdit={edit} toggleEdit={(e) => toggleEdit(e)} />
                </tbody>
              </table>
            </div>
          </div>
          <div className="">
            <h1 className="p-5 font-extrabold text-green-700/70">
              Edit Barang Kamu
            </h1>
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Nama Produk
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Jumlah Produk
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Harga
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Opsi
                  </th>
                </tr>
              </thead>
              <tbody>
                <RenderEdit />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
