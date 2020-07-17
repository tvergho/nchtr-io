/* eslint-disable no-use-before-define */
/* eslint-disable new-cap */
import React, { useRef, useEffect, useState } from 'react';
import { SketchField, Tools } from 'react-sketch2';
import SecondaryArrows from './SecondaryArrows';

const { fabric } = require('fabric');

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

const DrawField = ({ images, swap }) => {
  const sketch = useRef();
  const [current, setCurrent] = useState(0);
  const [canvases, setCanvases] = useState({});

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    if (current in canvases) {
      setCanvas(current);
    } else {
      setCanvasImage(current);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
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

  const handleResize = () => {
    const newHeight = 0.60 * window.innerHeight;
    const canvas = sketch.current._fc;
    const newRatio = newHeight / images[current].height;
    const json = sketch.current.toJSON();
    json.objects[0].scaleX = newRatio;
    json.objects[0].scaleY = newRatio;
    canvas.setWidth(images[current].width * newRatio);
    sketch.current.fromJSON(json);

    for (const [index, value] of Object.entries(canvases)) {
      const ratio = newHeight / images[index].height;
      value.objects[0].scaleX = ratio;
      value.objects[0].scaleY = ratio;
      const newCanvas = new fabric.Canvas().loadFromJSON(value, () => {
        newCanvas.setWidth(images[index].width * ratio);
        canvases[index] = newCanvas.toJSON();
      });
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

  const handleSwap = (j) => {
    swap(current, j);
    const newCanvases = { ...canvases };

    if (j in canvases) {
      newCanvases[current] = sketch.current.toJSON();
      const tempCanvas = newCanvases[current];
      newCanvases[current] = newCanvases[j];
      newCanvases[j] = tempCanvas;
    } else {
      newCanvases[j] = sketch.current.toJSON();
    }

    setCanvases(newCanvases);
    setCurrent(j);
  };

  const setCanvas = (index) => {
    const canvas = sketch.current._fc;
    canvas.setWidth(images[index].width * (canvas.height / images[index].height));
    canvas.clear();

    const json = canvases[index];
    sketch.current.fromJSON(json);
    canvas.renderAll();
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
      canvas.clear();
      canvas.add(oImg);
      canvas.setWidth(newWidth);
      canvas.renderAll();
    }
  };

  return (
    <>
      <SketchField
        ref={(c) => { sketch.current = c; }}
        height="60vh"
        tool={Tools.Pencil}
        lineColor="#0D85FE"
        lineWidth={10}
        style={{ marginTop: '15px' }}
      />
      <SecondaryArrows increment={increment} decrement={decrement} current={current} images={images} handleSwap={handleSwap} />
    </>
  );
};

export default DrawField;
