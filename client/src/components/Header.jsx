import { AiFillEnvironment } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-white px-2 sm:px-6 shadow-transparent fixed z-[500] w-full h-20 py-4 flex justify-between items-center">
      <Link to="/">
        <div className="flex gap-1 items-center">
          <AiFillEnvironment className="text-4xl text-primaryColor" />
          <span className="font-bold text-xl text-primaryColor">airbnb</span>
        </div>
      </Link>

      <div className="flex items-center gap-2 border py-2 px-3 rounded-full shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border border-borderColor h-4"></div>
        <div>Any week</div>
        <div className="border border-borderColor h-4"></div>
        <div>Add guests</div>
        <div>
          <FaSearch className="text-xl bg-red-500 text-white rounded-full p-1" />
        </div>
      </div>

      <div className="flex items-center gap-2 border py-2 px-3 rounded-full shadow-md shadow-gray-300">
        <RxHamburgerMenu className="text-xl text-iconColor" />
        <Link to={user ? "/account" : "/login"}>
          <FaUserCircle className="text-xl text-iconColor" />
        </Link>
        {!!user && <div>{user?.name}</div> }
      </div>
    </div>
  );
}

export default Header;
