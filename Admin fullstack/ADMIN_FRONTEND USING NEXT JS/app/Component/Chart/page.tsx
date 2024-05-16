"use client";
import ChartOne from "./ChartOne";
import ChartThree from "./ChartThree";
import ChartTwo from "./ChartTwo";
import React from "react";

const Chart: React.FC = () => {
  return (
    <>
  

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
