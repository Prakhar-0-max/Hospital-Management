import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";

import MessageForm from "../components/MessageForm";
import Department from "../components/Department";
import DoctorsCarousel from "../components/Doctors";
import axios from "axios";

const Home = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors");
        setDoctors(data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      {/* Emergency Bar */}
      <div
        style={{
          position: "fixed",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#0d9488", /* Teal */
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "50px",
          fontWeight: "bold",
          fontSize: "14px",
          boxShadow: "0 4px 12px rgba(13, 148, 136, 0.3)",
          animation: "blinker 2s linear infinite",
          zIndex: 1000,
        }}
      >
        Emergency, Call us 1800 180 55223
      </div>

      {/* Hero Section */}
      <Hero
        title={"Apollo Hospitals, Indore Consult Our Trusted Surgeons, Book an Appointment"}
        imageUrl={"/hero.webp"}
      />

      {/* About Section */}


      {/* Departments Section */}
      <Department />

      {/* Health Tips Section */}
      <section className="health-tips-section" style={{ padding: "50px 20px", background: "#d6d7d9" }}>
        <h2 style={{ marginLeft: "60px", marginBottom: "30px", color: "gray", fontSize: "34px", fontWeight: "bold" }}>
          Health Tips
        </h2>

        <div
          className="health-tips-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div className="health-tip-card" style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <h3>Stay Hydrated</h3>
            <br />
            <p>Drink at least 8 glasses of water daily to keep your body hydrated and maintain healthy skin.</p>
          </div>

          <div className="health-tip-card" style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <h3>Eat Balanced Meals</h3>
            <br />
            <p>Include fruits, vegetables, lean proteins, and whole grains in your daily diet for optimal health.</p>
          </div>

          <div className="health-tip-card" style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <h3>Exercise Regularly</h3>
            <br />
            <p>Engage in at least 30 minutes of physical activity most days to improve your overall fitness.</p>
          </div>

          <div className="health-tip-card" style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <h3>Get Enough Sleep</h3>
            <br />
            <p>Sleep 7-8 hours every night to allow your body to rest, recover, and maintain mental clarity.</p>
          </div>
        </div>
      </section>


      {/* Doctors Section */}
      <DoctorsCarousel doctors={doctors} />

      {/* Contact Form */}
      <MessageForm />
      {/* Address Section */}
      <section
        className="address-section"
        style={{
          padding: "40px 20px",
          background: "#e3d5d5",

          marginBottom: "35px",
        }}
      >
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "15px" }}>
          Our Location
        </h2>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Scheme No. 74 C, Sector D, Vijay Nagar, Indore, Madhya Pradesh, 452010
        </p>
      </section>


      <div
        style={{
          background: "#f0f4f8",
          color: "#1e3a8a", // dark blue color
          fontWeight: "600",
          fontSize: "20px",
          textAlign: "center",
          padding: "15px 20px",
          borderRadius: "12px",
          margin: "30px auto",
          maxWidth: "700px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        Trusted by <span style={{ color: "#dc2626" }}>2600+ patients</span>, Indore's most trusted hospital
      </div>

    </>


  );
};

export default Home;
