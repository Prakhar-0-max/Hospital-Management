
import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us  Apollo Hospitals, Indore"}
        imageUrl={"/hero.webp"}
      />
      <Biography />
    </>
  );
};

export default AboutUs;
