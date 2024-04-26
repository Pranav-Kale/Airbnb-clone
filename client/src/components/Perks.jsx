import { FaWifi } from "react-icons/fa6";
import { CiParking1 } from "react-icons/ci";
import { LuMonitor } from "react-icons/lu";
import { MdOutlineRadio } from "react-icons/md";
import { MdPets } from "react-icons/md";
import { BsDoorOpenFill } from "react-icons/bs";

function Perks({ selected, onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
      <label className="border-2 flex items-center gap-2 px-3 py-3 rounded-2xl cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("wifi")}
          name="wifi"
          onChange={handleCbClick}
        />
        <FaWifi className="text-iconColor text-xl ml-2 " />
        <span>Wifi</span>
      </label>
      <label className="border-2 flex items-center gap-2 px-3 py-3 rounded-2xl cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("parking")}
          name="parking"
          onChange={handleCbClick}
        />
        <CiParking1 className="text-iconColor text-xl ml-2 " />
        <span>Free parking spot</span>
      </label>
      <label className="border-2 flex items-center gap-2 px-3 py-3 rounded-2xl cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("tv")}
          name="tv"
          onChange={handleCbClick}
        />
        <LuMonitor className="text-iconColor text-xl ml-2 " />
        <span>TV</span>
      </label>
      <label className="border-2 flex items-center gap-2 px-3 py-3 rounded-2xl cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("radio")}
          name="radio"
          onChange={handleCbClick}
        />
        <MdOutlineRadio className="text-iconColor text-xl ml-2 " />
        <span>Radio</span>
      </label>
      <label className="border-2 flex items-center gap-2 px-3 py-3 rounded-2xl cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("pets")}
          name="pets"
          onChange={handleCbClick}
        />
        <MdPets className="text-iconColor text-xl ml-2 " />
        <span>Pets</span>
      </label>
      <label className="border-2 flex items-center gap-2 px-3 py-3 rounded-2xl cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("entrance")}
          name="entrance"
          onChange={handleCbClick}
        />
        <BsDoorOpenFill className="text-iconColor text-xl ml-2 " />
        <span>Private Entrance</span>
      </label>
    </div>
  );
}

export default Perks;
