import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlueButton = ({
  title, icon, onClick, style,
}) => {
  return (
    <button type="button" className="blue-button" onClick={onClick} style={style}>
      <FontAwesomeIcon icon={icon} color="white" size="2x" />
      <div>{title}</div>
    </button>
  );
};

export default BlueButton;
