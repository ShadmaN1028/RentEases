import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PostFlat() {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [flatData, setFlatData] = useState({
    flatNumber: '',
    area: '',
    rooms: '',
    bathrooms: '',
    balcony: false,
    parkingAvailable: false,
    tenantType: '',
    description: '',
    rentAmount: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFlatData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/flats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ ...flatData, buildingId }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Flat created successfully');
        navigate('/owner_dash');
      } else {
        toast.error(data.message || 'Error creating flat');
      }
    } catch (error) {
      toast.error('Error creating flat');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Post New Flat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="flatNumber" className="block text-sm font-medium text-gray-700">
            Flat Number
          </label>
          <input
            type="text"
            id="flatNumber"
            name="flatNumber"
            value={flatData.flatNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area (sqft)
          </label>
          <input
            type="number"
            id="area"
            name="area"
            value={flatData.area}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">
            Number of Rooms
          </label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={flatData.rooms}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
            Number of Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={flatData.bathrooms}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="balcony"
            name="balcony"
            checked={flatData.balcony}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="balcony" className="ml-2 block text-sm text-gray-900">
            Balcony
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="parkingAvailable"
            name="parkingAvailable"
            checked={flatData.parkingAvailable}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="parkingAvailable" className="ml-2 block text-sm text-gray-900">
            Parking Available
          </label>
        </div>
        <div>
          <label htmlFor="tenantType" className="block text-sm font-medium text-gray-700">
            Tenant Type
          </label>
          <select
            id="tenantType"
            name="tenantType"
            value={flatData.tenantType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Tenant Type</option>
            <option value="family">Family</option>
            <option value="bachelor">Bachelor</option>
            <option value="any">Any</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={flatData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div>
          <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700">
            Rent Amount
          </label>
          <input
            type="number"
            id="rentAmount"
            name="rentAmount"
            value={flatData.rentAmount}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Post Flat
        </button>
      </form>
    </div>
  );
}