import LogoutButton from "./logoutButton";
import React, { useEffect, useState } from "react";
import img from "./assets/owner.png";
import { useNavigate } from "react-router-dom";
function OwnerDash() {
  const [users, setUsers] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUsers(userData);
  });

  return (
    <>
      <LogoutButton />
      <div className="flex min-h-screen min-w-[1024px] flex-col">
        <div className="flex flex-col items-center justify-center">
          <img src={img} className="h-[300px] w-[300px] rounded-[50%]" alt="" />
          <h1 className="mb-6 text-3xl font-bold">{users.surname}</h1>
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="ml-[50px] flex h-auto w-[400px] cursor-pointer flex-col items-center space-y-[20px] rounded-[20px] bg-background px-3 py-[30px] shadow-md hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline">
            <p className="text-center text-xl font-bold">House name</p>
            <div className="mx-[70px] mb-[20px] flex flex-col items-center space-y-[20px]">
              <p className="flex flex-col text-center">
                Address: House#191/1 Road#02, Talaimari, Kazla, Rajshahi
              </p>
              <p>Total No of Flats: 2</p>
            </div>
            <p className="text-xl font-semibold">Unique ID: 5338048</p>
            <input
              type="button"
              value="Details"
              className="h-[40px] w-[120px] cursor-pointer rounded-[20px] bg-button px-3 text-white shadow-md hover:bg-button/85 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
            />
          </div>
          <div className="ml-[50px] flex h-auto w-[400px] cursor-pointer flex-col items-center space-y-[20px] rounded-[20px] bg-background px-3 py-[30px] shadow-md hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline">
            <p className="text-center text-xl font-bold">House name</p>
            <div className="mx-[70px] mb-[20px] flex flex-col items-center space-y-[20px]">
              <p className="flex flex-col text-center">
                Address: House#192/1 Road#02, Talaimari, Kazla, Rajshahi
              </p>
              <p>Total No of Flats: 5</p>
            </div>
            <p className="text-xl font-semibold">Unique ID: 5338049</p>
            <input
              type="button"
              value="Details"
              className="h-[40px] w-[120px] cursor-pointer rounded-[20px] bg-button px-3 text-white shadow-md hover:bg-button/85 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
            />
          </div>
          <div className="ml-[50px] flex h-auto w-[400px] cursor-pointer flex-col items-center space-y-[20px] rounded-[20px] bg-background py-[30px] shadow-md hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline">
            <h6 className="justify-end text-[30px] font-bold">Register</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default OwnerDash;
