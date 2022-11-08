import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { NumericFormat } from "react-number-format";

import "../../styles/index.css";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { useDispatch, useSelector } from "react-redux";
import { buyItem, fetchBarang, setBalance } from "../../redux/barangSlice";

const Cart = () => {
  const cart = useSelector((state) => state.items.cart);
  const balance = useSelector((state) => state.items.balance);
  const dispatch = useDispatch();

  const total = cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);

  const buy = () => {
    if (balance >= total) {
      dispatch(buyItem());
      dispatch(setBalance(balance - total));
    } else return alert("Saldo tidak cukup");
  };

  return (
    <div className="mt-28">
      <Navbar />

      <div className="flex justify-center mt-28">
        <div className="mainPage">
          <div className="w-4/5 h-full">
            <h1 className="p-5 font-extrabold text-green-700/70">
              Keranjang Kamu
            </h1>
            <div className="overflow-auto relative">
              <table className="table">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                  {cart.map(
                    (item, index) => (
                      console.log(item),
                      (<CartItem key={item.id} item={item} index={index} />)
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12 h-16">
        <div className="mainPage">
          <div>
            <button className="btn font-bold" onClick={buy}>
              Bayar Sekarang
            </button>
          </div>
          <div>
            <h1>
              Total Harga:
              <span className="text-green-600">
                <NumericFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp"}
                  renderText={(value) => <span> {value}</span>}
                />
              </span>
            </h1>
          </div>
        </div>
      </div>

      <Footer bottom={true} />
    </div>
  );
};

export default Cart;
