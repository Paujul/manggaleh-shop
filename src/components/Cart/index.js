import React from "react";

import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

const Cart = () => {
  return (
    <div className="mt-28">
      <Navbar />
      <div className="flex justify-center mt-28">
        <div className="w-3/5 h-full bg-gray-100 flex flex-col flex-wrap items-center justify-around p-2">
          <div className="w-4/5 h-full">
            <h1 className="p-5 font-extrabold text-green-700/70">
              Keranjang Kamu
            </h1>
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
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
