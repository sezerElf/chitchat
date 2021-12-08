import React, { useState, useEffect } from "react";
import TimeCard from "../components/Layout/TimeCard";
import MemberCountCard from "../components/Layout/MemberCountCard";
import CategoryTable from "../components/Layout/CategoryTable";
import axios from "axios";
import AddCategoryModal from "../components/Layout/AddCategoryModal";
import axiosService from "../services/axiosService";

export default function Admin() {
  const [categoryData, setCategoryData] = useState();
  const [addCategoryModalShow, setAddCategoryModalShow] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    let data = (await axiosService.get("/category")).data;

    setCategoryData(data);
  }

  return (
    <div>
      <div className="flex flex-row gap-3 mb-5 max-h-64">
        <TimeCard />

        <MemberCountCard />
      </div>

      <div className="flex flex-col sm:flex-row mt-3 gap-2">
        <button
          onClick={() => setAddCategoryModalShow(true)}
          className={`card shadow-2xl bg-primary flex-1`}
        >
          <div className="card-body">Kategori Ekle</div>
          <AddCategoryModal
            show={addCategoryModalShow}
            setShow={setAddCategoryModalShow}
            getCategory={getCategory}
          />
        </button>
      </div>
      {categoryData ? (
        <CategoryTable data={categoryData} getCategory={getCategory} />
      ) : null}
    </div>
  );
}
