import React from "react";
import { Link } from "react-router-dom";
import SignUp from "./signup";

function SignIn() {
  return (
    <>
      <div className="flex min-h-screen min-w-[1024px]">
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
            <p className=" text-4xl font-bold">Continue Your Journey</p>
            <p className=" text-4xl font-bold">With RentEase!!!</p>
          </div>
          <form
            action=""
            className="justify-left flex flex-col space-y-[20px] mt-[60px] ml-[200px] w-[325px] "
          >
            <input type="Email" className="inputf" placeholder="Email" />

            <input type="password" className="inputf" placeholder="Password" />
            <input
              type="button"
              value="Sign In"
              className=" h-[35px] w-[325px]  rounded-[20px] bg-button px-3 text-white shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline hover:bg-button/85"
            />
            <div className="flex flex-row  justify-between">
              <p className="text-md font-semibold py-1">
                Don't Have An Account ?
              </p>
              <Link
                to={"/signup"}
                className=" h-[35px] w-[115px] py-1 rounded-[20px] bg-black text-center text-white shadow-md cursor-pointer focus-visible:outline hover:bg-black/80 hover:shadow-md hover:shadow-slate-900/25"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
