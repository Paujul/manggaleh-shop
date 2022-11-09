import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hasura from "../../api/hasura";
import {
  editItem,
  editOriginalState,
  fetchBarang,
} from "../../redux/barangSlice";

const Edit = () => {
  const editState = useSelector((state) => state.items.edit);
  const dispatch = useDispatch();

  const handleReset = () => {
    const emptyData = {
      nama: "",
      qty: "",
      price: "",
    };
    setData(emptyData);
    dispatch(editItem({ isEdit: false }));
    dispatch(editOriginalState(false));
  };

  const baseData = {
    id: editState.id,
    nama: editState.nama,
    qty: editState.qty,
    price: editState.price,
  };
  const [data, setData] = useState(baseData);

  useEffect(() => {
    setData(baseData);
    // eslint-disable-next-line
  }, [editState]);

  const handleEdit = (e) => {
    setData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    if (!data.nama || !data.qty || !data.price) {
      alert("Data tidak boleh kosong");
    } else {
      e.preventDefault();
      await hasura.put(`/barang/${data.id}`, data);

      dispatch(fetchBarang());
      handleReset();
    }
  };

  return (
    <tr className="bg-white border-b">
      <th className="py-1 px-2 font-medium text-gray-900 whitespace-nowrap">
        <input
          type="text"
          autocomplete="off"
          placeholder="Icikiwir ..."
          name="nama"
          value={data.nama}
          className={`p-3 rounded-lg ${editState.isEdit ? "bg-gray-100" : ""}`}
          onChange={handleEdit}
          disabled={editState.isEdit ? "" : "disabled"}
        />
      </th>
      <td>
        <input
          type="text"
          autocomplete="off"
          placeholder="420"
          name="qty"
          value={data.qty}
          className={`p-3 rounded-lg ${editState.isEdit ? "bg-gray-100" : ""}`}
          onChange={handleEdit}
          disabled={editState.isEdit ? "" : "disabled"}
        />
      </td>
      <td>
        <input
          type="text"
          autocomplete="off"
          placeholder="69000"
          name="price"
          value={data.price}
          className={`p-3 rounded-lg ${editState.isEdit ? "bg-gray-100" : ""}`}
          onChange={handleEdit}
          disabled={editState.isEdit ? "" : "disabled"}
        />
      </td>
      <td>
        <div className="flex justify-around">
          <span className="text-green-500" onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>

          <button type="reset" onClick={handleReset}>
            <span className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Edit;
