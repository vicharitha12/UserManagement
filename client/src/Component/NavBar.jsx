import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const NavBar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    Cookies.remove("userManagement");
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#" onClick={() => navigate("/")}>
          User Management
          

        </Navbar.Brand>
        <Navbar.Brand style={{fontSize:"10px",fontStyle: "italic",paddingTop:"10px"}}>By Vicharitha</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className=" justify-content-lg-end justify-content-sm-center"
        >
          {window.location.pathname === "/" && (
            <Button
              variant="success"
              className="nav-btn"
              style={{ width: "fit-content" }}
              onClick={() => navigate("/signup")}
            >
              Create New Account
            </Button>
          )}

          {window.location.pathname === "/signup" && (
            <Button
              variant="success"
              className="nav-btn"
              onClick={() => navigate("/")}
            >
              Sign-in
            </Button>
          )}

          {Cookies.get("userManagement") && (
            <Button className="nav-btn" variant="danger" onClick={Logout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
