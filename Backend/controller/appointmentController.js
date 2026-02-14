import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import { getTransporter } from "../config/email.js";

import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success: true,
    message: "Appointment Send Successfully!",
    appointment,
  });
});

export const getTodayAppointments = catchAsyncErrors(async (req, res, next) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // today start

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // today end

  const todaysAppointments = await Appointment.find({
    appointment_date: { $gte: todayStart, $lte: todayEnd }
  });

  res.status(200).json({
    success: true,
    count: todaysAppointments.length
  });
});



export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {

  let appointments = await Appointment.find().sort({ createdAt: -1 }).lean();


  appointments = appointments.map((a) => ({
    ...a,
    appointment_date: a.appointment_date
      ? new Date(a.appointment_date).toDateString()
      : null, // Avoid crashing if date is missing
  }));

  res.status(200).json({
    success: true,
    appointments,
  });
});





export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;


  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }


  if (req.body.appointment_date) {
    req.body.appointment_date = new Date(req.body.appointment_date);
  }


  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!appointment) {
    return next(new ErrorHandler("Failed to update appointment!", 500));
  }

  console.log(" Sending email to:", appointment.email);


  let formattedDate = "Date not available";
  if (appointment.appointment_date) {
    const dateObj = new Date(appointment.appointment_date);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toDateString();
    }
  }



  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: appointment.email,
    subject: "Appointment Status Update - Apollo Hospital",
    html: `
    <p>Dear ${appointment.firstName} ${appointment.lastName},</p>
    <p>This is a confirmation regarding your appointment at Apollo Hospital.</p>
    <h3>Appointment Details:</h3>
    <ul>
      <li><strong>Status:</strong> ${appointment.status.toUpperCase()}</li>
      <li><strong>Date:</strong> ${formattedDate}</li>
      <li><strong>Doctor:</strong> Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}</li>
      <li><strong>Department:</strong> ${appointment.department}</li>
    </ul>
    <p>Thank you for choosing Apollo Hospital. We look forward to serving you.</p>
    <p>Warm Regards,<br/>Apollo Hospital Team</p>
    <hr/>
    <p>Contact us: +91-8069049755 | support@apollohospital.com</p>
  `
  };



  try {
    const transporter = getTransporter();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn(" Email credentials missing. Email won't be sent.");
    }
    await transporter.sendMail(mailOptions);
    console.log(" Email sent successfully to", appointment.email);
  } catch (error) {
    console.error(" Email Error:", error);
  }


  res.status(200).json({
    success: true,
    message: "Appointment Status Updated and Email Sent!",
    appointment,
    appointment_date_formatted: formattedDate,
  });
});





export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
    appointment,
  });
});




export const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({ role: "Patient" });
    const totalDoctors = await User.countDocuments({ role: "Doctor" });
    const totalAppointments = await Appointment.countDocuments();


    const statusCounts = await Appointment.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);


    const monthlyAppointments = await Appointment.aggregate([
      {
        $match: {
          appointment_date: { $type: "date" },
        },
      },
      {
        $group: {
          _id: { $month: "$appointment_date" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.status(200).json({
      success: true,
      totalPatients,
      totalDoctors,
      totalAppointments,
      statusCounts,
      monthlyAppointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

