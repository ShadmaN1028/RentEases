import React from "react";
import img from "./assets/owner.png";

function FlatsInfo() {
  return (
    <>
      <div className="flex min-h-screen min-w-[1024px] flex-col">
        <div className="flex flex-col items-center justify-center">
          <img src={img} className="h-[300px] w-[300px] rounded-[50%]" alt="" />
          <h1 className="mb-6 text-3xl font-bold">Miss Chanandler Bong</h1>
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="ml-[50px] flex h-auto w-[400px] cursor-pointer flex-col items-center space-y-[20px] rounded-[20px] bg-background py-[30px] shadow-md hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline">
            <p className="text-center text-xl font-bold">House name</p>
            <div className="flex flex-row justify-evenly">
              <p>House#191/1</p>
              <p className="pl-[10%]">Flat#A</p>
            </div>
            <div className="mb-[20px] flex flex-col items-center justify-center space-y-[20px]">
              <p>Tenant: Joey Tribbiani</p>
              <p>Contact: 01900000000</p>
              <p>Payment Status: Unpaid</p>
            </div>
            <input
              type="button"
              value="Details"
              className="h-[40px] w-[120px] cursor-pointer rounded-[20px] bg-button px-3 text-white shadow-md hover:bg-button/85 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
            />
          </div>
          <div className="ml-[50px] flex h-auto w-[400px] cursor-pointer flex-col items-center space-y-[20px] rounded-[20px] bg-background py-[30px] shadow-md hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline">
            <p className="text-center text-xl font-bold">House name</p>
            <div className="flex flex-row justify-evenly">
              <p>House#191/1</p>
              <p className="pl-[10%]">Flat#B</p>
            </div>
            <div className="mb-[20px] flex flex-col items-center justify-center space-y-[20px]">
              <p>Tenant: Monica Geller</p>
              <p>Contact: 01900000000</p>
              <p>Payment Status: Unpaid</p>
            </div>
            <input
              type="button"
              value="Details"
              className="h-[40px] w-[120px] cursor-pointer rounded-[20px] bg-button px-3 text-white shadow-md hover:bg-button/85 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
            />
          </div>
          <div className="ml-[50px] flex h-auto w-[400px] cursor-pointer flex-col items-center space-y-[20px] rounded-[20px] bg-background py-[30px] shadow-md hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline">
            <p className="text-center text-xl font-bold">House name</p>
            <div className="flex flex-row justify-evenly">
              <p>House#191/1</p>
              <p className="pl-[10%]">Flat#C</p>
            </div>
            <div className="mb-[20px] flex flex-col items-center justify-center space-y-[20px]">
              <p>Tenant: Ross Geller</p>
              <p>Contact: 01900000000</p>
              <p>Payment Status: Unpaid</p>
            </div>
            <input
              type="button"
              value="Details"
              className="h-[40px] w-[120px] cursor-pointer rounded-[20px] bg-button px-3 text-white shadow-md hover:bg-button/85 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FlatsInfo;
