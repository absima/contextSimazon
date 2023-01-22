import { Link } from 'react-router-dom';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import background from '/images/pnew.jpg';
export default function HomePage(props) {
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
    }
  ];

  return (
    <Container
      className="maindiv"
      style={{
        // backgroundImage: `url(${background})`,
        backgroundColor: 'white',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '50vh',
      }}
    >
      <Row className="align-items-start">
        <Col xs={12} md={6} lg={6}>
          <h1 
          style={{
            fontWeight: 'bold', 
            fontSize: '4rem', 
            marginTop: '.5rem', 
            paddingLeft: '1rem',
            color: 'rgb(32, 48, 64)'}}
          
          >simply amazon</h1>
          <Link to="/products">
            <button className="buttoncolor">Shop now</button>
          </Link>

        </Col>

        <Col xs={12} md={6} lg={6}>
          <div 
          style={{marginTop: '2rem'}}
          >
            <Row>
              <Carousel>
                {lists.map((list) => (
                  <Carousel.Item key={list.id}>
                    <h3 className="caroheading" 
                    style={{
                      fontWeight: 'bold',
                      fontSize: '2rem',
                      color: 'rgb(32, 48, 64)',
                    }}
                    >{list.heading}</h3>
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
                    //   borderRadius: '1rem',
                    //   // padding: '1rem',
                    //   width: '50%',
                    //   // marginBottom: '40%',
                    //   marginTop: '1rem',
                    //   marginLeft: '1%',


                      }}
                    >
                      <Link to={list.link} >
                        <button 
                        className="buttoncolor"
                        
                        >Click here</button>
                      </Link>
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
