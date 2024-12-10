import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Card, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UriContext from "../ContextApi/UriContext"; // Ensure the correct path to UriContext
import Navigation from "../Navigation/Navigation"; // Ensure the correct path to Navigation
import Footer from "../Footer/Footer"; // Ensure the correct path to Footer
import './ViewDonations.css'; // Import the CSS file

const ViewDonations = () => {
  const uri = useContext(UriContext); // Make sure UriContext is properly defined and exported
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  
  
  const fetchDonations = async () => {
    try {
      const response = await fetch(`${uri}/get-donations`);
      if (response.ok) {
        const data = await response.json();
        setDonations(data);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || (role !== "Admin")) {
      navigate("/login");
    }
    fetchDonations();
  },[]);


  return (
    <div className="container">
      <Navigation />
      <Container fluid>
        <Card style={{ width: "100%", border: "none", marginTop: "30px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "35px" }}>Donations</h2>
          <CardBody>
            <div className="table-container">
              {donations.length > 0 ? (
                <table className="donations-table">
                  <thead>
                    <tr>
                        <th>Devotee Name</th>
                        <th>Donation Amount</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation._id}>
                        <td className="name-cell">{donation.fullName}</td>
                        <td>{donation.amount}</td>
                        <td>{donation.email}</td>
                        <td>{donation.address + " " + donation.city + ", " + donation.state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No donations found.</p>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default ViewDonations;