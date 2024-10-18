import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

function FlatsInfo() {
  const [owner, setOwner] = useState(null);
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwnerAndFlats();
  }, []);

  const fetchOwnerAndFlats = async () => {
    try {
      const ownerResponse = await fetch('http://localhost:8080/owner/info', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const flatsResponse = await fetch('http://localhost:8080/owner/flats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (ownerResponse.ok && flatsResponse.ok) {
        const ownerData = await ownerResponse.json();
        const flatsData = await flatsResponse.json();
        setOwner(ownerData);
        setFlats(flatsData);
      } else {
        toast.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Flats Information</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          {/* <img src={owner.profileImage || "/placeholder.svg?height=100&width=100"} className="h-24 w-24 rounded-full mr-4" alt={owner.name} /> */}
          <div>
            <h2 className="text-2xl font-semibold">{owner.name}</h2>
            <p className="text-gray-600">{owner.email}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flats.map((flat) => (
          <div key={flat.id} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{flat.buildingName}</h3>
            <p className="text-gray-600 mb-1"> Flat #{flat.flatNumber}</p>
            <div className="mt-4">
              <p className="mb-1"><span className="font-semibold">Tenant:</span> {flat.tenantName || 'Vacant'}</p>
              <p className="mb-1"><span className="font-semibold">Contact:</span> {flat.tenantContact || 'N/A'}</p>
              <p className="mb-1"><span className="font-semibold">Email:</span> {flat.tenantEmail || 'N/A'}</p>
              <p className="mb-4"><span className="font-semibold">Payment Status:</span> 
                <span className={`ml-1 ${flat.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                  {flat.paymentStatus}
                </span>
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlatsInfo;