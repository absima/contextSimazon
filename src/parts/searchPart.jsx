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
  const normalize = (v) =>
    (v ?? '')
      .toString()
      .trim()
      .toLowerCase()
      // squash common category formatting differences:
      // "skin-care" / "skin care" / "skin_care" -> "skincare"
      .replace(/[\s_-]+/g, '');

  const filter = normalize(filterRaw);

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

              const title = normalize(product?.title);
              const brand = normalize(product?.brand);
              const category = normalize(product?.category);

              // optional: support tags in the new DummyJSON dataset
              const tags = Array.isArray(product?.tags)
                ? normalize(product.tags.join(' '))
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
