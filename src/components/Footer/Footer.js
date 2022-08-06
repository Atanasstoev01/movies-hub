import "./Footer.css";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer>
        <Nav.Link as={Link} to={'/about-us'}>
        About Us
        </Nav.Link>
    </footer>
  );
}

export default Footer;
