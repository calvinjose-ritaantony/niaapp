// Loader.js (Component)
import React from 'react';
import './Loader.css';

const LoaderComponent = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <span className="loader-text">Responding...</span>
      </div>
    </div>
  );
};

export default LoaderComponent;