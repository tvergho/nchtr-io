import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

const ResponseItem = ({ name, message }) => {
  return (
    <div className="response-item">
      <div className="response-name">{name ? `${name} said` : <Skeleton width="50vw" height={30} style={{ marginBottom: 5, borderRadius: '15px' }} />}</div>
      <div className="response-message" style={message ? {} : { backgroundColor: 'transparent' }}>{message || null}</div>
    </div>
  );
};

const ResponseBox = ({ responses, loading }) => {
  return (
    <div className="response-box">
      <div className="response-inputs">
        <input type="text" className="screen-name" placeholder="enter a screen name" />
        <input type="text" className="response" placeholder="what would you say?" />
        <button type="button" className="send-button">
          <FontAwesomeIcon icon={faArrowCircleUp} size="2x" color="#949191" />
        </button>
      </div>

      <div className="responses">
        {!loading ? responses.map((response) => {
          return <ResponseItem name={response.name} message={response.message} key={`${response.name}-${response.message}`} />;
        }) : Array.from(Array(3).keys()).map((num) => {
          return <ResponseItem key={num} />;
        })}
      </div>
    </div>
  );
};

export default ResponseBox;
