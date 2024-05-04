import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import PlaceGallery from "../components/PlaceGallery";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState({});

  useEffect(() => {
    axios.get(`/place/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  return (
    <div className="relative min-h-screen py-1 sm:py-0">
      <div className="flex flex-col gap-2 w-full h-full py-5 px-2 sm:px-6">
        <div className="w-full text-center">
          <p className="font-semibold text-2xl">{place?.title}</p>
          <p className="flex justify-center items-center gap-1 ">
            <FiMapPin />
            <span className="underline font-bold">{place?.address}</span>
          </p>
        </div>
      </div>
      <PlaceGallery place={place} />
    </div>
  );
}

export default PlacePage;
