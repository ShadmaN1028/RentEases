import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function TenantNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [rentReminders, setRentReminders] = useState([]);

  useEffect(() => {
    fetchNotifications();
    fetchRentReminders();
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

  const fetchRentReminders = async () => {
    try {
      const response = await fetch('http://localhost:8080/tenant/rent-reminders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRentReminders(data);
      } else {
        toast.error('Error fetching rent reminders');
      }
    } catch (error) {
      toast.error('Error fetching rent reminders');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tenant Notifications</h1>
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
          <h2 className="text-2xl font-semibold mb-4">Rent Reminders</h2>
          {rentReminders.length > 0 ? (
            rentReminders.map((reminder) => (
              <div key={reminder.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="font-semibold">{reminder.flat_number} - {reminder.building_name}</h3>
                <p className="text-gray-800">Rent Due: ${reminder.amount_due}</p>
                <p className="text-sm text-gray-500 mt-2">Due Date: {reminder.due_date}</p>
              </div>
            ))
          ) : (
            <p>No rent reminders at this time.</p>
          )}
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