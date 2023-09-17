import "./styles/About.css";
import React from "react";
import { useStorage } from "../authentication/context/StorageContext.js";

const About = ({ isDarkTheme }) => {
  const { aboutImage, aboutText } = useStorage();
  // Generate a unique query parameter
  //const cacheBuster = new Date().getTime();

  // Append it to the image URL
  //const imageUrlWithCacheBuster = `${aboutImage}?v=${cacheBuster}`;

  return (
    <div className={`about ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-image">
          {aboutImage ? (
            <img src={aboutImage} alt="About PFP" />
          ) : (
            <h3>About Picture Here</h3>
          )}
        </div>
        <div className="about-paragraph">
          {aboutText ? <p>{aboutText}</p> : <h3>About Text Here</h3>}
          <a
            href="https://www.instagram.com/daliamorocho/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            <img
              src="/images/InstagramCompressed.png"
              alt="Instagram Link"
              style={{ height: "40px", width: "40px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
