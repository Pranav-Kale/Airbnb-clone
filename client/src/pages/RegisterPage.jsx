import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function registerUser(e) {
    e.preventDefault();
    axios.post("/register", {
      name,
      email,
      password,
    });
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className=" text-center mb-52">
        <p className="text-3xl font-semibold mb-7">Register</p>
        <form className="flex flex-col w-96 gap-4" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Pranav Kale"
            onChange={(e) => setName(e.target.value)}
          />
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
          <button>Register</button>
        </form>
        <p className="text-gray-400 mt-2">
          Already have an account ?{" "}
          <Link
            to="/login"
            className="underline underline-offset-2 text-gray-800"
          >
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
