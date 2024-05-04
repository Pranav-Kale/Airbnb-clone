import { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextPhoto() {
    if (currentIndex === place?.photos?.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevPhoto() {
    if (currentIndex === 0) {
      setCurrentIndex(place?.photos?.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  if (showAllPhotos) {
    return (
      <div className="bg-white absolute top-0 z-[100] w-full min-h-screen py-4 sm:py-0">
        <div className=" w-full ">
          <div className="px-4">
            <p className="text-2xl font-semibold text-center ">
              Photos of {place?.title}
            </p>
            <div className="flex justify-center py-2">
              <div className="relative w-full lg:w-1/2 py-2">
                <button
                  className="absolute z-[400] right-1 top-3"
                  onClick={() => setShowAllPhotos(!showAllPhotos)}
                >
                  Close
                </button>
                <img
                  className="rounded-3xl border overflow-hidden w-full h-[500px] object-cover"
                  src={
                    "http://localhost:4000/uploads/" +
                    place?.photos?.[currentIndex]
                  }
                  alt={`Photo`}
                />
                <div
                  className="cursor-pointer text-white rounded-full bg-gray-900 p-2 text-2xl absolute z-[400] top-1/2 left-5"
                  onClick={prevPhoto}
                >
                  <FaArrowAltCircleLeft />
                </div>
                <div
                  className="cursor-pointer text-white rounded-full bg-gray-900 p-2 text-2xl absolute z-[400] top-1/2 right-5"
                  onClick={nextPhoto}
                >
                  <FaArrowAltCircleRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-6 w-full flex justify-center mb-5">
      <div className=" relative border-2 w-full  max-h-[600px] lg:w-5/6 grid grid-cols-6 gap-1 rounded-3xl overflow-hidden">
        {/* <div className="h-full col-span-4 ">
          <img
            className="object-cover h-full max-h-[500px] w-full rounded-l-3xl"
            src={"http://localhost:4000/uploads/" + place?.photos?.[0]}
            alt=""
          />
        </div>
        <div className="col-span-2 h-full max-h-[500px] grid gap-1">
          <div className="">
            <img
              className="w-full h-full object-cover"
              src={
                "http://localhost:4000/uploads/" +
                (place?.photos?.[1] || place?.photos?.[0])
              }
              alt=""
            />
          </div>
          <div className="">
            <img
              className="w-full h-full object-cover"
              src={
                "http://localhost:4000/uploads/" +
                (place?.photos?.[2] || place?.photos?.[0])
              }
              alt=""
            />
          </div>
        </div> */}
        <div className=" h-full col-span-4">
          <img
            className="h-full w-full object-cover"
            src={"http://localhost:4000/uploads/" + place?.photos?.[0]}
            alt=""
          />
        </div>
        <div className=" h-full col-span-2 flex flex-col gap-2">
          <div className=" h-1/2">
            <img
              className="h-full w-full object-cover"
              src={"http://localhost:4000/uploads/" + (place?.photos?.[1] || place?.photos?.[0])}
              alt=""
            />
          </div>
          <div className=" h-1/2">
            <img
              className="h-full w-full object-cover"
              src={"http://localhost:4000/uploads/" + (place?.photos?.[2] || place?.photos?.[0])}
              alt=""
            />
          </div>
        </div>

        <button
          onClick={() => setShowAllPhotos(!showAllPhotos)}
          className=" text-sm sm:text-base text-white py-1 px-4 rounded-full cursor-pointer absolute top-1 right-1"
        >
          Show all photos
        </button>
      </div>
    </div>
  );
}

export default PlaceGallery;
