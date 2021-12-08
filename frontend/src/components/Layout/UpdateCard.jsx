import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axiosService from "../../services/axiosService";

export default function Register({ setShow }) {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const { id } = authenticatedUser;

  const [firstName, setFirstName] = useState(authenticatedUser.firstName);
  const [lastName, setLastName] = useState(authenticatedUser.lastName);
  const [email, setEmail] = useState(authenticatedUser.email);
  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axiosService.put(`/users/${id}`, {
        firstName,
        lastName,
        email,
        password: password || undefined,
      });
      const data = (await axiosService.get(`/users/${id}`)).data;
      setAuthenticatedUser(data);
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-wrap h-full">
      <div className="flex justify-center items-center flex-1">
        <form
          className="card bordered !border-primary shadow"
          onSubmit={handleUpdate}
        >
          <div className="card-body">
            <div className="form-control">
              <div className="relative">
                <h1 className="text-center font-extrabold !w-[1000] mb-2">
                  Profili Güncelle
                </h1>
                <input
                  type="text"
                  placeholder="Ad"
                  className="w-full pr-16 input input-primary input-bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <div className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="Soyad"
                  className="w-full input input-primary input-bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full pr-16 input input-primary input-bordered mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Şifre"
                  className="w-full pr-16 input input-primary input-bordered mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="
                  Şifre Yeniden"
                  className="w-full pr-16 input input-primary input-bordered mt-2"
                  value={againPassword}
                  onChange={(e) => setAgainPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn-primary mt-2 items-center text-white w-full">
                  Güncelle
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
