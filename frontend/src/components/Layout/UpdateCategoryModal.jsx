import React, { useEffect, useState } from "react";
import axiosService from "../../services/axiosService";

export default function UpdateCategoryModal({
  show,
  setShow,
  getCategory,
  firstData,
}) {
  const [title, setTitle] = useState(firstData.title);
  const [topic, setTopic] = useState(firstData.topic);

  useEffect(() => {
    setTitle(firstData.title);
    setTopic(firstData.topic);
  }, [firstData]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axiosService.put(`/category/${firstData.id}`, {
        title,
        topic,
      });
      getCategory();
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`modal bg-opacity-80 ${show ? "modal-open" : null}`}>
      <div className="modal-box">
        <div className="flex justify-center items-center flex-1">
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <div className="relative">
                <h1 className="text-center font-extrabold !w-[1000] mb-2">
                  Kategori Güncelle
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
                  Güncelle
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
