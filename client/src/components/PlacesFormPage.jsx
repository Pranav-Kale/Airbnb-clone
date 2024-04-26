import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";
import AccountNav from "../pages/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../store/UserContext";

function PlacesFormPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

  const titleClass = "text-2xl font-bold";
  const subTitle = "text-gray-500";

  function inputHeader(text) {
    return <p className={titleClass}>{text}</p>;
  }

  function inputDescription(text) {
    return <p className={subTitle}>{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {title,address,addedPhotos,
      description,perks,extraInfo,
      checkIn,checkOut,maxGuests,price,}
    if(id) {
      await axios.put("/places", {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <div className="w-full px-3 py-5">
        <form onSubmit={savePlace} className="w-full grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            {preInput(
              "Title",
              "Title for your place, should be short and catchy as in advertisement"
            )}
            <input
              className="w-full"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              type="text"
              placeholder="title, for example : My lovely apt"
            />
          </div>
          <div className="flex flex-col gap-1">
            {preInput("Address", "Address to this place")}
            <input
              className="w-full"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              type="text"
              placeholder="address"
            />
          </div>

          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          <div className="flex flex-col gap-1">
            {preInput("Description", "description of the place")}
            <textarea
              className="w-full outline-none border-2 rounded-lg px-3 py-2"
              rows={4}
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="description"
            />
          </div>
          <div className="flex flex-col gap-1">
            {preInput("Perks", "select all the perks of your place")}
            <Perks selected={perks} onChange={setPerks} />
          </div>
          <div className="flex flex-col gap-1">
            {preInput("Extra info", "house rules,etc.")}
            <textarea
              className="w-full outline-none border-2 rounded-lg px-3 py-2"
              rows={2}
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
              placeholder="extra info"
            />
          </div>
          <div className="flex flex-col gap-1">
            {preInput(
              "Check in&out times",
              "Add check-in and check-out times, and include a time window for cleaning the room between bookings."
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <p className="text-bold font-bold text-gray-700">
                  Check in time
                </p>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  className="rounded-2xl p-2"
                  placeholder="14:00"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-bold font-bold text-gray-700">
                  Check out time
                </p>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  className="rounded-2xl p-2"
                  placeholder="18:00"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-bold font-bold text-gray-700">
                  Max number of guests
                </p>
                <input
                  type="text"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                  className="rounded-2xl p-2"
                  placeholder="5"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className={titleClass}>Price per night</h3>
            <input
              type="number"
              value={price}
              className="w-full outline-none border-2 rounded-full px-3 py-2"
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
          <button className="my-4 bg-primaryColor text-white p-2 rounded-full">
            Save place
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlacesFormPage;
