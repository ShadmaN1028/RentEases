import React from "react";

function PostingApartment() {
  return (
    <>
      <div className="mx-auto px-4 py-8 min-h-screen min-w-[1024px]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-6">Post a Vacant Apartment</h1>
          <div className="">
            <form
              action=""
              className="justify-center flex flex-col space-y-[35px] mt-[60px] "
            >
              <input
                type="text"
                placeholder="Apartment Name"
                className="h-[45px] w-[700px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
              />
              <input
                type="text"
                placeholder="Address"
                className="h-[45px] w-[700px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
              />
              <div className="flex flex-row justify-between">
                <input
                  type="text"
                  placeholder="Area (sqft)"
                  className="h-[45px] w-[228px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="No. of Rooms"
                  className="h-[45px] w-[228px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="No. of Baths"
                  className="h-[45px] w-[228px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
                />
              </div>
              <div className="flex flex-row justify-between">
                <input
                  type="number"
                  min="0"
                  placeholder="Balcony"
                  className="h-[45px] w-[228px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
                />
                <select
                  name=""
                  id=""
                  className="h-[45px] w-[228px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
                >
                  <option hidden>Parking Space</option>
                  <option>Available</option>
                  <option>Not Available</option>
                </select>
                <select
                  name=""
                  id=""
                  className="h-[45px] w-[228px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
                >
                  <option hidden>Tenant Type</option>
                  <option>Bachelor</option>
                  <option>Family</option>
                </select>
              </div>
              <textarea
                name="Description"
                id=""
                rows="3"
                placeholder="Description"
                className="w-[700px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
              />
              <input
                name="Uid"
                id=""
                placeholder="Unique Code : 48aa8e2q82r"
                readOnly
                className="h-[45px] w-[700px] rounded-[20px] px-3 bg-background placeholder-black font-normal focus:ring-1 focus:ring-inset focus:ring-indigo-600 outline-none hover:ring-1 hover:ring-indigo-600 hover:ring-inset shadow-md hover:shadow-md hover:shadow-slate-900/25"
              />

              <label for="image-upload">Select Image:</label>
              <input type="file" id="image-upload" accept="image/*" required />
              <div className=" flex justify-evenly">
              <input
                type="button"
                value="Post"
                className="h-[45px] w-[200px]  rounded-[20px] bg-button px-3 text-white shadow-md hover:shadow-md hover:shadow-slate-900/25 cursor-pointer focus-visible:outline hover:bg-button/85"
              />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostingApartment;
