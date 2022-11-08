import Card from "./Card";
import Loading from "./utils/Loading";
import "../styles/index.css";

import { useQuery, useSubscription } from "@apollo/client";
import { GET_BARANG, SUB_BARANG } from "../apollo/Query";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarang, getItem } from "../redux/barangSlice";
import { Suspense, useEffect } from "react";

const MainMenu = () => {
  // const { data, loading, error } = useSubscription(SUB_BARANG);
  const barang = useSelector((state) => state.items.items);
  const searchField = useSelector((state) => state.items.searchField);

  const renderCard = () => {
    return barang.map((barang, index) => {
      return <Card key={barang.id} barang={barang} index={index} />;
    });
  };

  const renderSearch = () => {
    const searchFilter = barang.filter((barang) => {
      return barang.nama.toLowerCase().includes(searchField);
    });
    return searchFilter.map((barang, index) => {
      return <Card key={barang.id} barang={barang} index={index} />;
    });
  };

  return (
    <div className="flex justify-center mt-28">
      <div className="h-full bg-gray-100 flex flex-row flex-wrap items-center justify-around p-2 w-3/5 rounded-lg">
        <Suspense fallback={<Loading />}>{renderSearch()}</Suspense>
      </div>
    </div>
  );
};

export default MainMenu;

// Hari ini kita pake subscription buat loading data doang,
// Masukin datanya ke state.items
// kl udh nnti pake state.items buat dirender ke MainMenu.

// +Keranjang onClick = dispatch(addToCart())

// addToCart = state.items.qty - 1 & state.cart = [...state.cart, { ...action.payload, qty: 1 }]
// removeFromCart = state.cart[index].qty - 1 & state.items[action.payload.index].qty + state.cart[index].qty
// buyItem = saldoCukup? = state.cart = []
//         = hasura.put('/barang/{state.items[index].id}') = { qty: state.cart[index].qty }
//          ^ Ini ntar loop dulu kl multiple items
