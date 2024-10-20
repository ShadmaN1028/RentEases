import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ServiceRequest() {
  const navigate = useNavigate();
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState("");
  const [requestType, setRequestType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTenantFlats();
  }, []);

  const fetchTenantFlats = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/ser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setFlats(data);
      } else {
        toast.error("Error fetching tenant flats");
      }
    } catch (error) {
      toast.error("Error fetching tenant flats");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/tenant/service-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            flatId: selectedFlat,
            requestType,
            description,
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Service request submitted successfully");
        navigate("/tenant_dash");
      } else {
        toast.error(data.message || "Error submitting service request");
      }
    } catch (error) {
      toast.error("Error submitting service request");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h2 className="mb-5 text-2xl font-bold">Submit Service Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="flat"
            className="block text-sm font-medium text-gray-700"
          >
            Select Flat
          </label>
          <select
            id="flat"
            value={selectedFlat}
            onChange={(e) => setSelectedFlat(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a flat</option>
            {flats.map((flat) => (
              <option key={flat.flat_number} value={flat.flat_number}>
                {flat.flat_number}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="requestType"
            className="block text-sm font-medium text-gray-700"
          >
            Request Type
          </label>
          <select
            id="requestType"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select request type</option>
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Service Request
        </button>
      </form>
    </div>
  );
}
