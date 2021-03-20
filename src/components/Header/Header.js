import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { UserContext } from "../../App";
import "./Header.css";

function Header() {
  const [user, setUser] = useContext(UserContext);

  return (
    // <nav className="mynav">
    //   <h3>Train-Tickets</h3>
    //   <ul className="list-container">
    //     <li>
    //       <Link to="/home" className="nav-link">
    //         Home
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/destination" className="nav-link">
    //         Destination
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/login" className="nav-link">
    //         Login
    //       </Link>
    //     </li>
    //     <li>{user.name}</li>
    //   </ul>
    // </nav>
    <Navbar bg="ligth" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Train-Tickets
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/destination">
            Destination
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link>{user.name}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
