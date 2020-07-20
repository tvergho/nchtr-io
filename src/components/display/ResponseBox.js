import React, { useState } from 'react';
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

const ResponseBox = ({ responses, loading, addResponse }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submit = () => {
    if (name.trim().length > 0 && message.trim().length > 0) {
      setMessage('');
      addResponse(name, message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      submit();
    }
  };

  return (
    <div className="response-box">
      <div className="response-inputs">
        <input type="text"
          className="screen-name"
          placeholder={window.innerWidth <= 768 ? 'screen name' : 'enter a screen name'}
          value={name}
          onChange={(e) => { setName(e.target.value); }}
        />
        <input type="text"
          className="response"
          placeholder={window.innerWidth <= 768 ? 'response' : 'what would you say?'}
          value={message}
          onChange={(e) => { setMessage(e.target.value); }}
          onKeyPress={handleKeyPress}
        />
        <button type="button" className="send-button" onClick={submit}>
          <FontAwesomeIcon icon={faArrowCircleUp} size="2x" color="#949191" />
        </button>
      </div>

      <div className="responses" onScroll={(e) => { e.stopPropagation(); }}>
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
