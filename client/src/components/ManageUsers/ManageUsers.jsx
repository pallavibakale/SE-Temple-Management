import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Card, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UriContext from "../ContextApi/UriContext";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import "./ManageUsers.css";

function ManageUsers() {
  const uri = useContext(UriContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });


  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.setItem("role", "");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || (role !== "Admin" && role !== "Priest")) {
      navigate("/login");
    }
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${uri}/get-users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(uri + `/delete-user/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("User deleted successfully.");
        fetchUsers(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });


  const role = localStorage.getItem("role");
  console.log(users);
  

  return (
    <div className="container">
      <Navigation onLogout={handleLogout} />
      <Container fluid>
        <Card style={{width: "100%", border: "none", marginTop: "30px"}}>
          <h2 style={{textAlign: "center", marginBottom: "35px"}}>Users</h2>
          <CardBody>
            <div className="table-container">
              {sortedUsers.length > 0 ? (
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Devotee Name</th>
                        <th>Email</th>
                        <th>Devotee Contact</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedUsers.map((user) => (
                        <tr key={user._id}>
                          <td className="name-cell">{user.firstName}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td variant="danger"
                              className="delete-button"
                              onClick={() => handleDelete(user._id)}
                            >
                              Remove
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              ) : (
                <p>No users found.</p>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default ManageUsers;
