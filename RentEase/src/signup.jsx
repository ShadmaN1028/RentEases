import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (message === "User created successfully") {
      const timeout = setTimeout(() => {
        navigate("/signin"); // Redirect to the sign-in page
      }, 3000); // 3 seconds timeout

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [message, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, surName, email, password, userType }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("User created successfully");
        toast.success("User created successfully", {
          style: {
            border: "1px solid #49c41e",
            padding: "16px",
            color: "white",
            backgroundColor: "#49c41e",
          },
          iconTheme: {
            primary: "white",
            secondary: "#49c41e",
          },
        });
      } else {
        setMessage(data.message || "Registration failed");
        toast.error(data.message || "Registration failed", {
          style: {
            border: "1px solid red",
            padding: "16px",
            color: "white",
            backgroundColor: "red",
          },
          iconTheme: {
            primary: "white",
            secondary: "red",
          },
        });
      }
    } catch (error) {
      setMessage("Error: " + error.message);
      toast.error("Error: " + error.message, {
        style: {
          border: "1px solid red",
          padding: "16px",
          color: "white",
          backgroundColor: "red",
        },
        iconTheme: {
          primary: "white",
          secondary: "red",
        },
      });
    }
  };

  return (
    <>
      <div className="flex min-h-screen min-w-[1024px]">
        <div className="w-[44%] items-end overflow-auto bg-background">
          <div className="mt-[150px] flex flex-col items-center justify-center text-center">
            <p className="text-7xl font-bold">RentEase!!!</p>
            <div className="mt-10 w-[45%]">
              <p className="text-left text-xl">Find Your Home,</p>
              <p className="text-right text-xl">Simplify Your Life</p>
            </div>
          </div>
        </div>
        <div className="w-[56%] bg-white">
          <div className="ml-[200px] mt-[100px] text-left">
            <p className="text-4xl font-bold">Begin Your Journey</p>
            <p className="text-4xl font-bold">With RentEase!!!</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="justify-left ml-[200px] mt-[60px] flex w-[325px] flex-col space-y-[20px]"
          >
            <div className="flex flex-row justify-between">
              <input
                type="text"
                className="h-[35px] w-[157px] rounded-[20px] bg-background px-3 font-normal placeholder-black shadow-md outline-none hover:shadow-md hover:shadow-slate-900/25 hover:ring-1 hover:ring-inset hover:ring-indigo-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
                placeholder="Firstname"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="h-[35px] w-[157px] rounded-[20px] bg-background px-3 font-normal placeholder-black shadow-md outline-none hover:shadow-md hover:shadow-slate-900/25 hover:ring-1 hover:ring-inset hover:ring-indigo-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
                placeholder="Surname"
                required
                value={surName}
                onChange={(e) => setSurName(e.target.value)}
              />
            </div>

            <input
              type="Email"
              className="inputf"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="inputf"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="inputf"
              placeholder="Confirm Password"
            />
            <div className="flex flex-row justify-between">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="h-[35px] w-[110px] rounded-[20px] bg-background pl-3 pr-2 font-normal placeholder-black outline-none drop-shadow-md hover:shadow-md hover:shadow-slate-900/25 hover:ring-1 hover:ring-inset hover:ring-indigo-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
              >
                <option hidden>User Type</option>
                <option value="owner">Owner</option>
                <option value="tenant">Tenant</option>
              </select>
              <input
                type="text"
                className="h-[35px] w-[100px] rounded-[20px] bg-background px-3 font-normal placeholder-black shadow-md outline-none hover:shadow-md hover:shadow-slate-900/25 hover:ring-1 hover:ring-inset hover:ring-indigo-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
                placeholder="OTP"
              />
              <input
                type="button"
                value="Get OTP"
                className="h-[35px] w-[90px] cursor-pointer rounded-[20px] bg-button px-3 text-white shadow-md hover:bg-button/85 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
              />
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="h-[35px] w-[325px] cursor-pointer rounded-[20px] bg-black px-3 text-white shadow-md hover:bg-black/80 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
            />
            <div className="flex flex-row justify-between">
              <p className="text-md py-1 font-semibold">
                Already Have An Account ?
              </p>
              <Link
                to={"/signin"}
                className="h-[35px] w-[115px] cursor-pointer rounded-[20px] bg-black py-1 text-center text-white shadow-md hover:bg-black/80 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
