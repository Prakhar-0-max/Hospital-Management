import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
         
          <h1>{title}</h1>
          <p>
            Apollo Hospitals, Indore is equipped with state-of-the-art medical facilities, advanced diagnostic labs, modern operation theaters, and comfortable patient rooms to ensure top-quality treatment and care. Emergency and Critical Care
            With 24×7 emergency services, advanced ICU facilities, and rapid response teams, Apollo Hospitals, Indore provides critical care support round the clock.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;