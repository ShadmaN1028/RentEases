import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface Flat {
  id: number;
  flat_number: string;
  area: number;
  rooms: number;
  rent_amount: number;
}

interface Notification {
  id: number;
  message: string;
  created_at: string;
}

export default function TenantDashboard() {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchAvailableFlats();
    fetchNotifications();
  }, []);

  const fetchAvailableFlats = async () => {
    try {
      const response = await fetch("http://localhost:8080/tenant/available-flats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFlats(data);
      } else {
        toast.error("Error fetching available flats");
      }
    } catch (error) {
      toast.error("Error fetching available flats");
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tenant Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Flats</h2>
          {flats.map((flat) => (
            <div key={flat.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold">{flat.flat_number}</h3>
              <p>Area: {flat.area} sqft</p>
              <p>Rooms: {flat.rooms}</p>
              <p>Rent: ${flat.rent_amount}</p>
              <Link
                to={`/req_flat/${flat.id}`}
                className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Request Flat
              </Link>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">{new Date(notification.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <Link
          to="/service-request"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Service Request
        </Link>
      </div>
    </div>
  );
}