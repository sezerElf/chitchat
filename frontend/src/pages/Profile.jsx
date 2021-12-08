import React, { useContext } from "react";
import ChitChatHistory from "../components/Layout/ChitChatHistory";
import UpdateCard from "../components/Layout/UpdateCard";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
export default function Profile() {
  const { authenticatedUser } = useContext(AuthContext);
  const [updateCard, setUpdateCard] = useState(false);

  return (
    <>
      <div>
        <div className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200">
          <div className="card glass lg:card-side text-neutral-content">
            <figure className="p-6">
              <img
                src={`https://ui-avatars.com/api/?name=${authenticatedUser.firstName}+${authenticatedUser.lastName}`}
                className="rounded-full shadow-lg mt-4"
              />
            </figure>
            <div className="max-w-md card-body">
              <h2 className="card-title">
                {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}
              </h2>

              {authenticatedUser.roles.split(",").includes("ROLE_ADMIN") ? (
                <Link to="/admin">
                  <button>Admin Sayfasına Git</button>
                </Link>
              ) : null}

              <div className="card-actions">
                <button
                  className="btn glass rounded-full"
                  onClick={() => setUpdateCard(true)}
                >
                  Profili Güncelle
                </button>
              </div>
            </div>
          </div>

          <div
            className={`modal bg-opacity-80 ${
              updateCard ? "modal-open" : null
            }`}
          >
            <div className="modal-box">
              <UpdateCard setShow={setUpdateCard} />
              <div className="modal-action">
                <a className="btn" onClick={() => setUpdateCard(false)}>
                  Close
                </a>
              </div>
            </div>
          </div>
          <ChitChatHistory />
          <ChitChatHistory />
        </div>
      </div>
    </>
  );
}
