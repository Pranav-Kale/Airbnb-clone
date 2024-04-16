import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className=" text-center mb-64">
        <p className="text-3xl font-semibold mb-7">Login</p>
        <form className="flex flex-col w-96 gap-4">
          <input type="email" placeholder="your@gmail.com" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </form>
        <p className="text-gray-400 mt-2">
          Don`t have an account ? <Link to="/register" className="underline underline-offset-2 text-gray-800">Register now</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
