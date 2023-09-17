import React from "react";
import Gallery from "../components/Gallery.js";
import About from "../components/About.js";

const Home = ({ isDarkTheme }) => {
  return (
    <main style={{ marginTop: "6rem" }}>
      <Gallery isDarkTheme={isDarkTheme} />
      <About isDarkTheme={isDarkTheme} />
    </main>
  );
};

export default Home;
