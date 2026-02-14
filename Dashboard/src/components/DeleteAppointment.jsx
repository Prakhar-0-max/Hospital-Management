import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const DeleteAppointment = ({ appointmentId, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);

    const deleteItem = async () => {
        setLoading(true);
        try {
            const { data } = await axios.delete(
                `http://localhost:4000/api/v1/appointment/delete/${appointmentId}`,
                { withCredentials: true }
            );
            toast.success("Appointment Deleted Successfully!");
            onDeleteSuccess(appointmentId);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete appointment");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        const ConfirmToast = ({ closeToast }) => (
            <div>
                <p style={{ marginBottom: "10px" }}>Are you sure you want to delete?</p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button
                        onClick={() => { deleteItem(); closeToast(); }}
                        style={{ background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                    >
                        Yes
                    </button>
                    <button
                        onClick={closeToast}
                        style={{ background: "gray", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                    >
                        No
                    </button>
                </div>
            </div>
        );

        toast(<ConfirmToast />, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            style={{
                border: "none",
                background: "transparent",
                color: "red",
                cursor: "pointer",
                fontSize: "20px",
            }}
            title="Delete Appointment"
        >
            <AiFillDelete />
        </button>
    );
};

export default DeleteAppointment;
