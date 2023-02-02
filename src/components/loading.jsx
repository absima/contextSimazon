import React from 'react';

// @connect(state => ({
//   loading: state.loading
// }))

export default function LoadingIndicator() {
  return (
    <div>
       <i className="fa fa-cog fa-spin"></i> Loading...
    </div>
  );
}
