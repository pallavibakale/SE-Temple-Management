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
  const [donations, setDonations] = useState([
    {
      _id: "1",
      name: "John Doe",
      amount: 100,
      email: "johndoe@example.com",
      phone: "123-456-7890",
      date: "2024-12-05T12:00:00Z",
    },
    {
      _id: "2",
      name: "Jane Smith",
      amount: 50,
      email: "janesmith@example.com",
      phone: "234-567-8901",
      date: "2024-12-04T12:00:00Z",
    },
    {
      _id: "3",
      name: "Alice Johnson",
      amount: 200,
      email: "alicejohnson@example.com",
      phone: "345-678-9012",
      date: "2024-12-03T12:00:00Z",
    },
    {
      _id: "4",
      name: "Bob Brown",
      amount: 75,
      email: "bobbrown@example.com",
      phone: "456-789-0123",
      date: "2024-12-02T12:00:00Z",
    },
  ]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleDelete = async (id) => {
    try {
      const response = await fetch(uri + `/delete-donations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Donation deleted successfully.");
        // Refresh the list after deletion (using sample data here)
        setDonations(donations.filter((donation) => donation._id !== id));
      } else {
        console.error("Failed to delete donation");
      }
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  const sortedDonations = [...donations].sort((a, b) => {
    if (sortConfig.key) {
      if (sortConfig.direction === "ascending") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="container">
      <Navigation />
      <Container fluid>
        <Card style={{ width: "100%", border: "none", marginTop: "30px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "35px" }}>Donations</h2>
          <CardBody>
            <div className="table-container">
              {sortedDonations.length > 0 ? (
                <table className="donations-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDonations.map((donation) => (
                      <tr key={donation._id}>
                        <td className="name-cell">{donation.name}</td>
                        <td>{donation.amount}</td>
                        <td>{donation.email}</td>
                        <td>{donation.phone}</td>
                        <td>{new Date(donation.date).toLocaleDateString("en-GB")}</td>
                        <td>
                          <Button
                            variant="danger"
                            className="delete-button"
                            onClick={() => handleDelete(donation._id)}
                          >
                            Remove
                          </Button>
                        </td>
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