// src/components/Hero/Hero.jsx
import "./Hero.scss";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          DISCOVER THE <br />
          LATEST FASHION
        </h1>
        <p>SHOP THE NEWEST TRENDS IN MEN's, WOMEN's, AND KID's SHOES.</p>
        <Link to="/shop/new-arrival" className="hero-button">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
