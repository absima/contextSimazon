import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { useSearchParams } from "react-router-dom";

const CtxtProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/products');
        setLoading(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProjContext.Provider
      value={{
        products,
        loading,
        error,
        setProducts,
        setLoading,
        setError,
      }}
    >
      {props.children}
    </ProjContext.Provider>
  );
};

export const ProjContext = createContext();
export default CtxtProvider;
