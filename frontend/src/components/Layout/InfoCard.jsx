import React from "react";
import { useState, useEffect } from "react";
import axiosService from "../../services/axiosService";

export default function InfoCard() {
  const [infoCard, setInfoCards] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInfoCard();
  }, []);

  async function getInfoCard() {
    let data = (await axiosService.get("/info_card")).data;
    console.log(data);
    setInfoCards(data);
    setIsLoading(false);
  }
  return (
    <div className="flex flex-row mt-5">
      <div className="card bg-primary ml-2 shadow-2xl flex-1 ">
        <div className="card-body">
          <p>{isLoading ? null : infoCard[0].description}</p>
        </div>
      </div>
      <div className="card bg-secondary ml-2  shadow-2xl flex-1 ">
        <div className="card-body">
          <p>{isLoading ? null : infoCard[1].description}</p>
        </div>
      </div>
      <div className="card bg-accent ml-2  shadow-2xl flex-1 ">
        <div className="card-body">
          <p>{isLoading ? null : infoCard[2].description}</p>
        </div>
      </div>
    </div>
  );
}
