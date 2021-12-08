import React from "react";
import UserVector from "./UserVector";
import { useState, useEffect } from "react";
import axiosService from "../../services/axiosService";

export default function MemberCountCard() {
  const [members, setMembers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMemberCount();
  }, []);

  async function getMemberCount() {
    let data = (await axiosService.get("/users/count")).data;

    setMembers(data);
    setIsLoading(false);
    console.log(data);
  }
  return (
    <div className="card glass lg:card-side flex-1 text-neutral-content">
      <div className="h-44 w-44 mt-12">
        <UserVector />
      </div>

      <div className="max-w-md card-body">
        <p className="card-title mt-8 text-2xl">Üye Sayısı </p>
        <h2>{isLoading ? null : members}</h2>
      </div>
    </div>
  );
}
