import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const PaymentStatus = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const storedUserType = localStorage.getItem('userType');
        setUserType(storedUserType);

        const response = await fetch('http://localhost:8080/payments', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }

        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
        toast.error('Failed to load payments. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'overdue':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading payment data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payment Status</h1>
      {payments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Date</th>
                {userType === 'owner' && <th className="py-2 px-4 border-b text-left">Tenant</th>}
                {userType === 'tenant' && <th className="py-2 px-4 border-b text-left">Owner</th>}
                <th className="py-2 px-4 border-b text-left">Flat</th>
                <th className="py-2 px-4 border-b text-left">Amount</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="py-2 px-4 border-b">{formatDate(payment.payment_date)}</td>
                  {userType === 'owner' && <td className="py-2 px-4 border-b">{payment.tenant_name}</td>}
                  {userType === 'tenant' && <td className="py-2 px-4 border-b">{payment.owner_name}</td>}
                  <td className="py-2 px-4 border-b">{payment.flat_number}</td>
                  <td className="py-2 px-4 border-b">${payment.amount.toFixed(2)}</td>
                  <td className={`py-2 px-4 border-b ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;