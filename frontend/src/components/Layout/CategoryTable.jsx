import React, { useState } from "react";
import UpdateCategoryModal from "./UpdateCategoryModal";
import axiosService from "../../services/axiosService";

export default function CategoryTable({ data, getCategory }) {
  const [updateCategoryModalShow, setUpdateCategoryModalShow] = useState(false);
  const [dataToBeUpdated, setDataToBeUpdated] = useState({
    title: "",
    topic: "",
  });

  async function deleteCategory(id) {
    try {
      await axiosService.delete(`/category/${id}`);
      getCategory();
    } catch (err) {
      console.log(err);
    }
  }

  const renderTable = () => {
    return data.map((category) => (
      <tr key={category.id}>
        <td>{category.title}</td>
        <td>{category.topic}</td>
        <td>
          <button
            class="btn btn-primary btn-xs"
            onClick={() => {
              deleteCategory(category.id);
            }}
          >
            Sil
          </button>
        </td>
        <td>
          <button
            class="btn btn-primary btn-xs"
            onClick={() => {
              console.log(category);
              setDataToBeUpdated(category);
              setUpdateCategoryModalShow(true);
            }}
          >
            Güncelle
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto mt-3  items-center space-x-3">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Kategori İsmi</th>
            <th>Tartışma Konusu</th>
            <th>Sil</th>
            <th>Güncelle</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>

      <UpdateCategoryModal
        show={updateCategoryModalShow}
        setShow={setUpdateCategoryModalShow}
        getCategory={getCategory}
        firstData={dataToBeUpdated}
      />
    </div>
  );
}
