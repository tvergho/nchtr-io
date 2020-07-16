import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Header = ({ landing }) => {
  const [hovering, setHovering] = useState(false);
  const [backHovering, setBackHovering] = useState(false);
  const history = useHistory();

  const UploadHeader = () => {
    return (
      <div className="header-upload-container">
        <button className="upload-header" type="button" onClick={() => { history.push('/upload'); }}>
          <FontAwesomeIcon icon={faCloudUploadAlt} color="white" size="2x" />
        </button>
        <input type="text" placeholder="Enter your code" className="code-header" />
      </div>
    );
  };

  const BackButton = () => {
    return (
      <button className="header-chevron transparent" type="button">
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="#0D85FE"
          size="4x"
          onMouseEnter={() => { setBackHovering(true); }}
          onMouseLeave={() => { setBackHovering(false); }}
          style={backHovering ? { opacity: 0.7 } : { opacity: 1 }}
          onClick={() => { history.push('/'); }}
        />
      </button>
    );
  };

  return (
    <header>
      {!landing ? <BackButton /> : <></>}

      {!hovering
        ? (
          <NavLink to="/">
            <div className="logo" onMouseEnter={() => { setHovering(true); }} onMouseLeave={() => { setHovering(false); }}>
              nchtr<span style={{ fontWeight: 'bold' }}>.io</span>
            </div>
          </NavLink>
        )
        : (
          <NavLink to="/">
            <div className="logo" onMouseLeave={() => { setHovering(false); }}>
              <span style={{ fontWeight: 'bold' }}>n</span>o&nbsp;
              <span style={{ fontWeight: 'bold' }}>c</span>lue&nbsp;
              <span style={{ fontWeight: 'bold' }}>h</span>ow&nbsp;
              <span style={{ fontWeight: 'bold' }}>t</span>o&nbsp;
              <span style={{ fontWeight: 'bold' }}>r</span>espond
            </div>
          </NavLink>
        )}

      {landing ? <UploadHeader /> : <></>}
    </header>
  );
};

export default Header;
