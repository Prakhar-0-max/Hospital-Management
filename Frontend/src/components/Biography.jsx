import React from "react";
import "../App.css";

const Biography = ({ imageUrl }) => {
  return (
    <section className="about-section">
      {/* Hero Banner */}
      <div className="about-hero">

        <div className="about-hero-text">
          <h1 style={{ color: "black", marginBottom: "100px" }}>Welcome to Apollo Hospitals, Indore</h1>
          <p style={{ color: "black", marginBottom: "130px" }}>Excellence in Healthcare. Compassion in Care. Trusted by Millions.</p>
        </div>
      </div>

      {/* About Us */}
      <div className="about-content container">
        <h2>Who We Are</h2>
        <p>
          Apollo Hospitals, Indore is a state-of-the-art healthcare facility committed to delivering world-class medical services with compassion and precision. Combining advanced technology with highly skilled medical professionals, we ensure our patients receive the best possible care.
        </p>
        <p>
          Founded with a vision to make quality healthcare accessible and reliable, Apollo Hospitals has grown to be a trusted name in multi-specialty care, offering treatments ranging from routine check-ups to complex surgeries.
        </p>
        <p>
          Our goal is to integrate modern medical practices with patient-centered care, providing comprehensive healthcare solutions for everyone—anytime, anywhere.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="about-mission container">
        <div className="mission-box">
          <h3>Our Mission</h3>
          <p>
            To provide exceptional healthcare services that are patient-focused, innovative, and accessible.
          </p>
        </div>
        <div className="mission-box">
          <h3> Our Vision</h3>
          <p>
            To be the leading hospital network in India, recognized for excellence, compassion, and innovation in healthcare.
          </p>
        </div>
      </div>

      {/* Fun Fact / Highlights */}
      <div className="about-highlights container">
        <div className="highlight-card">
          <h4>Since</h4>
          <p>2000+</p>
        </div>
        <div className="highlight-card">
          <h4>Successfull Surgeries</h4>
          <p>50,000+</p>
        </div>
        <div className="highlight-card">
          <h4>Specialties</h4>
          <p>Multi-specialty Care</p>
        </div>
        <div className="highlight-card">
          <h4>Hospital Beds</h4>
          <p>270+</p>

        </div>
      </div>
    </section>
  );
};

export default Biography;
