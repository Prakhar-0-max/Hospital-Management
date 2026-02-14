import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import DeleteAppointment from "./DeleteAppointment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchPatient, setSearchPatient] = useState("");
  const [department, setDepartment] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.log("Error fetching appointments:", error.message);
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${id}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    const patientName = `${a.firstName} ${a.lastName}`.toLowerCase();
    return (
      patientName.includes(searchPatient.toLowerCase()) &&
      (department ? a.department === department : true) &&
      (statusFilter ? a.status === statusFilter : true)
    );
  });

  // ✅ Status ke liye color choose karne ka function
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return { background: "#d1fae5", color: "#065f46" }; // Green
      case "Rejected":
        return { background: "#fee2e2", color: "#991b1b" }; // Red
      case "Pending":
        return { background: "#fef9c3", color: "#854d0e" }; // Yellow
      default:
        return {};
    }
  };

  return (
    <section className="page">
      <h2>Appointments</h2>

      {/* Filters */}
      <div style={{ margin: "20px 0", display: "flex", gap: "15px" }}>
        <input
          type="text"
          placeholder="Search by Patient Name..."
          value={searchPatient}
          onChange={(e) => setSearchPatient(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.4)",
            color: "#333"
          }}
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.4)",
            color: "#333",
            minWidth: "180px",
          }}
        >
          <option value="">All Departments</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Oncology">Oncology</option>
          <option value="Radiology">Radiology</option>
          <option value="Physical Therapy">Physical Therapy</option>
          <option value="Dermatology">Dermatology</option>
          <option value="ENT">ENT</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.4)",
            color: "#333",
            minWidth: "150px",
          }}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>


      {/* Table */}
      <div className="banner" style={{ padding: "0" }}>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((a) => (
                <tr key={a._id}>
                  <td>{a.firstName} {a.lastName}</td>
                  <td>{a.appointment_date.substring(0, 16)}</td>
                  <td>{a.doctor?.firstName} {a.doctor?.lastName}</td>
                  <td>{a.department}</td>
                  <td style={getStatusColor(a.status)}>
                    <select
                      value={a.status}
                      onChange={(e) => handleUpdateStatus(a._id, e.target.value)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontWeight: "bold",
                        color: getStatusColor(a.status).color,
                      }}
                    >
                      <option value="Pending" style={{ color: "#854d0e" }}>Pending</option>
                      <option value="Accepted" style={{ color: "#065f46" }}>Accepted</option>
                      <option value="Rejected" style={{ color: "#991b1b" }}>Rejected</option>
                    </select>
                  </td>
                  <td>
                    {a.hasVisited ? (
                      <GoCheckCircleFill style={{ color: "green", fontSize: "20px" }} />
                    ) : (
                      <AiFillCloseCircle style={{ color: "red", fontSize: "20px" }} />
                    )}
                  </td>
                  <td>
                    <DeleteAppointment
                      appointmentId={a._id}
                      onDeleteSuccess={(id) => setAppointments(prev => prev.filter(appt => appt._id !== id))}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Appointments Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Appointments;
