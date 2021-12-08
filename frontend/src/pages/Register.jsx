import React, { useState } from "react";
import RegisterVector from "../components/Register/RegisterVector";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");

  async function handleCreateUser(e) {
    e.preventDefault();
    if (password !== againPassword) {
      alert("şifreler eşleşmiyor");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        firstName: name,
        lastName,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-wrap h-full">
      <div className="flex justify-center items-center flex-1 ">
        <RegisterVector />
      </div>

      <div className="flex justify-center items-center flex-1">
        <form
          className="card bordered !border-primary shadow"
          onSubmit={handleCreateUser}
        >
          <div className="card-body">
            <div className="form-control">
              <div className="relative">
                <h1 className="text-center font-extrabold !w-[1000] mb-2">
                  Aramıza Katılın
                </h1>
                <input
                  type="text"
                  placeholder="Ad"
                  className="w-full pr-16 input input-primary input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  required
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
                  required
                />
              </div>
              <div>
                <button
                  className="btn btn-primary mt-2 items-center text-white w-full"
                  type="submit"
                >
                  Üye Ol
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
