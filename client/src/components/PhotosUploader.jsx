import axios from "axios";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import PropTypes from "prop-types";

function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  const titleClass = "text-2xl font-bold";
  const subTitle = "text-gray-500";

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if (photoLink) {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      onChange((prev) => {
        return [...prev, filename];
      });
    }
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    console.log("files : ", files);
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data: filenames } = response;
        console.log("filenames : ", filenames);
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  function removePhoto(e, fileName) {
    e.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== fileName)]);
  }

  function selectAsMainPhoto(ev,filename) {
    ev.preventDefault();
    onChange([filename,...addedPhotos.filter((photo) => photo !== filename)]);
  }

  return (
    <div className="flex flex-col gap-1">
      <p className={titleClass}>Photos</p>
      <p className={subTitle}>more = better</p>
      <div className="flex gap-2">
        <input
          className="w-full"
          value={photoLink}
          onChange={(ev) => {
            setPhotoLink(ev.target.value);
          }}
          type="text"
          placeholder="add using a link....jpg"
        />

        <button onClick={addPhotoByLink} className="bg-gray-300 text-black">
          {" "}
          Add photo{" "}
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, i) => (
            <div
              className="relative mt-1 bg-gray-200 h-36 w-52 flex justify-center items-center rounded-3xl overflow-hidden border"
              key={i}
            >
              <img
                className=" rounded-3xl object-cover w-full h-full"
                src={`http://localhost:4000/uploads/` + link}
                alt=""
              />
              <button
                onClick={(e) => removePhoto(e, link)}
                className="absolute bottom-2 right-2 text-lg bg-black text-white p-2 rounded-xl opacity-60 hover:opacity-80 transition-all duration-150"
              >
                <FaTrashCan />
              </button>
              <button
                onClick={(e) => selectAsMainPhoto(e,link)}
                className="absolute bottom-2 left-2 text-lg bg-black text-white p-2 rounded-xl opacity-60 hover:opacity-80 transition-all duration-150"
              >
                {(link === addedPhotos[0]) && <IoStarSharp className="text-yellow-500 opacity-100"/>}
                {(link !== addedPhotos[0]) && <IoStarOutline />}
              </button>
            </div>
          ))}
      </div>
      <label className="my-1 text-xl flex gap-2 justify-center items-center bg-white border-2 text-black h-32 w-52 rounded-3xl cursor-pointer">
        <input onChange={uploadPhoto} type="file" className="hidden" />
        <FaCloudUploadAlt className="text-3xl text-iconColor" />
        Upload
      </label>
    </div>
  );
}

PhotosUploader.propTypes = {
  addedPhotos: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PhotosUploader;
