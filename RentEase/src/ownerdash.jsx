import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import LogoutButton from "./logoutButton";

export default function OwnerDashboard() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [flats, setFlats] = useState([]);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetchBuildings();
    fetchTenants();
  }, []);

  const fetchBuildings = async () => {
    try {
      const response = await fetch("http://localhost:8080/owner/buildings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBuildings(data);
      } else {
        toast.error("Error fetching buildings");
      }
    } catch (error) {
      toast.error("Error fetching buildings");
    }
  };

  const fetchFlats = async (buildingId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/owner/flats/${buildingId}`,
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
        toast.error("Error fetching flats");
      }
    } catch (error) {
      toast.error("Error fetching flats");
    }
  };

  const fetchTenants = async () => {
    try {
      const response = await fetch("http://localhost:8080/owner/tenants", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTenants(data);
      } else {
        toast.error("Error fetching tenants");
      }
    } catch (error) {
      toast.error("Error fetching tenants");
    }
  };

  const handleBuildingSelect = (buildingId) => {
    setSelectedBuilding(buildingId);
    fetchFlats(buildingId);
  };

  const generateFlatCode = async (flatId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/flats/${flatId}/generate-code`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        toast.success(`Flat code generated: ${data.code}`);
        fetchFlats(selectedBuilding);
      } else {
        toast.error("Error generating flat code");
      }
    } catch (error) {
      toast.error("Error generating flat code");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Owner Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Your Buildings</h2>
          <div className="space-y-4">
            {buildings.map((building) => (
              <div
                key={building.id}
                className="cursor-pointer rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
                onClick={() => handleBuildingSelect(building.id)}
              >
                <h3 className="text-xl font-semibold">{building.name}</h3>
                <p className="text-gray-600">{building.address}</p>
              </div>
            ))}
          </div>
          <Link to="/post_building">
            <button className="mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Add New Building
            </button>
          </Link>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Flats</h2>
          <div className="space-y-4">
            {selectedBuilding ? (
              flats.map((flat) => (
                <div key={flat.id} className="rounded-lg bg-gray-100 p-4">
                  <h3 className="text-xl font-semibold">{flat.flat_number}</h3>
                  <p className="text-gray-600">Status: {flat.status}</p>
                  <p className="text-gray-600">Rent: ${flat.rent_amount}</p>
                  {flat.code ? (
                    <>
                      <p className="mt-2 text-gray-600">Code: {flat.code}</p>
                      <Link to={`/edit-flat/${flat.id}`}>
                        <button className="mt-2 w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                          Edit Flat
                        </button>
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={() => generateFlatCode(flat.id)}
                      className="mt-2 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    >
                      Generate Code
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                Select a building to view its flats
              </p>
            )}
          </div>
          {selectedBuilding && (
            <Link to={`/post_flat/${selectedBuilding}`}>
              <button className="mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                Add New Flat
              </button>
            </Link>
          )}
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Tenants</h2>
          <div className="space-y-4">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="rounded-lg bg-gray-100 p-4">
                <h3 className="text-xl font-semibold">
                  {tenant.first_name} {tenant.surname}
                </h3>
                <p className="text-gray-600">Email: {tenant.email}</p>
                <p className="text-gray-600">Flat: {tenant.flat_number}</p>
                <p className="text-gray-600">
                  Building: {tenant.building_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LogoutButton className="mt-8" />
    </div>
  );
}
