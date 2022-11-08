import React, { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/barangSlice";

const Card = ({ barang, index }) => {
  const carts = useSelector((state) => state.items.cart);
  const dispatch = useDispatch();

  const add = () => {
    console.log("State barang: ", barang);
    dispatch(addToCart({ ...barang, index }));
  };

  useEffect(() => {
    console.log("Cart: ", carts);
  }, []);

  return (
    <>
      <div className="card m-5">
        <img
          src={`https://res.cloudinary.com/dkha2cdtw/image/upload/${barang.imgId}`}
          className="w-full h-64 object-contain"
        />

        <h2
          className="product-title mx-10 my-2 text-center"
          title={barang.nama}
        >
          {barang.nama}
        </h2>

        <div className="price">
          <div className="flex justify-center items-center gap-2 mt-1">
            <NumericFormat
              value={barang.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp "}
              renderText={(value) => (
                <span className="text-l font-bold">{value}</span>
              )}
            />
            <span
              className={barang.qty > 0 ? "badge-available" : "badge-empty"}
            >
              {" "}
              Stok: {barang.qty}{" "}
            </span>
          </div>

          {/* Action Button  */}
          <div className="mt-2 flex gap-3">
            <button
              className={barang.qty > 0 ? "button-primary" : "button-empty"}
              onClick={add}
              disabled={barang.qty === 0 ? "disabled" : ""}
            >
              {barang.qty > 0 ? "+Keranjang" : "Barang Habis"}
            </button>
            <button className="button-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
