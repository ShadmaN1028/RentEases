import React from "react";
import SignIn from "./signin";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <div className="flex min-h-screen min-w-[950px]">
        <div className="bg-background items-end overflow-auto w-[44%]">
          <div className=" text-center flex flex-col justify-center items-center mt-[150px]">
            <p className=" text-7xl font-bold">RentEase!!!</p>
            <div className="mt-10 w-[45%]">
              <p className="text-xl text-left">Find Your Home,</p>
              <p className="text-xl text-right">Simplify Your Life</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-[56%] ">
          <div className="text-left mt-[100px] ml-[200px]">
            <p className=" text-4xl font-bold">Begin Your Journey</p>
            <p className=" text-4xl font-bold">With RentEase!!!</p>
          </div>
          <form
            action=""
            className="justify-left flex flex-col space-y-[20px] mt-[60px] ml-[200px] w-[325px] "
          >
            <input type="text" className="inputf" placeholder="Name" />

            <input type="Email" className="inputf" placeholder="Email" />

            <input type="password" className="inputf" placeholder="Password" />

            <input
              type="password"
              className="inputf"
              placeholder="Confirm Password"
            />
            <div className="flex flex-row  justify-between">
              <select
                name=""
                id=""
                className="h-[35px] w-[110px]  rounded-[20px] pl-3 pr-2 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md  hover:shadow-slate-900/25"
              >
                <option hidden>User Type</option>
                <option>Owner</option>
                <option>Tenant</option>
              </select>
              <input
                type="text"
                className="h-[35px] w-[100px]  rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
                placeholder="OTP"
              />
              <input
                type="button"
                value="Get OTP"
                className="h-[35px] w-[90px] rounded-[20px] bg-button px-3 text-white shadow-md cursor-pointer focus-visible:outline hover:bg-button/85 hover:shadow-md hover:shadow-slate-900/25"
              />
            </div>
            <input
              type="button"
              value="Sign Up"
              className=" h-[35px] w-[325px]  rounded-[20px] bg-black px-3 text-white shadow-md cursor-pointer focus-visible:outline hover:bg-black/80 hover:shadow-md hover:shadow-slate-900/25"
            />
            <div className="flex flex-row  justify-between">
              <p className="text-md font-semibold py-1">
                Already Have An Account ?
              </p>
              <Link
                to={"/signin"}
                className=" h-[35px] w-[115px] py-1 rounded-[20px] bg-black text-center text-white cursor-pointer focus-visible:outline hover:bg-black/80 shadow-md hover:shadow-md hover:shadow-slate-900/25"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
