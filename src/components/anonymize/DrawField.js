/* eslint-disable no-use-before-define */
/* eslint-disable new-cap */
import React, { useRef, useEffect, useState } from 'react';
import { SketchField, Tools } from 'react-sketch2';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import SecondaryArrows from './SecondaryArrows';
import BlueButton from '../BlueButton';

const { fabric } = require('fabric');

// Keyboard arrow codes.
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

const DrawField = ({ images, swap, onSubmit }) => {
  const sketch = useRef();
  const [current, setCurrent] = useState(0); // Index of the currently displayed image.
  const [canvases, setCanvases] = useState({}); // All images that have been previously shown and edited.

  // Triggers every time an image is added or the user changes images.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    if (current in canvases) {
      setCanvas(current); // Has been previously shown.
    } else {
      setCanvasImage(current); // Create a new canvas from the image.
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

  // Triggered when the window resizes.
  const handleResize = () => {
    const newHeight = 0.55 * window.innerHeight;
    const canvas = sketch.current._fc;
    const newRatio = newHeight / images[current].height; // Aspet ratio is bound by the window's height.

    // Scale the background image by converting to JSON.
    const json = sketch.current.toJSON();
    json.objects[0].scaleX = newRatio;
    json.objects[0].scaleY = newRatio;
    canvas.setWidth(images[current].width * newRatio);
    sketch.current.fromJSON(json);

    // Convert and scale the other canvases.
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

  // Upload the newly edited images to the cloud.
  const saveDrawings = () => {
    const newCanvases = { ...canvases };
    newCanvases[current] = sketch.current.toJSON();
    const imageURLs = [];

    // Produce base64 URLs corresponding to each of the images.
    for (let i = 0; i < images.length; i += 1) {
      // For edited images, use Fabric's built-in data URL converter.
      if (i in newCanvases) {
        const canvas = new fabric.Canvas();
        canvas.setWidth(images[i].width);
        canvas.setHeight(images[i].height);
        canvas.setZoom(1 / newCanvases[i].objects[0].scaleX);

        canvas.loadFromJSON(newCanvases[i], () => {
          const url = canvas.toDataURL();
          imageURLs[i] = url;
        });
      } else { // Create a canvas to extract the data URL.
        const image = images[i];
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        imageURLs[i] = canvas.toDataURL('image/png');
      }
    }

    onSubmit(imageURLs);
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

    // Swap this canvas with another canvas.
    if (j in canvases) {
      newCanvases[current] = sketch.current.toJSON();
      const tempCanvas = newCanvases[current];
      newCanvases[current] = newCanvases[j];
      newCanvases[j] = tempCanvas;
    } else { // Merely assign this canvas a new index (parent components will handle swapping).
      newCanvases[j] = sketch.current.toJSON();
    }

    setCanvases(newCanvases);
    setCurrent(j);
  };

  // Called to pull a canvas with the user's edits from memory.
  const setCanvas = (index) => {
    const canvas = sketch.current._fc;
    canvas.setWidth(images[index].width * (canvas.height / images[index].height));
    canvas.clear();

    const json = canvases[index];
    sketch.current.fromJSON(json);
    canvas.renderAll();
  };

  // Creates a new canvas from an Image object.
  const setCanvasImage = (index) => {
    if (sketch && sketch.current && images && images[current]) {
      const image = images[index];

      const canvas = sketch.current._fc;
      const newWidth = image.width * (canvas.height / image.height);

      const oImg = new fabric.Image(image, {
        left: 0,
        top: 0,
        crossOrigin: 'Anonymous', // Necessary to avoid base64 security errors.
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
        height="55vh"
        tool={Tools.Pencil}
        lineColor="#0D85FE"
        lineWidth={10}
        style={{ marginTop: '15px' }}
      />
      <SecondaryArrows increment={increment} decrement={decrement} current={current} images={images} handleSwap={handleSwap} />
      <BlueButton title="Get responses" onClick={saveDrawings} icon={faCommentDots} />
    </>
  );
};

export default DrawField;
