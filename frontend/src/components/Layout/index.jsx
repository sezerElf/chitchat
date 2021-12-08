import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import axiosService from "../../services/axiosService";

export default function Layout() {
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    let data = (await axiosService.get("/category"))
      .data;

    setCategories(data);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <Navbar />

      <div className="rounded-lg shadow bg-base-200 drawer drawer-mobile flex-1 mt-16">
        <input id="chitchat-sidebar" type="checkbox" class="drawer-toggle" />
        <div className="p-3 drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label for="chitchat-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li>
              {isLoading
                ? null
                : categories.map((category) => <a>{category.title}</a>)}
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
