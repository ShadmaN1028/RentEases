import React from 'react'

function FlatsInfo() {
  return (
    <>
    <div className="flex flex-col min-h-screen min-w-[1024px]">
      <div className='flex flex-col justify-center items-center'>
        <img src= "./assets/owner.png" className="h-[300px] w-[300px] rounded-[50%]" alt="" />
            <h1 className="text-3xl font-bold mb-6">Miss Chanandler Bong</h1>
      </div>
      <div className='flex flex-row justify-evenly'>
        <div className='h-auto w-[400px] ml-[50px] py-[30px] bg-background space-y-[20px]  rounded-[20px] shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline flex flex-col items-center'>
        <p className='font-bold text-center text-xl'>House name</p>
        <div className='flex flex-row justify-evenly'>
          <p>House#191/1</p>
          <p className='pl-[10%]'>Flat#A</p>
        </div>
        <div className='flex flex-col space-y-[20px] justify-center items-center mb-[20px]'>
          <p>Tenant: Joey Tribbiani</p>
          <p>Contact: 01900000000</p>
          <p>Payment Status: Unpaid</p>
        </div>
        <input
              type="button"
              value="Details"
              className=" h-[40px] w-[120px] rounded-[20px] bg-button px-3 text-white shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline hover:bg-button/85"
            />
        </div>
        <div className='h-auto w-[400px] ml-[50px] py-[30px] bg-background space-y-[20px]  rounded-[20px] shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline flex flex-col items-center'>
        <p className='font-bold text-center text-xl'>House name</p>
        <div className='flex flex-row justify-evenly'>
          <p>House#191/1</p>
          <p className='pl-[10%]'>Flat#B</p>
        </div>
        <div className='flex flex-col space-y-[20px] justify-center items-center mb-[20px]'>
          <p>Tenant: Monica Geller</p>
          <p>Contact: 01900000000</p>
          <p>Payment Status: Unpaid</p>
        </div>
        <input
              type="button"
              value="Details"
              className=" h-[40px] w-[120px] rounded-[20px] bg-button px-3 text-white shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline hover:bg-button/85"
            />
        </div>
        <div className='h-auto w-[400px] ml-[50px] py-[30px] bg-background space-y-[20px]  rounded-[20px] shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline flex flex-col items-center'>
        <p className='font-bold text-center text-xl'>House name</p>
        <div className='flex flex-row justify-evenly'>
          <p>House#191/1</p>
          <p className='pl-[10%]'>Flat#C</p>
        </div>
        <div className='flex flex-col space-y-[20px] justify-center items-center mb-[20px]'>
          <p>Tenant: Ross Geller</p>
          <p>Contact: 01900000000</p>
          <p>Payment Status: Unpaid</p>
        </div>
        <input
              type="button"
              value="Details"
              className=" h-[40px] w-[120px] rounded-[20px] bg-button px-3 text-white shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline hover:bg-button/85"
            />
        </div>
      </div>
    </div>
    </>
  )
}

export default FlatsInfo