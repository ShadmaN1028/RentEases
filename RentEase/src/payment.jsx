import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Payments() {
  const [tenancies, setTenancies] = useState([]);
  const [selectedTenancy, setSelectedTenancy] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('');

  useEffect(() => {
    fetchTenancies();
  }, []);

  const fetchTenancies = async () => {
    try {
      const response = await fetch('http://localhost:8080/owner/tenancies', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTenancies(data);
      } else {
        toast.error('Error fetching tenancies');
      }
    } catch (error) {
      toast.error('Error fetching tenancies');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ tenancyId: selectedTenancy, amount, paymentType }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Payment recorded successfully');
        setSelectedTenancy('');
        setAmount('');
        setPaymentType('');
      } else {
        toast.error(data.message || 'Error recording payment');
      }
    } catch (error) {
      toast.error('Error recording payment');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Record Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tenancy" className="block text-sm font-medium text-gray-700">
            Select Tenancy
          </label>
          <select
            id="tenancy"
            value={selectedTenancy}
            onChange={(e) => setSelectedTenancy(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a tenancy</option>
            {tenancies.map((tenancy) => (
              <option key={tenancy.id} value={tenancy.id}>
                {tenancy.flat_number} - {tenancy.building_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">
            Payment Type
          </label>
          <select
            id="paymentType"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select payment type</option>
            <option value="rent">Rent</option>
            <option value="deposit">Deposit</option>
            <option value="maintenance">Maintenance</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Record Payment
        </button>
      </form>
    </div>
  );
}