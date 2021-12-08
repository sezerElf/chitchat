import React, { useEffect, useState } from "react";
import TimeVector from "./TimeVector";

export default function TimeCard() {
  const [date, setDate] = useState(new Date());

  const dateInterval = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const interval = setInterval(dateInterval, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card glass lg:card-side text-neutral-content flex-1">
      <div className="card-body flex-row justify-center items-center">
        <div className="flex-1">
          <TimeVector />
        </div>

        <div>
          <h2>{date.toLocaleDateString()}</h2>
          <h2>{date.toLocaleTimeString()}</h2>
        </div>
      </div>
    </div>
  );
}
