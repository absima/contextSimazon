import Product from '../components/product';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import { Row } from 'react-bootstrap';
import { useEffect } from 'react';

import {
  Outlet,
  useSearchParams,
} from 'react-router-dom';

import { useContext } from 'react';
import { ProjContext } from '../contexter';

export default function SearchPart(props) {
  const { products, loading, error } =
    useContext(ProjContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter');

  return (
    <div className="container maindiv">
      {loading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        // <div className="row, center">
        <Row>
          {products
            .filter((product) => {
              // const filter = searchParams.get('filter');
              // console.log('ffffffiiiiiilllllltttttteeeeer', filter);
              if (filter) {
                return (
                  product.title.toLowerCase().includes(filter.toLowerCase()) ||
                  product.brand.toLowerCase().includes(filter.toLowerCase()) ||
                  product.category.toLowerCase().includes(filter.toLowerCase())
                );
              } else {
                return true;
              }
            })
            .map((item) => (
              // <Link
              //   key={item._id}
              //   // style={({ isActive }) => {
              //   //   return {
              //   //     textDecoration: 'none',
              //   //     color: isActive ? 'red' : 'black',
              //   //     padding: '0.5rem',
              //   //     margin: '1rem 0',
              //   //   };
              //   // }}
              //   to={`/product/${item._id}`}
              // >
              <Product key={item._id} product={item}></Product>
              // </Link>
            ))}
        </Row>

        // </div>
      )}
      <Outlet />
    </div>
  );
}
