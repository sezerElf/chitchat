import React from "react";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

export default function OperationCard({ title, className }) {
  const [addCategoryModalShow, setAddCategoryModalShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => setAddCategoryModalShow(true)}
        className={`card shadow-2xl ${className || ""}`}
      >
        <div className="card-body">{title}</div>
      </button>

      <AddCategoryModal
        show={addCategoryModalShow}
        setShow={setAddCategoryModalShow}
      />
    </div>
  );
}
