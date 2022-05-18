import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <>
        {[false].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3">
            <Container>
              <Navbar.Brand as={Link} to="">Navbar Offcanvas</Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    RR_CABLES
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavDropdown
                      title="Gallery"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown
                        title="Image"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item as={Link} to="allImage">
                          All Image
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="addImage">
                          Upload Image
                        </NavDropdown.Item>
                      </NavDropdown>

                      <NavDropdown
                        title="Video"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item as={Link} to="all-video">
                          View Video
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="add-video">
                          Upload Video
                        </NavDropdown.Item>
                      </NavDropdown>
                    </NavDropdown>

                    <Nav.Link as={Link} to="product">
                      Products
                    </Nav.Link>
                    <Nav.Link as={Link} to="gallery">
                      Gallery
                    </Nav.Link>
                    <Nav.Link as={Link} to="">Link</Nav.Link>
                  </Nav>
                  {/* <Form className="d-flex">
                                        <FormControl
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                        <Button variant="outline-success">Search</Button>
                                    </Form> */}
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    </div>
  );
};

export default Sidebar;
