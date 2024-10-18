import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ServiceRequestList() {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    fetchServiceRequests();
  }, []);

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
        // toast.error('Error fetching service requests');
      }
    } catch (error) {
      // toast.error('Error fetching service requests');
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/owner/service-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast.success('Service request status updated');
        fetchServiceRequests(); // Refresh the list
      } else {
        const data = await response.json();
        toast.error(data.message || 'Error updating service request status');
      }
    } catch (error) {
      toast.error('Error updating service request status');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Service Requests</h1>
      {serviceRequests.length > 0 ? (
        <div className="grid gap-6">
          {serviceRequests.map((request) => (
            <div key={request.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{request.flat_number} - {request.building_name}</h2>
              <p className="text-gray-600 mb-2">Type: {request.request_type}</p>
              <p className="text-gray-800 mb-4">{request.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Requested on: {new Date(request.created_at).toLocaleString()}
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold">Status: {request.status}</p>
                <div className="space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(request.id, 'in_progress')}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Mark In Progress
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(request.id, 'completed')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No service requests at this time.</p>
      )}
    </div>
  );
}