import Product from '../components/product';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import { Row } from 'react-bootstrap';

import { Outlet, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProjContext } from '../contexter';

export default function SearchPart(props) {
  const { products, loading, error } = useContext(ProjContext);

  const [searchParams] = useSearchParams();
  const filterRaw = searchParams.get('filter');

  // normalize once
  const filter = (filterRaw ?? '').toString().trim().toLowerCase();

  const safeLower = (v) => (v ?? '').toString().toLowerCase();

  return (
    <div className="container maindiv">
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {(products ?? [])
            .filter((product) => {
              if (!filter) return true;

              const title = safeLower(product?.title);
              const brand = safeLower(product?.brand);
              const category = safeLower(product?.category);

              // optional: support tags in the new DummyJSON dataset
              const tags = Array.isArray(product?.tags)
                ? product.tags.join(' ').toLowerCase()
                : '';

              return (
                title.includes(filter) ||
                brand.includes(filter) ||
                category.includes(filter) ||
                tags.includes(filter)
              );
            })
            .map((item) => (
              <Product key={item._id} product={item} />
            ))}
        </Row>
      )}
      <Outlet />
    </div>
  );
}
