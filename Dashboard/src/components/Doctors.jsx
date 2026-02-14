import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [department, setDepartment] = useState("");
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
         console.log("Fetched doctors:", data.doctors);
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Filter doctors by name and department
  const filteredDoctors = doctors.filter((doc) => {
    const fullName = `${doc.firstName} ${doc.lastName}`.toLowerCase();
    const nameMatch = fullName.includes(searchName.toLowerCase());
    const deptMatch = department ? doc.doctorDepartment === department : true;
    return nameMatch && deptMatch;
  });

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>

      {/* Search and Department Filter */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search doctor by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">All Departments</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Physical Therapy">Physical Therapy</option>
          <option value="Radiology">Radiology</option>
          <option value="Oncology">Oncology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Dermatology">Dermatology</option>
          <option value="ENT">ENT</option>
          {/* Add more departments as needed */}
        </select>
      </div>

      <div className="banner">
        {filteredDoctors && filteredDoctors.length > 0 ? (
          filteredDoctors.map((element) => (
            <div className="card" key={element._id}>
              <img
                src={element.docAvatar && element.docAvatar.url}
                alt="doctor avatar"
              />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>Email: <span>{element.email}</span></p>
                <p>Phone: <span>{element.phone}</span></p>
                <p>DOB: <span>{element.dob.substring(0, 10)}</span></p>
                <p>Department: <span>{element.doctorDepartment}</span></p>
                <p>NIC: <span>{element.nic}</span></p>
                <p>Gender: <span>{element.gender}</span></p>
              </div>
            </div>
          ))
        ) : (
          <h1>No  Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
