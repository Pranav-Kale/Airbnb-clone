import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      const { data } = await axios.get("/places");
      if (data) {
        setPlaces(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="my-2 py-2 px-3 xl:px-5 ">
        <p className="text-center mb-4">List of all added places</p>
        <div className="flex justify-center">
          <Link to="/account/places/new">
            <button className="flex items-center gap-2">
              <IoMdAdd />
              Add new place
            </button>
          </Link>
        </div>
        <div className="w-full px-4 flex flex-col gap-4 my-5">
          {places?.length > 0 &&
            places?.map((place, i) => (
              <Link to={"/account/places/" + place._id} key={i}>
                <div className="bg-gray-200 p-3 rounded-lg flex gap-2">
                  <div className="w-40 h-40 ">
                    <img className="w-full h-full object-cover rounded-xl" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                  </div>
                  <div className="flex-1 h-full grid gap-3">
                    <h3 className="line-clamp-1 font-semibold text-lg">
                      {place.title}
                    </h3>
                    <p className="line-clamp-4">{place.description}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PlacesPage;
