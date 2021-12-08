import React, { useState } from "react";
import axios from "axios";

export default function AddCategoryModal({ show, setShow, getCategory }) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  async function handleCreateCategory(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/category", {
        title,
        topic,
      });
      getCategory();
      setShow(false);
      setTitle("");
      setTopic("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`modal bg-opacity-80 ${show ? "modal-open" : null}`}>
      <div className="modal-box">
        <div className="flex justify-center items-center flex-1">
          <form onSubmit={handleCreateCategory}>
            <div className="form-control">
              <div className="relative">
                <h1 className="text-center font-extrabold !w-[1000] mb-2">
                  Kategori Ekle
                </h1>
                <input
                  type="text"
                  placeholder="Başlık"
                  className="w-full pr-16 input input-primary input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <div className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="Tartışma Konusu"
                  className="w-full input input-primary input-bordered"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  className="btn btn-primary mt-2 items-center text-white w-full"
                  type="submit"
                >
                  Ekle
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-action">
          <a className="btn" onClick={() => setShow(false)}>
            Close
          </a>
        </div>
      </div>
    </div>
  );
}
