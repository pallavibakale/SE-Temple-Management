import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Card, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UriContext from "../ContextApi/UriContext";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import "./ViewDonations.css";

function ViewDonations() {
  const uri = useContext(UriContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filterColumn, setFilterColumn] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.setItem("role", "");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || (role !== "Admin")) {
      navigate("/login");
    }
    fetchAppointments();
  });

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${uri}/get-appointments`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(uri + `/delete-appointment/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Appointment deleted successfully.");
        fetchAppointments(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(uri + `/update-appointment/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast.success("Appointment status updated");
        fetchAppointments(); // Refresh the appointments list
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error("Error updating status");
    }
  };

  const role = localStorage.getItem("role");
  console.log(appointments);
  

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <Container fluid>
        <Card style={{width: "100%", border: "none", marginTop: "30px"}}>
          <h2 style={{textAlign: "center", marginBottom: "35px"}}>Appointments</h2>
          <CardBody>
            <div className="table-container">
              {sortedAppointments.length > 0 ? (
                  <table className="appointments-table">
                    <thead>
                      <tr>
                        <th>Devotee Name</th>
                        <th>Pooja Name</th>
                        <th>Email</th>
                        <th>Devotee Contact</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedAppointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td className="name-cell">{appointment.firstName}</td>
                          <td>{appointment.title}</td>
                          <td>{appointment.email}</td>
                          <td>{appointment.phone}</td>
                          <td>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
                          <td variant="danger"
                              className="delete-button"
                              onClick={() => handleDelete(appointment._id)}
                            >
                              Remove
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              ) : (
                <p>No appointments found.</p>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default ViewDonations;
