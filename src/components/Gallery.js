import "./styles/Gallery.css";
import React, { useState } from "react";
import { useStorage } from "../authentication/context/StorageContext.js";
import { Heart } from "react-feather";

const Gallery = ({ isDarkTheme }) => {
  const { galleryImageList } = useStorage();
  const [likedPaintings, setLikedPaintings] = useState([]);

  // State to track which painting is currently being displayed in the modal
  const [selectedPainting, setSelectedPainting] = useState(null);

  // Function to open the modal when a painting is clicked
  const openModal = (painting) => {
    setSelectedPainting(painting);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPainting(null);
  };

  // Function to handle painting that is liked by the user
  const handleLike = (imageUrl) => {
    if (likedPaintings.includes(imageUrl)) {
      // If the painting is already liked, remove it from likedPaintings
      setLikedPaintings((prevLikedPaintings) =>
        prevLikedPaintings.filter((url) => url !== imageUrl)
      );
    } else {
      // If the painting is not liked, add it to likedPaintings
      setLikedPaintings((prevLikedPaintings) => [
        ...prevLikedPaintings,
        imageUrl,
      ]);
    }
  };

  return (
    <div className={`gallery ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <h2>Gallery</h2>
      <div className="painting-list">
        {galleryImageList.map((imageUrl) => (
          <div className="painting">
            <img
              src={imageUrl}
              alt="Painting"
              className="painting-image"
              onClick={() => openModal(imageUrl)}
            />

            {/* Like Button */}
            <span className="like-button" onClick={() => handleLike(imageUrl)}>
              <Heart
                color={likedPaintings.includes(imageUrl) ? "red" : "gray"}
                size={24}
                strokeWidth={2}
              />
            </span>
          </div>
        ))}
        {galleryImageList.length === 0 && <h3>No Images In Gallery</h3>}
      </div>

      {/* Modal */}
      {selectedPainting && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-content">
              <img
                src={selectedPainting}
                alt={"Gallery Painting"}
                className="modal-image"
                loading="lazy"
              />
            </div>
            <p className="modal-caption">{selectedPainting.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
