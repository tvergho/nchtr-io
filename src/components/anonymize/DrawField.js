/* eslint-disable no-use-before-define */
/* eslint-disable new-cap */
import React, { useRef, useEffect } from 'react';
import { SketchField, Tools } from 'react-sketch2';

const { fabric } = require('fabric');

const DrawField = ({ images }) => {
  const sketch = useRef();

  useEffect(() => {
    setCanvasImage(images[0]);
  }, []);

  const setCanvasImage = (image) => {
    if (sketch && sketch.current) {
      const canvas = sketch.current._fc;
      const newWidth = image.width * (canvas.height / image.height);

      const oImg = new fabric.Image(image, {
        left: 0,
        top: 0,
      });

      oImg.scaleToHeight(canvas.height);
      canvas.add(oImg);
      canvas.setWidth(newWidth);
      canvas.renderAll();
    }
  };

  return (
    <SketchField
      ref={(c) => { sketch.current = c; }}
      height="65vh"
      tool={Tools.Pencil}
      lineColor="#0D85FE"
      lineWidth={10}
      style={{ marginTop: '15px' }}
    />
  );
};

export default DrawField;
