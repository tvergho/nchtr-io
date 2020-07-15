/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Header from './Header';

const Container = ({
  children, landing, style, rootProps,
}) => {
  return (
    <>
      <Header landing={landing} />
      {rootProps
        ? (
          <div {...rootProps({ style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, onClick: (e) => { e.stopPropagation(); } })}>
            <div className="container" style={style}>
              {children}
            </div>
          </div>
        )
        : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container" style={style}>
              {children}
            </div>
          </div>
        )}
    </>
  );
};

export default Container;
