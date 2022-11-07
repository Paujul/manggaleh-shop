import React, { useEffect } from "react";

import "../../styles/index.css";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import ItemList from "./ItemList";
import Edit from "./Edit";

import { useDispatch, useSelector } from "react-redux";
import { fetchBarang, getItem } from "../../redux/barangSlice";

const User = () => {
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBarang());
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-28">
        <div className="mainPage">
          <div className="w-4/5 h-full">
            <h1 className="tableTextHeader">Lapak Kamu</h1>
            <div className="overflow-auto relative">
              <table className="table">
                <thead className="tableHeader">
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
                  {items.map((item, index) => (
                    <ItemList key={item.id} item={item} index={index} />
                  ))}
                  {/* <RenderUser isEdit={edit} toggleEdit={(e) => toggleEdit(e)} /> */}
                </tbody>
              </table>
            </div>
          </div>
          <div className="">
            <h1 className="tableTextHeader">Edit Barang Kamu</h1>
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
                <Edit />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer bottom={true} />
    </>
  );
};

export default User;
