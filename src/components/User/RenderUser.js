import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_BARANG, DELETE_BARANG } from "../../apollo/Query";
import { NumericFormat } from "react-number-format";
import { TableError, TableLoading } from "./TableLoading";

import { editItem, getItem, toggleEdit } from "../../redux/barangSlice";
import { useDispatch, useSelector } from "react-redux";

const RenderUser = ({ item, index }) => {
  const items = useSelector((state) => state.items.items);

  const [deleteBarang] = useMutation(DELETE_BARANG, {
    refetchQueries: [{ query: GET_BARANG }],
  });
  const remove = (id) => {
    deleteBarang({ variables: { id } });
  };

  const dispatch = useDispatch();

  const editData = (data) => {
    // console.log(items[data].id);
    if (items[data].isEdit === true) {
      console.log("awe");
    }
    dispatch(
      editItem({
        id: items[data].id,
        nama: item.nama,
        qty: item.qty,
        price: item.price,
      })
    );
  };

  const edit = (id) => {
    console.log(id);
    dispatch(toggleEdit(id));
    editData(id);
  };

  return (
    <tr className="bg-white border-b  ">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
      >
        {item.nama}
      </th>
      <td className="py-4 px-6 text-center">{item.qty}</td>
      <NumericFormat
        value={item.price}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rp"}
        renderText={(value) => <td className="py-4 px-6">{value}</td>}
      />
      <td className="py-4 px-6">
        <div className="flex justify-around">
          <span className="text-green-500" onClick={() => edit(index)}>
            {item.isEdit ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            ) : (
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
            )}
          </span>

          <span className="text-red-500" onClick={() => remove(item.id)}>
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </span>
        </div>
      </td>
    </tr>
  );
};

export default RenderUser;
