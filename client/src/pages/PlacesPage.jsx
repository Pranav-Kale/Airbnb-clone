import { IoMdAdd } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

function PlacesPage() {
  const { action } = useParams();
  console.log(action);

  return (
    <div className="my-5">
      {action !== "new" && (
        <div className="flex justify-center">
          <Link to="/account/places/new">
            <button className="flex items-center gap-2">
              <IoMdAdd />
              Add new place
            </button>
          </Link>
        </div>
      )}
      <div>My Places</div>
    </div>
  );
}

export default PlacesPage;
