import LoginVector from "../components/Register/LoginVector";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import axiosService from "../services/axiosService";

export default function Login() {
  const { setAuthenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const data = (
        await axiosService.post("/auth/login", {
          email,
          password,
        })
      ).data;

      axiosService.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
      setAuthenticatedUser(data.user);
      navigate("/");
    } catch (error) {
      setIsLoggingIn(false);
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-full">
      <div className="flex justify-center items-center mt-20 flex-1">
        <LoginVector />
      </div>

      <div className="flex justify-center items-center flex-1">
        <form
          className="card bordered !border-primary shadow"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <h1 className="text-center mt-5 font-extrabold">Giriş Yapınız</h1>
          <div className="card-body">
            <div className="form-control">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full pr-16 input input-primary input-bordered mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Şifre"
                className="w-full pr-16 input input-primary input-bordered mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="btn btn-primary mt-2 items-center text-white w-full"
                disabled={isLoggingIn}
              >
                Giriş Yap
              </button>

              {loginError ? (
                <div className="alert alert-error mt-3">
                  <div className="flex-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 mx-2 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      ></path>
                    </svg>
                    <label>{loginError}</label>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
