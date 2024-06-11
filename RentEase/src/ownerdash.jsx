import React from "react";
import img from './assets/owner.png'

function OwnerDash() {
  return (
    <>
      <div className="flex flex-col min-h-screen min-w-[1024px]">
        <div className="flex flex-col justify-center items-center">
          <img
            src={img}
            className="h-[300px] w-[300px] rounded-[50%]"
            alt=""
          />
          <h1 className="text-3xl font-bold mb-6">Miss Chanandler Bong</h1>
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="h-auto w-[400px] ml-[50px] py-[30px] px-3 bg-background space-y-[20px]  rounded-[20px] shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline flex flex-col items-center">
            <p className="font-bold text-center text-xl">House name</p>
            <div className="flex flex-col space-y-[20px] items-center mb-[20px] mx-[70px]">
              <p className=" flex flex-col text-center">
                Address: House#191/1 Road#02, Talaimari, Kazla, Rajshahi
              </p>
              <p>Total No of Flats: 2</p>
            </div>
            <p className="text-xl font-semibold">Unique ID: 5338048</p>
            <input
              type="button"
              value="Details"
              className=" h-[40px] w-[120px] rounded-[20px] bg-button px-3 text-white shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline hover:bg-button/85"
            />
          </div>
          <div className="h-auto w-[400px] ml-[50px] py-[30px] px-3 bg-background space-y-[20px]  rounded-[20px] shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline flex flex-col items-center">
            <p className="font-bold text-center text-xl">House name</p>
            <div className="flex flex-col space-y-[20px] items-center mb-[20px] mx-[70px]">
              <p className=" flex flex-col text-center">
                Address: House#192/1 Road#02, Talaimari, Kazla, Rajshahi
              </p>
              <p>Total No of Flats: 5</p>
            </div>
            <p className="text-xl font-semibold">Unique ID: 5338049</p>
            <input
              type="button"
              value="Details"
              className=" h-[40px] w-[120px] rounded-[20px] bg-button px-3 text-white shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline hover:bg-button/85"
            />
          </div>
          <div className="h-auto w-[400px] ml-[50px] py-[30px] bg-background space-y-[20px]  rounded-[20px] shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline flex flex-col items-center">
            <h6 className="text-[30px] justify-end font-bold">Register</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default OwnerDash;
