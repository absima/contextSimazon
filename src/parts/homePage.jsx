import { Link } from 'react-router-dom';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

export default function HomePage() {
  const lists = [
    {
      id: 1,
      image: '/images/chrisgift.jpeg',
      heading: 'Christmas Gifts',
      link: '/products',
    },
    {
      id: 2,
      image: '/images/forher.webp',
      heading: 'Gifts for her',
      link: '/products',
    },
    {
      id: 3,
      image: '/images/forhim.jpeg',
      heading: 'Gifts for him',
      link: '/products',
    },
    {
      id: 4,
      image: '/images/forkids.jpeg',
      heading: 'Gifts for kids',
      link: '/products',
    },
    {
      id: 5,
      image: '/images/onsale.jpeg',
      heading: 'On Sale',
      link: '/products',
    },
  ];

  return (
    <Container
      className="maindiv"
      style={{
        backgroundColor: 'rgb(200, 200, 200)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '1rem',
        paddingBottom: '1.5rem',
        borderRadius: '1rem',
      }}
    >
      <Row className="align-items-center">
        <Col xs={12} md={6} lg={6}>
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '4rem',
              marginTop: '.5rem',
              paddingLeft: '1rem',
              color: 'rgb(32, 48, 64)',
            }}
          >
            simply amazon
          </h1>

          <div style={{ paddingLeft: '1rem' }}>
            <Link to="/products">
              <button className="buttoncolor">Shop now</button>
            </Link>

            <p
              style={{
                marginTop: '1rem',
                maxWidth: '28rem',
                color: 'rgb(32, 48, 64)',
                fontSize: '1.05rem',
                lineHeight: 1.5,
              }}
            >
              A clean e-commerce showcase built with React, JWT auth, and a full
              cart → checkout → orders flow.
            </p>

            <ul
              style={{
                marginTop: '0.75rem',
                paddingLeft: '1.2rem',
                color: 'rgb(32, 48, 64)',
                fontSize: '1rem',
                lineHeight: 1.7,
              }}
            >
              <li>Fast browsing, responsive layout</li>
              <li>Secure sign-in + protected orders</li>
              <li>Checkout that creates real orders</li>
            </ul>

            <div style={{ marginTop: '1rem' }}>
              <Link
                to="/products"
                className="me-3"
                style={{
                  fontWeight: 700,
                  color: 'rgb(32, 48, 64)',
                  textDecoration: 'none',
                }}
              >
                Browse products →
              </Link>

              <Link
                to="/cart"
                className="me-3"
                style={{
                  fontWeight: 700,
                  color: 'rgb(32, 48, 64)',
                  textDecoration: 'none',
                }}
              >
                View cart →
              </Link>

              <Link
                to="/support"
                style={{
                  fontWeight: 700,
                  color: 'rgb(32, 48, 64)',
                  textDecoration: 'none',
                }}
              >
                Support
              </Link>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} lg={6}>
          <div style={{ marginTop: '2rem' }}>
            <Row>
              <Carousel>
                {lists.map((list) => (
                  <Carousel.Item key={list.id}>
                    <h3
                      className="caroheading"
                      style={{
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        color: 'rgb(32, 48, 64)',
                      }}
                    >
                      {list.heading}
                    </h3>

                    <img
                      className="d-block w-100 carouselimage"
                      src={list.image}
                      alt={list.heading}
                    />

                    <Carousel.Caption
                      style={{
                        marginBottom: '23rem',
                        marginInline: '1rem',
                        marginLeft: '1rem',
                      }}
                    >
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
