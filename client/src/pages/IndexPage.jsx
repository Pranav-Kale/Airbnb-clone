import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IndexPage() {
  const [places, setPlaces] = useState([]);
  // const [photo, setPhoto] = useState(0);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="my-6 w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-5">
      {places.length > 0 &&
        places.map((place, id) => (
          <div className="w-[300px] sm:w-56" key={id}>
            <Link to={"/place/"+place._id}>
              <div style={{backgroundImage : `url($(photos[currentIndex].url))`}} className="bg-cover relative border w-[300px] h-56 sm:w-56 sm:h-56 rounded-2xl overflow-hidden">
                {place.photos.length > 0 && (
                  <img
                    className=" w-full h-full object-cover"
                    src={"http://localhost:4000/uploads/" + place?.photos?.[0]}
                  />
                )}
              </div>
            </Link>
            <span className="line-clamp-1 font-bold">{place?.address}</span>
            <div className="w-[300px] sm:w-56 line-clamp-1 text-gray-500 text-sm">
              {place.title}
            </div>
            <p className="line-clamp-1 w-full text-gray-500 text-md">
              <span className="font-bold text-black text-base">${place.price}</span> per
              night{" "}
            </p>
          </div>
        ))}
    </div>
  );
}

export default IndexPage;
