/* eslint-disable no-use-before-define */
/* eslint-disable new-cap */
import React, { useRef, useEffect, useState } from 'react';
import { SketchField, Tools } from 'react-sketch2';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import SecondaryArrows from '../SecondaryArrows';
import BlueButton from '../BlueButton';

const { fabric } = require('fabric');

const HEIGHT_MULTIPLIER = 0.55;
const WIDTH_MULTIPLIER = 0.6;

// Keyboard arrow codes.
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

const DrawField = ({ images, swap, onSubmit }) => {
  const sketch = useRef();
  const [current, setCurrent] = useState(0); // Index of the currently displayed image.
  const [canvases, setCanvases] = useState({}); // All images that have been previously shown and edited.

  // Triggered every time an image is added or the user swaps images.
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
    const newHeight = HEIGHT_MULTIPLIER * window.innerHeight;
    const newWidth = WIDTH_MULTIPLIER * window.innerWidth;
    const canvas = sketch.current._fc;
    // canvas.setHeight(newHeight);
    // canvas.setWidth(newWidth);
    let newRatio = 0;
    const json = sketch.current.toJSON();
    console.log(json);

    if (images[current].height > canvas.height) {
      newRatio = newHeight / images[current].height;
      canvas.setWidth(images[current].width * newRatio);
    } else {
      newRatio = newWidth / images[current].width;
      console.log(newRatio);
      canvas.setHeight(images[current].height * newRatio);
    }

    // Scale the background image by converting to JSON.
    json.objects[0].scaleX = newRatio;
    json.objects[0].scaleY = newRatio;
    sketch.current.fromJSON(json);

    // Convert and scale the other canvases.
    for (const [index, value] of Object.entries(canvases)) {
      let ratio = 0;

      if (images[index].height > canvas.height) {
        ratio = newHeight / images[index].height;
      } else {
        ratio = newWidth / images[index].width;
      }

      value.objects[0].scaleX = ratio;
      value.objects[0].scaleY = ratio;
      const newCanvas = new fabric.Canvas().loadFromJSON(value, () => {
        if (images[index].height > canvas.height) {
          newCanvas.setWidth(images[index].width * ratio);
        } else {
          newCanvas.setHeight(images[index].height * ratio);
        }
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
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          imageURLs[i] = canvas.toDataURL(images[i].type);
        };
        img.setAttribute('crossOrigin', 'Anonymous');
        img.src = images[i].src;
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

    canvas.setHeight(HEIGHT_MULTIPLIER * window.innerHeight);
    canvas.setWidth(WIDTH_MULTIPLIER * window.innerWidth);

    if (images[index].height > canvas.height) {
      canvas.setWidth(images[index].width * (canvas.height / images[index].height));
    } else {
      canvas.setHeight(images[index].height * (canvas.width / images[index].width));
    }

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

      canvas.setHeight(HEIGHT_MULTIPLIER * window.innerHeight);
      canvas.setWidth(WIDTH_MULTIPLIER * window.innerWidth);

      if (oImg.height <= canvas.height) {
        const newHeight = oImg.height * (canvas.width / oImg.width);
        oImg.scaleToWidth(canvas.width);
        canvas.setHeight(newHeight);
        console.log(canvas.width, newHeight, oImg);
      } else {
        oImg.scaleToHeight(canvas.height);
        canvas.setWidth(newWidth);
      }
      canvas.clear();
      canvas.add(oImg);
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
      <SecondaryArrows increment={increment} decrement={decrement} current={current} images={images} handleSwap={handleSwap} showSwap />
      <BlueButton title="Get responses" onClick={saveDrawings} icon={faCommentDots} />
    </>
  );
};

export default DrawField;
