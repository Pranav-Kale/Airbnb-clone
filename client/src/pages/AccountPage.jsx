import { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

function AccountPage() {
  const { redirect, setRedirect } = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  function linkClasses(type = null) {
    let classes = "px-6 py-2";
    if (type === subpage) {
      classes += " bg-primaryColor text-white rounded-full";
    }
    return classes;
  }

  return (
    <div>
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
      {subpage === "profile" && (
        <div className="w-full  text-center mt-10">
          <p>
            Logged in as <b>{user?.name}</b>
          </p>
          <button onClick={logout} className="mt-2 w-[500px] ">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
