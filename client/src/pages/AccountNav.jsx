import { FaUser } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";

function AccountNav() {
  const { pathname } = useLocation();
  console.log("pathname : ",pathname);
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClasses(type = null) {
    let classes = "px-6 py-2 flex items-center gap-2";
    if (type === subpage) {
      classes += " bg-primaryColor text-white rounded-full";
    } else {
      classes += " bg-gray-200 rounded-full";
    }
    return classes;
  }



  return (
    <div className="w-full flex justify-center gap-8 mt-4 items-center">
      <Link className={linkClasses("profile")} to="/account">
        <FaUser /> My profile
      </Link>
      <Link className={linkClasses("bookings")} to="/account/bookings">
        <TfiMenuAlt /> My bookings
      </Link>
      <Link className={linkClasses("places")} to="/account/places">
        <GiFamilyHouse />
        My accomodations
      </Link>
    </div>
  );
}

export default AccountNav;
