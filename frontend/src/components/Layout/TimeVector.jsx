import React from "react";

export default function TimeVector() {
  return (
    <div>
       
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <circle
          cx={253.59}
          cy={217.37}
          r={111.12}
          style={{
            fill: "#263238",
            opacity: 0.2,
          }}
        />
        <circle
          cx={253.59}
          cy={217.37}
          r={102.4}
          style={{
            fill: "#f18c28",
            stroke: "#263238",
            strokeMiterlimit: 10,
          }}
        />
        <g
          style={{
            opacity: 0.2,
          }}
        >
          <path
            d="M253.59 220.72a3.33 3.33 0 0 1-2.4-1l-64.41-66.15a3.35 3.35 0 0 1 4.8-4.67L256 215a3.35 3.35 0 0 1-2.4 5.69Z"
            style={{
              fill: "#263238",
            }}
          />
        </g>
        <path
          d="M224.7 240.05a3.35 3.35 0 0 1-1.87-6.14l28.9-19.33a3.35 3.35 0 0 1 3.72 5.57l-28.89 19.33a3.36 3.36 0 0 1-1.86.57Z"
          style={{
            fill: "#263238",
            opacity: 0.2,
          }}
        />
        <path
          d="M257.74 217.37a4.15 4.15 0 1 0-4.15 4.14 4.15 4.15 0 0 0 4.15-4.14Z"
          style={{
            fill: "#263238",
            stroke: "#263238",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
          }}
        />
        <path
          style={{
            fill: "#fff",
            stroke: "#263238",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: 2,
          }}
          d="M253.67 124.13v13.84M253.67 295.69v13.84M346.37 216.83h-13.85M174.81 216.83h-13.84M302.28 137.9l-7.26 11.79M212.31 283.97l-7.26 11.79M335.22 172.76l-12.18 6.58M184.29 254.32l-12.18 6.58M332.6 265.45l-11.79-7.27M186.53 175.48l-11.79-7.26M297.74 298.39l-6.58-12.19M216.18 147.46l-6.58-12.18"
        />
      </svg>
      
    </div>
  );
}
