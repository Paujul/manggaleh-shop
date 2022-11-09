import Card from "./Card";
import Loading from "../utils/Loading";
import "../../styles/index.css";

import { useSelector } from "react-redux";
import { Suspense } from "react";

const MainPage = () => {
  const barang = useSelector((state) => state.items.items);
  const searchField = useSelector((state) => state.items.searchField);

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

export default MainPage;
