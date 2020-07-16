import React from 'react';
import { SketchField, Tools } from 'react-sketch2';

const DrawField = () => {
  return (
    <SketchField
      height="65vh"
      tool={Tools.Pencil}
      lineColor="#0D85FE"
      lineWidth={10}
    />
  );
};

export default DrawField;
