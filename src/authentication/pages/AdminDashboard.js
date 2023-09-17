import "./styles/AdminDashboard.css";
import "../../components/styles/Gallery.css";
import "../../components/styles/About.css";

import React, { useState } from "react";
import { useStorage } from "../context/StorageContext.js";
import { Trash2 } from "react-feather";

const AdminDashboard = () => {
  const [galleryImageUpload, setGalleryImageUpload] = useState(null);
  const [aboutImageUpload, setAboutImageUpload] = useState(null);

  const {
    galleryImageList,
    uploadGalleryImage,
    deleteGalleryImage,
    aboutImage,
    uploadAboutImage,
    deleteAboutImage,
    uploadSuccess,
    updateAboutText,
    aboutText,
    setAboutText,
  } = useStorage();

  const handleAboutTextChange = (e) => {
    setAboutText(e.target.value);
  };

  const autoResizeTextarea = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight
  };

  // Function to update the about text in Firebase Firestore
  const handleUpdateAboutText = async () => {
    try {
      await updateAboutText(aboutText); // Call the function to update about text
    } catch (error) {
      console.log("Error updating about text:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 id="admin-dashboard-header">Admin Dashboard</h2>
      {/* Admin Gallery Section  */}
      <div className="gallery">
        <h2>Gallery</h2>
        <div className="uploadImageContainer">
          <input
            type="file"
            onChange={(e) => {
              setGalleryImageUpload(e.target.files[0]);
            }}
          />
          <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
            <button
              style={{ height: "30px", width: "100px" }}
              onClick={() => uploadGalleryImage(galleryImageUpload)}
            >
              Upload Image
            </button>
            {uploadSuccess && (
              <div className="success-indicator">Upload successful!</div>
            )}
          </div>
        </div>
        <div className="painting-list">
          {galleryImageList.map((url) => {
            return (
              <div className="painting" key={url}>
                <img
                  src={url}
                  alt="Gallery Painting"
                  className="painting-image-admin"
                  loading="lazy"
                />
                {/* Delete Button */}
                <span
                  className="delete-button-admin"
                  onClick={() => deleteGalleryImage(url)}
                >
                  <Trash2 size={28} />
                </span>
              </div>
            );
          })}
          {galleryImageList.length === 0 && <h3>Upload Gallery Image Here</h3>}
        </div>
      </div>
      {/* Admin About Section  */}
      <div className="about">
        <h2>About Me</h2>
        <div className="uploadImageContainer">
          <input
            type="file"
            onChange={(e) => {
              setAboutImageUpload(e.target.files[0]);
            }}
          />
          <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
            <button
              style={{ height: "30px", width: "100px" }}
              onClick={() => uploadAboutImage(aboutImageUpload)}
            >
              Upload Image
            </button>
            {uploadSuccess && (
              <div className="success-indicator">Upload successful!</div>
            )}
          </div>
        </div>
        <div className="about-content">
          <div
            style={{ flexDirection: "column" }}
            className="about-image-admin"
          >
            {aboutImage ? (
              <>
                <img
                  src={aboutImage}
                  alt="About PFP"
                  loading="lazy"
                  style={{ marginBottom: "10px" }}
                />
                {/* Delete Button */}
                <span
                  className="delete-button-admin"
                  onClick={() => deleteAboutImage(aboutImage)}
                >
                  <Trash2 size={28} />
                </span>
              </>
            ) : (
              <h3>Upload About Image Here</h3>
            )}
          </div>
          <div className="about-paragraph">
            <div className="about-paragraph-entry-container">
              <textarea
                value={aboutText}
                onChange={handleAboutTextChange}
                placeholder="Edit About Text"
                onInput={autoResizeTextarea}
              />
              <button onClick={handleUpdateAboutText}>Save About Text</button>
            </div>
            <div className="instagram-link">
              <img
                src="/images/InstagramCompressed.png"
                alt="Instagram Link"
                style={{ height: "40px", width: "40px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
