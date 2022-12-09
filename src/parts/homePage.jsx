import { Link } from 'react-router-dom';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import background from '/images/pnew.jpg';
export default function HomePage(props) {
  return (
    <Container
      className="maindiv"
      style={{
        backgroundImage: 'url(' + background + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '50vh',
      }}
    >
      <Row className="align-items-start">
        <Col xs={12} md={6} lg={6}>
          <h2 className="simplyamazon">simply amazon</h2>
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              paddingLeft: '1rem',
              marginTop: '10rem',
              // backgroundColor: 'white',
              width: '50%',
            }}
          >
            <div
              style={{
                fontSize: '4rem',
                color: 'green',
              }}
            >
              Oh deer...,
            </div>
            <div
              style={{
                color: 'red',
                paddingLeft: '2.5rem',
              }}
            >
              Christmas is here!
            </div>
          </h1>
          {/* </div> */}
        </Col>

        <Col xs={12} md={6} lg={6}>
          <div className="carousel">
            <Row>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100 carouselimage"
                    src="./images/chrisgift.jpeg"
                    alt="christmas"
                  />

                  <Carousel.Caption className="carouselcaption">
                    <h3 className="caroheading">Christmas Gifts</h3>
                    <Link to="/products" className="btn btn-primary">
                      click here
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100 carouselimage"
                    src="./images/forher.webp"
                    alt="for women"
                  />
                  <Carousel.Caption className="carouselcaption">
                    <h3>Gifts for her</h3>
                    <Link to="/products" className="btn btn-primary">
                      click here
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 carouselimage"
                    src="./images/forhim.jpeg"
                    alt="for men"
                  />
                  <Carousel.Caption className="carouselcaption">
                    <h3>Gifts for him</h3>
                    <Link to="/products" className="btn btn-primary">
                      click here
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100  carouselimage"
                    src="./images/forkids.jpeg"
                    alt="for kids"
                  />

                  <Carousel.Caption className="carouselcaption">
                    <h3>Gifts for kids</h3>
                    <Link to="/products" className="btn btn-primary">
                      click here
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100 carouselimage"
                    src="./images/featured.jpeg"
                    alt="featured"
                  />

                  <Carousel.Caption className="carouselcaption">
                    <h3> Featured products </h3>
                    <Link to="/products" className="btn btn-primary">
                      click here
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100 carouselimage"
                    src="./images/onsale.jpeg"
                    alt="on sale"
                  />
                  <Carousel.Caption className="carouselcaption">
                    <h3> On Sale</h3>
                    <Link to="/products" className="btn btn-primary">
                      click here
                    </Link>
                    {/* <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p> */}
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
