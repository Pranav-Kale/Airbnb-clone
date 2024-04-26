import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../store/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const {data} = await axios.post("/login", {
        email,
        password,
      });
      alert("Login Successfull");
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login failed. Please try again !");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className=" text-center mb-64">
        <p className="text-3xl font-semibold mb-7">Login</p>
        <form className="flex flex-col w-96 gap-4" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
        <p className="text-gray-400 mt-2">
          Don`t have an account ?{" "}
          <Link
            to="/register"
            className="underline underline-offset-2 text-gray-800"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
