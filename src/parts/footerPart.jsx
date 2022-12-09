import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
// import {
//   faYoutube,
//   faFacebook,
//   faTwitter,
//   faInstagram,
// } from '@fortawesome/free-solid-svg-icons';
// import { fa-square-facebook } from "@fortawesome/free-solid-svg-icons";
// import {  } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const FooterPart = () => {
  return (
    <footer className="footer">
      <Container>
        <hr />
        <Row
          className="align-items-start 
        justify-content-between 
        "
        >
          <Col xs={12} md={4} className="footer-links">
            <div>
              <h3 className="h3footer">Pages</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                {/* <li>
                <Link to="/profile">Profile</Link>
              </li> */}
              </ul>
            </div>
          </Col>

          {/* <Col md={3}>
            <div className="footer-logo">
              <Link to="/">
                <img
                  src="/images/img.png"
                  alt="logo"
                  style={{ width: '100px', height: '100px' }}
                />
              </Link>
            </div>
          </Col> */}
          <Col xs={12} md={4} className="footer-links">
            <div>
              {/* <div className="footer-links"> */}
              <h3 className="h3footer">Links</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                {/* <li>
                <Link to="/contact">Contact</Link>
              </li> */}
              </ul>
              {/* </div> */}
            </div>
          </Col>

          <Col xs={12} md={4} className="footer-links">
            <div>
              <h3 className="h3footer">Get in Touch</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/contact">Returns</Link>
                </li>
                <li>
                  <Link to="/contact">Site Map</Link>
                </li>
              </ul>
              {/* </div> */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item">
                <a
                  href="https://www.youtube.com/"
                  className="btn-floating btn-youtube mx-1"
                >
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://www.facebook.com/"
                  className="btn-floating btn-fb mx-1"
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://twitter.com/"
                  className="btn-floating btn-tw mx-1"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://www.instagram.com/"
                  className="btn-floating btn-gplus mx-1"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p>
              &copy;{new Date().getFullYear()} simazon | All rights reserved  | Privacy
            </p>
          </Col>
        </Row>

        <hr />
      </Container>
    </footer>
  );
};

export default FooterPart;
