import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DoctorsCarousel = ({ doctors }) => {
  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <section className="doctors-section" style={{ padding: "40px 20px" }}>
      <h1
        className="doctors-heading"
        style={{ fontSize: "29px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Our Team of Expert Doctors
      </h1>

      {doctors.length > 0 ? (
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["medium", "small"]}
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}
        >
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="doctor-card"
              style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                padding: "20px",
                textAlign: "center",
                margin: "10px",
                minWidth: "350px",

              }}
            >
              <img
                src={doc.docAvatar?.url || "/default-avatar.png"}
                alt="Doctor Avatar"
                style={{
                  width: "240px",
                  height: "240px",
                  borderRadius: "50%",
                  //   objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <div className="doctor-info">
                <h3 style={{ fontSize: "17px", fontWeight: "600" }}>
                  {doc.firstName} {doc.lastName}
                </h3>
                <p style={{ color: "gray" }}>{doc.doctorDepartment}</p>
                <p style={{ color: "gray", fontSize: "14px", marginTop: "5px" }}>
                  <span style={{ fontWeight: "bold", color: "#0d9488" }}>Available: </span>
                  {doc.doctorAvailability || "Contact for Schedule"}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="no-doctors">No doctors found</p>
      )}
    </section>
  );
};

export default DoctorsCarousel;
