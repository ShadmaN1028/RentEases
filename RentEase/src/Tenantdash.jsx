import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LogoutButton from "./logoutButton";

const TenantDashboard = () => {
  const [flats, setFlats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    fetchTenantFlats();
    fetchNotifications();
  }, []);

  const fetchTenantFlats = async () => {
    try {
      const response = await fetch("http://localhost:8080/tenant/flats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:8080/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        toast.error("Error fetching notifications");
      }
    } catch (error) {
      toast.error("Error fetching notifications");
    }
  };

  const handleJoinFlat = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/flats/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ code: joinCode }),
      });
      if (response.ok) {
        toast.success("Successfully joined flat");
        fetchTenantFlats();
        setJoinCode("");
      } else {
        const data = await response.json();
        toast.error(data.message || "Error joining flat");
      }
    } catch (error) {
      toast.error("Error joining flat");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Tenant Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Your Flats</h2>
          {flats.map((flat) => (
            <div
              key={flat.id}
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <h3 className="text-xl font-semibold">{flat.flat_number}</h3>
              <p>Building: {flat.building_name}</p>
              <p>Address: {flat.address}</p>
              <p>Area: {flat.area} sqft</p>
              <p>Rooms: {flat.rooms}</p>
              <p>Rent: ${flat.rent_amount}</p>
              <h4 className="mt-2 font-semibold">Owner Details:</h4>
              <p>
                Name: {flat.first_name} {flat.surname}
              </p>
              <p>Email: {flat.email}</p>
            </div>
          ))}
          <form onSubmit={handleJoinFlat} className="mt-4">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter flat code"
              className="mr-2 rounded border px-2 py-1"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Join Flat
            </button>
          </form>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Notifications</h2>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <Link
          to="/service-request"
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Submit Service Request
        </Link>
      </div>
      <LogoutButton />
    </div>
  );
};

export default TenantDashboard;
