import React from 'react';
import './InfoDisplay.scss';

const InfoDisplay = ({ label, value }) => {
  return (
    <div className="info-container">
      <div className="info-box info-label">{label}:</div>
      {value && <div className="info-box info-value">{value}</div>}
    </div>
  );
};

export default InfoDisplay;