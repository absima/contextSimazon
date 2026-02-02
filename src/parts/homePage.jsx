import { Link } from 'react-router-dom';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

export default function HomePage() {
  const lists = [
    { id: 1, image: '/images/chrisgift.jpeg', heading: 'Christmas Gifts', link: '/products' },
    { id: 2, image: '/images/forher.webp', heading: 'Gifts for her', link: '/products' },
    { id: 3, image: '/images/forhim.jpeg', heading: 'Gifts for him', link: '/products' },
    { id: 4, image: '/images/forkids.jpeg', heading: 'Gifts for kids', link: '/products' },
    { id: 5, image: '/images/onsale.jpeg', heading: 'On Sale', link: '/products' },
  ];

  return (
    <Container className="maindiv">
      <div className="homeHero">
        {/* Carousel first */}
        <div className="homeCarouselCard">
          <Carousel>
            {lists.map((list) => (
              <Carousel.Item key={list.id}>
                <div className="homeCarouselHeading">{list.heading}</div>

                <img
                  className="d-block w-100 homeCarouselImg"
                  src={list.image}
                  alt={list.heading}
                />

                {/* <div className="homeCarouselAction">
                  <Link to={list.link} className="homeCarouselLink">
                    Explore →
                  </Link>
                </div> */}

                <Carousel.Caption />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Copy + CTAs */}
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="homeCopy center">
              <h1 className="homeTitle">
                <span className="homeTitleBrand">Sim</span>ply am
                <span className="homeTitleBrand">azon</span>
              </h1>

              {/* <p className="homeLead">
                An e-commerce showcase with React, JWT auth, and a full
                cart → checkout → orders flow.
              </p> */}
              <div classname="chipsButtons">
              <div className="homeChips">
                <span className="homeChip">Fast browsing</span>
                <span className="homeChip">Protected orders</span>
                <span className="homeChip">Real checkout</span>
              </div>

              <div className="homeCtas">
                <Link to="/products">
                  <button className="btn-primary">Shop now</button>
                </Link>

                <Link to="/cart">
                  <button className="btn-secondary">View cart</button>
                </Link>
              </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

