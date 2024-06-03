import React from "react";

function SignUp() {
  return (
    <>
      <div className="flex">
        <div className="bg-background h-screen w-[44%]"></div>
        <div className="bg-white h-screen w-[56%]">
          <div class="text-left mt-[100px] ml-[100px]">
            <p class=" text-3xl font-bold">
              Begin Your Journey
            </p>
            <p class=" text-3xl font-bold">
              With RentEase!!!
            </p>
          </div>
          <form action="" className="justify-left flex mt-[40px] ml-[100px] ">
            <input
              type="text"
              className="h-[35px] w-[325px]  rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
              placeholder="Name"
            />
          </form>
          
        </div>
      </div>
    </>
  );
}

export default SignUp;
