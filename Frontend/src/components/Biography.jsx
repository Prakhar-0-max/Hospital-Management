import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Zee Care Hospital is a modern, multi-specialty healthcare facility committed to providing exceptional medical services with compassion and care. Founded with the vision of making quality healthcare accessible and affordable, Zee Care combines cutting-edge technology with a dedicated team of doctors, nurses, and staff.
          </p>
          <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
            At Zee Care Hospital, we believe healthcare is not just about treating diseases — it’s about treating people. Established in 2021, Zee Care has grown into a trusted name in quality medical care, offering world-class treatment with a compassionate touch.
            Our goal is to bridge the gap between traditional healthcare systems and modern technology, delivering affordable and advanced medical services to every patient — anytime, anywhere.
          </p>
          <p>
            💡 Our Vision:
            “To be the most patient-centric hospital network in India, driven by excellence, compassion, and innovation.”

          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;