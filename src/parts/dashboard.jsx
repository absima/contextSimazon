import React from 'react';
import { useContext } from 'react';
import { ProjContext } from '../contexter';

const Dashboard = () => {
  const {
    api_url,
    useUser,
    customer,
    setCustomer,
    loading,
    setLoading,
    error,
    setError,
    // cart,
    // setCart,
    loggedin,
    setLoggedin,
  } = useContext(ProjContext);

  const { user, authenticated } = useUser();
  setLoggedin(authenticated);
  setCustomer(user);

  // if (!user || !authenticated) {
  if (!loggedin || !customer) {
    return (
      <div className="p-16 bg-gray-800 h-screen">
        <div className="text-2xl mb-4 font-bold text-white">Dashboard</div>
        <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-white" />
      </div>
    );
  }

  return (
    <div className="p-16 bg-gray-800 h-screen">
      <div className="text-2xl mb-4 font-bold text-white"> Dashboard </div>
      {customer && (
        <div className="text-white">
          <div className="text-lg text-bold mb-2"> User Details </div>
          <div className="flex">
            <div className="w-24 font-medium">
              <div> Name: {customer.name}</div>
              <div> Firstname: {customer.username}</div>
              <div> Lastname: {customer.email}</div>
            </div>
            {/* <div>
              <div>  </div>
              <div>  </div>
              <div>  </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
