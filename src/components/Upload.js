import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { POST_BARANG, SUB_BARANG } from "../apollo/Query";

const Upload = () => {
  const [imgFile, setImgFile] = useState([]);
  const handleFile = (file) => {
    console.log(file[0]);
    setImgFile(file[0]);
    // console.log(e[0]);
    // console.log(fileUpload);
  };

  const URL = "https://res.cloudinary.com/dkha2cdtw/image/upload/";
  const [addBarang] = useMutation(POST_BARANG, {
    updateQueries: { query: SUB_BARANG },
  });

  const [nama, setNama] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [imgId, setImgId] = useState("");

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", "manggaleh");

    await axios
      .post("https://api.cloudinary.com/v1_1/dkha2cdtw/image/upload", formData)
      .then(({ data: { public_id } }) => {
        console.log(public_id);
        setImgId(public_id);
      });
  };

  useEffect(() => {
    uploadFile();
  }, [imgFile]);

  // Ini ntar dispatch Redux
  const postBarang = async () =>
    await addBarang(
      {
        variables: {
          nama: nama,
          qty: qty,
          price: price,
          imgId: imgId,
        },
      },
      console.log(imgId)
    );

  const submit = (e) => {
    e.preventDefault();
    postBarang();
  };

  return (
    <div className="top-72 left-96 right-96 bg-transparent absolute">
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
                <label
                  htmlFor="productId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
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
                  autoComplete="false"
                  autoCorrect="false"
                  type="text"
                  onChange={(e) => setNama(e.target.value)}
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
                  autoComplete="false"
                  autoCorrect="false"
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
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
                    autoComplete="false"
                    autoCorrect="false"
                    type="text"
                    onChange={(e) => setQty(e.target.value)}
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
