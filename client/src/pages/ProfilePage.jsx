import { useContext, useState } from "react";
import AccountNav from "./AccountNav";
import PlacesPage from "./PlacesPage";
import { UserContext } from "../store/UserContext";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const { redirect, setRedirect } = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
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

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="w-full  text-center mt-10">
          <p>
            Logged in as <b>{user?.name}</b> (<b>{user?.email}</b>)
          </p>
          <button onClick={logout} className="mt-2 w-[500px] ">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}

export default ProfilePage;
