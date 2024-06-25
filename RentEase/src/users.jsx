import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LogoutButton from "./logoutButton";
function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        } else {
          toast.error(data.message || "Failed to fetch users");
        }
      } catch (err) {
        toast.error("An error occurred: " + err.message);
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">User List</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg bg-white p-4 shadow-md">
            <h2 className="text-xl font-semibold">
              {user.firstname} {user.surname}
            </h2>
            <p>Email: {user.email}</p>
            <p>User Type: {user.user_type}</p>
          </div>
        ))}
      </div>
      <LogoutButton />
    </div>
  );
}

export default UsersList;
