import Card from "./Card";
import Loading from "./Loading";

import { useQuery, useSubscription } from "@apollo/client";
import { GET_BARANG, SUB_BARANG } from "../apollo/Query";
import { useDispatch, useSelector } from "react-redux";

const MainMenu = () => {
  const { data, loading, error } = useSubscription(SUB_BARANG);

  const renderCard = () => {
    if (loading) return <Loading />;
    if (error) return <p>Something went wrong</p>;

    return data.barang.map((barang) => {
      return <Card key={barang.id} barang={barang} />;
    });
  };

  return (
    <div className="flex justify-center mt-28">
      <div className="h-full bg-gray-100 flex flex-row flex-wrap items-center justify-around p-2 w-3/5">
        {renderCard()}
      </div>
    </div>
  );
};

export default MainMenu;
