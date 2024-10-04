import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function OwnerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    fetchNotifications();
    fetchServiceRequests();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8080/notifications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        toast.error('Error fetching notifications');
      }
    } catch (error) {
      toast.error('Error fetching notifications');
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch('http://localhost:8080/owner/service-requests', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setServiceRequests(data);
      } else {
        toast.error('Error fetching service requests');
      }
    } catch (error) {
      toast.error('Error fetching service requests');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Owner Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">General Notifications</h2>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No notifications at this time.</p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Service Requests</h2>
          {serviceRequests.length > 0 ? (
            serviceRequests.map((request) => (
              <div key={request.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="font-semibold">{request.flat_number} - {request.building_name}</h3>
                <p className="text-gray-800">{request.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Requested on: {new Date(request.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No service requests at this time.</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <Link
          to="/send-notification"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send New Notification
        </Link>
      </div>
    </div>
  );
}