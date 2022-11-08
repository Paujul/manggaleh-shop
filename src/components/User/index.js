import React, { useState } from "react";

import "../../styles/index.css";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import ItemList from "./ItemList";
import Edit from "./Edit";

import { useDispatch, useSelector } from "react-redux";
import { fetchBarang, getItem, setBalance } from "../../redux/barangSlice";

export default () => {
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  const [bal, setBal] = useState(0);
  const regex = /^[0-9\b]+$/;

  const handleChange = (e) => {
    // if value is not equal to regex, then don't update the value
    if (e.target.value === "" || regex.test(e.target.value)) {
      setBal(e.target.value);
    } else {
      // prevent the user from typing anything other than numbers
      e.target.value = "";
      alert("Saldo harus berupa angka");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(setBalance(bal));
    setBal(0);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-28">
        <div className="mainPage shadow-none">
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
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5 mb-5 w-4/5">
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
          <form className="flex w-4/5 justify-between items-center mt-10">
            <h1 className="tableTextHeader">Edit Saldo Kamu</h1>
            <input
              type="text"
              className="w-72 h-10 rounded-lg p-3"
              onChange={(e) => handleChange(e)}
            />
            <div className="flex justify-end items-center">
              <button className="btn" onClick={handleEdit}>
                Edit Saldo
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
