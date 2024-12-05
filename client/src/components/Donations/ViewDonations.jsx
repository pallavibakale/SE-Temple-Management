import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Card, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UriContext from "../ContextApi/UriContext"; // Ensure the correct path to UriContext
import Navigation from "../Navigation/Navigation"; // Ensure the correct path to Navigation
import Footer from "../Footer/Footer"; // Ensure the correct path to Footer

const ViewDonations = () => {
  const uri = useContext(UriContext); // Make sure UriContext is properly defined and exported
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filterColumn, setFilterColumn] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch(`${uri}/get-donations`);
      if (response.ok) {
        const data = await response.json();
        setDonations(data);
      } else {
        console.error("Failed to fetch donations");
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(uri + `/delete-donations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Donation deleted successfully.");
        fetchDonations(); // Refresh the list after deletion
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
