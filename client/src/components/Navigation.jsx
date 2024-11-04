import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles/Navigation.css";

const Navigation = ({ onLogout }) => {
  const role = localStorage.getItem("role");

  return (
    <header className="header">
      <Navbar>
        <Navbar.Brand>
          <NavLink to="/">
            <img src="logo (1).jpg" alt="Logo" />
            Temple Management System
          </NavLink>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            {(role === "Devotee" || role === "Priest" || role === "") && (
              <Nav.Item className="">
                <NavLink to="/" className="nav-link" activeClassName="active">
                  Home
                </NavLink>
              </Nav.Item>
            )}
            {role === "Admin" && (
              <Nav.Item className="">
                <NavLink
                  to="/admin-home"
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </Nav.Item>
            )}
            {(role === "Devotee" || role === "Priest" || role === "") && (
              <Nav.Item className="">
                <NavLink
                  to="/aboutUs"
                  className="nav-link"
                  activeClassName="active"
                >
                  About Us
                </NavLink>
              </Nav.Item>
            )}
            <Nav.Item className="">
              <NavLink
                to="/services"
                className="nav-link"
                activeClassName="active"
              >
                Services
              </NavLink>
            </Nav.Item>
            {(role === "Devotee" || role === "Priest") && (
              <Nav.Item className="">
                <NavLink
                  to="/donate"
                  className="nav-link"
                  activeClassName="active"
                >
                  Donate
                </NavLink>
              </Nav.Item>
            )}
            {role === "Admin" && (
              <Nav.Item className="nav-item">
                <NavLink
                  to="/donations"
                  className="nav-link"
                  activeClassName="active"
                >
                  Donations
                </NavLink>
              </Nav.Item>
            )}
            {(role === "Devotee" || role === "") && (
              <Nav.Item className="">
                <NavLink
                  to="/contactUs"
                  className="nav-link"
                  activeClassName="active"
                >
                  Contact Us
                </NavLink>
              </Nav.Item>
            )}

            {(role === "Admin" || role === "Priest") && (
              <Nav.Item className="">
                <NavLink
                  to="/appointments"
                  className="nav-link"
                  activeClassName="active"
                >
                  Appointments
                </NavLink>
              </Nav.Item>
            )}
            {(role === "Devotee" || role === "") && (
              <Nav.Item className="">
                <NavLink
                  to="/live"
                  className="nav-link"
                  activeClassName="active"
                >
                  Live
                </NavLink>
              </Nav.Item>
            )}
            {role === "Admin" && (
              <Nav.Item className="">
                <NavLink
                  to="/users"
                  className="nav-link"
                  activeClassName="active"
                >
                  Users
                </NavLink>
              </Nav.Item>
            )}

            {role === "" && (
              <Navbar.Collapse className="justify-content-end">
                <Nav.Item className="nav-item">
                  <button>
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </button>
                </Nav.Item>
              </Navbar.Collapse>
            )}
            {(role === "Priest" || role === "Admin" || role === "Devotee") && (
              <Button variant="danger" onClick={onLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Navigation;
