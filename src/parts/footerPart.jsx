import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const launchYear = 2022;
const currentYear = new Date().getFullYear();

const FooterPart = () => {
  return (
    <footer className="footer">
      <Container>
        <hr />

        <Row className="justify-content-between">
          <Col xs={12} md={4} className="footer-links">
            <h3 className="h3footer">Shop</h3>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </Col>

          <Col xs={12} md={4} className="footer-links">
            <h3 className="h3footer">Account</h3>
            <ul className="list-unstyled">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              {/* <li><Link to="/orders">Order History</Link></li> */}
            </ul>
          </Col>

          <Col xs={12} md={4} className="footer-links">
            <h3 className="h3footer">Support</h3>
            <ul className="list-unstyled">
              <li><Link to="/support">Help & Support</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </Col>
        </Row>

        <Row className="text-center py-3">
          <Col>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>

            <p>
              &copy; {launchYear}
              {launchYear < currentYear && ` - ${currentYear}`} simazon
            </p>
          </Col>
        </Row>

        <hr />
      </Container>
    </footer>
  );
};

export default FooterPart;

