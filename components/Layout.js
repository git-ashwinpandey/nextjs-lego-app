import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import { useNavbar } from '@/contexts/NavbarContext';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

function createNavbar() {
  const { navbarData, setNavbarData } = useNavbar();

  const handleSearch = (e) => {
    e.preventDefault();
    setNavbarData(prevData => ({ ...prevData, searchTerm: e.target.search.value }));
  };
  

  return (
    <Navbar expand="lg" className="navbar bg-primary-subtle border border-primary-subtle w-75 position-absolute top-0 start-50 translate-middle-x" fixed="top">
      <Container style={{ maxWidth: '95%' }}>
        <Navbar.Brand href="/"><Image src="/images/legoLogo.png" width={50} height={50} alt="Lego Logo Image"></Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/collection">Collection</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          {navbarData.showSearchBar && (
            <Form className="d-flex ms-auto" onSubmit={handleSearch}>
            <Form.Control name="search" type="search" placeholder="Search" className="me-2" aria-label="Search"/>
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
          )}
          <NavDropdown className="ms-auto" title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default function LayoutRouter() {
  return <>{createNavbar()}</>;
}
