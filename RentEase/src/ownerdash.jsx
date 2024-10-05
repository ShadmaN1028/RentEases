import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function OwnerDashboard() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    fetchBuildings();
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
      const response = await fetch(`http://localhost:8080/owner/flats/${buildingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  const handleBuildingSelect = (buildingId) => {
    setSelectedBuilding(buildingId);
    fetchFlats(buildingId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Buildings</h2>
          {buildings.map((building) => (
            <div
              key={building.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
              onClick={() => handleBuildingSelect(building.id)}
            >
              <h3 className="text-xl font-semibold">{building.name}</h3>
              <p>{building.address}</p>
            </div>
          ))}
          <Link
            to="/post_building"
            className="block mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            Add New Building
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Flats</h2>
          {selectedBuilding ? (
            flats.map((flat) => (
              <div key={flat.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="text-xl font-semibold">{flat.flat_number}</h3>
                <p>Status: {flat.status}</p>
                <p>Rent: ${flat.rent_amount}</p>
                <Link
                  to={`/edit-flat/${flat.id}`}
                  className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Flat
                </Link>
              </div>
            ))
          ) : (
            <p>Select a building to view its flats</p>
          )}
          {selectedBuilding && (
            <Link
              to={`/post_flat/${selectedBuilding}`}
              className="block mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
            >
              Add New Flat
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
