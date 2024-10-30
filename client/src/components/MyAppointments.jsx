import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Card, CardBody } from "react-bootstrap"; // Assuming you are using react-bootstrap
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UriContext from "./UriContext";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Banner from '../images/omkaar.png';
import "./styles/Home.css";
import "./styles/MyAppointments.css";

function MyAppointment() {
    const uri = useContext(UriContext);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [filterColumn, setFilterColumn] = useState('name');
    const [filterValue, setFilterValue] = useState('');
    const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');
    localStorage.setItem('role', '');
    navigate('/');
  };

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (!token) {
            navigate('/login');
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
                console.error('Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleDelete = async (id) => {

        try {
            const response = await fetch(uri+`/delete-appointment/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Appointment deleted successfully.');
                fetchAppointments(); // Refresh the list after deletion
            } else {
                console.error('Failed to delete appointment');
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const handleFilter = () => {
        const filteredAppointments = appointments.filter((appointment) =>
            appointment[filterColumn]?.toLowerCase().includes(filterValue.toLowerCase())
        );
        setAppointments(filteredAppointments);
    };

    const handleClearFilter = () => {
        setFilterColumn('name');
        setFilterValue('');
        fetchAppointments();
    };

    const sortedAppointments = [...appointments].sort((a, b) => {
        if (sortConfig.direction === 'ascending') {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
            return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
    });

    const handleSortAndSearch = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ key, direction });

        // Perform search on sorted data
        const sortedAndSearchedappointments = [...appointments].sort((a, b) => {
            if (direction === 'ascending') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        }).filter((appointment) =>
            appointment[filterColumn].toLowerCase().includes(filterValue.toLowerCase())
        );

        setAppointments(sortedAndSearchedappointments);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(uri+`/update-appointment/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                toast.success('Appointment status updated');
                fetchAppointments();  // Refresh the appointments list
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating appointment status:', error);
            toast.error('Error updating status');
        }
    };

    const role = localStorage.getItem('role');

    return (
        <div className="container">
            <img
                loading="lazy"
                src={Banner}
                alt="Omkaar Temple banner"
                className="banner-image"
            />
            <Navigation onLogout={handleLogout} />
            <Container fluid>
                <Card>
                    <h2>Appointments</h2>
                    <CardBody>
                        <div className="filter">
                            <label>
                                <select style={{ height: '40px', textJustify: 'center' }}
                                    value={filterColumn}
                                    onChange={(e) => setFilterColumn(e.target.value)}
                                >
                                    <option value="title">Name</option>
                                    <option value="date">Date</option>
                                    <option value="time">Time</option>
                                    <option value="priest">Priest</option>
                                </select>
                            </label>
                            <input style={{ height: '40px' }}
                                type="text"
                                placeholder="Filter value..."
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />
                            <button onClick={handleFilter}>Filter</button>
                            <button onClick={handleClearFilter}>Clear Filter</button>
                        </div>
                        <div className='table-container'>
                            {sortedAppointments.length > 0 ? (<>
                                {role === 'Devotee' ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th onClick={() => handleSortAndSearch('title')}>Name</th>
                                                <th onClick={() => handleSortAndSearch('date')}>Date</th>
                                                <th onClick={() => handleSortAndSearch('priest')}>Priest</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedAppointments.map((appointment, index) => (
                                                <tr key={appointment._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{appointment.title}</td>
                                                    <td>{appointment.date}</td>
                                                    <td>{appointment.priest}</td>
                                                    <td>{appointment.status}</td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => handleDelete(appointment._id)}>
                                                            Cancel
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th onClick={() => handleSortAndSearch('title')}>Name</th>
                                                <th onClick={() => handleSortAndSearch('date')}>Date</th>
                                                <th onClick={() => handleSortAndSearch('firstName')}>Devotee</th>
                                                <th>Devotee Id</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedAppointments.map((appointment, index) => (
                                                <tr key={appointment._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{appointment.title}</td>
                                                    <td>{appointment.date}</td>
                                                    <td>{appointment.firstName}</td>
                                                    <td>{appointment.empId}</td>
                                                    <td>
                                                        <select value={appointment.status} onChange={(e) => handleStatusChange(appointment._id, e.target.value)}>
                                                            <option value="pending">Pending</option>
                                                            <option value="approved">Approve</option>
                                                            <option value="cancelled">Cancel</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => handleDelete(appointment._id)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>) : (
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

export default MyAppointment;
