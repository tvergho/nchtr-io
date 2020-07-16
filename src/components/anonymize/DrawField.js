/* eslint-disable no-use-before-define */
/* eslint-disable new-cap */
import React, { useRef, useEffect, useState } from 'react';
import { SketchField, Tools } from 'react-sketch2';

const { fabric } = require('fabric');

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

const DrawField = ({ images }) => {
  const sketch = useRef();
  const [current, setCurrent] = useState(0);
  const [canvases, setCanvases] = useState({});

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    if (current in canvases) {
      setCanvas(current);
    } else {
      setCanvasImage(current);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [current, images]);

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
    case RIGHT_ARROW:
      increment();
      break;
    case LEFT_ARROW:
      decrement();
      break;
    default:
      break;
    }
  };

  const increment = () => {
    if (current + 1 < images.length) {
      const newCanvases = { ...canvases };
      newCanvases[current] = sketch.current.toJSON();
      setCanvases(newCanvases);
      setCurrent(current + 1);
    }
  };

  const decrement = () => {
    if (current - 1 >= 0) {
      const newCanvases = { ...canvases };
      newCanvases[current] = sketch.current.toJSON();
      setCanvases(newCanvases);
      setCurrent(current - 1);
    }
  };

  const setCanvas = (index) => {
    const json = canvases[index];
    sketch.current.fromJSON(json);
  };

  const setCanvasImage = (index) => {
    if (sketch && sketch.current && images && images[current]) {
      console.log(images);
      const image = images[index];

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
