import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

function AccountPage() {
  const { ready, user } = useContext(UserContext);
  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  function linkClasses(type = null) {
    let classes = "px-6 py-2";
    if (type === subpage) {
      classes += " bg-primaryColor text-white rounded-full";
    }
    return classes;
  }

  return (
    <div className="w-full flex justify-center gap-8 mt-4 items-center">
      <Link className={linkClasses("profile")} to="/account/">
        <div>My profile</div>
      </Link>
      <Link className={linkClasses("bookings")} to="/account/bookings">
        <div>My bookings</div>
      </Link>
      <Link className={linkClasses("places")} to="/account/places">
        My accomodations
      </Link>
    </div>
  );
}

export default AccountPage;
