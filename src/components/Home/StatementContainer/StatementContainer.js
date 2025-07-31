import React from "react";
import "./StatementContainer.scss";
import { ReactComponent as LogoIcon } from "../../../assets/icons/logo-rm.svg";

const StatementContainer = () => {
  return (
    <section className="statement">
      <div className="statement-content">
        <h1>FIND YOUR PERFECT PAIR</h1>
        <p>
          Explore top-quality shoes from the world's leading brands — from
          everyday comfort to performance-ready kicks.
        </p>

        <a href="#" className="cta-button">
          Browse Collection
        </a>
      </div>
    </section>
  );
};

export default StatementContainer;
