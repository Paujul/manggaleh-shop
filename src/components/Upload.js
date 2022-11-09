import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchBarang } from "../redux/barangSlice";
import hasura from "../api/hasura";

const Upload = () => {
  const dispatch = useDispatch();

  const [imgFile, setImgFile] = useState([]);
  const handleFile = (file) => {
    setImgFile(file[0]);
  };

  const [input, setData] = useState({
    nama: "",
    qty: 0,
    imgId: "",
    price: 0,
  });

  const handleEdit = (e) => {
    if (e.target.name === "qty" || e.target.name === "price") {
      setData((data) => {
        return { ...data, [e.target.name]: parseInt(e.target.value) };
      });
    } else {
      setData((data) => {
        return { ...data, [e.target.name]: e.target.value };
      });
    }
  };

  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("file", imgFile);
      formData.append("upload_preset", "manggaleh");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dkha2cdtw/image/upload",
          formData
        )
        .then(({ data: { public_id } }) => {
          setData((data) => {
            return { ...data, imgId: public_id };
          });
        });
    };
    uploadFile();
  }, [imgFile]);

  const submit = async (e) => {
    e.preventDefault();
    await hasura.post("/barang", input).then(() => {
      dispatch(fetchBarang());
    });
  };

  return (
    <div className="top-72 left-96 right-96 bg-transparent fixed">
      <div className="mx-5 text-xl flex justify-center items-center">
        <div className="backdrop-blur bg-transparent border-2 border-solid border-green-500/90 rounded-lg">
          <h1 className="mb-6 text-center bg-green-500/90 text-white">
            Mau jual apa?
          </h1>
          <div>
            <form
              className="flex justify-center items-center flex-col"
              onSubmit={submit}
            >
              <div className="mb-6 mx-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 bg-gray-100/20 rounded-lg p-1">
                  Masukkan gambar produk
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-72 p-2.5"
                  type="file"
                  onChange={(e) => handleFile(e.target.files)}
                  id="productId"
                />
              </div>

              <div className="mb-4 mx-3 w-72">
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Masukkan nama produk
                </label>
                <input
                  autocomplete="off"
                  autoCorrect="false"
                  type="text"
                  name="nama"
                  onChange={handleEdit}
                  id="nama"
                  placeholder="Sendok sup abad 17"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                />
              </div>
              <div className="mb-4 mx-3 w-72">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Masukkan harga produk
                </label>
                <input
                  autocomplete="off"
                  autoCorrect="false"
                  type="text"
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Harga harus angka");
                  }}
                  pattern="[0-9]*"
                  name="price"
                  onChange={handleEdit}
                  id="price"
                  placeholder="Rp500000"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                />
              </div>

              <div className="mb-6 mx-3 w-72 flex flex-row justify-between">
                <div>
                  <label
                    htmlFor="jumlah"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Jumlah produk
                  </label>
                  <input
                    autocomplete="off"
                    autoCorrect="false"
                    type="number"
                    pattern="[0-9]*"
                    name="qty"
                    onChange={handleEdit}
                    id="jumlah"
                    placeholder="9999"
                    className="h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-28 p-2.5"
                  />
                </div>

                <button
                  className="bg-green-500/80 hover:bg-green-500/90
              px-3 py-2 m-3 rounded-md text-white font-medium mt-4
              tracking-wider transition"
                >
                  Dagang!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
