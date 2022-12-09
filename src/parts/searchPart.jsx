import Product from '../components/product';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import { Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Link,
  Outlet,
  useSearchParams,
  // useParams
} from 'react-router-dom';

// get all products from redux
import {
  getAllProducts,
  selectProducts,
  selectLoading,
  selectError,
} from '../redux/productSlice';

export default function SearchPart( props) {
  // const { input } = useParams();
  // console.log('inpuuuuuuut search', input);
 
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  console.log('filfil', filter)

  // const filter = searchParams.get("filter");
  // const filter = input.filter;

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className='container maindiv'>
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

// // import { useContext } from 'react';
// // import { ProjContext } from '../contexter';
// import Product from '../components/product';
// import LoadingIndicator from '../components/loading';
// import Message from '../components/message';

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import listProducts from '../redux/productActions';
// // import { productList } from '../redux/prodredux';
// // import { getProducts } from '../api/productApi';

// import {
//   getProductsAsync,
//   products,
//   loading,
//   error,
// } from '../redux/productSlice';

// export default function HomePart() {
//   const productList = useSelector(products);
//   const onload = useSelector(loading);
//   const err = useSelector(error);
//   const dispatch = useDispatch();
//   console.log(productList)

//   useEffect(() => {
//     dispatch(getProductsAsync());
//   }, []);

//   return (
//     <div>
//       {onload ? (
//         <LoadingIndicator />
//       ) : err ? (
//         <Message variant="danger">{err}</Message>
//       ) : (
//         <div className="row center">
//           {productList.map((product) => (
//             <Product key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }









// // create search part component
// import React, { useEffect } from 'react';
// import { Col } from 'react-bootstrap';
// import { Form, Link, Outlet, useSearchParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getAllProducts,
//   selectProducts,
//   selectLoading,
//   selectError,
// } from '../redux/productSlice';
// import Product from '../components/product';
// import LoadingIndicator from '../components/loading';
// import Message from '../components/message';

// // search={search}
// // filter={filter}
// // open={open}
// // handleSearch={handleSearch}
// // handleFilter={handleFilter}
// // handleOpen={handleOpen}
// // handleSubmit={handleSubmit}
// export default function SearchPart({
//   search,
//   filter,
//   open,
//   handleSearch,
//   handleFilter,
//   handleOpen,
//   handleSubmit,
// }) {
//   const dispatch = useDispatch();
//   // const [searchParams, setSearchParams] = useSearchParams();
//   const products = useSelector(selectProducts);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);


//   // const productList = useSelector((state) => state.productList);
//   // const { loading, error, products } = productList;

//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, []);

//   return (
//     <Col xs={12} md={6}>
//       <div className="search">
//         <Form onSubmit={handleSubmit}>
//           <input
//             name="search"
//             value={search}
//             onChange={handleSearch}
//             placeholder="Search by ID or name or type ..."
//           />
//           <button type="button" onClick={handleOpen}>
//             <i className="fa fa-filter"></i>
//           </button>
//           {open && (
//             <div className="filter">
//               <label htmlFor="filter">Filter by</label>
//               <select name="filter" value={filter} onChange={handleFilter}>
//                 <option value="">All</option>
//                 <option value="id">ID</option>
//                 <option value="name">Name</option>
//                 <option value="type">Type</option>
//               </select>
//             </div>
//           )}
//           <button type="submit">
//             <i className="fa fa-search"></i>
//           </button>
//         </Form>

//         {loading ? (
//           <LoadingIndicator />
//         ) : error ? (
//           <Message variant="danger">{error}</Message>
//         ) : (
//           <div className="row center">
//             {products
//               .filter((product) => {
//                 if (filter) {
//                   return (
//                     product.title
//                       .toLowerCase()
//                       .includes(filter.toLowerCase()) ||
//                     product.brand
//                       .toLowerCase()
//                       .includes(filter.toLowerCase()) ||
//                     product.category
//                       .toLowerCase()
//                       .includes(filter.toLowerCase())
//                   );
//                 } else {
//                   return true;
//                 }
//               })
//               .map((item) => (
//                 <Link key={item._id} to={`/product/${item._id}`}>
//                   <Product key={item._id} product={item} />
//                 </Link>
//               ))}
//           </div>
//         )}
//       </div>
//     </Col>
//   );
// }