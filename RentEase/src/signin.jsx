import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Login Successful", {
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
        if (data.user.user_type === "owner") navigate("/owner_dash");
        else {
          navigate("/users");
        }
      } else {
        toast.error(data.message || "Login failed", {
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

        return { status: "error", message: data.message };
      }
    } catch (err) {
      return { status: "error", message: err.message };
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
            <p className="text-4xl font-bold">Continue Your Journey</p>
            <p className="text-4xl font-bold">With RentEase!!!</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="justify-left ml-[200px] mt-[60px] flex w-[325px] flex-col space-y-[20px]"
          >
            <input
              type="Email"
              className="inputf"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="inputf"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              value="Sign In"
              className="h-[35px] w-[325px] cursor-pointer rounded-[20px] bg-button px-3 text-white shadow-md hover:bg-button/85 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
            />
            <div className="flex flex-row justify-between">
              <p className="text-md py-1 font-semibold">
                Don't Have An Account ?
              </p>
              <Link
                to={"/signup"}
                className="h-[35px] w-[115px] cursor-pointer rounded-[20px] bg-black py-1 text-center text-white shadow-md hover:bg-black/80 hover:shadow-md hover:shadow-slate-900/25 focus-visible:outline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
