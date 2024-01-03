import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import BrandLogo from "./BrandLogo";

function Footer() {
  return (
    <footer className="fixed-bottom">
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          <Nav>
            <Nav.Link
              href="https://github.com/yamakenth/blog-api"
              target="_blank"
            >
              <i className="bi bi-github">&#9;GitHub</i>
            </Nav.Link>
          </Nav>
          <Navbar.Brand as={Link} to="/" className="mx-0">
            <BrandLogo />
            Blog
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/client-admin/#/articles" target="_blank">
              <i className="bi bi-gear-wide-connected">&#9;Admin Page</i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
}

export default Footer;
