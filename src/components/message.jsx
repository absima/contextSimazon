// import React from 'react';

export default function Message({
  variant = 'info',
  children,
  dismissible = false,
  onClose,
}) {
  return (
    <div
      className={`alert alert-${variant} ${dismissible ? 'alert-dismissible fade show' : ''}`}
      role="alert"
    >
      {children}

      {dismissible && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      )}
    </div>
  );
}
