import { useState, useEffect, useRef } from "react";
import "./Banner.scss";
import { MdOutlineChevronRight } from "react-icons/md";

const bannerData = [
  "Summer Sale is On! Up to 50% off on selected items.",
  "Free shipping on orders over $50!",
  "Check out our new arrivals for the season!",
];

function Banner() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerData.length);
    }, 8000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleNext = () => {
    clearInterval(intervalRef.current);
    setIndex((prev) => (prev + 1) % bannerData.length);
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <div className="left" aria-hidden="true" />
        <div className="center">
          <h2 key={index} className="fade-in">
            {bannerData[index]}
          </h2>
        </div>
        <div className="right">
          <MdOutlineChevronRight className="next-btn" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
