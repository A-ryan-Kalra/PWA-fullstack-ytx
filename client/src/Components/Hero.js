import React, { useEffect, useState } from "react";
import { imageData } from "../constants/data";

function Hero() {
  const [shuffledNames, setShuffledNames] = useState([]);
  const shuffleArray = (array) => {
    let shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }
    return shuffledArray;
  };
  useEffect(() => {
    // Shuffle names on every render
    setShuffledNames(shuffleArray(imageData));
  }, []);

  return (
    <div className="min-h-[90vh]">
      <h1 className="text-center my-3 text-[24px]">Popular Collections</h1>
      <div className="contain rounded-lg py-3">
        {shuffledNames.map((item, index) => (
          <div
            className="box overflow-hidden hover:scale-105 sm:hover:scale-110 duration-300 cursor-pointer shadow-lg rounded-lg"
            key={index}
          >
            <img loading="lazy" src={item} alt="item" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
