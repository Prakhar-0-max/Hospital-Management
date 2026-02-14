import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import apolloLogo from "../../public/logo.png"; // apna logo assets folder me daal dena

const Dashboard = () => {
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalDoctors: 0,
    monthlyAppointments: [],
  });

  // 🔹 Notices ke liye state
  const notices = [
    "COVID-19 Vaccination drive ongoing.",
    "OPD timings updated: 9 AM - 5 PM.",
    "New doctor joined: Dr. Siya Roy (Pediatrics).",
    "Emergency ward renovation in progress.",
  ];
  const [currentNotice, setCurrentNotice] = useState(0);

  const { isAuthenticated, admin } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/stats",
          { withCredentials: true }
        );

        setStats({
          totalAppointments: data.totalAppointments,
          totalDoctors: data.totalDoctors,
          monthlyAppointments: data.monthlyAppointments,
        });
      } catch (error) {
        console.log("Error fetching stats:", error.message);
      }
    };

    const fetchTodayAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/today",
          { withCredentials: true }
        );
        setTodayAppointments(data.count);
      } catch (error) {
        console.log("Error fetching today's appointments:", error.message);
      }
    };

    fetchStats();
    fetchTodayAppointments();
  }, []);

  // 🔹 Auto slide notices
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length);
    }, 3000); // 3 sec delay

    return () => clearInterval(interval);
  }, [notices.length]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (

    <section className="dashboard page" style={{ padding: "20px" }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "30px",
        }}
      >
        {/* Left: Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img
            src={apolloLogo}
            alt="Apollo Hospital"
            style={{ width: "100px", marginTop: "20px" }}
          />
          <h1
            style={{ fontSize: "24px", fontWeight: "bold", marginTop: "50px" }}
          >
            Apollo Hospital - Admin Dashboard
          </h1>
        </div>



        {/* Right: Notices (Sliding) */}
        <div
          className="glass"
          style={{
            padding: "20px",
            width: "300px",
            minHeight: "100px",
          }}
        >
          <h2 style={{ marginBottom: "10px", fontSize: "18px", color: "#333", fontWeight: "bold" }}>Notices</h2>
          <p
            key={currentNotice}
            style={{
              color: "#555",
              fontSize: "15px",
              fontWeight: "500",
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {notices[currentNotice]}
          </p>
        </div>
      </div>

      {/* Middle Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {[
          {
            label: "Today's Appointments",
            value: todayAppointments,
            // bgColor removed, utilizing class below
          },
          {
            label: "View All Appointments",
            value: stats.totalAppointments,
            onClick: () => navigate("/appointments"),
            cursor: "pointer",
          },
          {
            label: "Total Doctors",
            value: stats.totalDoctors,
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="glass"
            onClick={card.onClick}
            style={{
              padding: "25px",
              textAlign: "center",
              cursor: card.cursor || "default",
              transition: "0.3s",
              minHeight: "140px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#333",
              background: "rgba(255, 255, 255, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.6)"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
            }
          >
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#666" }}>
              {card.label}
            </p>
            <h3 style={{ margin: "10px 0 0 0", fontSize: "28px", fontWeight: "bold" }}>
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        className="glass"
        style={{
          marginTop: "130px",
          padding: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#666",
        }}
      >
        <p>© {new Date().getFullYear()} Apollo Hospital - Admin Panel</p>
        <p>
          Logged in as: <b>{admin?.firstName || "Admin"}</b>
        </p>
        <p>Version 1.0.0 | Last Updated: 14 Sep 2025</p>
      </footer>
    </section>
  );
};

export default Dashboard;
