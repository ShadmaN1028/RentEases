import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [userType, setUserType] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch user type from localStorage or your auth system
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);

    // Fetch notifications (this is a placeholder, replace with your actual API call)
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:8080/notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    // Redirect to login page or home page
  };

  const ownerNavItems = [
    { name: 'Post Buildings', link: '/post_building' },
    { name: 'Listed Buildings', link: '/owner_dash' },
    { name: 'Tenants List', link: '/tenants-list' },
    { name: 'Send Payment Notification', link: '/send_notf' },
    { name: 'Payment Status', link: '/payment_stat' },
  ];

  const tenantNavItems = [
    { name: 'Payment Status', link: '/payment_stat' },
    { name: 'Make Payment', link: '/payment' },
    { name: 'Flats Info', link: '/flats_info' },
    { name: 'Add Service Request', link: '/req_ser' },
    { name: 'Service Requests', link: '/service-requests' },
  ];

  const navItems = userType === 'owner' ? ownerNavItems : tenantNavItems;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-xl font-bold mb-2 w-full md:mb-0 md:w-auto">RentEase</Link>
        <div className="flex flex-wrap items-center space-x-4">
          {navItems.map((item, index) => (
            <Link key={index} to={item.link} className="hover:text-gray-300 mb-2 md:mb-0">
              {item.name}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="hover:text-gray-300"
            >
              Notifications
              {notifications.length > 0 && (
                <span className="ml-1 bg-red-500 text-xs rounded-full px-2 py-1">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {notifications.map((notification, index) => (
                  <div key={index} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {notification.message}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="hover:text-gray-300"
            >
              User
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;