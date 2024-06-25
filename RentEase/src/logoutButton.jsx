import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
    toast.success("Logout Successful");
  };
  return (
    <>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}

export default LogoutButton;
