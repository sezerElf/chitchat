import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar fixed w-full mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="h-10 w-40 m-1">
        <img src="/public/logo.png" />
      </div>

      <label
        for="chitchat-sidebar"
        className="lg:hidden drawer-button cursor-pointer"
      >
        <HiOutlineMenuAlt1 size={30} />
      </label>

      <h1 className="ml-5 lg:ml-0">Chitchat</h1>

      <Link className="ml-auto" to="/profile">
        <button className="btn btn-primary">Profil</button>
      </Link>
    </div>
  );
}
