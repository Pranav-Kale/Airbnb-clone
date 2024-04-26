import axios from "axios";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
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
              className="mt-1 bg-gray-200 h-36 w-52 flex justify-center items-center rounded-3xl overflow-hidden"
              key={i}
            >
              <img
                className=" rounded-3xl object-cover w-full h-full"
                src={`http://localhost:4000/uploads/` + link}
                alt=""
              />
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
