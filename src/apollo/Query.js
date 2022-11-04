import { gql } from "@apollo/client";
// Queries //

export const GET_BARANG = gql`
  query GetBarang {
    barang {
      id
      nama
      qty
      price
      imgId
    }
  }
`;

export const POST_BARANG = gql`
  mutation PostBarang($imgId: String, $nama: String, $qty: Int, $price: Int) {
    insert_barang(
      objects: { imgId: $imgId, nama: $nama, qty: $qty, price: $price }
    ) {
      returning {
        id
        nama
        qty
        imgId
        price
      }
    }
  }
`;

export const UDPATE_BARANG = gql`
  mutation UpdateBarang($id: Int!, $nama: String, $qty: Int) {
    update_barang_by_pk(
      pk_columns: { id: $id }
      _set: { nama: $nama, qty: $qty }
    ) {
      id
      nama
      qty
      imgId
      price
    }
  }
`;

export const DELETE_BARANG = gql`
  mutation DeleteBarang($id: Int!) {
    delete_barang(where: { id: { _eq: $id } }) {
      returning {
        id
        imgId
        nama
        qty
        price
      }
    }
  }
`;

export const SUB_BARANG = gql`
  subscription SubBarang {
    barang {
      id
      imgId
      nama
      price
      qty
    }
  }
`;
